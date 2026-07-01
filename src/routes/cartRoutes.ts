import { Router } from "express";

import * as cartController from "../controllers/cartController.js";

import validateInput from "../middlewares/validateInput.js";

import requireAuth from "../middlewares/requireAuth.js";

import { addCartItemsSchema } from "../schemas/addCartItemsSchema.js";

const router = Router();

router.get("/cart", requireAuth, cartController.listCartItems);

router.post(
  "/cart/items",
  requireAuth,
  validateInput(addCartItemsSchema, "body"),
  cartController.addCartItems,
);
export default router;
