import { Stock } from "../models/index.js";
import logger from "./logger.js";

/**
 * -----------------------------------------------------
 * Market Simulator (Real-Time Graph Data)
 * -----------------------------------------------------
 */
export const startMarketSimulation = () => {
  logger.info("📈 Market Simulation Started: Prices will fluctuate every 5 seconds.");

  setInterval(async () => {
    try {
      const stocks = await Stock.find({});

      // ✅ Guard: no stocks found
      if (!stocks || stocks.length === 0) {
        logger.warn("⚠️ Market Simulation Skipped: No stocks found");
        return;
      }

      const updates = stocks.map(async (stock) => {
        // ✅ Guard: missing document safety
        if (!stock || !stock.price) return;

        // 1. Initialize previousClose if missing
        if (!stock.previousClose) {
          stock.previousClose = stock.price;
        }

        // 2. Random Movement (-0.5% to +0.5% per tick)
        const volatility = 0.005;
        const changeFactor = 1 + (Math.random() * volatility * 2 - volatility);
        let newPrice = stock.price * changeFactor;

        // Ensure price stays realistic
        newPrice = Math.max(0.1, parseFloat(newPrice.toFixed(2)));

        // 3. Update History (safe fallback)
        const newHistoryPoint = { price: newPrice, timestamp: new Date() };
        const historyArray = Array.isArray(stock.history) ? stock.history : [];
        let history = [...historyArray, newHistoryPoint];

        if (history.length > 50) {
          history = history.slice(-50);
        }

        // 4. Calculate Change based on Previous Close
        const changePercent =
          ((newPrice - stock.previousClose) / stock.previousClose) * 100;

        // 5. Apply Updates
        stock.price = newPrice;
        stock.history = history;
        stock.changePercent = parseFloat(changePercent.toFixed(2));

        return stock.save();
      });

      await Promise.all(updates);
    } catch (error) {
      // ✅ Prevent Render log spam & crashes
      logger.warn("⚠️ Market Simulation Error:", error.message);
    }
  }, 5000);
};
