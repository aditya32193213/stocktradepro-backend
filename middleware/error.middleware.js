import { logger } from "../utils/index.js";

/**
 * -----------------------------------------------------
 * Global Error Handling Middleware
 * -----------------------------------------------------
 * Catches all unhandled errors across the application.
 * 
 * Handles:
 * - Custom AppError instances
 * - Mongoose validation errors
 * - JWT errors
 * - Duplicate key errors
 * - Generic errors
 */

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Log error details for debugging
  logger.error(err.message, {
    requestID: req.id,
    stack: err.stack,
    route: req.originalUrl,
    method: req.method,
    body: process.env.NODE_ENV === "development" ? req.body : undefined,
    statusCode
  });

  // Mongoose validation error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyPattern)[0];
    message = `${field} already exists`;
  }

  // Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  // Send error response
  res.status(statusCode).json({
    status: "error",
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};

export default errorHandler;