import { NextResponse } from "next/server";
import { getProductBySku } from "@/lib/mock/products";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ sku: string }> }
) {
  const { sku } = await params;
  const product = await getProductBySku(sku);

  if (!product) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
