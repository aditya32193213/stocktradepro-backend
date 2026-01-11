/**
 * -----------------------------------------------------
 * Custom Application Error Class
 * -----------------------------------------------------
 * Extends the native Error class with additional properties
 * for better error handling and response formatting.
 * 
 * Usage:
 * throw new AppError("User not found", 404);
 */

class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;