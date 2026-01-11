/**
 * -----------------------------------------------------
 * Validation Index
 * -----------------------------------------------------
 * Central export for all request validation rules.
 * Helps keep route files clean and organized.
 */

// Auth Validations
export {
  registerValidation,
  loginValidation
} from "./auth.validation.js";

// Transaction Validations
export {
  buyStockValidation,
  sellStockValidation,
  getTransactionsValidation  
} from "./transaction.validation.js";

// Stock Validations
export { 
  getStocksValidation,
  getStockByIdValidation
} from "./stock.validation.js";

// Watchlist Validations
export {
  addToWatchlistValidation,
  getWatchlistValidation,      
  removeFromWatchlistValidation 
} from "./watchlist.validation.js";