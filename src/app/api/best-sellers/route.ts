import { db } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

    const bestSellers = await db.orderedItem.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true
      },
      where: {
        order: {
          createdAt: {
            gte: thirtyDaysAgo
          }
        }
      },
      orderBy: {
        _sum: {
          quantity: 'desc'
        }
      },
      take: 10
    })
  
    const bestSellerProducts = await db.product.findMany({
      where: {
        id: {
          in: bestSellers.map(item => item.productId)
        }
      }
    })
  
    NextResponse.json(bestSellerProducts)
  }