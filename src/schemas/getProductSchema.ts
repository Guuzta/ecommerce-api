import { z } from "zod";

export const getProductSchema = z.object({
  id: z.uuid("ID must be a valid UUID"),
});

export type GetProductParams = z.infer<typeof getProductSchema>;
