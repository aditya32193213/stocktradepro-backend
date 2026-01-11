/**
 * -----------------------------------------------------
 * Server Bootstrap 
 * -----------------------------------------------------
 * 1. Load environment variables
 * 2. Validate configuration
 * 3. Connect to MongoDB
 * 4. Start Express server
 * 5. Graceful shutdown (HTTP → DB → Exit)
 */

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app.js";
import connectDB from "./config/db.js";
import { validateEnv } from "./utils/index.js";
import { logger } from "./utils/index.js";


// Validate required environment variables
validateEnv();

const PORT = process.env.PORT || 10000;

/**
 * -----------------------------------------------------
 * Base URL (Environment Aware)
 * -----------------------------------------------------
 * - Local: http://localhost:PORT
 * - Render / Prod: use BASE_URL from env
 */
const BASE_URL =
  process.env.BASE_URL || `http://localhost:${PORT}`;

let server;

/**
 * -----------------------------------------------------
 * Start Server
 * -----------------------------------------------------
 */
const startServer = async () => {
  try {
    // 1️⃣ Connect to MongoDB first
    await connectDB();

    // 2️⃣ Start HTTP server
    server = app.listen(PORT, () => {
      logger.info("🚀 Server started successfully");
      logger.info(`🌐 Base URL: ${BASE_URL}`);
      logger.info(`📘 API Docs: ${BASE_URL}/api-docs`);
      logger.info(`❤️  Health Check: ${BASE_URL}/api/v1/health`);
    });
  } catch (error) {
    logger.error("❌ Failed to start server", error);
    process.exit(1);
  }
};

/**
 * -----------------------------------------------------
 * Graceful Shutdown
 * -----------------------------------------------------
 * Correct order:
 * 1. Stop accepting new HTTP requests
 * 2. Finish in-flight requests
 * 3. Close MongoDB connection
 * 4. Exit process
 */
const gracefulShutdown = async (signal) => {
  logger.info(`🛑 Received ${signal}. Starting graceful shutdown...`);

  // ⏱️ Force shutdown safety net (ONLY during shutdown)
  const forceShutdownTimer = setTimeout(() => {
    logger.error("⚠️ Force shutdown after timeout");
    process.exit(1);
  }, 10000);

  try {
    // 1️⃣ Stop accepting new HTTP connections
    if (server) {
      await new Promise((resolve) => {
        server.close(() => {
          logger.info("✅ HTTP server closed");
          resolve();
        });
      });
    }

    // 2️⃣ Close MongoDB connection
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close(false);
      logger.info("✅ MongoDB connection closed");
    }

    clearTimeout(forceShutdownTimer);
    process.exit(0);
  } catch (error) {
    logger.error("❌ Error during graceful shutdown", error);
    process.exit(1);
  }
};



/**
 * -----------------------------------------------------
 * Process Event Handlers
 * -----------------------------------------------------
 */

// Graceful shutdown signals (Render, Docker, Linux)
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Crash immediately on uncaught exception
process.on("uncaughtException", (error) => {
  logger.error("💥 UNCAUGHT EXCEPTION! Shutting down immediately...");
  logger.error(error.stack);
  process.exit(1);
});

// Crash immediately on unhandled promise rejection
process.on("unhandledRejection", (reason) => {
  logger.error("💥 UNHANDLED PROMISE REJECTION! Shutting down...");
  logger.error(reason);
  process.exit(1);
});

/**
 * -----------------------------------------------------
 * Bootstrap Application
 * -----------------------------------------------------
 */
startServer();
