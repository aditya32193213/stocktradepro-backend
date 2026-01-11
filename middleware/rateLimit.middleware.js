import rateLimit from "express-rate-limit";

const isTest = process.env.NODE_ENV === "test";

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
export const authLimiter = isTest
  ? (req, res, next) => next()
  : rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 10,
      message: "Too many login attempts, please try again later",
      standardHeaders: true,
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
export const transactionLimiter = isTest
  ? (req, res, next) => next()
  : rateLimit({
      windowMs: 60 * 1000,
      max: 20,
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
export const apiLimiter = isTest
  ? (req, res, next) => next()
  : rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: "Too many requests, please try again later",
      standardHeaders: true,
      legacyHeaders: false,
    });
