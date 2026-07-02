import { z } from "zod";

export const updateCartItemsSchema = z.object({
  quantity: z.coerce.number().int().positive(),
});

export type UpdateCartItemsBody = z.infer<typeof updateCartItemsSchema>;
