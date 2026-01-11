
/**
 * -----------------------------------------------------
 * Generate JWT Token
 * -----------------------------------------------------
 * @param {string} userId - MongoDB User ID
 * @returns {string} JWT token
 */

import jwt from "jsonwebtoken";

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "24h"
  });
};

export default generateToken;
