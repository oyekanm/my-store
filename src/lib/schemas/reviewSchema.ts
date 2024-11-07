import { z } from "zod";

export const reviewSchema = z.object({
  id: z.string().optional(),
  productId: z.string(),
  rating: z.number(),
  comment: z.string(),
  userId: z.string(),
});
