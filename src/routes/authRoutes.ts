import { Router } from "express";

import * as authController from "../controllers/authController.js";

import validateInput from "../middlewares/validateInput.js";

import { registerSchema } from "../schemas/registerSchema.js";

const router = Router();

router.post(
  "/register",
  validateInput(registerSchema, "body"),
  authController.register,
);

export default router;
