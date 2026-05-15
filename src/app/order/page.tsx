import PageLayout from "@/widgets/page-layout/ui/PageLayout";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";
import SectionHeader from "@/shared/ui/SectionHeader";
import OrderForm from "./OrderForm";

export default function OrderPage() {
  return (
    <PageLayout>
      <section className="sol-container py-11">
        <Breadcrumbs
          items={[{ label: "Главная", href: "/" }, { label: "Как заказать" }]}
        />
        <SectionHeader title="Как заказать" />

        <div className="grid grid-cols-1 gap-14 md:[grid-template-columns:1.4fr_1fr]">
          {/* Left — order form */}
          <div>
            <OrderForm />
          </div>

          {/* Right — info blocks */}
          <div className="flex flex-col gap-6">
            <div
              id="payment"
              className="scroll-mt-24 rounded-[16px] border border-brand/[0.09] bg-white p-7"
            >
              <h3 className="mb-4 font-display text-[22px] font-light text-brand">
                Как оплатить
              </h3>
              <ul className="flex flex-col">
                {[
                  "Перевод на карту Сбербанка",
                  "Перевод на Яндекс.Кошелёк",
                  "Наличными при самовывозе",
                ].map((row) => (
                  <li
                    key={row}
                    className="border-b border-brand/[0.07] py-[9px] text-[13px] text-brand-mid last:border-b-0"
                  >
                    {row}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[13px] font-medium text-brand">
                Оплату необходимо совершить в течение трёх дней после
                бронирования.
              </p>
            </div>

            <div
              id="delivery"
              className="scroll-mt-24 rounded-[16px] border border-brand/[0.09] bg-white p-7"
            >
              <h3 className="mb-4 font-display text-[22px] font-light text-brand">
                Как получить заказ
              </h3>
              <ul className="flex flex-col">
                {[
                  ["Самовывоз", "бесплатно (м. Бауманская)"],
                  ["Почта России", "200 ₽"],
                  ["Срок отправки", "1–2 рабочих дня"],
                ].map(([label, value]) => (
                  <li
                    key={label}
                    className="flex justify-between gap-3 border-b border-brand/[0.07] py-[9px] text-[13px] last:border-b-0"
                  >
                    <span className="text-brand-mid/60">{label}</span>
                    <span className="text-right font-medium text-brand">
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[13px] font-medium text-brand">
                При заказе свыше 2500 ₽ доставка по России бесплатно.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
