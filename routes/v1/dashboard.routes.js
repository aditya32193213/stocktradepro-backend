import express from "express";
import { getDashboardSummary } from "../../controllers/index.js";
import { protect } from "../../middleware/index.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: User dashboard summary
 */

/**
 * @swagger
 * /dashboard/summary:
 *   get:
 *     summary: Get user dashboard summary
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard summary data
 */
router.get("/summary", protect, getDashboardSummary);

export default router;
