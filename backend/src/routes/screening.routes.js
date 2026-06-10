import express from "express";
import screeningController from "../controllers/screening.controller.js";

const router = express.Router();

router.get("/", screeningController.getScreenings);

router.post(
  "/",
  screeningController.createScreening
);

router.delete(
  "/:id",
  screeningController.deleteScreening
);

router.put(
  "/:id",
  screeningController.updateScreening
);

export default router;