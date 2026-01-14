import mongoose from "mongoose";
import { Stock, Transaction, User } from "../models/index.js";
import { AppError } from "../utils/index.js";
import PDFDocument from "pdfkit";

/**
 * -----------------------------------------------------
 * Buy Stock 
 * -----------------------------------------------------
 */
export const buyStockService = async (userId, stockId, quantity, notes = "") => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError("Invalid user ID", 400);
  }
  
  if (!mongoose.Types.ObjectId.isValid(stockId)) {
    throw new AppError("Invalid stock ID", 400);
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new AppError("Quantity must be a positive integer", 400);
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const stock = await Stock.findById(stockId).session(session);
    if (!stock) {
      throw new AppError("Stock not found", 404);
    }

    const totalAmount = stock.price * quantity;

    if (user.balance < totalAmount) {
      throw new AppError(
        `Insufficient balance. Required: ₹${totalAmount.toFixed(2)}, Available: ₹${user.balance.toFixed(2)}`,
        400
      );
    }

    await User.findByIdAndUpdate(
      userId,
      { $inc: { balance: -totalAmount } },
      { session, new: true }
    );

    const [transaction] = await Transaction.create(
      [
        {
          user: userId,
          stock: stockId,
          type: "BUY",
          quantity,
          price: stock.price,
          totalAmount,
          notes: notes || ""
        },
      ],
      { session }
    );

    await session.commitTransaction();
    await transaction.populate('stock', 'symbol companyName logoUrl');

    return transaction;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

/**
 * -----------------------------------------------------
 * Sell Stock (Enhanced with Notes)
 * -----------------------------------------------------
 */
export const sellStockService = async (userId, stockId, quantity, notes = "") => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError("Invalid user ID", 400);
  }
  
  if (!mongoose.Types.ObjectId.isValid(stockId)) {
    throw new AppError("Invalid stock ID", 400);
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new AppError("Quantity must be a positive integer", 400);
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userId).session(session);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const stock = await Stock.findById(stockId).session(session);
    if (!stock) {
      throw new AppError("Stock not found", 404);
    }

    const result = await Transaction.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
          stock: new mongoose.Types.ObjectId(stockId),
        },
      },
      {
        $group: {
          _id: null,
          totalQuantity: {
            $sum: {
              $cond: [
                { $eq: ["$type", "BUY"] },
                "$quantity",
                { $multiply: ["$quantity", -1] },
              ],
            },
          },
        },
      },
    ]).session(session);

    const ownedQty = result.length > 0 ? result[0].totalQuantity : 0;

    if (quantity > ownedQty) {
      throw new AppError(
        `Insufficient stock quantity. You own ${ownedQty} shares, trying to sell ${quantity}`,
        400
      );
    }

    const totalAmount = stock.price * quantity;

    await User.findByIdAndUpdate(
      userId,
      { $inc: { balance: totalAmount } },
      { session, new: true }
    );

    const [transaction] = await Transaction.create(
      [
        {
          user: userId,
          stock: stockId,
          type: "SELL",
          quantity,
          price: stock.price,
          totalAmount,
          notes: notes || ""
        },
      ],
      { session }
    );

    await session.commitTransaction();
    await transaction.populate('stock', 'symbol companyName logoUrl');

    return transaction;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

/**
 * -----------------------------------------------------
 * Get Transactions (WITH PAGINATION & FILTERS)
 * -----------------------------------------------------
 */
export const getTransactionsService = async (userId, filters = {}) => {
  const { type, search, fromDate, toDate, page = 1, limit = 20 } = filters;

  const matchStage = { user: new mongoose.Types.ObjectId(userId) };

  // 1. Filter by Type
  if (type && type !== "ALL") {
    matchStage.type = type;
  }

  // 2. Filter by Date
  if (fromDate || toDate) {
    matchStage.createdAt = {};
    if (fromDate) matchStage.createdAt.$gte = new Date(fromDate);
    if (toDate) {
      const end = new Date(toDate);
      end.setHours(23, 59, 59, 999);
      matchStage.createdAt.$lte = end;
    }
  }

  const pipeline = [
    { $match: matchStage },
    // Join with Stock to get Symbol/Name for searching
    {
      $lookup: {
        from: "stocks",
        localField: "stock",
        foreignField: "_id",
        as: "stockDetails"
      }
    },
    { $unwind: "$stockDetails" },
    { $sort: { createdAt: -1 } }
  ];

  // 3. Search by Symbol or Company Name
  if (search) {
    pipeline.push({
      $match: {
        $or: [
          { "stockDetails.symbol": { $regex: search, $options: "i" } },
          { "stockDetails.companyName": { $regex: search, $options: "i" } }
        ]
      }
    });
  }

  const skip = (page - 1) * limit;

  const [data, totalCount] = await Promise.all([
    Transaction.aggregate([
      ...pipeline, 
      { $skip: Number(skip) }, 
      { $limit: Number(limit) },
      // Project fields to match previous format
      {
         $project: {
            user: 1,
            type: 1,
            quantity: 1,
            price: 1,
            totalAmount: 1,
            notes: 1,
            createdAt: 1,
            stock: "$stockDetails" // Map stockDetails back to 'stock'
         }
      }
    ]),
    Transaction.aggregate([...pipeline, { $count: "count" }])
  ]);

  const totalRecords = totalCount[0]?.count || 0;

  return {
    page: Number(page),
    pageSize: Number(limit),
    totalPages: Math.ceil(totalRecords / limit),
    totalRecords,
    data
  };
};

/**
 * Export Transactions as PDF
 */
export const exportTransactionsPDFService = async (userId, filters = {}) => {
  const { type, stockId, fromDate, toDate } = filters;

  const query = { user: userId };

  if (type) query.type = type;
  if (stockId) query.stock = stockId;
  if (fromDate && toDate) {
    query.createdAt = {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    };
  }

  const transactions = await Transaction.find(query)
    .populate("stock", "symbol companyName")
    .sort({ createdAt: -1 })
    .lean();

  const doc = new PDFDocument({ margin: 40, size: "A4" });

  doc
    .fontSize(18)
    .text("StockTradePro - Transaction History", { align: "center" })
    .moveDown(2);

  doc.fontSize(12);
  doc.text("Date", 40, doc.y, { continued: true });
  doc.text("Stock", 120, doc.y, { continued: true });
  doc.text("Type", 250, doc.y, { continued: true });
  doc.text("Qty", 310, doc.y, { continued: true });
  doc.text("Price", 360, doc.y, { continued: true });
  doc.text("Total", 430, doc.y);
  doc.moveDown(1);

  doc.moveTo(40, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(1);

  transactions.forEach((tx) => {
    doc.text(new Date(tx.createdAt).toLocaleDateString(), 40, doc.y, {
      continued: true,
    });
    doc.text(tx.stock.symbol, 120, doc.y, { continued: true });
    doc.text(tx.type, 250, doc.y, { continued: true });
    doc.text(tx.quantity.toString(), 310, doc.y, { continued: true });
    doc.text(tx.price.toFixed(2), 360, doc.y, { continued: true });
    doc.text(tx.totalAmount.toFixed(2), 430, doc.y);
    doc.moveDown(0.8);
  });

  return doc;
};

/**
 * Export Transactions as CSV
 */
export const exportTransactionsCSVService = async (userId, filters = {}) => {
  const { type, stockId, fromDate, toDate } = filters;

  const query = { user: userId };

  if (type) query.type = type;
  if (stockId) query.stock = stockId;
  if (fromDate && toDate) {
    query.createdAt = {
      $gte: new Date(fromDate),
      $lte: new Date(toDate),
    };
  }

  const transactions = await Transaction.find(query)
    .populate("stock", "symbol companyName")
    .sort({ createdAt: -1 })
    .lean();

  let csv = "Date,Stock,Type,Quantity,Price,TotalAmount,Notes\n";

  transactions.forEach((tx) => {
    csv += `${new Date(tx.createdAt).toISOString()},`;
    csv += `${tx.stock.symbol},`;
    csv += `${tx.type},`;
    csv += `${tx.quantity},`;
    csv += `${tx.price},`;
    csv += `${tx.totalAmount},`;
    csv += `"${tx.notes || ''}"\n`;
  });

  return csv;
};