import { Watchlist, Stock } from "../models/index.js";

/**
 * -----------------------------------------------------
 * Watchlist Service
 * -----------------------------------------------------
 */

export const addToWatchlistService = async (userId, stockId) => {
  const stockExists = await Stock.findById(stockId);
  if (!stockExists) {
    throw new Error("Stock not found");
  }

  await Watchlist.create({
    user: userId,
    stock: stockId
  });

  return true;
};

export const getWatchlistService = async (userId) => {
  return Watchlist.find({ user: userId })
    .populate("stock")
    .lean();
};

export const removeFromWatchlistService = async (userId, watchlistId) => {
  const removed = await Watchlist.findOneAndDelete({
    _id: watchlistId,
    user: userId
  });

  if (!removed) {
    throw new Error("Watchlist item not found");
  }

  return true;
};
