import { notFound } from "next/navigation";
import PageLayout from "@/widgets/page-layout/ui/PageLayout";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";
import { CATEGORY_META } from "@/shared/config/categories";
import { getAllProducts, getProductBySku } from "@/entities/product/api";
import ProductDetails from "@/entities/product/ui/ProductDetails";
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

  const categoryLabel = CATEGORY_META.find((c) => c.slug === category)?.label ?? category;

  return (
    <PageLayout>
      <section className="px-5 py-4">
        <Breadcrumbs
          items={[
            { label: "Каталог", href: "/catalog" },
            { label: categoryLabel, href: `/catalog/${category}` },
          ]}
        />
        <h1 className="text-2xl font-normal mb-1">{product.name}</h1>
        <div className="w-full h-px bg-brand ml-0 mb-6" />

        <ProductDetails product={product} action={<BuyButton product={product} />} />
      </section>
    </PageLayout>
  );
}
