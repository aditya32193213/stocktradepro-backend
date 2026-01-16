import mongoose from "mongoose";
import { Stock, Transaction, User } from "../models/index.js";
import { AppError } from "../utils/index.js";
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

const FONT_PATH = path.join(
  process.cwd(),
  "assets/fonts/NotoSans-Regular.ttf"
);

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

  /* ================= FETCH USER ================= */
  const user = await User.findById(userId).lean();
  if (!user) {
    throw new AppError("User not found", 404);
  }

  /* ================= BUILD QUERY ================= */
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
    .populate("stock", "companyName symbol")
    .sort({ createdAt: -1 })
    .lean();

  /* ================= CALCULATE SUMMARY ================= */
  const summary = transactions.reduce(
    (acc, tx) => {
      if (tx.type === "BUY") {
        acc.totalBuys += tx.totalAmount;
        acc.buyCount++;
      } else {
        acc.totalSells += tx.totalAmount;
        acc.sellCount++;
      }
      acc.totalTransactions++;
      return acc;
    },
    { totalBuys: 0, totalSells: 0, buyCount: 0, sellCount: 0, totalTransactions: 0 }
  );

  /* ================= CREATE PDF ================= */
  const doc = new PDFDocument({ 
    margin: 0, 
    size: "A4",
    bufferPages: true
  });

  /* ================= COLOR PALETTE ================= */
  const colors = {
    primary: "#6366F1",      // Indigo
    secondary: "#8B5CF6",    // Purple
    success: "#10B981",      // Green
    danger: "#EF4444",       // Red
    dark: "#1F2937",         // Dark gray
    gray: "#6B7280",         // Medium gray
    lightGray: "#F3F4F6",    // Light gray
    white: "#FFFFFF",
    border: "#E5E7EB"
  };

  /* ================= REGISTER FONT ================= */
  if (!fs.existsSync(FONT_PATH)) {
    throw new AppError("PDF font file missing", 500);
  }

  doc.registerFont("NotoSans", FONT_PATH);
  doc.font("NotoSans");

  /* ================= HELPER FUNCTIONS ================= */
  const drawGradientHeader = () => {
    // Gradient background for header
    doc.rect(0, 0, 595, 180).fill(colors.primary);
    doc.rect(0, 0, 595, 180).fillOpacity(0.1).fill(colors.secondary);
    doc.fillOpacity(1);
  };

  const drawCard = (x, y, width, height, fillColor = colors.white) => {
    doc.roundedRect(x, y, width, height, 8)
       .fillAndStroke(fillColor, colors.border)
       .lineWidth(1);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  /* ================= HEADER SECTION ================= */
  drawGradientHeader();

  // Company logo and name
  const companyLogoPath = path.join(process.cwd(), "assets/company-logo.png");
  if (fs.existsSync(companyLogoPath)) {
    doc.image(companyLogoPath, 40, 35, { width: 45 });
  }

  // Company name beside logo
  doc.fontSize(16)
     .fillColor(colors.white)
     .font("NotoSans")
     .text("StockTradePro", 95, 45, { continued: false });

  // Title
  doc.fontSize(26)
     .fillColor(colors.white)
     .text("Transaction Report", 40, 85, { continued: false });

  // Subtitle
  doc.fontSize(12)
     .fillColor(colors.white)
     .fillOpacity(0.9)
     .text("Complete transaction history and analytics", 40, 117);
  doc.fillOpacity(1);

  // User info card (expanded to include email)
  drawCard(40, 155, 250, 75, colors.white);
  doc.fontSize(10)
     .fillColor(colors.gray)
     .text("Account Holder", 55, 167);
  doc.fontSize(12)
     .fillColor(colors.dark)
     .font("NotoSans")
     .text(user.name, 55, 183, { width: 220, ellipsis: true });
  doc.fontSize(9)
     .fillColor(colors.gray)
     .text(user.email, 55, 203, { width: 220, ellipsis: true });

  // Date info card
  drawCard(305, 155, 250, 75, colors.white);
  doc.fontSize(10)
     .fillColor(colors.gray)
     .text("Report Generated", 320, 167);
  doc.fontSize(11)
     .fillColor(colors.dark)
     .text(new Date().toLocaleString('en-IN', {
       day: '2-digit',
       month: 'short',
       year: 'numeric',
       hour: '2-digit',
       minute: '2-digit'
     }), 320, 183);

  /* ================= SUMMARY CARDS ================= */
  const summaryY = 255;
  const cardWidth = 165;
  const cardHeight = 85;
  const cardGap = 20;

  // Total Transactions Card
  drawCard(40, summaryY, cardWidth, cardHeight, colors.white);
  doc.fontSize(11)
     .fillColor(colors.gray)
     .text("Total Transactions", 55, summaryY + 20);
  doc.fontSize(24)
     .fillColor(colors.primary)
     .font("NotoSans")
     .text(summary.totalTransactions.toString(), 55, summaryY + 42);

  // Total Buys Card
  drawCard(40 + cardWidth + cardGap, summaryY, cardWidth, cardHeight, colors.white);
  doc.fontSize(11)
     .fillColor(colors.gray)
     .text("Total Purchases", 40 + cardWidth + cardGap + 15, summaryY + 20);
  doc.fontSize(20)
     .fillColor(colors.success)
     .text(formatCurrency(summary.totalBuys), 40 + cardWidth + cardGap + 15, summaryY + 42, {
       width: cardWidth - 30,
       ellipsis: true
     });
  doc.fontSize(9)
     .fillColor(colors.gray)
     .text(`${summary.buyCount} transactions`, 40 + cardWidth + cardGap + 15, summaryY + 67);

  // Total Sells Card
  drawCard(40 + (cardWidth + cardGap) * 2, summaryY, cardWidth, cardHeight, colors.white);
  doc.fontSize(11)
     .fillColor(colors.gray)
     .text("Total Sales", 40 + (cardWidth + cardGap) * 2 + 15, summaryY + 20);
  doc.fontSize(20)
     .fillColor(colors.danger)
     .text(formatCurrency(summary.totalSells), 40 + (cardWidth + cardGap) * 2 + 15, summaryY + 42, {
       width: cardWidth - 30,
       ellipsis: true
     });
  doc.fontSize(9)
     .fillColor(colors.gray)
     .text(`${summary.sellCount} transactions`, 40 + (cardWidth + cardGap) * 2 + 15, summaryY + 67);

  /* ================= TRANSACTIONS TABLE ================= */
  let tableStartY = summaryY + cardHeight + 40;

  // Section title
  doc.fontSize(16)
     .fillColor(colors.dark)
     .font("NotoSans")
     .text("Transaction Details", 40, tableStartY);

  tableStartY += 35;

  // Table header background
  doc.rect(40, tableStartY, 515, 36)
     .fill(colors.lightGray);

  // Table columns (adjusted without logo column)
  const cols = {
    date: { x: 50, width: 80, label: "Date" },
    company: { x: 140, width: 170, label: "Company" },
    type: { x: 320, width: 60, label: "Type" },
    qty: { x: 390, width: 50, label: "Qty" },
    price: { x: 450, width: 60, label: "Price" },
    total: { x: 510, width: 70, label: "Total" }
  };

  // Table headers
  doc.fontSize(10)
     .fillColor(colors.gray)
     .font("NotoSans");

  Object.entries(cols).forEach(([key, col]) => {
    doc.text(col.label, col.x, tableStartY + 12, {
      width: col.width,
      align: key === 'total' || key === 'price' || key === 'qty' ? 'right' : 'left'
    });
  });

  let rowY = tableStartY + 36;

  /* ================= TABLE ROWS ================= */
  for (let i = 0; i < transactions.length; i++) {
    const tx = transactions[i];

    // Page break handling
    if (rowY > 750) {
      doc.addPage();
      doc.font("NotoSans");
      
      // Repeat header on new page
      rowY = 50;
      doc.rect(40, rowY, 515, 36).fill(colors.lightGray);
      doc.fontSize(10).fillColor(colors.gray);
      Object.entries(cols).forEach(([key, col]) => {
        doc.text(col.label, col.x, rowY + 12, {
          width: col.width,
          align: key === 'total' || key === 'price' || key === 'qty' ? 'right' : 'left'
        });
      });
      rowY += 36;
    }

    // Alternating row background
    if (i % 2 === 0) {
      doc.rect(40, rowY, 515, 40)
         .fillOpacity(0.03)
         .fill(colors.primary)
         .fillOpacity(1);
    }

    // Date
    doc.fontSize(9)
       .fillColor(colors.dark)
       .text(formatDate(tx.createdAt), cols.date.x, rowY + 13, {
         width: cols.date.width
       });

    // Company name and symbol (without logo)
    doc.fontSize(10)
       .fillColor(colors.dark)
       .font("NotoSans")
       .text(tx.stock.companyName, cols.company.x, rowY + 10, {
         width: cols.company.width,
         ellipsis: true
       });
    doc.fontSize(8)
       .fillColor(colors.gray)
       .text(tx.stock.symbol, cols.company.x, rowY + 24, {
         width: cols.company.width
       });

    // Type badge
    const typeColor = tx.type === "BUY" ? colors.success : colors.danger;
    const badgeX = cols.type.x;
    const badgeY = rowY + 12;
    
    doc.roundedRect(badgeX, badgeY, 45, 18, 4)
       .fillOpacity(0.1)
       .fill(typeColor)
       .fillOpacity(1);
    
    doc.fontSize(9)
       .fillColor(typeColor)
       .font("NotoSans")
       .text(tx.type, badgeX, badgeY + 4, {
         width: 45,
         align: 'center'
       });

    // Quantity
    doc.fontSize(9)
       .fillColor(colors.dark)
       .text(tx.quantity.toString(), cols.qty.x, rowY + 13, {
         width: cols.qty.width,
         align: 'right'
       });

    // Price
    doc.fontSize(9)
       .fillColor(colors.dark)
       .text(formatCurrency(tx.price), cols.price.x, rowY + 13, {
         width: cols.price.width,
         align: 'right'
       });

    // Total amount
    doc.fontSize(10)
       .fillColor(colors.dark)
       .font("NotoSans")
       .text(formatCurrency(tx.totalAmount), cols.total.x, rowY + 13, {
         width: cols.total.width,
         align: 'right'
       });

    rowY += 40;
  }

  /* ================= FOOTER ON ALL PAGES ================= */
  const pages = doc.bufferedPageRange();
  for (let i = 0; i < pages.count; i++) {
    doc.switchToPage(i);
    
    // Footer line
    doc.moveTo(40, 810)
       .lineTo(555, 810)
       .strokeOpacity(0.2)
       .stroke(colors.border)
       .strokeOpacity(1);

    // Footer text
    doc.fontSize(8)
       .fillColor(colors.gray)
       .text(
         "This is a system-generated document. No signature required.",
         40,
         820,
         { align: "center", width: 515 }
       );

    // Page numbers
    doc.fontSize(8)
       .fillColor(colors.gray)
       .text(
         `Page ${i + 1} of ${pages.count}`,
         0,
         820,
         { align: "right", width: 555 }
       );
  }

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
    .populate("stock", "companyName symbol")
    .sort({ createdAt: -1 })
    .lean();

  let csv =
    "Date,Company Name,Stock Symbol,Type,Quantity,Price in Rupees,Total Amount in Rupees,Notes\n";

  transactions.forEach((tx) => {
    csv += `${new Date(tx.createdAt).toISOString()},`;
    csv += `"${tx.stock.companyName}",`;
    csv += `${tx.stock.symbol},`;
    csv += `${tx.type},`;
    csv += `${tx.quantity},`;
    csv += `${tx.price},`;
    csv += `${tx.totalAmount},`;
    csv += `"${tx.notes || ""}"\n`;
  });

  return csv;
};





