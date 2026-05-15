import Link from "next/link";
import CartButton from "@/features/cart/ui/CartButton";
import AuthButton from "@/features/auth/ui/AuthButton";
import HeaderNav from "./HeaderNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-[200] border-b border-brand/10 bg-[rgba(250,249,247,0.93)] backdrop-blur-[16px]">
      <div className="sol-container relative flex h-[68px] items-center gap-7">
        <Link
          href="/"
          className="font-script text-[clamp(22px,3.5vw,36px)] text-brand tracking-[0.02em] shrink-0 transition-opacity hover:opacity-70"
        >
          Sweets Of Life
        </Link>

        <HeaderNav />

        <div className="ml-auto flex items-center gap-2.5 shrink-0">
          <AuthButton />
          <CartButton />
        </div>
      </div>
    </header>
  );
}
