import * as theaterService from "../services/theater.service.js";

export const createTheater = async (
  req,
  res,
  next
) => {
  try {
    const theater =
      await theaterService.createTheater(
        req.body
      );
    
    res.status(201).json(theater);
  } catch (error) {
    next(error);
  }
};

export const getTheaters = async (req, res, next) => {
  try {
    const theaters = await theaterService.getTheaters();
    res.json(theaters);
  } catch (error) {
    next(error);
  }
};

export const getTheaterById = async (req, res, next) => {
  try {
    const theater = await theaterService.getTheaterById(req.params.id);
    res.json(theater);
  } catch (error) {
    next(error);
  }
};