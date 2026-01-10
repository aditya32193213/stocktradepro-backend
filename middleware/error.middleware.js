import { logger } from "../utils/index.js";

/**
 * -----------------------------------------------------
 * Global Error Handling Middleware
 * -----------------------------------------------------
 * Catches all unhandled errors across the application.
 *
 * Responsibilities:
 * - Log error details using centralized logger
 * - Send a clean, consistent error response to client
 *
 * This middleware MUST be registered last in app.js.
 */
const errorHandler = (err, req, res, next) => {
  // Log error details for debugging and monitoring
  logger.error(err.message, {
    stack: err.stack,
    route: req.originalUrl,
    method: req.method,
  });

  // Send generic error response to client
  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
