import screeningService from "../services/screening.service.js";

const createScreening = async (
  req,
  res,
  next
) => {
  try {
    const screening =
      await screeningService.createScreening(
        req.body
      );

    res.status(201).json(screening);
  } catch (error) {
    next(error);
  }
};

const getScreenings = async (req, res, next) => {
  try {
    const screenings = await screeningService.getScreenings();
    res.json(screenings);
  } catch (error) {
    next(error);
  }
};

export default {
  createScreening,
  getScreenings,
};