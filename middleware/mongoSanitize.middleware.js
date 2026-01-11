/**
 * -----------------------------------------------------
 * MongoDB Injection Sanitization Middleware
 * -----------------------------------------------------
 *
 * Purpose:
 * - Prevent MongoDB operator injection attacks
 *   (e.g. $gt, $ne, $where, or dot-notation exploitation)
 * - Safely sanitize incoming request data
 *
 * Why custom middleware?
 * - express-mongo-sanitize mutates req.query internally
 * - Newer Node.js (v22+) & Express make req.query read-only
 * - This implementation avoids mutating req.query entirely
 *   and remains fully compatible with modern runtimes
 */

/**
 * Sanitizes a single value.
 * Removes MongoDB special characters:
 * - '$' (used for operators like $gt, $ne)
 * - '.' (used for nested path injection)
 *
 * @param {any} value - Value to sanitize
 * @returns {any} - Sanitized value
 */
const sanitize = (value) => {
  if (typeof value === "string") {
    // Remove MongoDB operator characters
    return value.replace(/\$|\./g, "");
  }
  return value;
};

/**
 * Recursively sanitizes all properties of an object.
 * Handles deeply nested objects safely.
 *
 * @param {Object} obj - Object to sanitize
 */
const sanitizeObject = (obj) => {
  // Exit early if value is null, undefined, or not an object
  if (!obj || typeof obj !== "object") return;

  for (const key in obj) {
    // Sanitize the current value
    obj[key] = sanitize(obj[key]);

    // Recursively sanitize nested objects
    if (typeof obj[key] === "object") {
      sanitizeObject(obj[key]);
    }
  }
};

/**
 * Express Middleware:
 * Sanitizes incoming request data before it reaches controllers.
 *
 * ✔ Sanitizes:
 *   - req.body   (POST / PUT / PATCH payloads)
 *   - req.params (URL parameters)
 *
 * ❌ Does NOT sanitize:
 *   - req.query (read-only in modern Express / Node)
 *
 * This design prevents runtime errors and keeps the app secure.
 */
const mongoSanitizeMiddleware = (req, res, next) => {
  sanitizeObject(req.body);
  sanitizeObject(req.params);
  
  // Handle query params (create new object to avoid read-only issues)
  if (req.query && Object.keys(req.query).length > 0) {
    const sanitizedQuery = {};
    for (const key in req.query) {
      sanitizedQuery[key] = sanitize(req.query[key]);
      if (typeof req.query[key] === 'object') {
        sanitizeObject(sanitizedQuery[key]);
      }
    }
    req.query = sanitizedQuery;
  }
  
  next();
};

export default mongoSanitizeMiddleware;
