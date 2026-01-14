import { Transaction, Watchlist, Stock, User } from "../models/index.js";
import { AppError } from "../utils/index.js";

/**
 * -----------------------------------------------------
 * Dashboard Summary Service 
 * -----------------------------------------------------
 * Calculates Real-Time Portfolio Value & P&L
 */
export const getDashboardSummaryService = async (user) => {
  if (!user || !user._id) {
    throw new AppError('Invalid user', 400);
  }

  const userId = user._id;

  // 1. Fetch Transactions, Watchlist (All entries), and User Balance
  const [transactions, watchlistEntries, userData] = await Promise.all([
    Transaction.find({ user: userId }).lean(),
    Watchlist.find({ user: userId }).populate('stock').lean(),
    User.findById(userId).select('balance').lean()
  ]);

  // 2. Calculate Net Holdings & Invested Amount
  const holdingsMap = {}; 
  let netInvestedAmount = 0;

  transactions.forEach((tx) => {
    const stockId = tx.stock ? tx.stock.toString() : null;
    if (!stockId) return;

    if (!holdingsMap[stockId]) {
      holdingsMap[stockId] = { qty: 0, invested: 0 };
    }

    if (tx.type === 'BUY') {
      holdingsMap[stockId].qty += tx.quantity;
      holdingsMap[stockId].invested += tx.totalAmount;
      netInvestedAmount += tx.totalAmount;
    } else if (tx.type === 'SELL') {
      if (holdingsMap[stockId].qty > 0) {
        const avgPrice = holdingsMap[stockId].invested / holdingsMap[stockId].qty;
        holdingsMap[stockId].invested -= (avgPrice * tx.quantity);
        holdingsMap[stockId].qty -= tx.quantity;
        netInvestedAmount -= tx.totalAmount; 
      }
    }
  });

  // Filter active holdings
  const activeStockIds = Object.keys(holdingsMap).filter(id => holdingsMap[id].qty > 0);
  
  // 3. Fetch CURRENT Market Prices
  const currentStocks = await Stock.find({ _id: { $in: activeStockIds } })
    .select('price symbol companyName logoUrl changePercent')
    .lean();

  let totalPortfolioValue = 0;
  
  // 4. Calculate Real-Time Value
  currentStocks.forEach(stock => {
    const stockIdStr = stock._id.toString();
    const holding = holdingsMap[stockIdStr];
    if (holding && holding.qty > 0) {
      const currentValue = stock.price * holding.qty;
      totalPortfolioValue += currentValue;
    }
  });

  // 5. Prepare Watchlist Preview
  const validWatchlistStocks = watchlistEntries
    .filter(entry => entry.stock && entry.stock._id) 
    .map(entry => ({
      ...entry.stock,      
      watchlistId: entry._id 
    }));

  return {
    balance: userData?.balance || 0,
    netInvestedAmount: Math.max(0, netInvestedAmount),
    totalPortfolioValue,
    totalProfitLoss: totalPortfolioValue - netInvestedAmount,
    holdingsCount: activeStockIds.length,
    watchlistCount: validWatchlistStocks.length,
    watchlistPreview: validWatchlistStocks.slice(0, 5), 
  };
};