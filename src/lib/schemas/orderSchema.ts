import { z } from "zod";

export const orderSchema = z.object({
  userId: z
    .string()
    .min(5, { message: "UserId must be at least 5 characters." }),
  total_price: z.number(),
  payment_method: z.string(),
  address: z.string(),
});

export const orderedItemSchema = z.object({
  orderId: z.string(),
  productId: z.string(),
  quantity: z.number(),
  size: z.string(),
  color: z.string(),
});

export const cartSchema = z.object({
  userId: z
    .string()
    .min(5, { message: "Description must be at least 10 characters." }),
  quantity: z.number(),
  size: z
    .string()
    .min(1, { message: "Description must be at least 10 characters." }),
  productId: z
    .string()
    .min(5, { message: "Description must be at least 10 characters." }),
  color: z.string(),
});
