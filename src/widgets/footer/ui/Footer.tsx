import Link from "next/link";
import VK from "@/shared/ui/icons/VK";

type FooterLink = { href: string; label: string };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Магазин",
    links: [
      { href: "/about", label: "О магазине" },
      { href: "/news", label: "Новости" },
      { href: "/contacts", label: "Контакты" },
    ],
  },
  {
    title: "Покупателю",
    links: [
      { href: "/order", label: "Как сделать заказ" },
      { href: "/order#payment", label: "Оплата" },
      { href: "/order#delivery", label: "Доставка" },
    ],
  },
  {
    title: "Наши друзья",
    links: [
      { href: "/friends", label: "Love's Avenue" },
      { href: "/friends", label: "Wake Up Studio" },
      { href: "/friends", label: "Ксения Михалёва" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-brand/10 bg-brand/[0.025]">
      <div className="sol-container">
        <div className="grid grid-cols-1 min-[481px]:grid-cols-2 md:grid-cols-4 gap-7 pt-9 pb-7">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="mb-3 text-[10px] tracking-[0.18em] uppercase text-brand/45">
                {col.title}
              </p>
              {col.links.map((link) => (
                <Link
                  key={`${link.href}-${link.label}`}
                  href={link.href}
                  className="block py-[3px] text-[13px] text-brand opacity-70 transition-opacity hover:opacity-100"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          ))}

          <div>
            <p className="mb-3 text-[10px] tracking-[0.18em] uppercase text-brand/45">
              Социальные сети
            </p>
            <a
              href="https://vk.com/sweetsoflifehandmade"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ВКонтакте"
              className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#4c75a3] text-white transition-all hover:scale-110 hover:shadow-[0_0_16px_rgba(76,117,163,0.45)]"
            >
              <VK />
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2.5 border-t border-brand/[0.07] py-4 pb-6">
          <p className="text-[11px] tracking-[0.04em] text-brand/40">
            © 2026 интернет-магазин «Sweets Of Life»
          </p>
        </div>
      </div>
    </footer>
  );
}
