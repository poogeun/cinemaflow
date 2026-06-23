import api from "./axios.js";

export const getMovies = async () => {
  const response = await api.get("/movies");
  return response.data;
};

export const createMovie = async (data) => {
  const response = await api.post("/movies", data);
  return response.data;
};

export const updateMovie = async (id, data) => {
  const response = await api.put(`/movies/${id}`, data);
  return response.data;
};

export const deleteMovie = async (id) => {
  const response = await api.delete(`/movies/${id}`);
  return response.data;
};

export const syncTmdbMovies = async () => {
  const response = await api.post("/movies/sync/tmdb");
  return response.data;
};
