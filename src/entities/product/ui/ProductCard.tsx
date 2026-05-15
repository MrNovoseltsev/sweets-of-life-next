import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Product } from "../model/types";

type Props = {
  product: Product;
  href: string;
  action?: ReactNode;
};

export default function ProductCard({ product, href, action }: Props) {
  return (
    <div className="group relative overflow-hidden rounded-[12px] border border-brand/[0.08] bg-white transition-all hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(30,89,69,0.11)]">
      <Link href={href} className="block">
        <div className="relative w-full overflow-hidden bg-brand-pale pb-[100%]">
          <Image
            src={product.image.preview}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 480px) 50vw, (max-width: 768px) 50vw, 220px"
          />
          {action && (
            <div className="absolute bottom-2.5 right-2.5 translate-y-1.5 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
              {action}
            </div>
          )}
        </div>
        <div className="px-3.5 pb-[15px] pt-[11px]">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap font-display text-[15px] font-normal text-brand">
            {product.name}
          </p>
          <p className="mt-1 text-[14px] font-semibold text-brand-mid">
            {product.price} ₽
          </p>
        </div>
      </Link>
    </div>
  );
}
