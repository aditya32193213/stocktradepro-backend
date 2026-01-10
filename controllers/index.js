/**
 * -----------------------------------------------------
 * Controllers Index
 * -----------------------------------------------------
 * Central export for all controller functions.
 * Keeps route imports clean and maintainable.
 */

// Auth Controllers
export { registerUser, loginUser } from "./auth.controller.js";

// Stock Controllers
export { getAllStocks, getStockById } from "./stock.controller.js";

// Transaction Controllers
export {
  buyStock,
  sellStock,
  getTransactions,
  exportTransactionsPDF
} from "./transaction.controller.js";

// Watchlist Controllers
export {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist
} from "./watchlist.controller.js";
