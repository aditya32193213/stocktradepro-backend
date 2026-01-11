import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import { AppError } from "../utils/index.js";

/**
 * -----------------------------------------------------
 * Authentication Middleware
 * -----------------------------------------------------
 */
const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new AppError(
        "Authentication required. Please provide a valid token.",
        401
      );
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new AppError(
        "The user associated with this token no longer exists.",
        401
      );
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof AppError) {
    next(error);
  } else if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
    next(error); // Let error handler deal with it
  } else {
    next(new AppError('Authentication failed', 401));
  }
  }
};

export default protect;
