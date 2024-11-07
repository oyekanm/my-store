"use server";

import { db } from "@/config/db";

export async function CreateProduct(
  FormData: FormData,
  collectionTypeId: string
) {
  const form = {
    title: FormData.get("title") as string,
    price: Number(FormData.get("price")) as number,
    description: FormData.get("description") as string,
    collectionTypeId,
    uploadStatus: "PROCESSING",
    rating: Number(FormData.get("rating")) as number
  };

  // console.log(form);

  try {
    // check db for incoming product details
    const unique = await db.product.findFirst({
      where: {
        title: form.title,

      },
    });

    if (unique) {
      return {
        error: `${unique.title} already exists!, try another another title`,
      };
    }

    // create products
    const newProduct = await db.product.create({
      data: form as any,
    });
    return { data: newProduct };
  } catch (error) {
    console.log(error);
  }
}

export async function UpdateStatus(
  id: string
) {
 

  try {
    // check db for incoming product details
    const updatedProduct =  await db.product.update({
      where:{
          uploadStatus:"PROCESSING",
          id
      },
      data:{
          uploadStatus:"SUCCESS"
      }
     })
    return { data: updatedProduct };
  } catch (error) {
    console.log(error);
  }
}
export async function UpdateProduct(
  FormData: FormData,
  collectionTypeId: string,
  id: string
) {
  const form = {
    title: FormData.get("title") as string,
    price: Number(FormData.get("price")) as number,
    description: FormData.get("description") as string,
    collectionTypeId,
    rating: Number(FormData.get("rating")) as number
  };

  try {
    // check db for incoming product details
    const unique = await db.product.findFirst({
      where: {
        title: form.title,
      },
    });

    if (unique) {
      return {
        error: `${unique.title} already exists!, try another another title`,
      };
    }
    const updatedProduct = await db.product.update({
      where: {
        id,
      },
      data: form as any,
    });
    return { data: updatedProduct };
  } catch (error) {
    console.log(error);
  }
}



export async function DeleteSingleProduct(id: string) {
  try {
    const avail = await db.product.findFirst({
      where:{
        id,
      }
    })
    if(!avail){
      return {error: `Error. Data given doesn't exists!, operation faild`,}
    }
    const deletedProduct = await db.product.delete({
      where: {
        id,
      },
      include:{
        image: true
      }
    });
    return {data:deletedProduct};
  } catch (error) {
    console.log(error);
  }
}
export async function DeleteMultipleProduct(id: string[]) {
  try {
    const deletedProduct = await db.product.deleteMany({
      where: {
        id: {
          in: id,
        },
      },
    });
    return deletedProduct;
  } catch (error) {
    console.log(error);
  }
}
