import Image from "next/image";
import type { ReactNode } from "react";
import type { Product } from "../model/types";

const LABELS: Record<string, string> = {
  type: "Тип",
  material: "Материал",
  decoration: "Декор",
  hardware: "Фурнитура",
  size: "Размер",
};

const CHAR_KEYS = ["type", "material", "decoration", "hardware", "size"] as const;

type Props = {
  product: Product;
  categoryLabel?: string;
  action?: ReactNode;
};

export default function ProductDetails({
  product,
  categoryLabel,
  action,
}: Props) {
  const characteristics = CHAR_KEYS.filter((key) => product[key]);

  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
      {/* Gallery */}
      <div className="relative aspect-square w-full overflow-hidden rounded-[16px] bg-brand-pale">
        <Image
          src={product.image.full}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 520px"
          priority
        />
      </div>

      {/* Info */}
      <div className="pt-2">
        {categoryLabel && (
          <span className="mb-4 inline-block rounded-full bg-brand-pale px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-brand-mid">
            {categoryLabel}
          </span>
        )}

        <h1 className="mb-3.5 font-display text-[clamp(28px,3.5vw,42px)] font-light leading-[1.15] text-brand">
          {product.name}
        </h1>

        <p className="mb-6 font-display text-[32px] font-normal text-brand">
          {product.price} ₽
        </p>

        <p className="mb-7 text-[14px] leading-[1.7] text-brand-mid/85">
          {product.description}
        </p>

        <dl className="mb-8">
          <div className="flex gap-3 border-b border-brand/[0.07] py-[9px] text-[13px]">
            <dt className="min-w-[100px] shrink-0 text-brand-mid/55">
              Артикул
            </dt>
            <dd className="text-brand">{product.sku}</dd>
          </div>
          {characteristics.map((key) => (
            <div
              key={key}
              className="flex gap-3 border-b border-brand/[0.07] py-[9px] text-[13px]"
            >
              <dt className="min-w-[100px] shrink-0 text-brand-mid/55">
                {LABELS[key]}
              </dt>
              <dd className="text-brand">{String(product[key])}</dd>
            </div>
          ))}
        </dl>

        {action}
      </div>
    </div>
  );
}
