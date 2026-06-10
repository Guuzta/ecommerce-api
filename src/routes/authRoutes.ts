import { Router } from "express";

import * as authController from "../controllers/authController.js";

import validateInput from "../middlewares/validateInput.js";
import loginRateLimiter from "../middlewares/loginRateLimiter.js";

import { registerSchema } from "../schemas/registerSchema.js";
import { loginUserSchema } from "../schemas/loginSchema.js";

const router = Router();

router.post(
  "/register",
  validateInput(registerSchema, "body"),
  authController.register,
);

router.post(
  "/login",
  loginRateLimiter,
  validateInput(loginUserSchema, "body"),
  authController.login,
);

export default router;
