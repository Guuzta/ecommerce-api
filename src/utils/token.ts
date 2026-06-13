import jwt from "jsonwebtoken";

import { env } from "../config/env.js";

import type { JwtPayload } from "../types/jwt.js";

function generateAccessToken(payload: JwtPayload) {
  const accessToken = jwt.sign(payload, env.TOKEN_SECRET, {
    expiresIn: env.TOKEN_EXPIRATION,
  });

  return accessToken;
}

export { generateAccessToken };
