import { db } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const userId:string = url.searchParams.get("userId") || "";

  // console.log("cart", userId)
    try {
      const cartItems = await db.cartItem.findMany({
        where:{
          userId
        },
        include:{
          product:{
            include:{
              CollectionType:{
                select:{
                  name:true
                }
              },
              image:{
                include:{
                  file:true
                }
              }
            }
          }
        },
orderBy:{
  createdAt:"asc"
}
      });
      return NextResponse.json(cartItems);
    } catch (error) {
      console.log(error);
    }
  }