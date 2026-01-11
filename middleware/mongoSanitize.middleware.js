/**
 * -----------------------------------------------------
 * MongoDB Injection Sanitization Middleware
 * -----------------------------------------------------
 */

/**
 * Sanitizes object KEYS only (not values)
 * Removes MongoDB operators from keys to prevent injection
 */
const sanitizeKeys = (obj) => {
  if (!obj || typeof obj !== "object") return obj;

  const sanitized = {};
  
  for (const key in obj) {
    // Remove $ and . from KEYS only
    const sanitizedKey = key.replace(/^\$+/, '').replace(/\./g, '_');
    
    // Recursively sanitize nested objects
    if (typeof obj[key] === "object" && obj[key] !== null) {
      sanitized[sanitizedKey] = sanitizeKeys(obj[key]);
    } else {
      // Keep values unchanged (important for emails, etc.)
      sanitized[sanitizedKey] = obj[key];
    }
  }
  
  return sanitized;
};

/**
 * Sanitizes a single value to prevent operator injection
 * Only removes $ from the START of strings
 */
const sanitizeValue = (value) => {
  if (typeof value === "string") {
    // Only remove $ from beginning (operators like $ne, $gt)
    // Don't touch dots (needed for emails, decimals, etc.)
    return value.replace(/^\$/g, "");
  }
  return value;
};

/**
 * Express Middleware
 */
const mongoSanitizeMiddleware = (req, res, next) => {
  // Sanitize body values (but not too aggressively)
  if (req.body && typeof req.body === "object") {
    for (const key in req.body) {
      req.body[key] = sanitizeValue(req.body[key]);
    }
  }

  // Sanitize params values
  if (req.params && typeof req.params === "object") {
    for (const key in req.params) {
      req.params[key] = sanitizeValue(req.params[key]);
    }
  }

  // Create sanitized query (don't mutate original)
  if (req.query && Object.keys(req.query).length > 0) {
    const sanitizedQuery = {};
    
    for (const key in req.query) {
      sanitizedQuery[key] = sanitizeValue(req.query[key]);
    }
    
    req.sanitizedQuery = sanitizedQuery;
  }

  next();
};

export default mongoSanitizeMiddleware;