import { prisma } from "../lib/prisma.js";

import AppError from "../utils/AppError.js";
import * as passwordHash from "../utils/passwordHash.js";

import type { RegisterBody } from "../schemas/registerSchema.js";
import type { LoginBody } from "../schemas/loginSchema.js";

import type { LoginResponse, RegisterResponse } from "../types/auth.js";

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

const login = async (data: LoginBody): Promise<LoginResponse> => {
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

  return {
    message: "Login successful",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

export { register, login };
