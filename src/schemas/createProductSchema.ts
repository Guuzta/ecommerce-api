import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2),
  description: z
    .string()
    .optional()
    .transform((value) => value ?? null),
  price: z.coerce.number().positive(),
  stock: z.coerce.number().int().positive(),
  categoryId: z.uuid(),
});

export type CreateProductBody = z.infer<typeof createProductSchema>;
