import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .toLowerCase()
      .min(4, "Name must be at least 4 characters")
      .max(12, "Name must be at most 12 characters"),

    email: z.preprocess(
      (value) =>
        typeof value === "string" ? value.trim().toLowerCase() : value,
      z.email("Invalid email"),
    ),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must be at most 16 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-\\[\]/+=;']).+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterBody = z.infer<typeof registerSchema>;
