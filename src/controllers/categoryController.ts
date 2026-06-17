import type { Request, Response, NextFunction } from "express";

import type { CreateCategoryBody } from "../schemas/categorySchema.js";

import type { CreateCategoryResponse } from "../types/category.js";

import * as categoryService from "../services/categoryService.js";

const createCategory = async (
  req: Request<{}, {}, CreateCategoryBody>,
  res: Response<CreateCategoryResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const category = await categoryService.createCategory(req.body.name);

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    next(error);
  }
};

export { createCategory };
