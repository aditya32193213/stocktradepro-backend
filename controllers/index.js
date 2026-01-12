/**
 * -----------------------------------------------------
 * Controllers Index
 * -----------------------------------------------------
 * Central export for all controller functions.
 * Keeps route imports clean and maintainable.
 */

// Auth Controllers
export { 
  registerUser, 
  loginUser, 
  getUserProfile, 
  updateUserProfile 
} from "./auth.controller.js";

// Stock Controllers
export { getAllStocks, getStockById } from "./stock.controller.js";

// Transaction Controllers
export {
  buyStock,
  sellStock,
  getTransactions,
  exportTransactionsPDF,
  exportTransactionsCSV
} from "./transaction.controller.js";

// Watchlist Controllers
export {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist
} from "./watchlist.controller.js";

// Dashboard Controllers
export { getDashboardSummary } from "./dashboard.controller.js";

//Portfolio Controllers
export { getPortfolio } from "./portfolio.controller.js";