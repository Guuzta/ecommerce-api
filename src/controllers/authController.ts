import type { Request, Response, NextFunction } from "express";

import * as authService from "../services/authService.js";

import type { RegisterBody } from "../schemas/registerSchema.js";
import type { LoginBody } from "../schemas/loginSchema.js";

import type { RegisterResponse } from "../types/auth.js";
import type { JwtPayload, Tokens } from "../types/jwt.js";

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
  res: Response<Tokens>,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = await authService.login(req.body);

    res.status(200).json(token);
  } catch (error) {
    next(error);
  }
};

const logout = async (
  req: Request,
  res: Response<{ message: string }>,
  next: NextFunction,
): Promise<void> => {
  try {
    const { sessionId } = req.user as JwtPayload;

    const message = await authService.logout(sessionId);

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export { register, login, logout };
