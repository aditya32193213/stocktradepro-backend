import bcrypt from "bcryptjs";
import { User } from "../models/index.js";
import { generateToken, AppError } from "../utils/index.js";

/**
 * -----------------------------------------------------
 * Register User Service
 * -----------------------------------------------------
 */
export const registerUserService = async (payload) => {
  const { name, email, mobile, pan, password } = payload;

  // Single DB call to check uniqueness
  const existingUser = await User.findOne({
    $or: [{ email }, { pan }],
  }).lean();

  if (existingUser) {
    if (existingUser.email === email) {
      throw new AppError("Email already registered", 409);
    }
    if (existingUser.pan === pan) {
      throw new AppError("PAN already registered", 409);
    }
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    name,
    email,
    mobile,
    pan,
    password: hashedPassword,
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };
};

/**
 * -----------------------------------------------------
 * Login User Service
 * -----------------------------------------------------
 */
export const loginUserService = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  return {
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      balance: user.balance,
    },
  };
};

/**
 * -----------------------------------------------------
 * Get User Profile Service
 * -----------------------------------------------------
 */
export const getUserProfileService = async (userId) => {
  const user = await User.findById(userId).lean();

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    pan: user.pan,
    balance: user.balance,
    createdAt: user.createdAt,
  };
};

/**
 * -----------------------------------------------------
 * Update User Profile Service
 * -----------------------------------------------------
 */
export const updateUserProfileService = async (userId, updates) => {
  const { name, mobile } = updates;

  // Only allow updating name and mobile
  const allowedUpdates = {};
  if (name) allowedUpdates.name = name;
  if (mobile) allowedUpdates.mobile = mobile;

  const user = await User.findByIdAndUpdate(
    userId,
    allowedUpdates,
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    mobile: user.mobile,
    pan: user.pan,
    balance: user.balance,
  };
};