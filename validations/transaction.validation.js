import { body, query } from "express-validator";

/**
 * -----------------------------------------------------
 * Transaction Validation Rules
 * -----------------------------------------------------
 */

/**
 * Buy Stock Validation
 */
export const buyStockValidation = [
  body("stockId")
    .notEmpty()
    .withMessage("Stock ID is required")
    .isMongoId()
    .withMessage("Invalid stock ID format"),
  
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1")
];

/**
 * Sell Stock Validation
 */
export const sellStockValidation = [
  body("stockId")
    .notEmpty()
    .withMessage("Stock ID is required")
    .isMongoId()
    .withMessage("Invalid stock ID format"),
  
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1")
];

/**
 * Get Transactions Validation (Query Parameters)
 */
export const getTransactionsValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer"),
  
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100"),
  
  query("type")
    .optional()
    .isIn(["BUY", "SELL"])
    .withMessage("Type must be either BUY or SELL"),
  
  query("stockId")
    .optional()
    .isMongoId()
    .withMessage("Invalid stock ID format"),
  
  query("fromDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid date format for fromDate"),
  
  query("toDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid date format for toDate")
];