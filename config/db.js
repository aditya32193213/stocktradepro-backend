import mongoose from "mongoose";

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
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Log successful connection host
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log error and terminate process on failure
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
