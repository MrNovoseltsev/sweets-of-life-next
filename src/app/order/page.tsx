import PageLayout from "@/widgets/page-layout/ui/PageLayout";
import OrderForm from "./OrderForm";

export default function OrderPage() {
  return (
    <PageLayout>
      <section className="px-5 py-4">
        <h1 className="text-2xl font-normal mb-1">ОФОРМИТЬ ЗАКАЗ</h1>
        <div className="w-full h-px bg-brand mb-6" />

        <div className="flex flex-col gap-10 max-w-[600px]">
          <OrderForm />

          {/* Delivery info */}
          <div className="flex flex-col gap-6 text-sm text-[#1e5945]/70 leading-relaxed">
            <div>
              <h2 className="text-base font-medium text-[#1e5945] mb-2">КАК ОПЛАТИТЬ</h2>
              <div className="w-full h-px bg-brand/20 mb-3" />
              <ul className="list-disc list-inside flex flex-col gap-1">
                <li>перевод на карту Сбербанка;</li>
                <li>перевод на Яндекс.Кошелёк;</li>
                <li>наличными при самовывозе.</li>
              </ul>
              <p className="mt-2 font-medium text-[#1e5945]">
                Оплату необходимо совершить в течение трёх дней после бронирования!
              </p>
            </div>

            <div>
              <h2 className="text-base font-medium text-[#1e5945] mb-2">КАК ПОЛУЧИТЬ ЗАКАЗ</h2>
              <div className="w-full h-px bg-brand/20 mb-3" />
              <p>Отправка происходит два раза в неделю. Срок отправки — 1–2 рабочих дня.</p>
              <ul className="list-disc list-inside flex flex-col gap-1 mt-2">
                <li>самовывоз — бесплатно (м. Бауманская);</li>
                <li>Почта России (1-й класс) — 200 рублей.</li>
              </ul>
              <p className="mt-2 font-medium text-[#1e5945]">
                При заказе свыше 2500 рублей доставка по России бесплатно!
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
