import screeningService from "../services/screening.service.js";
import screeningAutoScheduleService from "../services/screeningAutoSchedule.service.js";

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

const getScreeningsByMovieId = async (
  req,
  res,
  next
) => {
  try {
    const screenings =
      await screeningService.getScreeningsByMovieId(
        req.params.movieId
      );

    res.json(screenings);
  } catch (error) {
    next(error);
  }
};

const getScreeningById = async (
  req,
  res,
  next
) => {
  try {
    const screening =
      await screeningService.getScreeningById(
        req.params.id
      );

    res.json(screening);
  } catch (error) {
    next(error);
  }
};

const generateAutoSchedulePreview = async (
  req,
  res,
  next
) => {
  try {
    const preview =
      await screeningAutoScheduleService.generatePreview(
        req.body
      );

    res.json(preview);
  } catch (error) {
    next(error);
  }
};

const confirmAutoSchedule = async (
  req,
  res,
  next
) => {
  try {
    const result =
      await screeningAutoScheduleService.confirmSchedule(
        req.body.items
      );

    res.status(201).json({
      message: "자동 편성 상영 일정이 저장되었습니다.",
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createScreening,
  getScreenings,
  deleteScreening,
  updateScreening,
  getScreeningsByMovieId,
  getScreeningById,
  generateAutoSchedulePreview,
  confirmAutoSchedule,
};