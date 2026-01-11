import express from "express";
import { getAllStocks, getStockById } from "../../controllers/index.js";
import { validate } from "../../middleware/index.js";   
import { getStocksValidation, getStockByIdValidation } from "../../validations/index.js";
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Stocks
 *   description: Stock listing and details
 */

/**
 * @swagger
 * /stocks:
 *   get:
 *     summary: Get all stocks
 *     tags: [Stocks]
 *     security:  []
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
router.get("/", getStocksValidation, validate, getAllStocks);

/**
 * @swagger
 * /stocks/{id}:
 *   get:
 *     summary: Get stock by ID
 *     tags: [Stocks]
 *     security:  []
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
router.get("/:id", getStockByIdValidation, validate, getStockById);

export default router;
