/**
 * -----------------------------------------------------
 * User Schema
 * -----------------------------------------------------
 * Stores authentication details and trading balance.
 * Optimized for login and identity validation.
 */

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    mobile: {
      type: String,
      required: true
    },

    pan: {
      type: String,
      required: true,
      unique: true,
      uppercase: true
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    balance: {
      type: Number,
      default: 100000
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
