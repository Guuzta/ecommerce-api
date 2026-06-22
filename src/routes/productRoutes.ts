import { Router } from "express";

import * as productController from "../controllers/productController.js";

import requireAuth from "../middlewares/requireAuth.js";
import requireAdmin from "../middlewares/requireAdmin.js";
import validateInput from "../middlewares/validateInput.js";

import { createProductSchema } from "../schemas/productSchema.js";

const router = Router();

router.post(
  "/admin/products",
  requireAuth,
  requireAdmin,
  validateInput(createProductSchema, "body"),
  productController.createProduct,
);

export default router;
