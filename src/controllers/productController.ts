import type { Request, Response, NextFunction } from "express";

import * as productService from "../services/productService.js";

import type { CreateProductBody } from "../schemas/createProductSchema.js";
import type { ListProductsQuery } from "../schemas/listProductsSchema.js";
import type { GetProductParams } from "../schemas/getProductSchema.js";
import type { UpdateProductBody } from "../schemas/updateProductSchema.js";
import type { GetIdParams } from "../schemas/idParamSchema.js";

import type {
  CreateProductResponse,
  GetProductBySlugResponse,
  UpdateProductResponse,
} from "../types/product.js";

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

const listProducts = async (
  req: Request<{}, {}, {}, ListProductsQuery>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const products = await productService.listProducts(req.query);

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const getProductBySlug = async (
  req: Request<GetProductParams>,
  res: Response<GetProductBySlugResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const product = await productService.getProductBySlug(req.params);

    res.status(200).json({
      product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (
  req: Request<GetIdParams, {}, UpdateProductBody>,
  res: Response<UpdateProductResponse>,
  next: NextFunction,
): Promise<void> => {
  try {
    const updatedProduct = await productService.updateProduct(
      req.params.id,
      req.body,
    );

    res.status(200).json({
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (
  req: Request<GetIdParams>,
  res: Response<{ message: string }>,
  next: NextFunction,
): Promise<void> => {
  try {
    const message = await productService.deleteProduct(req.params.id);

    res.status(200).json(message);
  } catch (error) {
    next(error);
  }
};

export {
  createProduct,
  listProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct,
};
