import { getProducts } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  const { data } = await getProducts({ isFeatured: true, limit: 24 });
  return NextResponse.json(data);
}
