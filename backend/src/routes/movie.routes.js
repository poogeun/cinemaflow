import express from "express";
import movieController from "../controllers/movie.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import screeningController from "../controllers/screening.controller.js";

const router = express.Router();

router.get("/", movieController.getMovies);


router.get(
  "/:movieId/screenings",
  screeningController.getScreeningsByMovieId
);

router.get(
  "/:id",
  movieController.getMovieById
);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  movieController.createMovie
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,  
  movieController.updateMovie
);

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,  
  movieController.deleteMovie
);

export default router;