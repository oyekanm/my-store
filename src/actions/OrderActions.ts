"use server";

import { db } from "@/config/db";
import {
  cartSchema,
  orderSchema,
  orderedItemSchema,
} from "@/lib/schemas/orderSchema";

// create order mutations
export async function createOrder(order: Order) {
  const results = orderSchema.safeParse(order);

  if (results.success) {
    const form = {
    ...results.data,
      status: "PROCESSING",
    };
    //   const { userId, color, quantity, size, } = results.data;
    try {
      const createOrder = await db.order.create({
        data: form as any,
      });
      return { data: createOrder };
    } catch (error) {
      console.log(error);
    }
  }
}

export async function createOrderedItem(order: OrderedItem) {
  const results = orderedItemSchema.safeParse(order);
  if (results.success) {
    //   const { userId, color, quantity, size, } = results.data;
    try {
      const createOrder = await db.orderedItem.create({
        data: results.data,
      });
      return { data: createOrder };
    } catch (error) {
      console.log(error);
    }
  }
}

// cart item mutation
export async function createCartItem(cart: CartItem) {
  const results = cartSchema.safeParse(cart);
  if (results.success) {
    const { userId, productId, color, quantity, size } = results.data;
    try {
      const unique = await db.cartItem.findFirst({
        where: {
          userId,
          productId,
          color,
          size,
        },
      });

      if (unique) {
        const updatedCart = await db.cartItem.update({
          where: {
            id: unique.id,
          },
          data: {
            quantity: unique.quantity + quantity,
          },
        });

        return { data: updatedCart };
      } else {
        const createCartItems = await db.cartItem.create({
          data: results.data,
        });
        return { data: createCartItems };
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export async function deleteCartItem(id: string) {
  try {
    const deletedCart = await db.cartItem.delete({
      where: {
        id,
      },
    });
    return { data: deletedCart };
  } catch (error) {
    console.log(error);
  }
}

export async function deleteAllCartItem(ids: string[], userId: string) {
  try {
    const deletedCart = await db.cartItem.deleteMany({
      where: {
        userId,
        id:{
          in:ids
        },
      },

    });
    return { data: deletedCart };
  } catch (error) {
    console.log(error);
  }
}

export async function updateQuantity(cart: CartItem, id:string) {
  const results = cartSchema.safeParse(cart);
  if (results.success) {
    const { userId, color, quantity, size, productId } = results.data;
    try {
      if(quantity < 0){
        await deleteCartItem(id)
      }
      const createOrder = await db.cartItem.update({
       where:{
        id,
        userId,
        color,
        size,
        productId,
       },
        data:{
          quantity:quantity
        }
      });
      return { data: createOrder };
    } catch (error) {
      console.log(error);
    }
  }
}
