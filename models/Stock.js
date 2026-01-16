// /**
//  * -----------------------------------------------------
//  * Stock Schema
//  * -----------------------------------------------------
//  * Represents a tradable stock in the system.
//  * Optimized for listing, filtering, sorting, and search.
//  */
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
    description: {
      type: String, 
      default: "A leading player in its sector, consistently delivering value to shareholders."
    },
    sector: {
      type: String,
      required: true,
      index: true
    },
    logoUrl: {
      type: String,
      trim: true,
      default :null
    },
    price: {
      type: Number,
      required: true
    },
    // ✅ NEW: Store yesterday's close price to calculate daily change
    previousClose: {
      type: Number,
      default: function() { return this.price; } 
    },
    changePercent: {
      type: Number,
      default: 0
    },
    // ✅ NEW: History Array for the Graph
    history: [
      {
        price: Number,
        timestamp: { type: Date, default: Date.now }
      }
    ],
    volume: { type: Number, default: 0 },
    peRatio: { type: Number },
    marketCap: { type: Number }
  },
  { timestamps: true }
);

// Compound index for sector-based ranking
stockSchema.index({ sector: 1, marketCap: -1 });

export default mongoose.model("Stock", stockSchema);