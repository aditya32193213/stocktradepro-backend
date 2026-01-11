import express from "express";
import {
  buyStock,
  sellStock,
  getTransactions,
  exportTransactionsPDF,
  exportTransactionsCSV,
} from "../../controllers/index.js";
import { protect } from "../../middleware/index.js";
import { transactionLimiter } from "../../middleware/rateLimit.middleware.js";
import {
  buyStockValidation,
  sellStockValidation,
  getTransactionsValidation,
} from "../../validations/index.js";
import { validate } from "../../middleware/index.js";

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
 * /transactions/buy:
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
 *       201:
 *         description: Stock purchased successfully
 */
router.post("/buy", transactionLimiter, buyStockValidation, validate, buyStock);

/**
 * @swagger
 * /transactions/sell:
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
 *       201:
 *         description: Stock sold successfully
 */
router.post("/sell", transactionLimiter, sellStockValidation, validate, sellStock);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get transaction history
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *         description: Items per page
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [BUY, SELL]
 *         description: Filter by transaction type
 *       - in: query
 *         name: stockId
 *         schema:
 *           type: string
 *         description: Filter by stock ID
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Start date (ISO 8601)
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date-time
 *         description: End date (ISO 8601)
 *     responses:
 *       200:
 *         description: List of transactions
 */

router.get("/", getTransactionsValidation, validate, getTransactions);

/**
 * @swagger
 * /transactions/export/pdf:
 *   get:
 *     summary: Export transactions as PDF
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [BUY, SELL]
 *       - in: query
 *         name: stockId
 *         schema:
 *           type: string
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       200:
 *         description: PDF file
 */

router.get("/export/pdf", getTransactionsValidation, validate, exportTransactionsPDF);

/**
 * @swagger
 * /transactions/export/csv:
 *   get:
 *     summary: Export transactions as CSV
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [BUY, SELL]
 *       - in: query
 *         name: stockId
 *         schema:
 *           type: string
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       200:
 *         description: CSV file
 */

router.get("/export/csv", getTransactionsValidation, validate, exportTransactionsCSV);

export default router;