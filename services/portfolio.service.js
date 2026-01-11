import { Transaction } from "../models/index.js";
import mongoose from "mongoose";
import { AppError } from "../utils/index.js";
import { logger } from "../utils/index.js";
/**
 * -----------------------------------------------------
 * Portfolio Service 
 * -----------------------------------------------------
 *  Profit/Loss calculation
 *  Proper average buy price calculation
 *  Uses aggregation for better performance
 *  Tracks realized and unrealized P&L separately
 */

/**
 * Get user's current portfolio with live stock prices
 */
export const getPortfolioService = async (userId) => {
     try {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError("Invalid user ID", 400);
  }

  // Use aggregation pipeline for better performance
  const holdings = await Transaction.aggregate([
    // Match user transactions
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
      },
    },

    // Lookup stock details
    {
      $lookup: {
        from: "stocks",
        localField: "stock",
        foreignField: "_id",
        as: "stockDetails",
      },
    },

    // Unwind stock details
    {
      $unwind: "$stockDetails",
    },

    // Group by stock
    {
      $group: {
        _id: "$stock",
        stock: { $first: "$stockDetails" },
        transactions: {
          $push: {
            type: "$type",
            quantity: "$quantity",
            price: "$price",
            totalAmount: "$totalAmount",
          },
        },
      },
    },
  ]);

  // Calculate holdings metrics
  const processedHoldings = holdings
    .map((holding) => {
      let currentQuantity = 0;
      let totalBuyAmount = 0;
      let totalBuyQuantity = 0;
      let totalSellAmount = 0;
      let totalSellQuantity = 0;

      // Process all transactions
      holding.transactions.forEach((tx) => {
        if (tx.type === "BUY") {
          currentQuantity += tx.quantity;
          totalBuyAmount += tx.totalAmount;
          totalBuyQuantity += tx.quantity;
        } else {
          currentQuantity -= tx.quantity;
          totalSellAmount += tx.totalAmount;
          totalSellQuantity += tx.quantity;
        }
      });

      // Skip if no current holdings
      if (currentQuantity <= 0) {
        return null;
      }

      //  Calculate average buy price (only from buy transactions)
      const avgBuyPrice =
        totalBuyQuantity > 0 ? totalBuyAmount / totalBuyQuantity : 0;

      // Calculate current value
      const currentValue = holding.stock.price * currentQuantity;

      // Calculate investment for current holdings
      // This is the proportional cost basis for shares still held
      const currentInvestment = avgBuyPrice * currentQuantity;

      // Calculate unrealized P&L (on shares still held)
      const unrealizedPnL = currentValue - currentInvestment;
      const unrealizedPnLPercent =
        currentInvestment > 0 ? (unrealizedPnL / currentInvestment) * 100 : 0;

      // Calculate realized P&L (from sold shares)
      // Realized P&L = Sale proceeds - Cost basis of sold shares
      const realizedPnL = totalSellAmount - avgBuyPrice * totalSellQuantity;

      // Total P&L = Unrealized + Realized
      const totalPnL = unrealizedPnL + realizedPnL;

      return {
        stock: {
          _id: holding.stock._id,
          symbol: holding.stock.symbol,
          companyName: holding.stock.companyName,
          logoUrl: holding.stock.logoUrl,
          currentPrice: holding.stock.price,
        },
        quantity: currentQuantity,
        avgBuyPrice: Number(avgBuyPrice.toFixed(2)),
        currentValue: Number(currentValue.toFixed(2)),
        currentInvestment: Number(currentInvestment.toFixed(2)),
        unrealizedPnL: Number(unrealizedPnL.toFixed(2)),
        unrealizedPnLPercent: Number(unrealizedPnLPercent.toFixed(2)),
        realizedPnL: Number(realizedPnL.toFixed(2)),
        totalPnL: Number(totalPnL.toFixed(2)),
      };
    })
    .filter((h) => h !== null); // Remove stocks with zero quantity

  // Calculate portfolio summary
  const summary = processedHoldings.reduce(
    (acc, holding) => ({
      totalHoldings: acc.totalHoldings + 1,
      totalInvested: acc.totalInvested + holding.currentInvestment,
      totalCurrentValue: acc.totalCurrentValue + holding.currentValue,
      totalUnrealizedPnL: acc.totalUnrealizedPnL + holding.unrealizedPnL,
      totalRealizedPnL: acc.totalRealizedPnL + holding.realizedPnL,
    }),
    {
      totalHoldings: 0,
      totalInvested: 0,
      totalCurrentValue: 0,
      totalUnrealizedPnL: 0,
      totalRealizedPnL: 0,
    }
  );

  summary.totalPnL = summary.totalUnrealizedPnL + summary.totalRealizedPnL;
  summary.totalPnLPercent =
    summary.totalInvested > 0
      ? Number(((summary.totalPnL / summary.totalInvested) * 100).toFixed(2))
      : 0;

  // Round all summary values
  Object.keys(summary).forEach((key) => {
    if (typeof summary[key] === "number" && key !== "totalHoldings") {
      summary[key] = Number(summary[key].toFixed(2));
    }
  });

  return {
    holdings: processedHoldings,
    summary,
  };
   } catch (error) {
    logger.error('Portfolio aggregation failed:', error);
    throw new AppError('Failed to fetch portfolio', 500);
  }
};