import prisma from "../lib/prisma.js";
import AppError from "../errors/app.error.js";

const getMovies = async () => {
  return await prisma.movie.findMany({
    orderBy: {
      id: "desc",
    },
  });
};

const createMovie = async ({
  title,
  description,
  runningTime,
  posterUrl,
}) => {

  if (!title) {
    throw new AppError("영화 제목은 필수입니다.", 400);
  }

  if (!runningTime || runningTime <= 0) {
    throw new AppError("상영시간은 0보다 커야 합니다.", 400);
  }

  return await prisma.movie.create({
    data: {
      title,
      description,
      runningTime,
      posterUrl,
    },
  });
};

const getMovieById = async (id) => {
  const movie = await prisma.movie.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      screenings: true,
    },
  });

  if (!movie) {
    throw new AppError("영화를 찾을 수 없습니다.", 404);
  }

  return movie;
}

const updateMovie = async (
  id,
  {
    title,
    description,
    runningTime,
    posterUrl,
  }
) => {

  await getMovieById(id);

  return await prisma.movie.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      description,
      runningTime,
      posterUrl,
    },
  });
};

const deleteMovie = async (id) => {
  await getMovieById(id);

  await prisma.movie.delete({
    where: {
      id: Number(id),
    },
  });
};

export default {
  getMovies,
  createMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
};