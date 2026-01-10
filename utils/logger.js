/**
 * -----------------------------------------------------
 * Winston Logger
 * -----------------------------------------------------
 * Used for centralized error logging
 * Can be extended to file or cloud logging
 */

import winston from "winston";

const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console()
  ]
});

export default logger;
