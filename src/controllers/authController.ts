import type { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";

const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    throw new AppError("TESTANDO ERRO", 403);
  } catch (error) {
    next(error);
  }
};

export { register };
