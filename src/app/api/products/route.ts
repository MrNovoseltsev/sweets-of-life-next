import { NextRequest, NextResponse } from "next/server";
import {
  getAllProducts,
  getProductsByCategory,
} from "@/entities/product/api";

const VALID_CATEGORIES = [
  "bracelets",
  "brooches",
  "earrings",
  "pendants",
  "rings",
  "sets",
  "tiaras",
  "toys",
] as const;

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const category = searchParams.get("category");
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const perPage = Math.min(
    100,
    Math.max(1, parseInt(searchParams.get("perPage") ?? "12", 10) || 12)
  );

  if (category !== null && !(VALID_CATEGORIES as readonly string[]).includes(category)) {
    return NextResponse.json(
      { error: `Invalid category. Valid values: ${VALID_CATEGORIES.join(", ")}` },
      { status: 400 }
    );
  }

  const all = category
    ? await getProductsByCategory(category as Parameters<typeof getProductsByCategory>[0])
    : await getAllProducts();

  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const clampedPage = Math.min(page, totalPages);
  const products = all.slice((clampedPage - 1) * perPage, clampedPage * perPage);

  return NextResponse.json({ products, total, page: clampedPage, totalPages });
}
