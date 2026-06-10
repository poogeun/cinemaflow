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

const deleteScreening = async (req, res, next) => {
  try {
    await screeningService.deleteScreening(req.params.id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const updateScreening = async (req, res, next) => {
  try {
    const screening = await screeningService.updateScreening(
      req.params.id,
      req.body
    );

    res.json(screening);
  } catch (error) {
    next(error);
  }
};

export default {
  createScreening,
  getScreenings,
  deleteScreening,
  updateScreening,
};