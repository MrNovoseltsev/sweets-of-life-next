import { notFound } from "next/navigation";
import PageLayout from "@/widgets/page-layout/ui/PageLayout";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";
import SectionHeader from "@/shared/ui/SectionHeader";
import { CATEGORY_META } from "@/shared/config/categories";
import {
  getAllProducts,
  getProductBySku,
  getProductsByCategory,
} from "@/entities/product/api";
import type { CategorySlug } from "@/entities/product/model/types";
import ProductDetails from "@/entities/product/ui/ProductDetails";
import ProductCard from "@/entities/product/ui/ProductCard";
import BuyButton from "@/features/cart/ui/BuyButton";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ category: p.category, sku: p.sku }));
}

type Props = { params: Promise<{ category: string; sku: string }> };

export default async function ProductPage({ params }: Props) {
  const { category, sku } = await params;
  const product = await getProductBySku(sku);

  if (!product) notFound();

  const categoryLabel =
    CATEGORY_META.find((c) => c.slug === category)?.label ?? category;

  const related = (await getProductsByCategory(category as CategorySlug))
    .filter((p) => p.sku !== product.sku)
    .slice(0, 4);

  return (
    <PageLayout>
      <section className="sol-container py-10">
        <Breadcrumbs
          items={[
            { label: "Главная", href: "/" },
            { label: "Каталог", href: "/catalog" },
            { label: categoryLabel, href: `/catalog/${category}` },
            { label: product.name },
          ]}
        />

        <ProductDetails
          product={product}
          categoryLabel={categoryLabel}
          action={<BuyButton product={product} size="md" />}
        />

        {related.length > 0 && (
          <div className="mt-16">
            <SectionHeader title="Похожие украшения" />
            <div className="grid grid-cols-2 gap-[18px] md:grid-cols-4">
              {related.map((p) => (
                <ProductCard
                  key={p.sku}
                  product={p}
                  href={`/catalog/${p.category}/${p.sku}`}
                  action={<BuyButton product={p} size="icon" />}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </PageLayout>
  );
}
