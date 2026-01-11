import request from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import { User } from "../models/index.js";

describe("Auth API", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  describe("POST /api/v1/auth/register", () => {
    const validUser = {
      name: "John Doe",
      email: "john@example.com",
      mobile: "9876543210",
      pan: "ABCDE1234F",
      password: "Test@1234"
    };

    it("should register a new user with valid data", async () => {
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(validUser);

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("Registration successful");

      // Verify user in DB
      const user = await User.findOne({ email: validUser.email });
      expect(user).toBeTruthy();
      expect(user.name).toBe(validUser.name);
    });

    it("should reject duplicate email", async () => {
      await User.create({ ...validUser, password: "hashed" });

      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(validUser);

      expect(res.statusCode).toBe(409);
      expect(res.body.message).toContain("already exists");
    });

    it("should reject invalid PAN format", async () => {
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send({ ...validUser, pan: "INVALID" });

      expect(res.statusCode).toBe(400);
      expect(res.body.errors).toBeDefined();
    });

    it("should reject weak password", async () => {
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send({ ...validUser, password: "weak" });

      expect(res.statusCode).toBe(400);
    });

    it("should reject missing required fields", async () => {
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send({ name: "Test" });

      expect(res.statusCode).toBe(400);
    });
  });

  describe("POST /api/v1/auth/login", () => {
    beforeEach(async () => {
      await request(app).post("/api/v1/auth/register").send({
        name: "Test User",
        email: "test@example.com",
        mobile: "9876543210",
        pan: "ABCDE1234F",
        password: "Test@1234"
      });
    });

    it("should login with valid credentials", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "test@example.com",
          password: "Test@1234"
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.token).toBeDefined();
      expect(res.body.user).toBeDefined();
      expect(res.body.user.email).toBe("test@example.com");
    });

    it("should reject invalid email", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "wrong@example.com",
          password: "Test@1234"
        });

      expect(res.statusCode).toBe(401);
    });

    it("should reject invalid password", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "test@example.com",
          password: "WrongPassword"
        });

      expect(res.statusCode).toBe(401);
    });

    it("should enforce rate limiting", async () => {
      const requests = [];
      
      // Make 11 requests (limit is 10)
      for (let i = 0; i < 11; i++) {
        requests.push(
          request(app)
            .post("/api/v1/auth/login")
            .send({ email: "test@example.com", password: "wrong" })
        );
      }

      const responses = await Promise.all(requests);
      const lastResponse = responses[10];

      expect(lastResponse.statusCode).toBe(429);
    });
  });
});