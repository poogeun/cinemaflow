import * as dashboardService from "../services/dashboard.service.js";

export const getDashboard = async (req, res, next) => {
  try {
    const dashboard =
      await dashboardService.getDashboard();

    res.json(dashboard);
  } catch (error) {
    next(error);
  }
};