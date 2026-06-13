import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import AppError from "../utils/AppError.js";
import { env } from "../config/env.js";

import type { JwtPayload } from "../types/jwt.js";

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError("Token not provided", 401);
  }

  const [, token] = authorization.split(" ");

  if (!token) {
    throw new AppError("Invalid token format", 401);
  }

  try {
    const payload = jwt.verify(token, env.TOKEN_SECRET) as JwtPayload;

    req.user = payload;

    next();
  } catch (err) {
    throw new AppError("Invalid token or expired", 403);
  }
};

export default requireAuth;
