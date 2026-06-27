import prisma from "../lib/prisma.js";
import AppError from "../errors/app.error.js";

// 종료 시간 계산
const addMinutes = (date, minutes) => {
  return new Date(date.getTime() + minutes * 60 * 1000);
};

// 날짜 + 시간 입력값을 Date로 변환
const combineDateAndTime = (dateString, timeString) => {
  const [hour, minute] = timeString.split(":").map(Number);
  const date = new Date(dateString);

  date.setHours(hour, minute, 0, 0);

  return date;
};

// 기존 상영과 겹치는지
const isOverlapping = (startTime, endTime, existingScreenings) => {
  return existingScreenings.some((screening) => {
    return (
      startTime < screening.endTime &&
      endTime > screening.startTime
    );
  });
};

// 후보 생성 (저장x)
const generatePreview = async ({
  movieIds,
  theaterIds,
  startDate,
  endDate,
  openTime,
  closeTime,
  cleaningMinutes = 15,
}) => {
  if (
    !movieIds?.length ||
    !theaterIds?.length ||
    !startDate ||
    !endDate ||
    !openTime ||
    !closeTime
  ) {
    throw new AppError(
      "자동 편성 조건이 올바르지 않습니다.",
      400
    );
  }

  const movies = await prisma.movie.findMany({
    where: {
      id: {
        in: movieIds.map(Number),
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  const theaters = await prisma.theater.findMany({
    where: {
      id: {
        in: theaterIds.map(Number),
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  if (!movies.length) {
    throw new AppError("편성할 영화를 찾을 수 없습니다.", 404);
  }

  if (!theaters.length) {
    throw new AppError("편성할 상영관을 찾을 수 없습니다.", 404);
  }

  const validMovies = movies.filter((movie) => {
    return movie.runningTime && movie.runningTime > 0;
  });

  if (!validMovies.length) {
    throw new AppError(
      "러닝타임이 있는 영화가 없습니다.",
      400
    );
  }

  const rangeStart = combineDateAndTime(startDate, openTime);
  const rangeEnd = combineDateAndTime(endDate, closeTime);

  const existingScreenings = await prisma.screening.findMany({
    where: {
      theaterId: {
        in: theaters.map((theater) => theater.id),
      },
      startTime: {
        lt: rangeEnd,
      },
      endTime: {
        gt: rangeStart,
      },
    },
  });

  const items = [];
  const summary = {
    generated: 0,
    conflicts: 0,
    skipped: movies.length - validMovies.length,
  };

  const currentDate = new Date(startDate);
  const lastDate = new Date(endDate);

  let movieIndex = 0;

  // 시작 날짜부터 종료 날짜까지 하루씩 반복
  while (currentDate <= lastDate) {
    const dateString = currentDate.toISOString().slice(0, 10);

    // 해당 날짜에서 상영관 하나씩 반복
    for (const theater of theaters) {
      // 해당 날짜의 시작 시간
      let cursor = combineDateAndTime(dateString, openTime);
      // 해당 날짜의 영업 종료 시간
      const dailyCloseTime = combineDateAndTime(dateString, closeTime);

      while (cursor < dailyCloseTime) {
        // 영화 목록을 계속 순환
        const movie = validMovies[movieIndex % validMovies.length];
        const startTime = new Date(cursor);
        const endTime = addMinutes(startTime, movie.runningTime);

        movieIndex += 1;

        // 조건 만족하면, 해당 상영관의 그날 편성 종료
        if (endTime > dailyCloseTime) {
          summary.skipped += 1;
          break;
        }

        // 기존 상영 중에서 현재 상영관만 필터링
        const theaterExistingScreenings = existingScreenings.filter(
          (screening) => screening.theaterId === theater.id
        );

        // 기존 상영과 겹치면 청소 시간만큼 뒤로 밀고 다음 반복
        if (
          isOverlapping(
            startTime,
            endTime,
            theaterExistingScreenings
          )
        ) {
          summary.conflicts += 1;
          cursor = addMinutes(cursor, cleaningMinutes);
          continue;
        }

        items.push({
          movieId: movie.id,
          movieTitle: movie.title,
          theaterId: theater.id,
          theaterName: theater.name,
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
          runningTime: movie.runningTime,
          status: "AVAILABLE",
        });

        summary.generated += 1;
        cursor = addMinutes(endTime, cleaningMinutes);
      }
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return {
    items,
    summary,
  };
};

// 실제 DB에 저장
const confirmSchedule = async (items) => {
  if (!items?.length) {
    throw new AppError(
      "저장할 상영 일정이 없습니다.",
      400
    );
  }

  const result = {
    created: 0,
    skipped: 0,
    conflicts: 0,
    failed: 0,
  };

  for (const item of items) {
    try {
      const movieId = Number(item.movieId);
      const theaterId = Number(item.theaterId);
      const startTime = new Date(item.startTime);
      const endTime = new Date(item.endTime);

      if (
        !movieId ||
        !theaterId ||
        Number.isNaN(startTime.getTime()) ||
        Number.isNaN(endTime.getTime()) ||
        startTime >= endTime
      ) {
        result.skipped += 1;
        continue;
      }

      const movie = await prisma.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!movie) { 
        result.skipped += 1;
        continue;
      }

      const theater = await prisma.theater.findUnique({
        where: {
          id: theaterId,
        },
      });

      if (!theater) {
        result.skipped += 1;
        continue;
      }

      const conflict = await prisma.screening.findFirst({
        where: {
          theaterId,
          startTime: {
            lt: endTime,
          },
          endTime: {
            gt: startTime,
          },
        },
      });

      if (conflict) {
        result.conflicts += 1;
        continue;
      }

      await prisma.screening.create({
        data: {
          movieId,
          theaterId,
          startTime,
          endTime,
        },
      });

      result.created += 1;
    } catch (error) {
      result.failed += 1;
    }
  }

  return result;
};

export default {
  generatePreview,
  confirmSchedule,
};