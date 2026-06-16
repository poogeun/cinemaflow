import api from "./axios";

export const getScreeningsByMovieId = async (
  movieId
) => {
  const response = await api.get(
    `/movies/${movieId}/screenings`
  );

  return response.data;
};