import api from "./axios.js";

export const getTheaters = async () => {
  const response = await api.get("/theaters");
  return response.data;
};

export const getTheater = async (id) => {
  const response = await api.get(`/theaters/${id}`);
  return response.data;
};

export const createTheater = async (data) => {
  const response = await api.post("/theaters", data);
  return response.data;
};

export const deleteTheater = async (id) => {
  const response = await api.delete(`/theaters/${id}`);
  return response.data;
};
