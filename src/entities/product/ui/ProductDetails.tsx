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
  action?: ReactNode;
};

export default function ProductDetails({ product, action }: Props) {
  const characteristics = CHAR_KEYS.filter((key) => product[key]);

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
      <div className="relative w-full aspect-square md:w-[400px] md:h-[400px] md:aspect-auto shrink-0 border border-brand rounded-xl overflow-hidden bg-brand-light">
        <Image
          src={product.image.full}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 767px) 100vw, 400px"
          priority
        />
      </div>

      <div className="flex flex-col gap-4">
        <p className="text-[40px] md:text-xl text-center md:text-left">{product.price} ₽</p>

        {action}

        <p className="text-[32px] md:text-base leading-relaxed">{product.description}</p>

        <table className="border-collapse text-[32px] md:text-base">
          <tbody>
            {characteristics.map((key) => (
              <tr key={key} className="border-b border-brand/30">
                <td className="pr-6 py-1 text-brand/70">{LABELS[key]}</td>
                <td className="py-1">{String(product[key])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
