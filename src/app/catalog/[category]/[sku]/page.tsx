import { notFound } from "next/navigation";
import Image from "next/image";
import PageWrapper from "@/components/layout/PageWrapper";
import { getAllProducts, getProductBySku } from "@/lib/mock/products";

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ category: p.category, sku: p.sku }));
}

type Props = { params: Promise<{ category: string; sku: string }> };

const LABELS: Record<string, string> = {
  type: "Тип",
  material: "Материал",
  decoration: "Декор",
  hardware: "Фурнитура",
  size: "Размер",
};

export default async function ProductPage({ params }: Props) {
  const { sku } = await params;
  const product = await getProductBySku(sku);

  if (!product) notFound();

  const characteristics = (["type", "material", "decoration", "hardware", "size"] as const).filter(
    (key) => product[key as keyof typeof product]
  );

  return (
    <PageWrapper>
      <section className="px-5 py-4">
        <h1 className="text-2xl font-normal mb-1">{product.name}</h1>
        <div className="w-[980px] h-px bg-brand ml-0 mb-6" />

        <div className="flex gap-8">
          <div className="relative w-[400px] h-[400px] shrink-0 border border-brand rounded-xl overflow-hidden bg-brand-light">
            <Image
              src={product.image.full}
              alt={product.name}
              fill
              className="object-cover"
              sizes="400px"
              priority
            />
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-xl">{product.price} ₽</p>

            <p className="text-base leading-relaxed">{product.description}</p>

            <table className="border-collapse text-base">
              <tbody>
                {characteristics.map((key) => (
                  <tr key={key} className="border-b border-brand/30">
                    <td className="pr-6 py-1 text-brand/70">{LABELS[key]}</td>
                    <td className="py-1">{String(product[key as keyof typeof product])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
