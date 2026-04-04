import products from "@/data/products.json";

export type Product = (typeof products)[number];

export async function getAllProducts(): Promise<Product[]> {
  return products;
}

export async function getProductBySku(sku: string): Promise<Product | undefined> {
  return products.find((p) => p.sku === sku);
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return products.filter((p) => p.category === category);
}
