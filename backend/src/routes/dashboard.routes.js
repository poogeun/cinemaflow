import express from "express";

import * as dashboardController from "../controllers/dashboard.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  dashboardController.getDashboard
);

export default router;