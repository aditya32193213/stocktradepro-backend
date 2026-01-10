import {
  buyStockService,
  sellStockService
} from "../services/index.js";
import { Transaction } from "../models/index.js";
import PDFDocument from "pdfkit";

/**
 * -----------------------------------------------------
 * Buy Stock Controller
 * -----------------------------------------------------
 * Delegates business logic to the service layer.
 *
 * Endpoint: POST /api/transactions/buy
 */
export const buyStock = async (req, res, next) => {
  try {
    const transaction = await buyStockService(
      req.user,
      req.body.stockId,
      req.body.quantity
    );

    res.status(201).json({
      message: "Stock purchased successfully",
      transaction
    });
  } catch (error) {
    next(error);
  }
};

/**
 * -----------------------------------------------------
 * Sell Stock Controller
 * -----------------------------------------------------
 * Delegates business logic to the service layer.
 *
 * Endpoint: POST /api/transactions/sell
 */
export const sellStock = async (req, res, next) => {
  try {
    const transaction = await sellStockService(
      req.user,
      req.body.stockId,
      req.body.quantity
    );

    res.status(201).json({
      message: "Stock sold successfully",
      transaction
    });
  } catch (error) {
    next(error);
  }
};

/**
 * -----------------------------------------------------
 * Get Transactions Controller
 * -----------------------------------------------------
 * Supports filtering by type, stock, and date range.
 *
 * Endpoint: GET /api/transactions
 */
export const getTransactions = async (req, res, next) => {
  try {
    const { type, stockId, fromDate, toDate } = req.query;

    const query = { user: req.user._id };

    if (type) query.type = type;
    if (stockId) query.stock = stockId;
    if (fromDate && toDate) {
      query.createdAt = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate)
      };
    }

    const transactions = await Transaction.find(query)
      .populate("stock", "symbol companyName")
      .sort({ createdAt: -1 })
      .lean();

    res.json(transactions);
  } catch (error) {
    next(error);
  }
};

/**
 * -----------------------------------------------------
 * Export Transactions PDF
 * -----------------------------------------------------
 * Generates a downloadable PDF report.
 *
 * Endpoint: GET /api/transactions/export/pdf
 */
export const exportTransactionsPDF = async (req, res, next) => {
  try {
    const { type, stockId, fromDate, toDate } = req.query;

    const query = { user: req.user._id };

    if (type) query.type = type;
    if (stockId) query.stock = stockId;
    if (fromDate && toDate) {
      query.createdAt = {
        $gte: new Date(fromDate),
        $lte: new Date(toDate)
      };
    }

    const transactions = await Transaction.find(query)
      .populate("stock", "symbol companyName")
      .sort({ createdAt: -1 })
      .lean();

    const doc = new PDFDocument({ margin: 40, size: "A4" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=transaction-history.pdf"
    );

    doc.pipe(res);

    doc
      .fontSize(18)
      .text("StockTradePro – Transaction History", { align: "center" })
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
      doc.text(new Date(tx.createdAt).toLocaleDateString(), 40, doc.y, { continued: true });
      doc.text(tx.stock.symbol, 120, doc.y, { continued: true });
      doc.text(tx.type, 250, doc.y, { continued: true });
      doc.text(tx.quantity.toString(), 310, doc.y, { continued: true });
      doc.text(tx.price.toFixed(2), 360, doc.y, { continued: true });
      doc.text(tx.totalAmount.toFixed(2), 430, doc.y);
      doc.moveDown(0.8);
    });

    doc.end();
  } catch (error) {
    next(error);
  }
};
