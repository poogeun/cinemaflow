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
    },
    orderBy: {
      startTime: "asc",
    },
  });
};

export default {
  createScreening,
  getScreenings,
};