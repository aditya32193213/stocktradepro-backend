import {
  registerUserService,
  loginUserService,
  getUserProfileService,
  updateUserProfileService
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

/**
 * -----------------------------------------------------
 * Get User Profile Controller
 * -----------------------------------------------------
 */
export const getUserProfile = async (req, res, next) => {
  try {
    const profile = await getUserProfileService(req.user._id);
    res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

/**
 * -----------------------------------------------------
 * Update User Profile Controller
 * -----------------------------------------------------
 */
export const updateUserProfile = async (req, res, next) => {
  try {
    const updatedProfile = await updateUserProfileService(
      req.user._id,
      req.body
    );
    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedProfile
    });
  } catch (error) {
    next(error);
  }
};




