import mongoose from "mongoose";
import { Watchlist, Stock } from "../models/index.js";
import { AppError } from "../utils/index.js";

/**
 * -----------------------------------------------------
 * Watchlist Service 
 * -----------------------------------------------------
 *  AppError consistency
 *  ObjectId validation
 *  Pagination support
 */

export const addToWatchlistService = async (userId, stockId) => {
  // Validate ObjectIds
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError("Invalid user ID", 400);
  }

  if (!mongoose.Types.ObjectId.isValid(stockId)) {
    throw new AppError("Invalid stock ID", 400);
  }

  // Validate stock exists
  const stockExists = await Stock.exists({ _id: stockId });
  if (!stockExists) {
    throw new AppError("Stock not found", 404);
  }

  try {
  await Watchlist.create({ user: userId, stock: stockId });
  return true;
} catch (error) {
  if (error.code === 11000) { // Duplicate key error
    throw new AppError("Stock already in watchlist", 409);
  }
  throw error;
}
};

export const getWatchlistService = async (userId, options = {}) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError("Invalid user ID", 400);
  }

  const { page = 1, limit = 50 } = options;
  const skip = (page - 1) * limit;

  const [watchlist, totalRecords] = await Promise.all([
    Watchlist.find({ user: userId })
      .populate("stock")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean(),
    Watchlist.countDocuments({ user: userId }),
  ]);

  return {
    page: Number(page),
    pageSize: Number(limit),
    totalPages: Math.ceil(totalRecords / limit),
    totalRecords,
    data: watchlist,
  };
};

export const removeFromWatchlistService = async (userId, watchlistId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError("Invalid user ID", 400);
  }

  if (!mongoose.Types.ObjectId.isValid(watchlistId)) {
    throw new AppError("Invalid watchlist ID", 400);
  }

  const removed = await Watchlist.findOneAndDelete({
    _id: watchlistId,
    user: userId,
  });

  if (!removed) {
    throw new AppError("Watchlist item not found", 404);
  }

  return true;
};
