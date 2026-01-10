import bcrypt from "bcryptjs";
import { User } from "../models/index.js";
import { generateToken } from "../utils/index.js";

/**
 * -----------------------------------------------------
 * Auth Service
 * -----------------------------------------------------
 * Handles user registration and login business logic.
 */

export const registerUserService = async (payload) => {
  const { name, email, mobile, pan, password } = payload;

  // Check if user already exists
  const userExists = await User.findOne({ $or: [{ email }, { pan }] });
  if (userExists) {
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  await User.create({
    name,
    email,
    mobile,
    pan,
    password: hashedPassword
  });

  return true;
};

export const loginUserService = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return {
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      balance: user.balance
    }
  };
};
