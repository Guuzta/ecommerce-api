import { z } from "zod";

export const addCartItemsSchema = z.object({
  productId: z.uuid("productId must be a valid UUID"),
  quantity: z.coerce.number().int().positive(),
});

export type AddCartItemsBody = z.infer<typeof addCartItemsSchema>;
