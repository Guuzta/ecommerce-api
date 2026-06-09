import type { z } from "zod";
import { ERROR_CODES } from "../constants/errorCodes.js";

export function getZodErrorCode(issue: z.ZodError["issues"][number]) {
  const field = issue.path[0];

  if (issue.code === "invalid_type") {
    return ERROR_CODES.REQUIRED_FIELD;
  }

  if (field === "email" && issue.code === "invalid_format") {
    return ERROR_CODES.INVALID_EMAIL;
  }

  if (field === "password" && issue.code === "too_small") {
    return ERROR_CODES.PASSWORD_TOO_SHORT;
  }

  if (field === "password" && issue.code === "too_big") {
    return ERROR_CODES.PASSWORD_TOO_LONG;
  }

  if (field === "password" && issue.code === "invalid_format") {
    return ERROR_CODES.PASSWORD_WEAK;
  }

  return ERROR_CODES.INVALID_FIELD;
}
