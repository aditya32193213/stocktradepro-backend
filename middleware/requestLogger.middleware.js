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

  // Log request (structured, no duplication)
  logger.info("Incoming request", {
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });

  // Log response on finish
  res.on("finish", () => {
    const duration = Date.now() - start;

    logger.info("Request completed", {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      durationMs: duration,
    });
  });

  next();
};

export default requestLogger;
