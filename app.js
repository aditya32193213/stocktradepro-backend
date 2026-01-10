import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import apiRoutes from "./routes/index.js";
import swaggerSpec from "./config/swagger.js";
import { errorHandler } from "./middleware/index.js";

const app = express();

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

// Adds security-related HTTP headers
app.use(helmet());

// Enables gzip compression for better performance
app.use(compression());

// Allows cross-origin requests (frontend-backend communication)
app.use(cors());

// Parses incoming JSON payloads
app.use(express.json());

// Logs HTTP requests (useful in development & debugging)
app.use(morgan("dev"));

/**
 * -----------------------------------------------------
 * Routes
 * -----------------------------------------------------
 */

// Main API routes
app.use("/api", apiRoutes);

// Swagger API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the StockTradePro API 🚀");
});

/**
 * -----------------------------------------------------
 * Global Error Handler
 * -----------------------------------------------------
 * Must be the LAST middleware
 */
app.use(errorHandler);

export default app;
