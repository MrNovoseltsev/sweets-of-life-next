import { notFound } from "next/navigation";
import PageLayout from "@/widgets/page-layout/ui/PageLayout";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";
import { CATEGORY_META, CATEGORY_SLUGS } from "@/shared/config/categories";
import { getProductsByCategory } from "@/entities/product/api";
import type { CategorySlug } from "@/entities/product/model/types";
import ProductCard from "@/entities/product/ui/ProductCard";
import BuyButton from "@/features/cart/ui/BuyButton";

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((category) => ({ category }));
}

type Props = { params: Promise<{ category: string }> };

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  if (!CATEGORY_SLUGS.includes(category as CategorySlug)) {
    notFound();
  }

  const meta = CATEGORY_META.find((c) => c.slug === category)!;
  const products = await getProductsByCategory(category);

  return (
    <PageLayout>
      <section className="px-2.5 py-4">
        <Breadcrumbs
          items={[
            { label: "Каталог", href: "/catalog" },
            { label: meta.label },
          ]}
        />
        <h1 className="hidden desktop:block text-2xl font-normal mb-1">{meta.label.toUpperCase()}</h1>
        <div className="w-full h-px bg-brand mb-4" />

        {products.length === 0 ? (
          <p className="ml-2.5 text-lg">Товары не найдены.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 desktop:grid-cols-4 gap-3 md:gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.sku}
                product={product}
                href={`/catalog/${category}/${product.sku}`}
                action={<BuyButton product={product} size="sm" />}
              />
            ))}
          </div>
        )}
      </section>
    </PageLayout>
  );
}
