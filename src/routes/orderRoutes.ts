import { Router } from "express";

import * as orderController from "../controllers/orderController.js";

import requireAuth from "../middlewares/requireAuth.js";
import validateInput from "../middlewares/validateInput.js";

import { idParamsSchema } from "../schemas/idParamSchema.js";

const router = Router();

router.post("/orders/checkout", requireAuth, orderController.createOrder);

router.get("/orders", requireAuth, orderController.listOrders);

router.get(
  "/orders/:id",
  requireAuth,
  validateInput(idParamsSchema, "params"),
  orderController.getOrderById,
);

export default router;
