import {
  getStocksService,
  getStockByIdService
} from "../services/index.js";

/**
 * -----------------------------------------------------
 * Get All Stocks
 * -----------------------------------------------------
 */
export const getAllStocks = async (req, res, next) => {
  try {
    const query = req.sanitizedQuery ?? req.query;
    const result = await getStocksService(query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * -----------------------------------------------------
 * Get Stock By ID
 * -----------------------------------------------------
 */
export const getStockById = async (req, res, next) => {
  try {
    const stock = await getStockByIdService(req.params.id);
    res.status(200).json(stock);
  } catch (error) {
    next(error);
  }
};
