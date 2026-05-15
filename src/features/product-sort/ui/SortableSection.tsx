"use client";

import { useState } from "react";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";
import SectionHeader from "@/shared/ui/SectionHeader";
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

export default function SortableSection({
  products,
  category,
  breadcrumbItems,
  heading,
}: Props) {
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  function toggleSort() {
    setSortOrder((prev) =>
      prev === null ? "asc" : prev === "asc" ? "desc" : null,
    );
  }

  const sortedProducts =
    sortOrder === null
      ? products
      : [...products].sort((a, b) =>
          sortOrder === "asc" ? a.price - b.price : b.price - a.price,
        );

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />

      <div className="mb-7 flex items-baseline justify-between gap-4">
        <SectionHeader title={heading} />
        <button
          onClick={toggleSort}
          className="-mt-5 shrink-0 whitespace-nowrap text-[12px] tracking-[0.06em] text-brand-mid/55 transition-colors hover:text-brand"
        >
          Сортировка:{" "}
          <span className="underline underline-offset-2">по цене</span>
          <span className={sortOrder === null ? "invisible" : ""}>
            {sortOrder === "desc" ? " ▼" : " ▲"}
          </span>
        </button>
      </div>

      {sortedProducts.length === 0 ? (
        <p className="text-[15px] text-brand-mid">Товары не найдены.</p>
      ) : (
        <div className="grid grid-cols-2 gap-[18px] min-[481px]:[grid-template-columns:repeat(auto-fill,minmax(196px,1fr))]">
          {sortedProducts.map((product) => (
            <ProductCard
              key={product.sku}
              product={product}
              href={`/catalog/${category}/${product.sku}`}
              action={<BuyButton product={product} size="icon" />}
            />
          ))}
        </div>
      )}
    </>
  );
}
