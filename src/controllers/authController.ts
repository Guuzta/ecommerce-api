import type { Request, Response, NextFunction } from "express";

import * as authService from "../services/authService.js";

import type { RegisterBody } from "../schemas/registerSchema.js";

import type { RegisterResponse } from "../types/auth.js";

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

export { register };
