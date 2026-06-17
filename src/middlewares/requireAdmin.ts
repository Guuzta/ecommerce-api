import type { Request, Response, NextFunction } from "express";

import AppError from "../utils/AppError.js";

const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    throw new AppError("Unauthorized", 401);
  }

  if (req.user.role !== "ADMIN") {
    throw new AppError("Only administrators can perform this action", 403);
  }
};

export default requireAdmin;
