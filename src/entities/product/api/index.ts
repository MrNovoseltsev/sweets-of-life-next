import { createAnonSupabaseClient } from "@/shared/lib/supabase";
import type { Product, CategorySlug } from "../model/types";

type ProductRow = {
  sku: string;
  category: Product["category"];
  name: string;
  price: number;
  type: string;
  material: string;
  decoration: string | null;
  hardware: string | null;
  size: string;
  description: string;
  image_full: string;
  image_preview: string;
};

function mapRow(row: ProductRow): Product {
  return {
    sku: row.sku,
    category: row.category,
    name: row.name,
    price: row.price,
    type: row.type,
    material: row.material,
    decoration: row.decoration ?? undefined,
    hardware: row.hardware ?? undefined,
    size: row.size,
    description: row.description,
    image: { full: row.image_full, preview: row.image_preview },
  };
}

const SELECT =
  "sku, category, name, price, type, material, decoration, hardware, size, description, image_full, image_preview";

export async function getAllProducts(): Promise<Product[]> {
  const supabase = createAnonSupabaseClient();
  const { data } = await supabase.from("products").select(SELECT);
  return (data ?? []).map(mapRow);
}

export async function getProductBySku(sku: string): Promise<Product | undefined> {
  const supabase = createAnonSupabaseClient();
  const { data } = await supabase
    .from("products")
    .select(SELECT)
    .eq("sku", sku)
    .single();
  return data ? mapRow(data) : undefined;
}

export async function getProductsByCategory(category: CategorySlug): Promise<Product[]> {
  const supabase = createAnonSupabaseClient();
  const { data } = await supabase
    .from("products")
    .select(SELECT)
    .eq("category", category);
  return (data ?? []).map(mapRow);
}
