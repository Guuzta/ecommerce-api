import { Router } from "express";

import * as cartController from "../controllers/cartController.js";

import requireAuth from "../middlewares/requireAuth.js";

const router = Router();

router.get("/cart", requireAuth, cartController.listCartItems);

export default router;
