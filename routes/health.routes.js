import express from "express";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Server health and uptime monitoring
 */

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     description: >
 *       Returns server uptime and current timestamp.
 *       Used for monitoring, load balancers, and deployment health checks.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is healthy and running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 uptime:
 *                   type: number
 *                   description: Server uptime in seconds
 *                   example: 4523.34
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-01-09T10:15:30.123Z"
 */
router.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default router;
