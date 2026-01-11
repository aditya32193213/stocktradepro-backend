import { body } from "express-validator";

/**
 * -----------------------------------------------------
 * Register Validation Rules 
 * -----------------------------------------------------
 *  Fixed password regex to allow all special characters
 *  Added trimming and sanitization
 */
export const registerValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Name must be between 2 and 100 characters"),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email required")
    .normalizeEmail(),

  body("mobile")
    .trim()
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile number must be 10 digits")
    .isNumeric()
    .withMessage("Mobile number must contain only digits"),

  body("pan")
    .trim()
    .toUpperCase()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    .withMessage("Invalid PAN format (e.g., ABCDE1234F)"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    // ✅ FIXED: Removed character restriction at the end
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/~`])/)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
];

/**
 * -----------------------------------------------------
 * Login Validation Rules
 * -----------------------------------------------------
 */
export const loginValidation = [
  body("email").trim().isEmail().withMessage("Valid email required").normalizeEmail(),
  body("password").notEmpty().withMessage("Password required"),
];