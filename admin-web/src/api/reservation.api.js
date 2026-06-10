import api from "./axios"

export const getReservations = async () => {
  const response = await api.get("/reservations");
  return response.data;
};

export const cancelReservation = async (reservationId) => {
  const response = await api.patch(`/reservations/${reservationId}/cancel`);
  return response.data;
};

export const adminCancelReservation = async (reservationId) => {
  const response = await api.patch(
    `/reservations/${reservationId}/admin-cancel`
  );

  return response.data;
};