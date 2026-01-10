import express from "express";
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist
} from "../controllers/index.js";
import { protect } from "../middleware/index.js";

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
 * /api/watchlist:
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
 *     responses:
 *       201:
 *         description: Stock added to watchlist
 */
router.post("/", addToWatchlist);

/**
 * @swagger
 * /api/watchlist:
 *   get:
 *     summary: Get user watchlist
 *     tags: [Watchlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Watchlist fetched
 */
router.get("/", getWatchlist);

/**
 * @swagger
 * /api/watchlist/{id}:
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
 *     responses:
 *       200:
 *         description: Stock removed from watchlist
 */
router.delete("/:id", removeFromWatchlist);

export default router;
