/**
 * -----------------------------------------------------
 * Environment Variables Validator
 * -----------------------------------------------------
 * Validates that all required environment variables are set
 * before the application starts.
 * 
 * Prevents runtime errors caused by missing configuration.
 */
import logger from "./logger.js";
export const validateEnv = () => {
  const required = [
    "NODE_ENV",
    "PORT",
    "MONGO_URI",
    "JWT_SECRET",
    ...(process.env.NODE_ENV === "production" ? ["BASE_URL"] : [])
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (process.env.NODE_ENV === "test" && !process.env.MONGO_URI_TEST) {
  logger.error("❌ MONGO_URI_TEST is required in test environment");
  process.exit(1);
}

  if (missing.length > 0) {
    logger.error("❌ Missing required environment variables:");
    missing.forEach((key) => logger.error(`   - ${key}`));
    process.exit(1);
  }

  // Validate JWT_SECRET strength
  if (process.env.JWT_SECRET.length < 32) {
    logger.error("❌ JWT_SECRET must be at least 32 characters long");
    process.exit(1);
  }

  logger.info("✅ Environment variables validated");
};