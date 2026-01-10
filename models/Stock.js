/**
 * -----------------------------------------------------
 * Stock Schema
 * -----------------------------------------------------
 * Represents a tradable stock in the system.
 * Optimized for listing, filtering, and sorting.
 */

import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    symbol: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true // Fast lookup by stock symbol
    },

    companyName: {
      type: String,
      required: true,
      index: true // Enables text-based search
    },

    sector: {
      type: String,
      required: true,
      index: true // Enables sector filtering
    },

    logoUrl: {
      type: String,
      required: true // CDN-based logo (fallback handled in frontend)
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
 * Compound indexes for performance
 */

// Sorting stocks by market cap (used in listings)
stockSchema.index({ marketCap: -1 });

// Combined sector + marketCap filter/sort
stockSchema.index({ sector: 1, marketCap: -1 });

export default mongoose.model("Stock", stockSchema);
