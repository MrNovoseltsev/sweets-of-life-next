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
    <div className="group w-[220px] border border-brand rounded-xl overflow-hidden hover:shadow-[0_0_10px_0_var(--color-brand)] transition-shadow flex flex-col">
      <Link href={href} className="flex flex-col flex-1">
        <div className="relative w-full h-[180px] bg-brand-light">
          <Image
            src={product.image.preview}
            alt={product.name}
            fill
            className="object-cover"
            sizes="220px"
          />
        </div>
        <div className="p-2 flex-1">
          <p className="text-base leading-tight">{product.name}</p>
          <p className="text-sm mt-1">{product.price} ₽</p>
        </div>
      </Link>
      {action && <div className="px-2 pb-2">{action}</div>}
    </div>
  );
}
