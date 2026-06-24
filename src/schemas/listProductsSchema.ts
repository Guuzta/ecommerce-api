import { z } from "zod";

export const listProductsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),

  search: z.string().trim().optional(),
  category: z.string().trim().optional(),

  sort: z
    .enum(["latest", "price_asc", "price_desc", "name_asc"])
    .default("latest"),
});

export type ListProductsQuery = z.infer<typeof listProductsSchema>;
