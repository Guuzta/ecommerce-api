import { Router } from "express";

import * as productController from "../controllers/productController.js";

import requireAuth from "../middlewares/requireAuth.js";
import requireAdmin from "../middlewares/requireAdmin.js";
import validateInput from "../middlewares/validateInput.js";

import { createProductSchema } from "../schemas/productSchema.js";
import { getProductSchema } from "../schemas/getProductSchema.js";

const router = Router();

router.post(
  "/admin/products",
  requireAuth,
  requireAdmin,
  validateInput(createProductSchema, "body"),
  productController.createProduct,
);

router.get("/products", productController.listProducts);

router.get(
  "/products/:slug",
  validateInput(getProductSchema, "params"),
  productController.getProductBySlug,
);

export default router;
