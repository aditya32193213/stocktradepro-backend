/**
 * -----------------------------------------------------
 * Winston Logger Configuration
 * -----------------------------------------------------
 *
 * Logging strategy:
 * - Console logs only (stdout/stderr)
 * - Structured JSON in production
 * - Clean, readable logs in development
 *
 * Why no file logging?
 * - Render uses ephemeral filesystem
 * - Console logs are captured automatically by Render
 */

import winston from "winston";

const isProduction = process.env.NODE_ENV === "production";

const logger = winston.createLogger({
  level: isProduction ? "info" : "debug",
  format: isProduction
    ? winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.errors({ stack: true }),
        winston.format.json()
      )
    : winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level}]: ${
            typeof message === "object"
              ? JSON.stringify(message)
              : message
          }`;
        })
      ),
  transports: [
    // Render & local-friendly console logging
    new winston.transports.Console()
  ]
});

export default logger;
