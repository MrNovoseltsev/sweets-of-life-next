import Link from "next/link";

const footerNav = [
  { href: "/about", label: "Наш магазин" },
  { href: "/order", label: "Покупателю" },
  { href: "/friends", label: "Наши друзья" },
  { href: "https://vk.com/sweetsoflifehandmade", label: "Мы в социальных сетях" },
];

const footerColumns = [
  [
    { href: "/about", label: "О магазине" },
    { href: "/news", label: "Новости" },
    { href: "/contacts", label: "Контакты" },
  ],
  [
    { href: "/order", label: "Как сделать заказ" },
    { href: "/order#payment", label: "Оплата" },
    { href: "/order#delivery", label: "Доставка" },
  ],
  [
    { href: "/friends", label: "Love's Avenue" },
    { href: "/friends", label: "Wake Up Studio" },
    { href: "/friends", label: "Ксения Михалева" },
  ],
];

export default function Footer() {
  return (
    <footer className="mt-5">
      <nav className="flex flex-col md:flex-row md:items-center md:h-[35px] mx-2.5 bg-brand-light border border-brand rounded-[20px] md:rounded-full py-2 md:py-0">
        {footerNav.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="md:flex-1 text-center md:text-left text-2xl desktop:text-sm hover:text-[#fff44f] py-1 md:py-0 md:pl-5 md:truncate"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="hidden md:flex w-full mt-2.5 mx-2.5">
        {footerColumns.map((column, i) => (
          <div key={i} className="flex-1 pl-5">
            {column.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className="block text-sm hover:font-bold"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}

        <div className="flex-1 pl-5">
          <a
            href="https://vk.com/sweetsoflifehandmade"
            className="inline-block w-8 h-8 rounded-full bg-[#5f7d9d] hover:shadow-[0_0_10px_0_#5f7d9d]"
            aria-label="ВКонтакте"
          />
        </div>
      </div>

      <p className="mt-2.5 ml-7 text-sm">
        &copy; 2026 интернет-магазин &laquo;Sweets Of Life&raquo;
      </p>
    </footer>
  );
}
