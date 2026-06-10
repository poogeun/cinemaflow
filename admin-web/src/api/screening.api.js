import api from "./axios.js"

export const getScreenings = async () => {
  const response = await api.get("/screenings");
  return response.data;
};

export const createScreening = async (data) => {
  const response = await api.post("/screenings", data);
  return response.data;
}

export const updateScreening = async (screeningId, data) => {
  const response = await api.put(`/screenings/${screeningId}`, data);
  return response.data;
}

export const deleteScreening = async (screeningId) => {
  const response = await api.delete(`/screenings/${screeningId}`);
  return response.data;
}