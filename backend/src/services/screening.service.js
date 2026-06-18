import prisma from "../lib/prisma.js";
import AppError from "../errors/app.error.js";

const createScreening = async ({
  movieId,
  theaterId,
  startTime,
  endTime,
}) => {
  const movie =
    await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      throw new AppError(
        "영화를 찾을 수 없습니다.",
        404
      );
    }

    return await prisma.screening.create({
      data: {
        movieId,
        theaterId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });
};

const getScreenings = async () => {
  return await prisma.screening.findMany({
    include: {
      movie: true,
      theater: true,
    },
    orderBy: {
      startTime: "asc",
    },
  });
};

const deleteScreening = async (id) => {
  const screening = await prisma.screening.findUnique({
    where: {
      id: Number(id),
    }
  });

  if (!screening) {
    throw new AppError("상영 일정을 찾을 수 없습니다.", 404);
  }

  await prisma.screening.delete({
    where: {
      id: Number(id),
    }
  });
};

const updateScreening = async (
  id,
  {
    movieId,
    theaterId,
    startTime,
    endTime,
  }
) => {
  const screening = await prisma.screening.findUnique({
    where : {
      id: Number(id)
    },
  });

  if (!screening) {
    throw new AppError("상영 일정을 찾을 수 없습니다.", 404);
  }

  const movie = await prisma.movie.findUnique({
    where : {
      id: Number(movieId)
    },
  });

  if (!movie) {
    throw new AppError("영화를 찾을 수 없습니다.", 404);
  }
  
  const theater = await prisma.theater.findUnique({
    where : {
      id: Number(theaterId)
    },
  });

  if (!theater) {
    throw new AppError("상영관을 찾을 수 없습니다.", 404);
  }
  
   return await prisma.screening.update({
    where: {
      id: Number(id)
    },
    data: {
      movieId: Number(movieId),
      theaterId: Number(theaterId),
      startTime: new Date(startTime),
      endTime: new Date(endTime),
    },
   });
};

const getScreeningsByMovieId = async (
  movieId
) => {
  return await prisma.screening.findMany({
    where: {
      movieId: Number(movieId),
    },
    include: {
      movie: true,
      theater: {
        include: {
          seats: {
            orderBy: [
              { rowLabel: "asc" },
              { seatNumber: "asc" },
            ],
          },
        },
      },
      reservations: {
        where: {
          status: "RESERVED",
        },
        include: {
          reservationSeats: true,
        },
      },
    },
    orderBy: {
      startTime: "asc",
    },
  });
};

const getScreeningById = async (id) => {
  const screening =
    await prisma.screening.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        movie: true,
        theater: {
          include: {
            seats: {
              orderBy: [
                {rowLabel: "asc" },
                { seatNumber: "asc" },
              ],
            },
          },
        },
        reservations: {
          where: {
            status: "RESERVED",
          },
          include: {
            reservationSeats: true,
          },
        },
      },
    });

  if (!screening) {
    throw new AppError(
      "상영 정보를 찾을 수 없습니다.",
      404
    );
  }

  return screening;
};

export default {
  createScreening,
  getScreenings,
  deleteScreening,
  updateScreening,
  getScreeningsByMovieId,
  getScreeningById,
};