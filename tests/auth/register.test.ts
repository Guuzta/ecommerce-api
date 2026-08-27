/// <reference types="jest" />

import request from "supertest";

import app from "../../src/app";

import { prisma } from "../../src/lib/prisma";

describe("Auth", () => {
  describe("POST /auth/register", () => {
    it("should register a user", async () => {
      const res = await request(app).post("/auth/register").send({
        name: "Eduardo",
        email: "Eduardosilva@email.com",
        password: "Teste123456#",
        confirmPassword: "Teste123456#",
      });

      expect(res.statusCode).toBe(201);

      expect(res.body).toMatchObject({
        message: "User created successfully",
        user: {
          name: "eduardo",
          email: "eduardosilva@email.com",
        },
      });

      expect(res.body.user.id).toEqual(expect.any(String));

      const user = await prisma.user.findUnique({
        where: {
          email: "eduardosilva@email.com",
        },
      });

      expect(user).not.toBeNull();
    });

    it("should return 409 if email is already in use", async () => {
      await request(app).post("/auth/register").send({
        name: "Eduardo",
        email: "Eduardosilva@email.com",
        password: "Teste123456#",
        confirmPassword: "Teste123456#",
      });

      const res = await request(app).post("/auth/register").send({
        name: "Eduardo",
        email: "Eduardosilva@email.com",
        password: "Teste123456#",
        confirmPassword: "Teste123456#",
      });

      expect(res.statusCode).toBe(409);

      expect(res.body).toEqual({
        message: "This email is already in use",
      });
    });

    it("should return 400 when name is too short", async () => {
      const res = await request(app).post("/auth/register").send({
        name: "Edu",
        email: "Eduardosilva@email.com",
        password: "Teste123456#",
        confirmPassword: "Teste123456#",
      });

      expect(res.statusCode).toBe(400);

      expect(res.body).toMatchObject({
        errors: [
          {
            message: "Name must be at least 4 characters",
          },
        ],
      });
    });

    it("should return 400 when name is too long", async () => {
      const res = await request(app).post("/auth/register").send({
        name: "Eduardo da silva",
        email: "Eduardosilva@email.com",
        password: "Teste123456#",
        confirmPassword: "Teste123456#",
      });

      expect(res.statusCode).toBe(400);

      expect(res.body).toMatchObject({
        errors: [
          {
            message: "Name must be at most 12 characters",
          },
        ],
      });
    });

    it("should return 400 when email is invalid", async () => {
      const res = await request(app).post("/auth/register").send({
        name: "Eduardo",
        email: "Eduardosilvaemail.com",
        password: "Teste123456#",
        confirmPassword: "Teste123456#",
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
      const res = await request(app).post("/auth/register").send({
        name: "Eduardo",
        email: "Eduardosilva@email.com",
        password: "Teste",
        confirmPassword: "Teste",
      });

      expect(res.statusCode).toBe(400);

      expect(res.body.errors[0]).toMatchObject({
        message: "Password must be at least 8 characters",
      });
    });

    it("should return 400 when password is too long", async () => {
      const res = await request(app).post("/auth/register").send({
        name: "Eduardo",
        email: "Eduardosilva@email.com",
        password: "Testesenha123456#",
        confirmPassword: "Testesenha123456#",
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

    it("should return 400 when password is too weak", async () => {
      const res = await request(app).post("/auth/register").send({
        name: "Eduardo",
        email: "Eduardosilva@email.com",
        password: "Testesenha",
        confirmPassword: "Testesenha",
      });

      expect(res.statusCode).toBe(400);

      expect(res.body).toMatchObject({
        errors: [
          {
            message:
              "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
          },
        ],
      });
    });

    it("should return 400 when passwords do not match", async () => {
      const res = await request(app).post("/auth/register").send({
        name: "Eduardo",
        email: "Eduardosilva@email.com",
        password: "Teste123456#",
        confirmPassword: "Senha123456$",
      });

      expect(res.statusCode).toBe(400);

      expect(res.body).toMatchObject({
        errors: [
          {
            message: "Passwords do not match",
          },
        ],
      });
    });
  });
});
