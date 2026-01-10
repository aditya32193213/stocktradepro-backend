import express from "express";
import { getAllStocks, getStockById } from "../controllers/index.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Stocks
 *   description: Stock listing and details
 */

/**
 * @swagger
 * /api/stocks:
 *   get:
 *     summary: Get all stocks
 *     tags: [Stocks]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search by company name or symbol
 *       - in: query
 *         name: sector
 *         schema:
 *           type: string
 *         description: Filter by sector
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [symbol, companyName, marketCap]
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *     responses:
 *       200:
 *         description: Paginated list of stocks
 */
router.get("/", getAllStocks);

/**
 * @swagger
 * /api/stocks/{id}:
 *   get:
 *     summary: Get stock by ID
 *     tags: [Stocks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Stock details
 *       404:
 *         description: Stock not found
 */
router.get("/:id", getStockById);

export default router;
