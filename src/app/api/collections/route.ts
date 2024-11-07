import { db } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const collections = await db.collection.findMany();
    return NextResponse.json(collections);
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request: Request) {
  const response: Collection = await request.json();

  const { name } = response;
  try {
    const unique = await db.collection.findFirst({
      where: {
        name: name,
      },
    });

    if (unique) {
      return NextResponse.json(
        {
          error: "Forbidden error",
        },
        { status: 403, statusText: "This collection already exist" }
      );
    } else {
      const createCollection = await db.collection.create({
        data: {
          name: name,
        },
      });
      return NextResponse.json(createCollection, {
        status: 201,
        statusText: "Success",
      });
    }
  } catch (error) {
    console.log(error);
  }
}
