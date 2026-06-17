import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(4, "Category name must have at least 4 characters")
    .max(30, "Category name must have at most 30 characters"),
});

export type CreateCategoryBody = z.infer<typeof createCategorySchema>;
