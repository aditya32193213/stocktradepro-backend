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


app.use(requestId);
/**
 * -----------------------------------------------------
 * Trust Proxy (for deployment behind reverse proxies)
 * -----------------------------------------------------
 */
app.set("trust proxy", 1);

app.enable('trust proxy'); // Tells express to trust X-Forwarded-* headers

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

// Security headers with proper CSP
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  })
);

// Gzip compression for better performance
app.use(compression());
app.use(requestLogger);

app.use(cors());

// Parse JSON payloads and URL-encoded data
// ✅ Use constants
const PAYLOAD_LIMIT = process.env.PAYLOAD_LIMIT || "1mb";
app.use(express.json({ limit: PAYLOAD_LIMIT }));
app.use(express.urlencoded({ extended: true, limit: PAYLOAD_LIMIT }));



app.use(mongoSanitizeMiddleware);


/**
 * -----------------------------------------------------
 * Routes
 * -----------------------------------------------------
 */

// Apply to all API routes
app.use("/api", apiLimiter);

// Root Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the StockTradePro API 🚀",
    version: "1.0.0",
    documentation: "/api-docs",
    health: "/api/v1/health",
  });
});

// Main API routes
app.use("/api/v1", v1Routes);

// Swagger API documentation

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
 */
app.use(errorHandler);

export default app;