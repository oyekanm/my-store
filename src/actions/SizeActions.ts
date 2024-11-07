"use server";

import { db } from "@/config/db";
import { sizesSchema } from "@/lib/schemas/productSchema";

export async function createSize(size: Size) {
  const results = sizesSchema.safeParse(size);
  if (!results.success) {
    return { error: results.error.message };
  }
  //   const { userId, color, quantity, size, } = results.data;
  try {
    const sizeNameAvailable = await db.size.findUnique({
      where:{
        name:results.data.name,
      }
    })
    const sizeOrderAvailable = await db.size.findFirst({
      where:{
        order: results.data.order, 
      }
    })
    if (sizeNameAvailable) {
      return { error: `${results.data.name} already exist` };
    }
    if (sizeOrderAvailable) {
      return { error: `The order number (${results.data.order}) has already been asigned to another size` };
    }
    // console.log("name",sizeNameAvailable)
    // console.log("order",sizeOrderAvailable)
    const createSize = await db.size.create({
      data: {
        name: results.data.name,
        description: results.data.description,
        order: results.data.order,
        // type: results.data.type, // optional since it has a default value
      },
    });

    return { data: createSize };
  } catch (error) {
    console.error("Error creating size:", error);
    return { error: "Failed to create size" };
  }
}

export async function updateSize(size: Size) {
  const results = sizesSchema.safeParse(size);
  if (results.success) {
    const { id } = results.data;
    try {
      const updateOrder = await db.size.update({
        where: { id },
        data: results.data,
      });
      return { data: updateOrder };
    } catch (error) {
      console.log(error);
    }
  }
}
export async function deleteSize(id: number) {
  try {
    await db.size
      .delete({
        where: { id },
      })
      .then(async () => {
        await db.productSizeColor.deleteMany({
          where: {
            sizeId: id,
          },
        });
      });
    return { data: "success" };
  } catch (error) {
    console.log(error);
  }
}
