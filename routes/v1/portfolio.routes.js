import express from "express";
import { getPortfolio } from "../../controllers/index.js";
import { protect } from "../../middleware/index.js";

const router = express.Router();

// All portfolio routes require authentication
router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Portfolio
 *   description: User portfolio management and holdings
 */

/**
 * @swagger
 * /portfolio:
 *   get:
 *     summary: Get user's portfolio holdings
 *     description: >
 *       Returns detailed portfolio information including:
 *       - Current stock holdings with quantities
 *       - Average buy price per stock
 *       - Current market value of each holding
 *       - Profit/loss (absolute and percentage)
 *       - Overall portfolio summary with total returns
 *     tags: [Portfolio]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Portfolio retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 holdings:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       stock:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           symbol:
 *                             type: string
 *                             example: AAPL
 *                           companyName:
 *                             type: string
 *                             example: Apple Inc.
 *                           logoUrl:
 *                             type: string
 *                           currentPrice:
 *                             type: number
 *                             example: 175.50
 *                       quantity:
 *                         type: number
 *                         example: 10
 *                       avgBuyPrice:
 *                         type: number
 *                         example: 150.00
 *                       currentValue:
 *                         type: number
 *                         example: 1755.00
 *                       totalInvested:
 *                         type: number
 *                         example: 1500.00
 *                       totalPnL:
 *                         type: number
 *                         example: 255.00
 *                       totalPnLPercent:
 *                         type: number
 *                         example: 17.00
 *                 summary:
 *                   type: object
 *                   properties:
 *                     totalHoldings:
 *                       type: number
 *                       example: 5
 *                     totalInvested:
 *                       type: number
 *                       example: 50000.00
 *                     totalCurrentValue:
 *                       type: number
 *                       example: 55000.00
 *                     totalPnL:
 *                       type: number
 *                       example: 5000.00
 *                     totalPnLPercent:
 *                       type: number
 *                       example: 10.00
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       500:
 *         description: Server error
 */
router.get("/", getPortfolio);

export default router;