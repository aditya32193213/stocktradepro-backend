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

      const updates = stocks.map(async (stock) => {
        // 1. Initialize previousClose if missing
        if (!stock.previousClose) {
          stock.previousClose = stock.price;
        }

        // 2. Random Movement (-0.5% to +0.5% per tick)
        const volatility = 0.005; 
        const changeFactor = 1 + (Math.random() * volatility * 2 - volatility);
        let newPrice = stock.price * changeFactor;
        
        // Ensure price stays realistic (e.g. min 0.1)
        newPrice = Math.max(0.1, parseFloat(newPrice.toFixed(2)));

        // 3. Update History (Limit to last 50 points for the graph)
        const newHistoryPoint = { price: newPrice, timestamp: new Date() };
        let history = [...stock.history, newHistoryPoint];
        if (history.length > 50) {
          history = history.slice(-50); // Keep only last 50 points
        }

        // 4. Calculate Change based on Previous Close
        const changePercent = ((newPrice - stock.previousClose) / stock.previousClose) * 100;

        // 5. Apply Updates
        stock.price = newPrice;
        stock.history = history;
        stock.changePercent = parseFloat(changePercent.toFixed(2));
        
        return stock.save();
      });

      await Promise.all(updates);
      
    } catch (error) {
      logger.warn("⚠️ Market Simulation Error:", error.message);
    }
  }, 5000); // Updates every 5 seconds
};