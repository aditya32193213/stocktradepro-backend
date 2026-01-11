import { getDashboardSummaryService } from "../services/index.js";

/**
 * -----------------------------------------------------
 * Dashboard Summary Controller
 * -----------------------------------------------------
 * Endpoint: GET /api/dashboard/summary
 */
export const getDashboardSummary = async (req, res, next) => {
  try {
    const summary = await getDashboardSummaryService(req.user);

    res.status(200).json(summary);
  } catch (error) {
    next(error);
  }
};
