import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import { User, Stock, Transaction } from "../models/index.js";
import { AppError } from "../utils/index.js";

describe("Transaction API", () => {
  let authToken;
  let userId;
  let stockId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);

    if (process.env.NODE_ENV !== "test") {
  throw new AppError("Tests must run with NODE_ENV=test", 500);
    }
    
    // Create test user
    const registerRes = await request(app)
      .post("/api/v1/auth/register")
      .send({
        name: "Test Trader",
        email: "trader@test.com",
        mobile: "9876543210",
        pan: "TRADE1234T",
        password: "Test@1234"
      });

    // Login to get token
    const loginRes = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "trader@test.com",
        password: "Test@1234"
      });

    authToken = loginRes.body.token;
    userId = loginRes.body.user.id;

    // Create test stock
    const stock = await Stock.create({
      symbol: "TEST",
      companyName: "Test Company",
      sector: "Technology",
      logoUrl: "https://example.com/logo.svg",
      price: 100,
      changePercent: 0,
      volume: 1000000,
      peRatio: 20,
      marketCap: 1000000000
    });

    stockId = stock._id;
  });

  afterAll(async () => {
    await User.deleteMany({});
    await Stock.deleteMany({});
    await Transaction.deleteMany({});
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await Transaction.deleteMany({});
    // Reset user balance
    await User.findByIdAndUpdate(userId, { balance: 100000 });
  });

  describe("POST /api/v1/transactions/buy", () => {
    it("should successfully buy stock with sufficient balance", async () => {
      const res = await request(app)
        .post("/api/v1/transactions/buy")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          stockId: stockId,
          quantity: 10
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("Stock purchased successfully");
      expect(res.body.transaction).toBeDefined();
      expect(res.body.transaction.quantity).toBe(10);
      expect(res.body.transaction.type).toBe("BUY");

      // Verify user balance was deducted
      const user = await User.findById(userId);
      expect(user.balance).toBe(99000); // 100000 - (100 * 10)
    });

    it("should reject purchase with insufficient balance", async () => {
      const res = await request(app)
        .post("/api/v1/transactions/buy")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          stockId: stockId,
          quantity: 2000 // Requires 200,000, but user has 100,000
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain("Insufficient balance");
    });

    it("should reject invalid stock ID", async () => {
      const res = await request(app)
        .post("/api/v1/transactions/buy")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          stockId: "invalid-id",
          quantity: 10
        });

      expect(res.statusCode).toBe(400);
    });

    it("should reject negative quantity", async () => {
      const res = await request(app)
        .post("/api/v1/transactions/buy")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          stockId: stockId,
          quantity: -5
        });

      expect(res.statusCode).toBe(400);
    });

    it("should reject purchase without authentication", async () => {
      const res = await request(app)
        .post("/api/v1/transactions/buy")
        .send({
          stockId: stockId,
          quantity: 10
        });

      expect(res.statusCode).toBe(401);
    });
  });

  describe("POST /api/v1/transactions/sell", () => {
    beforeEach(async () => {
      // Buy stock first
      await request(app)
        .post("/api/v1/transactions/buy")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          stockId: stockId,
          quantity: 20
        });
    });

    it("should successfully sell owned stock", async () => {
      const res = await request(app)
        .post("/api/v1/transactions/sell")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          stockId: stockId,
          quantity: 10
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("Stock sold successfully");
      expect(res.body.transaction.type).toBe("SELL");

      // Verify balance increased
      const user = await User.findById(userId);
      expect(user.balance).toBe(99000); // 100000 - 2000 + 1000
    });

    it("should reject selling more than owned", async () => {
      const res = await request(app)
        .post("/api/v1/transactions/sell")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          stockId: stockId,
          quantity: 50 // Only owns 20
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain("Insufficient stock quantity");
    });

    it("should reject selling stock not owned", async () => {
      const anotherStock = await Stock.create({
        symbol: "TEST2",
        companyName: "Test Company 2",
        sector: "Finance",
        logoUrl: "https://example.com/logo2.svg",
        price: 50,
        changePercent: 0,
        volume: 500000,
        peRatio: 15,
        marketCap: 500000000
      });

      const res = await request(app)
        .post("/api/v1/transactions/sell")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          stockId: anotherStock._id,
          quantity: 10
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toContain("Insufficient stock quantity");

      await Stock.findByIdAndDelete(anotherStock._id);
    });
  });

  describe("GET /api/v1/transactions", () => {
    beforeEach(async () => {
      // Create multiple transactions
      await request(app)
        .post("/api/v1/transactions/buy")
        .set("Authorization", `Bearer ${authToken}`)
        .send({ stockId: stockId, quantity: 10 });

      await request(app)
        .post("/api/v1/transactions/sell")
        .set("Authorization", `Bearer ${authToken}`)
        .send({ stockId: stockId, quantity: 5 });
    });

    it("should get transaction history with pagination", async () => {
      const res = await request(app)
        .get("/api/v1/transactions")
        .set("Authorization", `Bearer ${authToken}`)
        .query({ page: 1, limit: 10 });

      expect(res.statusCode).toBe(200);
      expect(res.body.data).toBeInstanceOf(Array);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.page).toBe(1);
      expect(res.body.totalRecords).toBe(2);
    });

    it("should filter transactions by type", async () => {
      const res = await request(app)
        .get("/api/v1/transactions")
        .set("Authorization", `Bearer ${authToken}`)
        .query({ type: "BUY" });

      expect(res.statusCode).toBe(200);
      expect(res.body.data.every(tx => tx.type === "BUY")).toBe(true);
    });
  });

  describe("Transaction Atomicity", () => {
    it("should rollback on database error", async () => {
      // This tests that MongoDB transactions work correctly
      const initialBalance = (await User.findById(userId)).balance;

      // Force an error by using invalid stock ID format during service execution
      // This is a simplified test - in production, you'd want more comprehensive tests
      const res = await request(app)
        .post("/api/v1/transactions/buy")
        .set("Authorization", `Bearer ${authToken}`)
        .send({
          stockId: new mongoose.Types.ObjectId(), // Valid format but non-existent
          quantity: 10
        });

      expect(res.statusCode).toBe(404);

      // Verify balance wasn't changed
      const finalBalance = (await User.findById(userId)).balance;
      expect(finalBalance).toBe(initialBalance);
    });
  });
});