import { Stock } from "../models/index.js";
import { AppError } from "../utils/index.js";

/**
 * -----------------------------------------------------
 * Stock Service
 * -----------------------------------------------------
 * Handles stock querying logic.
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

  if (sector) {
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
    pageSize: sanitizedLimit,
    totalPages: Math.ceil(totalRecords / sanitizedLimit),
    totalRecords,
    data: stocks
  };
};

export const getStockByIdService = async (id) => {
  const stock = await Stock.findById(id).lean();
  if (!stock) {
    throw new AppError("Stock not found", 404);
  }
  return stock;
};