import { AccessTokenPayload } from "./jwt.ts";

declare global {
  namespace Express {
    interface Request {
      user?: AccessTokenPayload;
    }
  }
}

export {};
