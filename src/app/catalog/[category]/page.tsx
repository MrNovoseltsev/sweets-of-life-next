import { notFound } from "next/navigation";
import PageLayout from "@/widgets/page-layout/ui/PageLayout";
import { CATEGORY_META, CATEGORY_SLUGS } from "@/shared/config/categories";
import { getProductsByCategory } from "@/entities/product/api";
import type { CategorySlug } from "@/entities/product/model/types";
import SortableSection from "@/features/product-sort/ui/SortableSection";

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
        <SortableSection
          products={products}
          category={category}
          breadcrumbItems={[
            { label: "Каталог", href: "/catalog" },
            { label: meta.label },
          ]}
          heading={meta.label}
        />
      </section>
    </PageLayout>
  );
}
