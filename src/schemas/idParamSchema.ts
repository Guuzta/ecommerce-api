import { z } from "zod";

export const idParamsSchema = z.object({
  id: z.uuid("ID must be a valid UUID"),
});

export type GetIdParams = z.infer<typeof idParamsSchema>;
