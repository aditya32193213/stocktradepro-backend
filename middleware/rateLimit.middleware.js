import rateLimit from "express-rate-limit";
import { AppError } from "../utils/index.js";
import { logger } from "../utils/index.js";

const isTest = process.env.NODE_ENV === "test";

/**
 * -----------------------------------------------------
 * Authentication Rate Limiter
 * -----------------------------------------------------
 */
export const authLimiter = isTest
  ? (req, res, next) => next()
  : rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 10,
      standardHeaders: true,
      legacyHeaders: false,
      handler: (req, res) => {
        const err = new AppError(
          "Too many login attempts, please try again later",
          429
        );

        logger.warn(err.message, {
          ip: req.ip,
          route: req.originalUrl,
          method: req.method,
        });

        res.status(err.statusCode).json({
          status: "error",
          message: err.message,
        });
      },
    });

/**
 * -----------------------------------------------------
 * Transaction Rate Limiter
 * -----------------------------------------------------
 */
export const transactionLimiter = isTest
  ? (req, res, next) => next()
  : rateLimit({
      windowMs: 60 * 1000,
      max: 20,
      standardHeaders: true,
      legacyHeaders: false,
      handler: (req, res) => {
        const err = new AppError(
          "Too many transaction requests, please slow down",
          429
        );

        logger.warn(err.message, {
          ip: req.ip,
          route: req.originalUrl,
          method: req.method,
        });

        res.status(err.statusCode).json({
          status: "error",
          message: err.message,
        });
      },
    });

/**
 * -----------------------------------------------------
 * General API Rate Limiter (RESTORED)
 * -----------------------------------------------------
 */
export const apiLimiter = isTest
  ? (req, res, next) => next()
  : rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
      handler: (req, res) => {
        const err = new AppError(
          "Too many requests, please try again later",
          429
        );

        logger.warn(err.message, {
          ip: req.ip,
          route: req.originalUrl,
          method: req.method,
        });

        res.status(err.statusCode).json({
          status: "error",
          message: err.message,
        });
      },
    });

