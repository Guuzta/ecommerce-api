import dotenv from "dotenv";
import { z } from "zod";

const envFile = process.env.NODE_ENV ?? "development";

dotenv.config({
  path: `.env.${envFile}`,
});

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce.number().int().positive(),

  DATABASE_URL: z.string().min(1),

  TOKEN_SECRET: z.string().min(1),
  TOKEN_EXPIRATION: z.enum(["1m", "5m", "15m", "1h", "7d"]),

  REFRESH_TOKEN_SECRET: z.string().min(1),
  REFRESH_TOKEN_EXPIRATION: z.enum(["7d", "15d", "30d"]),

  ADMIN_EMAIL: z.email(),
  ADMIN_PASSWORD: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(16, "Password must be at most 16 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>_\-\\[\]/+=;']).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    ),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:");
  console.log(z.flattenError(parsedEnv.error));

  process.exit(1);
}

export const env = parsedEnv.data;
