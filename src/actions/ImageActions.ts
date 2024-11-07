"use server";

import { db } from "@/config/db";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function CreateImage(FormData: FormData, productId: string) {
  const form = {
    color: FormData.get("color") as string,
    productId,
  };

  try {
    // checking product availabilty
    const unique = await db.product.findFirst({
      where: {
        id: form.productId,
      },
    });

    // check color uniqueness
    const uniqueColor = await db.image.findFirst({
      where: {
        color: form.color,
        productId: form.productId,
      },
    });

    if (!unique) {
      return {
        error: `Product doesn't exists!, operation faild`,
      };
    }

    if (uniqueColor) {
      return {
        error: `${form.color} already exists!, try another another color`,
      };
    }
    const createdImage = await db.image.create({
      data: form,
    });

    return { data: createdImage };
  } catch (error) {
    console.log(error);
  }
}

export async function UpdateImage(
  FormData: FormData,
  productId: string,
  id: string
) {
  const form = {
    color: FormData.get("color") as string,
  };
  try {
    // checking product availabilty
    const unique = await db.product.findFirst({
      where: {
        id: productId,
      },
    });

    // check color uniqueness
    const uniqueColor = await db.image.findFirst({
      where: {
        color: form.color,
        productId: productId,
      },
    });

    if (!unique) {
      return {
        error: `Product doesn't exists!, operation faild`,
      };
    }

    if (uniqueColor) {
      return {
        error: `${form.color} already exists!, try another another color`,
      };
    }
    const updatedImage = await db.image.update({
      where: {
        id,
      },
      data: form as any,
    });
    return { data: updatedImage };
  } catch (error) {
    console.log(error);
  }
}

export async function DeleteImage(id: string) {
  try {
    const avail = await db.image.findFirst({
      where:{
        id,
      }
    })
    if(!avail){
      return {error: `Error. Data given doesn't exists!, operation faild`,}
    }
    const deletedProduct = await db.image.delete({
      where: {
        id,
      },
      include: {
        file: true,
      },
    });
    if(deletedProduct.file.length === 0) return;
    const keys = deletedProduct.file.map((f) => f.key);
    await utapi.deleteFiles(keys).then(
      async () =>
        await db.imageUrl.deleteMany({
          where: {
            key: {
              in: keys,
            },
          },
        })
    );
    return { data: deletedProduct };
  } catch (error) {
    console.log(error);
  }
}

export async function CreateImageUrl(file: ImageUrl[]) {
  // check product availabilty
  // check color uniqueness

  try {
    const available = await db.image.findFirst({
      where: {
        id: file[0].imageId,
      },
    });
    if (!available) {
      return {
        error: `Product doesn't exists!, operation faild`,
      };
    }
    const createdImage = await db.imageUrl.createMany({
      data: file.map((inp) => ({
        key: inp.key,
        url: inp.url,
        imageId: inp.imageId,
      })),
    });
    return { data: createdImage };
  } catch (error) {
    console.log(error);
  }
}
