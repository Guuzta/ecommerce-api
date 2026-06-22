import type { Request, Response, NextFunction } from "express";

import * as productService from "../services/productService.js";

import type { CreateProductBody } from "../schemas/productSchema.js";

import type { CreateProductResponse } from "../types/product.js";

const createProduct = async (
  req: Request<{}, {}, CreateProductBody>,
  res: Response<CreateProductResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const product = await productService.createProduct(req.body);

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
};

export { createProduct };
