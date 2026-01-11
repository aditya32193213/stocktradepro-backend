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
  if (!obj || typeof obj !== "object") return;

  for (const key in obj) {
    obj[key] = sanitize(obj[key]);

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
  // Safe to mutate
  sanitizeObject(req.body);
  sanitizeObject(req.params);

  // ❌ DO NOT TOUCH req.query
  // ✅ Create a new sanitized copy
  if (req.query && Object.keys(req.query).length > 0) {
    const sanitizedQuery = {};

    for (const key in req.query) {
      sanitizedQuery[key] = sanitize(req.query[key]);

      if (typeof req.query[key] === "object") {
        sanitizeObject(sanitizedQuery[key]);
      }
    }

    // Attach safely
    req.sanitizedQuery = sanitizedQuery;
  }

  next();
};

export default mongoSanitizeMiddleware;