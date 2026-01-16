/**
 * ============================================================================
 * StockTradePro API - Main Application Configuration
 * ============================================================================
 * 
 * @file        app.js
 * @description Express application setup with security, middleware, and routing
 * @version     1.0.0
 * @author      StockTradePro Team
 * @created     2026
 * 
 * @features
 * - Security hardening with Helmet
 * - CORS configuration (strict in production)
 * - Request rate limiting
 * - MongoDB injection protection
 * - Gzip compression
 * - Request logging and tracking
 * - API documentation with Swagger
 * - Centralized error handling
 * 
 * ============================================================================
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import v1Routes from "./routes/v1/index.js";
import swaggerSpec from "./config/swagger.js";
import { errorHandler, apiLimiter, mongoSanitizeMiddleware, requestId } from "./middleware/index.js";
import { logger } from "./utils/index.js";
import { requestLogger } from "./middleware/index.js";

const app = express();
const isProd = process.env.NODE_ENV === "production";

/**
 * -----------------------------------------------------
 * Trust Proxy (for deployment behind reverse proxies)
 * -----------------------------------------------------
 */
app.set("trust proxy", 1);

/**
 * -----------------------------------------------------
 * Request ID Middleware
 * -----------------------------------------------------
 * Generates unique ID for each request for tracking
 */
app.use(requestId);

/**
 * -----------------------------------------------------
 * Global Middleware
 * -----------------------------------------------------
 * Order matters:
 * 1. Security
 * 2. Performance
 * 3. Parsing
 * 4. Logging
 */

/**
 * Security headers with proper CSP
 * - Content Security Policy enabled in production
 * - Prevents XSS, clickjacking, and other attacks
 */
app.use(
  helmet({
    contentSecurityPolicy: isProd
      ? {
          directives: {
            defaultSrc: ["'self'"],
            connectSrc: ["'self'", process.env.FRONTEND_URL],
            imgSrc: ["'self'", "data:", "https:"],
          },
        }
      : false,
  })
);

/**
 * CORS Configuration
 * - Production: Strict - Only allows configured frontend URL
 * - Development: Permissive - Allows all origins for easier testing
 */
const corsOptions = isProd
  ? {
      origin: function (origin, callback) {
        const allowedOrigins = [process.env.FRONTEND_URL];
        
        // Allow requests with no origin (like mobile apps or Postman)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
      optionsSuccessStatus: 200,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Request-ID"],
    }
  : {
      origin: "*", // Allow all origins in development
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization", "X-Request-ID"],
    };

app.use(cors(corsOptions));

/**
 * Gzip compression for better performance
 * - Reduces response payload size
 * - Improves API response times
 */
app.use(compression());

/**
 * Request logging middleware
 * - Logs all incoming requests
 * - Tracks response times and status codes
 */
app.use(requestLogger);

/**
 * Body parsing middleware
 * - Handles JSON and URL-encoded payloads
 * - Configurable payload size limit
 */
const PAYLOAD_LIMIT = process.env.PAYLOAD_LIMIT || "1mb";
app.use(express.json({ limit: PAYLOAD_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: PAYLOAD_LIMIT }));

/**
 * MongoDB injection protection
 * - Sanitizes user inputs to prevent NoSQL injection
 */
app.use(mongoSanitizeMiddleware);

/**
 * -----------------------------------------------------
 * Routes
 * -----------------------------------------------------
 */

/**
 * Rate limiting for all API routes
 * - Prevents abuse and DDoS attacks
 */
app.use("/api", apiLimiter);

/**
 * Root Route
 * - API welcome message and navigation links
 */
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the StockTradePro API 🚀",
    version: "1.0.0",
    documentation: "/api-docs",
    health: "/api/v1/health",
  });
});

/**
 * Main API routes (v1)
 * - All business logic routes
 */
app.use("/api/v1", v1Routes);

/**
 * Swagger API documentation
 * - Interactive API documentation
 * - Available at /api-docs
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
logger.info("📘 Swagger Docs enabled at /api-docs");

/**
 * -----------------------------------------------------
 * 404 Handler (undefined routes)
 * -----------------------------------------------------
 */
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: `Route ${req.originalUrl} not found`,
  });
});

/**
 * -----------------------------------------------------
 * Global Error Handler
 * -----------------------------------------------------
 * - Catches all errors from routes and middleware
 * - Returns consistent error responses
 */
app.use(errorHandler);

export default app;