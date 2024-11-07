"use server"

import { db } from "@/config/db";
import { reviewSchema } from "@/lib/schemas/reviewSchema";

export async function createReview(order: Review) {
  const results = reviewSchema.safeParse(order);
  if (results.success) {
    //   const { userId, color, quantity, size, } = results.data;
    try {
      const createOrder = await db.reviews.create({
        data: results.data,
      });
      return { data: createOrder };
    } catch (error) {
      console.log(error);
    }
  }
}

export async function updateReview(order: Review, id: string) {
  const results = reviewSchema.safeParse(order);
  if (results.success) {
    const { id } = results.data;
    try {
      const createOrder = await db.reviews.update({
        where: { id },
        data: results.data,
      });
      return { data: createOrder };
    } catch (error) {
      console.log(error);
    }
  }
}
export async function deleteReview(id: string) {
  try {
    const createOrder = await db.reviews.delete({
      where: { id },
    });
    return { data: createOrder };
  } catch (error) {
    console.log(error);
  }
}
