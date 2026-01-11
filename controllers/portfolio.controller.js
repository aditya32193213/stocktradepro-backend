import { getPortfolioService } from "../services/index.js";

/**
 * -----------------------------------------------------
 * Portfolio Controller
 * -----------------------------------------------------
 * Handles user portfolio retrieval with current holdings,
 * profit/loss calculations, and performance metrics.
 */

/**
 * Get User Portfolio
 * 
 * Endpoint: GET /api/v1/portfolio
 * 
 * Returns:
 * - Current stock holdings with quantities
 * - Average buy prices
 * - Current market values
 * - Profit/loss for each stock
 * - Overall portfolio summary
 * 
 * @route   GET /api/v1/portfolio
 * @access  Private (requires authentication)
 */
export const getPortfolio = async (req, res, next) => {
  try {
    const portfolio = await getPortfolioService(req.user._id);

    res.status(200).json(portfolio);
  } catch (error) {
    next(error);
  }
};