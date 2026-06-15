import jwt from "jsonwebtoken";

import { env } from "../config/env.js";

import type { AccessTokenPayload, RefreshTokenPayload } from "../types/jwt.js";

function generateAccessToken(payload: AccessTokenPayload) {
  const accessToken = jwt.sign(payload, env.TOKEN_SECRET, {
    expiresIn: env.TOKEN_EXPIRATION,
  });

  return accessToken;
}

function generateRefreshToken(payload: RefreshTokenPayload) {
  const refreshToken = jwt.sign(payload, env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_EXPIRATION,
  });

  return refreshToken;
}

function verifyToken(refreshToken: string): RefreshTokenPayload | null {
  try {
    const payload = jwt.verify(
      refreshToken,
      env.REFRESH_TOKEN_SECRET,
    ) as RefreshTokenPayload;

    return payload;
  } catch (error) {
    return null;
  }
}

export { generateAccessToken, generateRefreshToken, verifyToken };
