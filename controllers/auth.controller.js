import { validationResult } from "express-validator";
import {
  registerUserService,
  loginUserService
} from "../services/index.js";

/**
 * -----------------------------------------------------
 * Register User Controller
 * -----------------------------------------------------
 */
export const registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    await registerUserService(req.body);

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    next(error);
  }
};

/**
 * -----------------------------------------------------
 * Login User Controller
 * -----------------------------------------------------
 */
export const loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const response = await loginUserService(
      req.body.email,
      req.body.password
    );

    res.json(response);
  } catch (error) {
    next(error);
  }
};
