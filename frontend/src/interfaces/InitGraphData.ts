import { z } from "zod";

export const InitGraphDataSchema = z.object({
  nodes: z.number(),
  sparseness: z.number().max(100).min(1),
});

export type InitGraphInterface = z.infer<typeof InitGraphDataSchema>;
