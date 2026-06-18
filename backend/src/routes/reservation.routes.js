import express from "express";
import * as reservationController from "../controllers/reservation.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

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

router.get(
  "/",
  authMiddleware,
  reservationController.getReservations
);

router.patch(
  ":id/admin-cancel",
  authMiddleware,
  adminMiddleware,  
  reservationController.cancelReservationByAdmin
);

export default router;