import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.preprocess(
    (value) => (typeof value === "string" ? value.trim().toLowerCase() : value),
    z.email("Invalid email"),
  ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters"),
});

export type LoginBody = z.infer<typeof loginUserSchema>;
