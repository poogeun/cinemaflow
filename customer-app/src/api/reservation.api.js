import api from "./axios"

export const createReservation = async ({
  screeningId,
  seatIds,
}) => {
  const response = await api.post(
    "/reservations",
    {
      screeningId: Number(screeningId),
      seatIds,
    }
  );

  return response.data;
};

export const getMyReservations = async () => {
  const response = await api.get(
    "/reservations/me"
  );

  return response.data;
};

export const cancelReservation = async (
  reservationId
) => {
  const response = await api.patch(
    `/reservations/${reservationId}/cancel`
  );

  return response.data;
};