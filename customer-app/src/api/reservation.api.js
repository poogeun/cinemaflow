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