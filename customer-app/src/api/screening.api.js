import api from "./axios";

export const getScreeningsByMovieId = async (
  movieId
) => {
  const response = await api.get(
    `/movies/${movieId}/screenings`
  );

  return response.data;
};

export const getScreeningById = async (id) => {
  const response = await api.get(
    `screenings/${id}`
  );

  return response.data;
}