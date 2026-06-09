import { prisma } from "../lib/prisma.js";

import AppError from "../utils/AppError.js";
import * as passwordHash from "../utils/passwordHash.js";

import type { RegisterBody } from "../schemas/registerSchema.js";
import type { RegisterResponse } from "../types/auth.js";

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

export { register };
