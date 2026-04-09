"use client";

import { useState } from "react";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";
import ProductCard from "@/entities/product/ui/ProductCard";
import BuyButton from "@/features/cart/ui/BuyButton";
import type { Product } from "@/entities/product/model/types";

type BreadcrumbItem = { label: string; href?: string };

type SortOrder = null | "asc" | "desc";

type Props = {
  products: Product[];
  category: string;
  breadcrumbItems: BreadcrumbItem[];
  heading: string;
};

export default function SortableSection({ products, category, breadcrumbItems, heading }: Props) {
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  function toggleSort() {
    setSortOrder((prev) => (prev === null ? "asc" : prev === "asc" ? "desc" : null));
  }

  const sortedProducts =
    sortOrder === null
      ? products
      : [...products].sort((a, b) =>
          sortOrder === "asc" ? a.price - b.price : b.price - a.price
        );

  return (
    <>
      <div className="flex items-center justify-between mb-1">
        <Breadcrumbs items={breadcrumbItems} />
        <button
          onClick={toggleSort}
          className="text-2xl desktop:text-sm text-brand/60 hover:text-brand transition-colors whitespace-nowrap"
        >
          Сортировка:{" "}
          <span className="underline underline-offset-2">по цене</span>
          <span className={sortOrder === null ? "invisible" : ""}>
            {sortOrder === "desc" ? " ▼" : " ▲"}
          </span>
        </button>
      </div>

      <h1 className="hidden desktop:block text-2xl font-normal mb-1">
        {heading.toUpperCase()}
      </h1>
      <div className="w-full h-px bg-brand mb-4" />

      {sortedProducts.length === 0 ? (
        <p className="ml-2.5 text-lg">Товары не найдены.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 desktop:grid-cols-4 gap-3 md:gap-4">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.sku}
              product={product}
              href={`/catalog/${category}/${product.sku}`}
              action={<BuyButton product={product} size="sm" />}
            />
          ))}
        </div>
      )}
    </>
  );
}
