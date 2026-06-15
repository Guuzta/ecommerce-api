import type { Request, Response, NextFunction } from "express";

import * as authService from "../services/authService.js";

import type { RegisterBody } from "../schemas/registerSchema.js";
import type { LoginBody } from "../schemas/loginSchema.js";

import type { RegisterResponse } from "../types/auth.js";
import type { AccessTokenPayload, Token } from "../types/jwt.js";

import { setRefreshTokenCookie } from "../utils/setRefreshTokenCookie.js";

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
  res: Response<Token>,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = await authService.login(req.body);

    setRefreshTokenCookie(res, token.refreshToken!);

    res.status(200).json({
      accessToken: token.accessToken,
    });
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
    const { sessionId } = req.user as AccessTokenPayload;

    const message = await authService.logout(sessionId);

    res.clearCookie("refreshToken");

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

const refresh = async (
  req: Request,
  res: Response<Token>,
  next: NextFunction,
): Promise<void> => {
  try {
    const accessToken = await authService.refresh(req);

    res.status(200).json(accessToken);
  } catch (error) {
    next(error);
  }
};

export { register, login, logout, refresh };
