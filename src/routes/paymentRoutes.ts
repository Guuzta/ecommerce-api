import { Router } from "express";

import * as paymentController from "../controllers/paymentController.js";

import requireAuth from "../middlewares/requireAuth.js";
import validateInput from "../middlewares/validateInput.js";

import { idParamsSchema } from "../schemas/idParamSchema.js";

const router = Router();

router.post(
  "/payments/:orderId/pay",
  requireAuth,
  validateInput(idParamsSchema, "params"),
  paymentController.pay,
);

router.post(
  "/payments/:orderId/cancel",
  requireAuth,
  validateInput(idParamsSchema, "params"),
  paymentController.cancel,
);

export default router;
