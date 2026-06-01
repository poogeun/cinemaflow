import express from "express";
import screeningController from "../controllers/screening.controller.js";

const router = express.Router();

router.get("/", screeningController.getScreenings);

router.post(
  "/",
  screeningController.createScreening
);

export default router;