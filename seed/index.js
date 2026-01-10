import mongoose from "mongoose";
import dotenv from "dotenv";
import { seedStocks } from "./seeders/stock.seeder.js";

/**
 * -----------------------------------------------------
 * Seeder Entry Point
 * -----------------------------------------------------
 * Responsible for:
 * 1. Connecting to MongoDB
 * 2. Running all seeders
 * 3. Gracefully closing the connection
 *
 * Intended for development & demo environments only.
 */

dotenv.config();

const runSeeders = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected for seeding");

    await seedStocks();

    console.log("🎉 Seeding completed");

    // ✅ Gracefully close DB connection
    await mongoose.disconnect();
    console.log("🔌 MongoDB connection closed");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed", error);

    // Ensure DB disconnect even on error
    await mongoose.disconnect();

    process.exit(1);
  }
};

runSeeders();
