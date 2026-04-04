import Link from "next/link";

const navLinks = [
  { href: "/catalog", label: "КАТАЛОГ" },
  { href: "/news", label: "НОВОСТИ" },
  { href: "/order", label: "ЗАКАЗАТЬ" },
  { href: "/contacts", label: "КОНТАКТЫ" },
];

export default function Header() {
  return (
    <header className="flex flex-wrap justify-between h-[120px]">
      <h1 className="font-script text-[60px] ml-5">
        <Link href="/">Sweets Of Life</Link>
      </h1>

      <div className="flex flex-col items-center w-[230px] mr-2.5">
        <p className="pt-5">ПИШИТЕ НАМ:</p>
        <p className="pt-1.5">
          <a href="mailto:info@sweetsoflife.ru" className="hover:font-bold">
            info@sweetsoflife.ru
          </a>
        </p>
      </div>

      <nav className="flex items-center w-[980px] h-[35px] ml-2.5 bg-brand-light border border-brand rounded-full self-end">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex-1 text-center hover:text-[#fff44f]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
