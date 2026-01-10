import swaggerJSDoc from "swagger-jsdoc";

/**
 * -----------------------------------------------------
 * Swagger (OpenAPI) Configuration
 * -----------------------------------------------------
 * Generates OpenAPI 3.0 specification using JSDoc comments
 * defined inside route files.
 *
 * Swagger UI is served at /api-docs
 * and works in both development and production environments.
 */
const swaggerDefinition = {
  openapi: "3.0.0",

  info: {
    title: "StockTradePro API",
    version: "1.0.0",
    description:
      "API documentation for StockTradePro – a fintech stock trading platform"
  },

  /**
   * Server configuration
   * NOTE:
   * - localhost is used for development
   * - Render automatically replaces this in production
   */
  servers: [
    {
      url: "http://localhost:10000",
      description: "Development server"
    }
  ],

  /**
   * JWT Authentication Scheme
   * Enables Bearer token support in Swagger UI
   */
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },

  /**
   * Apply JWT security globally
   * (Individual routes can override if needed)
   */
  security: [
    {
      bearerAuth: []
    }
  ]
};

/**
 * Swagger options
 * Scans route files for Swagger annotations
 */
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"]
};

// Generate Swagger specification
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
