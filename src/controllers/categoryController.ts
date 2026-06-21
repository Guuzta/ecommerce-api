import type { Request, Response, NextFunction } from "express";

import type { CreateCategoryBody } from "../schemas/categorySchema.js";

import type {
  CreateCategoryResponse,
  ListCategoriesResponse,
} from "../types/category.js";

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

const listCategories = async (
  req: Request,
  res: Response<ListCategoriesResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const categories = await categoryService.listCategories();

    res.status(200).json({
      categories,
    });
  } catch (error) {
    next(error);
  }
};

export { createCategory, listCategories };
