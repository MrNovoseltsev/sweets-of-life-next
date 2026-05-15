import Link from "next/link";
import ArrowRight from "@/shared/ui/icons/ArrowRight";

type Props = {
  title: string;
  href?: string;
  link?: { label: string; href: string };
};

export default function SectionHeader({ title, href, link }: Props) {
  const titleClasses =
    "font-display text-[clamp(28px,4vw,42px)] font-light tracking-[0.01em] text-brand relative inline-block after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-brand-light after:transition-[width] after:duration-300 hover:after:w-full";

  return (
    <div className="flex items-baseline justify-between mb-5">
      {href ? (
        <Link href={href} className={titleClasses}>
          {title}
        </Link>
      ) : (
        <h2 className={titleClasses.replace("hover:after:w-full", "")}>
          {title}
        </h2>
      )}

      {link && (
        <Link
          href={link.href}
          className="group inline-flex items-center gap-1.5 font-boblic text-[11px] tracking-[0.15em] text-brand-mid uppercase transition-colors hover:text-brand hover:gap-2"
        >
          {link.label}
          <ArrowRight className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
