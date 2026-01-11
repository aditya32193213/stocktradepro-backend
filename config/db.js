import mongoose from "mongoose";
import { logger } from "../utils/index.js";

/**
 * -----------------------------------------------------
 * MongoDB Connection Utility
 * -----------------------------------------------------
 * Establishes a connection to MongoDB using Mongoose.
 *
 * - Uses connection string from environment variables
 * - Application startup is blocked until DB is connected
 * - Process exits immediately if connection fails
 *
 * This ensures the server never runs in a broken state.
 */
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    // Log successful connection host
    logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log error and terminate process on failure
    logger.error("❌ MongoDB Connection Error",{
      message: error.message,
      stack: error.stack,
    });
    process.exit(1);
  }
};

export default connectDB;
