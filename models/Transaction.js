/**
 * -----------------------------------------------------
 * Transaction Schema
 * -----------------------------------------------------
 * Stores BUY / SELL operations for users.
 * Optimized for portfolio history and reporting.
 */

import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
    },

    type: {
      type: String,
      enum: ["BUY", "SELL"],
      required: true
    },

    quantity: {
      type: Number,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    totalAmount: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

/**
 * Compound indexes
 */

// Fetch user transactions sorted by time
transactionSchema.index({ user: 1, createdAt: -1 }); // For date filtering
transactionSchema.index({ user: 1, type: 1 }); // For type filtering

export default mongoose.model("Transaction", transactionSchema);
