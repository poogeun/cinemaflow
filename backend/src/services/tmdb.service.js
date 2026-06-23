import AppError from "../errors/app.error.js";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const getHeaders = () => {
  const token = process.env.TMDB_ACCESS_TOKEN;

  if (!token) {
    throw new AppError("TMDB_ACCESS_TOKEN이 설정되지 않았습니다.", 500);
  }

  return {
    Authorization: `Bearer ${token}`,
    accept: "application/json",
  };
};

const requestTmdb = async (path, params = {}) => {
  const url = new URL(`${TMDB_BASE_URL}${path}`);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new AppError("TMDB API 요청에 실패했습니다.", response.status);
  }

  return await response.json();
};

const fetchMovieList = async (category, page = 1) => {
  return await requestTmdb(`/movie/${category}`, {
    language: "ko-KR",
    region: "KR",
    page,
  });
};

const fetchMovieDetail = async (tmdbId) => {
  return await requestTmdb(`/movie/${tmdbId}`, {
    language: "ko-KR",
  });
};

const normalizeMovie = (movie, detail) => {
  return {
    tmdbId: movie.id,
    title: movie.title,
    description: movie.overview || detail.overview || "",
    runningTime: detail.runtime,
    posterUrl: movie.poster_path
      ? `${IMAGE_BASE_URL}${movie.poster_path}`
      : null,
    releaseDate: movie.release_date || detail.release_date || null,
  };
};

const getLatestMovies = async () => {
  const targets = [
    { category: "now_playing", pages: [1, 2] },
    { category: "popular", pages: [1] },
    { category: "upcoming", pages: [1] },    
  ];

  const lists = [];

  for (const target of targets) {
    for (const page of target.pages) {
      const data = await fetchMovieList(
        target.category,
        page
      );

      lists.push(...(data.results ?? []));
    }
  }

  const uniqueMovies = Array.from(
    new Map(lists.map((movie) => [movie.id, movie])).values()
  );

  const movies = [];

  for (const movie of uniqueMovies) {
    const detail = await fetchMovieDetail(movie.id);
    movies.push(normalizeMovie(movie, detail));
  }

  return movies;
};

export default {
  getLatestMovies,
};

