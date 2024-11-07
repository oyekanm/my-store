import { db } from "@/config/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const collections = await db.collectionType.findMany();
    return NextResponse.json(collections);
  } catch (error) {
    console.log(error);
  }
}
