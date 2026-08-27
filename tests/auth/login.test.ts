/// <reference types="jest" />

import request from "supertest";

import app from "../../src/app";

describe("Auth", () => {
  describe("POST /auth/login", () => {
    it("should login a user", async () => {
      await request(app).post("/auth/register").send({
        name: "Eduardo",
        email: "Eduardosilva@email.com",
        password: "Teste123456#",
        confirmPassword: "Teste123456#",
      });

      const res = await request(app).post("/auth/login").send({
        email: "Eduardosilva@email.com",
        password: "Teste123456#",
      });

      expect(res.statusCode).toBe(200);

      expect(res.body).toHaveProperty("accessToken");
    });

    it("should return 401 when email does not exist", async () => {
      const res = await request(app).post("/auth/login").send({
        email: "Emailinexistente@email.com",
        password: "Teste123456#",
      });

      expect(res.statusCode).toBe(401);

      expect(res.body).toMatchObject({ message: "Invalid credentials" });
    });

    it("should return 401 when password is incorrect", async () => {
      await request(app).post("/auth/register").send({
        name: "Eduardo",
        email: "Eduardosilva@email.com",
        password: "Teste123456#",
        confirmPassword: "Teste123456#",
      });

      const res = await request(app).post("/auth/login").send({
        email: "Eduardosilva@email.com",
        password: "Senhaincorreta",
      });

      expect(res.statusCode).toBe(401);

      expect(res.body).toMatchObject({ message: "Invalid credentials" });
    });

    it("should return 400 if email is invalid", async () => {
      const res = await request(app).post("/auth/login").send({
        email: "Eduardosilvaemail.com",
        password: "Teste123456#",
      });

      expect(res.statusCode).toBe(400);

      expect(res.body).toMatchObject({
        errors: [
          {
            message: "Invalid email",
          },
        ],
      });
    });

    it("should return 400 when password is too short", async () => {
      const res = await request(app).post("/auth/login").send({
        email: "Eduardosilva@email.com",
        password: "Teste",
      });

      expect(res.statusCode).toBe(400);

      expect(res.body).toMatchObject({
        errors: [
          {
            message: "Password must be at least 8 characters",
          },
        ],
      });
    });

    it("should return 400 when password is too long", async () => {
      const res = await request(app).post("/auth/login").send({
        email: "Eduardosilva@email.com",
        password: "Testesenha123456#",
      });

      expect(res.statusCode).toBe(400);

      expect(res.body).toMatchObject({
        errors: [
          {
            message: "Password must be at most 16 characters",
          },
        ],
      });
    });
  });
});
