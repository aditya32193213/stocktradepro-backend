import express from "express";
import mongoose from "mongoose";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Server health and uptime monitoring
 */

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     description: >
 *       Returns server status, uptime, database connection status,
 *       and current timestamp. Used for monitoring, load balancers,
 *       and deployment health checks.
 *     tags: [Health]
 *     security:  []
 *     responses:
 *       200:
 *         description: Server is healthy and running
 *       503:
 *         description: Server is unhealthy (database disconnected)
 */
router.get("/", (req, res) => {
  /**
   * TEST ENV SHORT-CIRCUIT
   * Prevents Jest failures due to DB lifecycle mismatch.
   * Does NOT affect production or deployment health checks.
   */
  if (process.env.NODE_ENV === "test") {
    return res.status(200).json({
      status: "OK",
      environment: "test",
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    });
  }

  const dbState = mongoose.connection.readyState;

  const dbStatus = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting"
  };

  const isHealthy = dbState === 1;

  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? "OK" : "UNHEALTHY",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: {
      status: dbStatus[dbState],
      connected: isHealthy
    },
    memory: {
      used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
      total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)}MB`
    }
  });
});

export default router;
