import express from "express";
import {
  buyStock,
  sellStock,
  getTransactions,
  exportTransactionsPDF
} from "../controllers/index.js";
import { protect } from "../middleware/index.js";

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Buy, sell and view transactions
 */

/**
 * @swagger
 * /api/transactions/buy:
 *   post:
 *     summary: Buy a stock
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [stockId, quantity]
 *             properties:
 *               stockId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Stock purchased successfully
 */
router.post("/buy", buyStock);

/**
 * @swagger
 * /api/transactions/sell:
 *   post:
 *     summary: Sell a stock
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [stockId, quantity]
 *             properties:
 *               stockId:
 *                 type: string
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Stock sold successfully
 */
router.post("/sell", sellStock);

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get transaction history
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of transactions
 */
router.get("/", getTransactions);

/**
 * @swagger
 * /api/transactions/export/pdf:
 *   get:
 *     summary: Export transactions as PDF
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: PDF file
 */
router.get("/export/pdf", exportTransactionsPDF);

export default router;
