/**
 * -----------------------------------------------------
 * Watchlist Schema
 * -----------------------------------------------------
 * Stores user-selected stocks for quick access.
 * Ensures one stock appears only once per user.
 */

import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
      index: true
    }
  },
  { timestamps: true }
);

/**
 * Prevent duplicate watchlist entries
 * (One stock per user)
 */
watchlistSchema.index({ user: 1, stock: 1 }, { unique: true });

export default mongoose.model("Watchlist", watchlistSchema);
