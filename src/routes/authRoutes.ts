import { Router } from "express";

import * as authController from "../controllers/authController.js";

const router = Router();

router.get("/register", authController.register);

export default router;
