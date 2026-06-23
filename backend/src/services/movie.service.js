import prisma from "../lib/prisma.js";
import AppError from "../errors/app.error.js";
import tmdbService from "./tmdb.service.js";

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
  releaseDate,
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
      releaseDate: releaseDate
        ? new Date(releaseDate)
        : null,
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
    releaseDate,
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
      releaseDate: releaseDate
        ? new Date(releaseDate)
        : null,
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

const syncTmdbMovies = async () => {
  const movies = await tmdbService.getLatestMovies();

  const result = {
    created: 0,
    updated: 0,
    skipped: 0,
    failed: 0,
  };

  for (const movie of movies) {
    try {
      if (
        !movie.tmdbId ||
        !movie.title ||
        !movie.runningTime ||
        movie.runningTime <= 0
      ) {
        result.skipped += 1;
        continue;
      }

      const existingMovie = await prisma.movie.findUnique({
        where: {
          tmdbId: movie.tmdbId,
        },
      });

      await prisma.movie.upsert({
        where: {
          tmdbId: movie.tmdbId,
        },
        update: {
          title: movie.title,
          description: movie.description,
          runningTime: movie.runningTime,
          posterUrl: movie.posterUrl,
          releaseDate: movie.releaseDate
            ? new Date(movie.releaseDate)
            : null,
        },
        create: {
          tmdbId: movie.tmdbId,
          title: movie.title,
          description: movie.description,
          runningTime: movie.runningTime,
          posterUrl: movie.posterUrl,
          releaseDate: movie.releaseDate
            ? new Date(movie.releaseDate)
            : null,          
        },
      });

      if (existingMovie) {
        result.updated += 1;
      } else {
        result.created += 1;
      }
    } catch (error) {
      result.failed += 1;
      console.error(error);
    }
  }

  return result;
};

export default {
  getMovies,
  createMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
  syncTmdbMovies,
};