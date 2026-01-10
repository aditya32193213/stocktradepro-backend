import request from "supertest";
import app from "../app.js";

describe("Health Check API", () => {
  it("should return server health status", async () => {
    const res = await request(app).get("/api/health");

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("OK");
  });
});
