/// <reference types="jest" />

import request from "supertest";

import app from "../src/app";

describe("Health", () => {
  describe("GET /health", () => {
    it("should return status 200", async () => {
      const res = await request(app).get("/health");

      expect(res.statusCode).toBe(200);
    });

    it('should return message "Hello world"', async () => {
      const res = await request(app).get("/health");

      expect(res.body).toEqual({
        message: "Hello world",
      });
    });
  });
});
