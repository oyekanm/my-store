import { db } from "@/config/db";
import { NextResponse } from "next/server";

type Params = {
  params: { productId: string };
};

export async function GET({ params: { productId:id } }: Params) {

  console.log(id)
  // try {
  //   const products = await db.product.findFirst({
  //     where: {
  //       id,
  //     },
  //     include: {
  //       image: {
  //         include: {
  //           file: true,
  //         },
  //       },
  //       CollectionType: true,
  //     },
  //   });
  //   return NextResponse.json(products);
  // } catch (error) {
  //   console.log(error);
  // }
}

export async function PATCH(request: Request, { params: { productId:id } }: Params) {
  const requests: Product = await request.json();

  const { title, price, currency, description, collectionTypeId } = requests;

  try {
    const updatedProduct = await db.product.update({
      where: {
        id,
      },
      data: {
        title: title,
        description: description,
        price: price,
        collectionTypeId: collectionTypeId,
        currency: currency,
        uploadStatus: "PROCESSING",
      },
    });
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE({ params: { productId:id} }: Params) {
  try {
    const deletedProduct = await db.product.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.log(error);
  }
}
