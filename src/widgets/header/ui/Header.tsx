import Link from "next/link";
import CartButton from "@/features/cart/ui/CartButton";
import HeaderNav from "./HeaderNav";

export default function Header() {
  return (
    <header className="flex flex-wrap justify-between md:h-[120px]">
      <h1 className="font-script text-[clamp(28px,7vw,60px)] ml-5 flex-1 min-w-0">
        <Link href="/">Sweets Of Life</Link>
      </h1>

      <div className="flex items-center md:justify-center md:w-[230px] mr-2.5 shrink-0">
        <CartButton />
      </div>

      <div className="w-full px-2.5">
        <HeaderNav />
      </div>
    </header>
  );
}
