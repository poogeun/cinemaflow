import movieService from "../services/movie.service.js";

const getMovies = async (req, res, next) => {
  try {
    const movies = await movieService.getMovies();
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const movie = await movieService.createMovie(req.body);
    res.status(201).json(movie);
  } catch (error) {
    next(error);
  };
};

const getMovieById = async (req, res, next) => {
  try {
    const movie = await movieService.getMovieById(
      req.params.id
    );

    res.json(movie);
  } catch (error) {
    next(error);
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const movie = await movieService.updateMovie(
      req.params.id,
      req.body
    );

    res.json(movie);
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await movieService.deleteMovie(
      req.params.id
    );

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const syncTmdbMovies = async (req, res, next) => {
  try {
    const result = await movieService.syncTmdbMovies();

    res.json({
      message: "TMDB 영화 동기화가 완료되었습니다.",
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getMovies,
  createMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
  syncTmdbMovies,
};