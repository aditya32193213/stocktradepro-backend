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
      index: true // Fast user transaction lookup
    },

    stock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
      index: true
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
transactionSchema.index({ user: 1, createdAt: -1 });

// Optimize stock-based transaction queries
transactionSchema.index({ stock: 1, createdAt: -1 });

export default mongoose.model("Transaction", transactionSchema);
