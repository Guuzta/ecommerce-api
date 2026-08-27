import rateLimit from "express-rate-limit";

import { env } from "../config/env.js";

const loginRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many login attempts. Try again later.",
  },

  skip: () => env.NODE_ENV === "test",
});

export default loginRateLimiter;
