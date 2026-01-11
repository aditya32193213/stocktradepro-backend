import { body, query, param } from "express-validator";

/**
 * -----------------------------------------------------
 * Watchlist Validation Rules
 * -----------------------------------------------------
 */

/**
 * Add to Watchlist Validation
 */
export const addToWatchlistValidation = [
  body("stockId")
    .notEmpty()
    .withMessage("Stock ID is required")
    .isMongoId()
    .withMessage("Invalid stock ID format")
];

/**
 * Get Watchlist Validation (Query Params)
 */
export const getWatchlistValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100")
];

/**
 * Remove from Watchlist Validation
 */
export const removeFromWatchlistValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid watchlist ID format")
];