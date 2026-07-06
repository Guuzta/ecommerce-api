import { Router } from "express";

import * as orderController from "../controllers/orderController.js";

import requireAuth from "../middlewares/requireAuth.js";

const router = Router();

router.post("/orders/checkout", requireAuth, orderController.createOrder);

router.get('/orders', requireAuth, orderController.listOrders)

export default router;
