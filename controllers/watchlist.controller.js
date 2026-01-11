import {
  addToWatchlistService,
  getWatchlistService,
  removeFromWatchlistService
} from "../services/index.js";

/**
 * -----------------------------------------------------
 * Add To Watchlist
 * -----------------------------------------------------
 */
export const addToWatchlist = async (req, res, next) => {
  try {
    await addToWatchlistService(req.user._id, req.body.stockId);
    res.status(201).json({ message: "Stock added to watchlist" });
  } catch (error) {
    next(error);
  }
};

/**
 * -----------------------------------------------------
 * Get Watchlist
 * -----------------------------------------------------
 */
export const getWatchlist = async (req, res, next) => {
  try {
    const watchlist = await getWatchlistService(req.user._id, req.query);
    res.json(watchlist);
  } catch (error) {
    next(error);
  }
};

/**
 * -----------------------------------------------------
 * Remove From Watchlist
 * -----------------------------------------------------
 */
export const removeFromWatchlist = async (req, res, next) => {
  try {
    await removeFromWatchlistService(req.user._id, req.params.id);
    res.status(200).json({ message: "Stock removed from watchlist" });
  } catch (error) {
    next(error);
  }
};
