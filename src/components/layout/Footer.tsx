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
      <nav className="flex items-center w-[980px] h-[35px] ml-2.5 bg-brand-light border border-brand rounded-full">
        {footerNav.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex-1 text-left pl-5 text-sm hover:text-[#fff44f]"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex mt-2.5 ml-7">
        {footerColumns.map((column, i) => (
          <div key={i} className="w-[210px] mr-10">
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

        <div className="w-[210px]">
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
