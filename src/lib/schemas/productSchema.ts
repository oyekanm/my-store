import { z } from "zod";

export const sizesSchema = z.object({
    name: z.string().min(1, {
      message: "Name must be at least 1 characters.",
    }),
    description: z
      .string()
      .optional(),
    order:z.coerce.number().gte(1,{message:"Order value must be atleast 1 character"}),
    id: z.number().optional(),
  });