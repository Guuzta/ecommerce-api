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

  //DATABASE_URL: z.string().min(1),

  //TOKEN_SECRET: z.string().min(1),
  //TOKEN_EXPIRATION: z.string().min(1),

  //REFRESH_TOKEN_SECRET: z.string().min(1),
  //REFRESH_TOKEN_EXPIRATION: z.string().min(1),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:");
  console.log(z.flattenError(parsedEnv.error));

  process.exit(1);
}

export const env = parsedEnv.data;
