import { Stock, Transaction } from "../models/index.js";

/**
 * -----------------------------------------------------
 * Transaction Service
 * -----------------------------------------------------
 * Contains all business logic related to
 * buying and selling stocks.
 *
 * Controllers should NEVER contain business logic.
 */

/**
 * Buy Stock
 */
export const buyStockService = async (user, stockId, quantity) => {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than zero");
  }

  const stock = await Stock.findById(stockId);
  if (!stock) {
    throw new Error("Stock not found");
  }

  const totalAmount = stock.price * quantity;

  if (user.balance < totalAmount) {
    throw new Error("Insufficient balance");
  }

  // Update user balance
  user.balance -= totalAmount;
  await user.save();

  // Create BUY transaction
  return Transaction.create({
    user: user._id,
    stock: stock._id,
    type: "BUY",
    quantity,
    price: stock.price,
    totalAmount,
  });
};

/**
 * Sell Stock
 */
export const sellStockService = async (user, stockId, quantity) => {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than zero");
  }

  const stock = await Stock.findById(stockId);
  if (!stock) {
    throw new Error("Stock not found");
  }

  // Calculate owned quantity (BUY - SELL)
  const transactions = await Transaction.find({
    user: user._id,
    stock: stock._id,
  });

  const ownedQty = transactions.reduce(
    (sum, t) => sum + (t.type === "BUY" ? t.quantity : -t.quantity),
    0
  );

  if (quantity > ownedQty) {
    throw new Error("Insufficient stock quantity");
  }

  const totalAmount = stock.price * quantity;

  // Update user balance
  user.balance += totalAmount;
  await user.save();

  // Create SELL transaction
  return Transaction.create({
    user: user._id,
    stock: stock._id,
    type: "SELL",
    quantity,
    price: stock.price,
    totalAmount,
  });
};
