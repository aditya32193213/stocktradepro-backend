/**
 * -----------------------------------------------------
 * Transaction Schema 
 * -----------------------------------------------------
 * Stores BUY / SELL operations for users.
 * Enhanced with notes field for better record-keeping.
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
    },

    // NEW: Optional notes for transactions
    notes: {
      type: String,
      trim: true,
      default: ""
    }
  },
  { timestamps: true }
);

/**
 * Compound indexes
 */

// Fetch user transactions sorted by time
transactionSchema.index({ user: 1, createdAt: -1 });
// For type filtering
transactionSchema.index({ user: 1, type: 1 });

export default mongoose.model("Transaction", transactionSchema);