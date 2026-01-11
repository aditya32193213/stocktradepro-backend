import express from "express";
import authRoutes from "./auth.routes.js";
import stockRoutes from "./stock.routes.js";
import transactionRoutes from "./transaction.routes.js";
import watchlistRoutes from "./watchlist.routes.js";
import healthRoutes from "./health.routes.js";
import dashboardRoutes from "./dashboard.routes.js";
import portfolioRoutes from "./portfolio.routes.js";

const router = express.Router();

/**
 * -----------------------------------------------------
 * API Route Aggregator
 * -----------------------------------------------------
 * Centralizes all route modules.
 */

router.use("/auth", authRoutes);
router.use("/stocks", stockRoutes);
router.use("/transactions", transactionRoutes);
router.use("/watchlist", watchlistRoutes);
router.use("/health", healthRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/portfolio", portfolioRoutes);

export default router;
