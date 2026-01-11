import { Transaction, Watchlist } from "../models/index.js";
import { AppError } from "../utils/index.js";

/**
 * -----------------------------------------------------
 * Dashboard Summary Service 
 * -----------------------------------------------------
 */
export const getDashboardSummaryService = async (user) => {

      // ✅ Add validation
  if (!user || !user._id) {
    throw new AppError('Invalid user', 400);
  }

  // Run independent DB queries in parallel
    const [transactions, watchlistCount] = await Promise.all([
  Transaction.aggregate([
    { $match: { user: user._id } },
    { 
      $group: {
        _id: '$stock',
        buyQty: { $sum: { $cond: [{ $eq: ['$type', 'BUY'] }, '$quantity', 0] } },
        sellQty: { $sum: { $cond: [{ $eq: ['$type', 'SELL'] }, '$quantity', 0] } },
        buyAmount: { $sum: { $cond: [{ $eq: ['$type', 'BUY'] }, '$totalAmount', 0] } },
        sellAmount: { $sum: { $cond: [{ $eq: ['$type', 'SELL'] }, '$totalAmount', 0] } }
      }
    }
  ]),
  Watchlist.countDocuments({ user: user._id })
]);

  // Calculate holdings and portfolio value
  const holdingsMap = {};
  let netInvestedAmount = 0;

transactions.forEach((tx) => {
  const stockId = tx._id.toString();
  const netQuantity = tx.buyQty - tx.sellQty;
  
  if (netQuantity > 0) {
    holdingsMap[stockId] = netQuantity;
  }
  
  netInvestedAmount += (tx.buyAmount - tx.sellAmount);
});

  const holdingsCount = Object.values(holdingsMap).filter(
    (qty) => qty > 0
  ).length;

  return {
    balance: user.balance,
    netInvestedAmount,
    holdingsCount,
    watchlistCount,
  };
};
