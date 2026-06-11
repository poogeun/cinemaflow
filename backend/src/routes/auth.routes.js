import express from "express";

import * as authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/login",
  authController.login
);

router.get(
  "/me",
  authMiddleware,
  authController.getMe
);

export default router;