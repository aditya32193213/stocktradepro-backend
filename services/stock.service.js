import { Stock } from "../models/index.js";

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

  const skip = (page - 1) * limit;
  const sortOrder = order === "desc" ? -1 : 1;

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
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(Number(limit))
      .lean()
  ]);

  return {
    page: Number(page),
    pageSize: Number(limit),
    totalPages: Math.ceil(totalRecords / limit),
    totalRecords,
    data: stocks
  };
};

export const getStockByIdService = async (id) => {
  const stock = await Stock.findById(id).lean();
  if (!stock) {
    throw new Error("Stock not found");
  }
  return stock;
};
