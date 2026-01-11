import rateLimit from "express-rate-limit";

/**
 * -----------------------------------------------------
 * Authentication Rate Limiter
 * -----------------------------------------------------
 * Protects authentication endpoints from brute-force attacks.
 *
 * Configuration:
 * - Time window: 15 minutes
 * - Max attempts: 10 per IP
 *
 * Applied only on sensitive routes like login.
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per window
  message: "Too many login attempts, please try again later",
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false,
});

/**
 * -----------------------------------------------------
 * Transaction Rate Limiter
 * -----------------------------------------------------
 * Prevents abuse of buy/sell endpoints.
 *
 * Configuration:
 * - Time window: 1 minute
 * - Max attempts: 20 per IP
 */
export const transactionLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // limit each IP to 20 requests per window
  message: "Too many transaction requests, please slow down",
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * -----------------------------------------------------
 * General API Rate Limiter
 * -----------------------------------------------------
 * Applied to all API routes as a baseline.
 *
 * Configuration:
 * - Time window: 15 minutes
 * - Max attempts: 100 per IP
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: "Too many requests, please try again later",
  standardHeaders: true,
  legacyHeaders: false,
});