import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

import { getZodErrorCode } from "../utils/getZodErrorCode.js";

export default function validateInput(
  schema: z.ZodObject<any>,
  source: "body" | "params" | "query",
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const issues = result.error.issues;

      const errors = issues.map((issue) => ({
        field: issue.path.join("."),
        code: getZodErrorCode(issue),
        message: issue.message,
      }));

      return res.status(400).json({
        errors,
      });
    }

    req[source] = result.data;
    next();
  };
}
