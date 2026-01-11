import { randomUUID } from "crypto";

/**
 * -----------------------------------------------------
 * Request ID Middleware
 * -----------------------------------------------------
 * Generates a unique ID for each request to enable
 * request tracing across logs and error reports.
 * 
 * The ID is:
 * - Added to response headers
 * - Attached to req.id for use in controllers/services
 * - Included in error logs
 */
const requestId = (req, res, next) => {
  // Generate unique request ID
  const id = req.headers['x-request-id'] || randomUUID();
  
  // Attach to request object
  req.id = id;
  
  // Add to response headers for client-side tracing
  res.setHeader("X-Request-ID", id);
  
  next();
};

export default requestId;