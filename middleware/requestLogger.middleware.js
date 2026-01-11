import { logger } from "../utils/index.js";

/**
 * -----------------------------------------------------
 * Request Logger Middleware
 * -----------------------------------------------------
 * Logs all incoming HTTP requests with timing information.
 * Useful for debugging and monitoring in production.
 */

const requestLogger = (req, res, next) => {
  const start = Date.now();

  // Log request
  logger.info(`${req.method} ${req.originalUrl}`, {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get("user-agent")
  });

  // Log response on finish
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(`${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
  });

  next();
};

export default requestLogger;