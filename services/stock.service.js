import { Stock } from "../models/index.js";
import { AppError } from "../utils/index.js";

/**
 * -----------------------------------------------------
 * Stock Service
 * -----------------------------------------------------
 * Handles stock querying logic.
 */

/**
 * Get Stocks with Pagination, Search, and Filtering
 */
export const getStocksService = async (queryParams) => {
  const {
    page = 1,
    limit = 10,
    search = "",
    sector = "",
    sortBy = "symbol",
    order = "asc"
  } = queryParams;

  // Add sanitization
  const sanitizedPage = Math.max(1, parseInt(page) || 1);
  const sanitizedLimit = Math.min(100, Math.max(1, parseInt(limit) || 10));
  
  // Whitelist sortBy to prevent injection
  const allowedSortFields = ["symbol", "companyName", "marketCap", "price", "changePercent"];
  const sanitizedSortBy = allowedSortFields.includes(sortBy) ? sortBy : "symbol";
  
  const sortOrder = order === "desc" ? -1 : 1;
  const skip = (sanitizedPage - 1) * sanitizedLimit;

  const query = {};

  if (search) {
    query.$or = [
      { companyName: { $regex: search, $options: "i" } },
      { symbol: { $regex: search, $options: "i" } }
    ];
  }

  if (sector && sector !== "All Sectors") {
    query.sector = sector;
  }

  const [totalRecords, stocks] = await Promise.all([
    Stock.countDocuments(query),
    Stock.find(query)
      .sort({ [sanitizedSortBy]: sortOrder })
      .skip(skip)
      .limit(sanitizedLimit)
      .lean()
  ]);

  return {
    page: sanitizedPage,
    limit: sanitizedLimit,
    totalPages: Math.ceil(totalRecords / sanitizedLimit),
    totalRecords,
    data: stocks
  };
};

/**
 * Get Stock By ID
 */
export const getStockByIdService = async (id) => {
  const stock = await Stock.findById(id).lean();
  if (!stock) {
    throw new AppError("Stock not found", 404);
  }
  return stock;
};

/**
 * Get Unique Sectors
 */
export const getSectorsService = async () => {
  // Finds distinct sectors and sorts them
  const sectors = await Stock.distinct("sector");
  return sectors.sort();
};