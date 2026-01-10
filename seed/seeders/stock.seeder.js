/**
 * -----------------------------------------------------
 * Stock Seeder
 * -----------------------------------------------------
 * Clears existing stock data and inserts
 * freshly generated stock records.
 *
 * Safe to run multiple times.
 * Used for demo and development environments only.
 */

import Stock from "../../models/Stock.js";
import { companies } from "../data/companies.js";
import { generateStockData } from "../utils/generateStock.js";

export const seedStocks = async () => {
  // Remove existing stock documents
  await Stock.deleteMany();
  console.log("🧹 Stocks collection cleared");

  // Generate full stock objects from static company metadata
  const stocks = companies.map(generateStockData);

  // Bulk insert for better performance
  await Stock.insertMany(stocks);
  console.log(`🌱 ${stocks.length} stocks seeded successfully`);
};
