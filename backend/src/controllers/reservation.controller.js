import * as reservationService from "../services/reservation.service.js";

export const createReservation = async (
  req,
  res,
  next
) => {
  try {
    const reservation =
      await reservationService.createReservation({
        userId: req.user.userId,
        screeningId: req.body.screeningId,
        seatIds: req.body.seatIds,
      });

    res.status(201).json(reservation);
  } catch (error) {
    next(error);
  }
};

export const getMyReservations = async (
  req,
  res,
  next
) => {
  try {
    const reservations =
      await reservationService.getMyReservations(
        req.user.userId
      );

    res.json(reservations);
  } catch (error) {
    next(error);
  }
};

export const cancelReservation = async (
  req,
  res,
  next
) => {
  try {
    const reservation =
      await reservationService.cancelReservation(
        req.params.id,
        req.user.userId
      );

    res.json(reservation);
  } catch (error) {
    next(error);
  }
};

export const getReservations = async (req, res, next) => {
  try {
    const reservations = await reservationService.getReservations();

    res.json(reservations);
  } catch (error) {
    next(error);
  }
};

export const cancelReservationByAdmin = async (req, res, next) => {
  try {
    const reservation = await reservationService.cancelReservationByAdmin(req.params.id);

    res.json(reservation);
  } catch (error) {
    next(error);
  }
};