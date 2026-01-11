import { query, param } from "express-validator";

/**
 * -----------------------------------------------------
 * Stock Validation Rules
 * -----------------------------------------------------
 * ONLY contains validations related to stock endpoints
 */

/**
 * Get Stocks Validation (List/Search)
 */
export const getStocksValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
  
  query("search")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Search query too long"),
  
  query("sector")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Invalid sector"),
  
  query("sortBy")
    .optional()
    .isIn(["symbol", "companyName", "marketCap", "price", "changePercent"])
    .withMessage("Invalid sort field"),
  
  query("order")
    .optional()
    .isIn(["asc", "desc"])
    .withMessage("Order must be 'asc' or 'desc'")
];

/**
 * Get Stock By ID Validation
 */
export const getStockByIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid stock ID format")
];