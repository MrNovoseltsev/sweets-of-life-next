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
    <div className="group w-full border border-brand rounded-xl overflow-hidden hover:shadow-[0_0_10px_0_var(--color-brand)] transition-shadow flex flex-col">
      <Link href={href} className="flex flex-col flex-1">
        <div className="relative w-full aspect-square bg-brand-light">
          <Image
            src={product.image.preview}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 767px) 50vw, (max-width: 1199px) 50vw, 235px"
          />
        </div>
        <div className="p-1.5 desktop:p-2 flex-1 text-center desktop:text-left">
          <p className="text-[28px] desktop:text-base leading-tight">{product.name}</p>
          <p className="text-[24px] desktop:text-sm mt-1">{product.price} ₽</p>
        </div>
      </Link>
      {action && <div className="px-1.5 md:px-2 pb-1.5 md:pb-2">{action}</div>}
    </div>
  );
}
