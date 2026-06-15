import type { Request } from "express";

import { prisma } from "../lib/prisma.js";

import AppError from "../utils/AppError.js";
import * as passwordHash from "../utils/passwordHash.js";
import * as token from "../utils/token.js";

import type { RegisterBody } from "../schemas/registerSchema.js";
import type { LoginBody } from "../schemas/loginSchema.js";

import type { RegisterResponse } from "../types/auth.js";
import type { Token } from "../types/jwt.js";

const register = async (data: RegisterBody): Promise<RegisterResponse> => {
  const { name, email, password } = data;

  const userExists = await prisma.user.findUnique({ where: { email } });

  if (userExists) {
    throw new AppError("This email is already in use", 409);
  }

  const hashedPassword = await passwordHash.hash(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },

    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return {
    message: "User created successfully",
    user,
  };
};

const login = async (data: LoginBody): Promise<Token> => {
  const { email, password } = data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isPasswordValid = await passwordHash.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid credentials", 401);
  }

  const session = await prisma.session.create({
    data: {
      userId: user.id,
    },
  });

  const accessToken = token.generateAccessToken({
    sub: user.id,
    name: user.name,
    email: user.email,
    sessionId: session.id,
  });

  const refreshToken = token.generateRefreshToken({
    sub: user.id,
    name: user.name,
    email: user.email,
    sessionId: session.id,
  });

  return {
    accessToken,
    refreshToken,
  };
};

const logout = async (sessionId: string): Promise<{ message: string }> => {
  await prisma.session.delete({
    where: { id: sessionId },
  });

  return {
    message: "Logged out successfully",
  };
};

const refresh = async (req: Request): Promise<Token> => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new AppError("Refresh token missing", 401);
  }

  const payload = token.verifyToken(refreshToken);

  if (!payload) {
    throw new AppError("Invalid refresh token or expired", 403);
  }

  const session = await prisma.session.findUnique({
    where: {
      id: payload.sessionId,
    },
  });

  if (!session) {
    throw new AppError("Invalid session", 401);
  }

  const { sub, name, email } = payload;

  const accessToken = token.generateAccessToken({
    sub,
    name,
    email,
    sessionId: session.id,
  });

  return { accessToken };
};

export { register, login, logout, refresh };
