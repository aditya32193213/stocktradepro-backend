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
export { authLimiter } from "./rateLimit.middleware.js";