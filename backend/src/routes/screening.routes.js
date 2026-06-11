import express from "express";
import screeningController from "../controllers/screening.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get("/", screeningController.getScreenings);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  screeningController.createScreening
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,  
  screeningController.deleteScreening
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,  
  screeningController.updateScreening
);

export default router;