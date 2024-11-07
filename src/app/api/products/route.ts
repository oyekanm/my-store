import { db } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const title = url.searchParams.get("title");

  console.log(title)

  if (title) {
    try {
      const products = await db.product.findFirst({
        where: {
          title,
        },
        include: {
          image: {
            include: {
             file:true
            },
          },
          CollectionType: true,
        },
      });
      return NextResponse.json(products);
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const products = await db.product.findMany({
        include: {
          image: {
            include: {
             Product:true,
             file:true
            },
          },
          CollectionType: true,
        },
      });
      return NextResponse.json(products);
    } catch (error) {
      console.log(error);
    }
  }
}


