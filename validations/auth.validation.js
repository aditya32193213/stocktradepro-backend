import { body } from "express-validator";

/**
 * -----------------------------------------------------
 * Register Validation Rules
 * -----------------------------------------------------
 * Used before user registration controller
 */
export const registerValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email required"),
  body("mobile")
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile number must be 10 digits"),
  body("pan")
    .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/)
    .withMessage("Invalid PAN format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters")
];

/**
 * -----------------------------------------------------
 * Login Validation Rules
 * -----------------------------------------------------
 */
export const loginValidation = [
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty().withMessage("Password required")
];