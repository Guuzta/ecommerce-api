import { Router } from "express";

import * as categoryController from "../controllers/categoryController.js";

import requireAuth from "../middlewares/requireAuth.js";
import requireAdmin from "../middlewares/requireAdmin.js";
import validateInput from "../middlewares/validateInput.js";

import { createCategorySchema } from "../schemas/categorySchema.js";

const router = Router();

router.post(
  "/admin/categories",
  requireAuth,
  requireAdmin,
  validateInput(createCategorySchema, "body"),
  categoryController.createCategory,
);

router.get(
  "/categories",
  categoryController.listCategories
)

export default router;
