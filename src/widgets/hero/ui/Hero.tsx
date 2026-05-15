import Link from "next/link";
import ArrowRight from "@/shared/ui/icons/ArrowRight";

export default function Hero() {
  return (
    <section className="sol-container pt-[60px] pb-11 text-center">
      <p className="mb-4 text-[10px] tracking-[0.28em] uppercase text-brand-mid/70">
        Авторские украшения ручной работы
      </p>

      <h1 className="mx-auto mb-[22px] font-display text-[clamp(44px,8vw,84px)] font-light leading-[1.05] tracking-[-0.01em] text-brand">
        Украшения, <em className="italic text-brand-mid">созданные</em> с любовью
      </h1>

      <p className="mx-auto mb-9 max-w-[500px] font-display text-[clamp(16px,2vw,21px)] font-light leading-[1.65] text-brand-mid/85">
        Каждое изделие — это маленькая история, бережно собранная вручную из
        смолы, дерева и шерсти.
      </p>

      <Link
        href="/catalog"
        className="inline-flex items-center gap-2 rounded-full bg-brand px-9 py-3.5 font-boblic text-[12px] tracking-[0.12em] text-white transition-all hover:-translate-y-0.5 hover:bg-brand-mid"
      >
        Смотреть каталог
        <ArrowRight />
      </Link>

      <div className="mx-auto mt-10 h-11 w-px bg-gradient-to-b from-transparent via-brand-light to-transparent" />
    </section>
  );
}
