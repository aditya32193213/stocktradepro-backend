/**
 * -----------------------------------------------------
 * Stock Schema
 * -----------------------------------------------------
 * Represents a tradable stock in the system.
 * Optimized for listing, filtering, sorting, and search.
 */

import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true
    },

    companyName: {
      type: String,
      required: true
    },

    sector: {
      type: String,
      required: true,
      index: true
    },

    logoUrl: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    changePercent: {
      type: Number,
      default: 0
    },

    volume: {
      type: Number,
      default: 0
    },

    peRatio: {
      type: Number
    },

    marketCap: {
      type: Number
    }
  },
  { timestamps: true }
);

/**
 * -----------------------------------------------------
 * Indexes
 * -----------------------------------------------------
 */

// Compound index for sector-based ranking
stockSchema.index({ sector: 1, marketCap: -1 });

export default mongoose.model("Stock", stockSchema);
