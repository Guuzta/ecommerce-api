import { z } from "zod";

import { createProductSchema } from "../schemas/productSchema.js";

export const updateProductSchema = createProductSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export type UpdateProductBody = z.infer<typeof updateProductSchema>;
