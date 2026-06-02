import express from "express";
import * as theaterController from "../controllers/theater.controller.js";

const router = express.Router();

router.get("/",
  theaterController.getTheaters
);

router.get("/:id", 
  theaterController.getTheaterById
);

router.post(
  "/",
  theaterController.createTheater
);


export default router;