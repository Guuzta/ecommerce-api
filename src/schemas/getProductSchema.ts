import { z } from "zod";

export const getProductSchema = z.object({
  slug: z
    .string()
    .min(2)
    .regex(/^[a-z0-9-]+$/, "Invalid slug format"),
});

export type GetProductParams = z.infer<typeof getProductSchema>;
