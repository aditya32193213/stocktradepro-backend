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
  message: "Too many attempts, please try again later",
});
