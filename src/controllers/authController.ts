import type { Request, Response, NextFunction } from "express";

import * as authService from "../services/authService.js";

import type { RegisterBody } from "../schemas/registerSchema.js";
import type { LoginBody } from "../schemas/loginSchema.js";

import type { LoginResponse, RegisterResponse } from "../types/auth.js";

const register = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response<RegisterResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const message = await authService.register(req.body);

    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
};

const login = async (
  req: Request<{}, {}, LoginBody>,
  res: Response<LoginResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const message = await authService.login(req.body);

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export { register, login };
