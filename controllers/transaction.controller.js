import {
  buyStockService,
  sellStockService,
  exportTransactionsCSVService,
  exportTransactionsPDFService,
  getTransactionsService
} from "../services/index.js";
import { AppError } from "../utils/index.js";

/**
 * -----------------------------------------------------
 * Buy Stock Controller (Enhanced with Notes)
 * -----------------------------------------------------
 */
export const buyStock = async (req, res, next) => {
  try {
    const { stockId, quantity, notes } = req.body;
    
    const transaction = await buyStockService(
      req.user._id,
      stockId,
      quantity,
      notes
    );

    res.status(201).json({
      message: "Stock purchased successfully",
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * -----------------------------------------------------
 * Sell Stock Controller (Enhanced with Notes)
 * -----------------------------------------------------
 */
export const sellStock = async (req, res, next) => {
  try {
    const { stockId, quantity, notes } = req.body;
    
    const transaction = await sellStockService(
      req.user._id,
      stockId,
      quantity,
      notes
    );

    res.status(201).json({
      message: "Stock sold successfully",
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * -----------------------------------------------------
 * Get Transactions Controller (WITH PAGINATION)
 * -----------------------------------------------------
 */
export const getTransactions = async (req, res, next) => {
  try {
    const result = await getTransactionsService(req.user._id, req.query);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * -----------------------------------------------------
 * Export Transactions PDF
 * -----------------------------------------------------
 */
export const exportTransactionsPDF = async (req, res, next) => {
  try {
    const pdfDoc = await exportTransactionsPDFService(req.user._id, req.query);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=transaction-history.pdf"
    );

    pdfDoc.on('error', (err) => {
      next(new AppError('PDF generation failed', 500));
    });

    pdfDoc.pipe(res);
    pdfDoc.end();
  } catch (error) {
    next(error);
  }
};

/**
 * -----------------------------------------------------
 * Export Transactions CSV
 * -----------------------------------------------------
 */
export const exportTransactionsCSV = async (req, res, next) => {
  try {
    const csv = await exportTransactionsCSVService(req.user._id, req.query);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=transactions.csv"
    );

    res.status(200).send(csv);
  } catch (error) {
    next(error);
  }
};