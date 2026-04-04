import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PageWrapper from "@/components/layout/PageWrapper";
import { CATEGORY_META, CATEGORY_SLUGS } from "@/lib/constants";
import { getProductsByCategory } from "@/lib/mock/products";
import type { CategorySlug } from "@/lib/types";

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
    <PageWrapper>
      <section className="px-2.5 py-4">
        <h1 className="text-2xl font-normal mb-1">{meta.label.toUpperCase()}</h1>
        <div className="w-[980px] h-px bg-brand ml-2.5 mb-4" />

        {products.length === 0 ? (
          <p className="ml-2.5 text-lg">Товары не найдены.</p>
        ) : (
          <div className="flex flex-wrap gap-4 ml-2.5">
            {products.map((product) => (
              <Link
                key={product.sku}
                href={`/catalog/${category}/${product.sku}`}
                className="group w-[220px] border border-brand rounded-xl overflow-hidden hover:shadow-[0_0_10px_0_var(--color-brand)] transition-shadow"
              >
                <div className="relative w-full h-[180px] bg-brand-light">
                  <Image
                    src={product.image.preview}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="220px"
                  />
                </div>
                <div className="p-2">
                  <p className="text-base leading-tight">{product.name}</p>
                  <p className="text-sm mt-1">{product.price} ₽</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </PageWrapper>
  );
}
