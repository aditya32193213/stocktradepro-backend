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
    const response = await loginUserService(
      req.body.email,
      req.body.password
    );

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
