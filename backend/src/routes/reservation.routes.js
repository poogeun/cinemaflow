import express from "express";
import * as reservationController from "../controllers/reservation.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  reservationController.createReservation
);

router.get(
  "/me",
  authMiddleware,
  reservationController.getMyReservations
);

router.patch(
  "/:id/cancel",
  authMiddleware,
  reservationController.cancelReservation
);

export default router;