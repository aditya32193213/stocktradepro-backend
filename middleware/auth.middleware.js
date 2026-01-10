import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

/**
 * -----------------------------------------------------
 * Authentication Middleware (JWT Protect)
 * -----------------------------------------------------
 * Protects private routes by verifying JWT tokens.
 *
 * Flow:
 * 1. Extract token from Authorization header
 * 2. Verify token using JWT secret
 * 3. Attach authenticated user to request object
 *
 * If token is missing or invalid, request is rejected.
 */
const protect = async (req, res, next) => {
  let token;

  // Expect token in format: Authorization: Bearer <token>
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Reject request if token is not provided
  if (!token) {
    return res.status(401).json({ message: "Not authorized, token missing" });
  }

  try {
    // Verify token and decode payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    /**
     * Attach user to request object
     * Password field is excluded for security
     */
    req.user = await User.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    // Token verification failed (expired / tampered)
    res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

export default protect;
