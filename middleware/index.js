/**
 * -----------------------------------------------------
 * Middleware Index
 * -----------------------------------------------------
 * Central export for all application middleware.
 *
 * This pattern improves maintainability and
 * keeps imports clean across the project.
 */

export { default as protect } from "./auth.middleware.js";
export { default as errorHandler } from "./error.middleware.js";
export { apiLimiter, transactionLimiter, authLimiter } from "./rateLimit.middleware.js";
export { default as requestLogger } from "./requestLogger.middleware.js";
export { default as validate } from "./validate.middleware.js";
export { default as requestId } from "./requestId.middleware.js";
export { default as mongoSanitizeMiddleware } from "./mongoSanitize.middleware.js";