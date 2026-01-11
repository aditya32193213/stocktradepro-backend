import express from "express";
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist
} from "../../controllers/index.js";
import { protect, validate } from "../../middleware/index.js"; // ✅ ADDED validate
import { 
  addToWatchlistValidation,
  getWatchlistValidation,  // ✅ ADDED
  removeFromWatchlistValidation 
} from "../../validations/index.js";

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * tags:
 *   name: Watchlist
 *   description: Manage user watchlist
 */

/**
 * @swagger
 * /watchlist:
 *   post:
 *     summary: Add stock to watchlist
 *     tags: [Watchlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required: [stockId]
 *             properties:
 *               stockId:
 *                 type: string
 *                 description: MongoDB ObjectId of the stock
 *                 example: 507f1f77bcf86cd799439011
 *     responses:
 *       201:
 *         description: Stock added to watchlist
 *       400:
 *         description: Invalid stock ID format
 *       404:
 *         description: Stock not found
 *       409:
 *         description: Stock already in watchlist
 */
// ✅ FIXED: Added validation
router.post("/", addToWatchlistValidation, validate, addToWatchlist);

/**
 * @swagger
 * /watchlist:
 *   get:
 *     summary: Get user watchlist
 *     tags: [Watchlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 50
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Watchlist fetched
 */
// ✅ FIXED: Added validation for query parameters
router.get("/", getWatchlistValidation, validate, getWatchlist);

/**
 * @swagger
 * /watchlist/{id}:
 *   delete:
 *     summary: Remove stock from watchlist
 *     tags: [Watchlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Watchlist item ID (MongoDB ObjectId)
 *         example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Stock removed from watchlist
 *       400:
 *         description: Invalid watchlist ID format
 *       404:
 *         description: Watchlist item not found
 */
// ✅ FIXED: Added validation
router.delete("/:id", removeFromWatchlistValidation, validate, removeFromWatchlist);

export default router;