import PageLayout from "@/widgets/page-layout/ui/PageLayout";

const sections = [
  {
    id: "order",
    title: "КАК ЗАКАЗАТЬ",
    content: (
      <>
        <p>
          Для того чтобы сделать заказ, напишите нам на{" "}
          <a href="mailto:info@sweetsoflife.ru" className="underline hover:font-bold">
            info@sweetsoflife.ru
          </a>
          . Пожалуйста, укажите в письме:
        </p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>ссылку или артикул понравившейся вещи;</li>
          <li>адрес доставки (индекс, область, город, улица, дом) и ФИО.</li>
        </ul>
        <p>После получения заявки вещь бронируется не более чем на 3 дня.</p>
      </>
    ),
  },
  {
    id: "payment",
    title: "КАК ОПЛАТИТЬ",
    content: (
      <>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>перевод на карту Сбербанка;</li>
          <li>перевод на Яндекс.Кошелёк;</li>
          <li>наличными при самовывозе.</li>
        </ul>
        <p className="font-bold">Оплату необходимо совершить в течение трёх дней после бронирования!</p>
      </>
    ),
  },
  {
    id: "delivery",
    title: "КАК ПОЛУЧИТЬ ЗАКАЗ",
    content: (
      <>
        <p>Отправка происходит два раза в неделю. Обычный срок отправки — 1–2 рабочих дня.</p>
        <ul className="list-disc list-inside flex flex-col gap-1">
          <li>самовывоз — бесплатно (м. Бауманская);</li>
          <li>ускоренная отправка Почтой России (1-й класс) — 200 рублей.</li>
        </ul>
        <p className="font-bold">При заказе свыше 2500 рублей доставка по России бесплатно!</p>
      </>
    ),
  },
];

export default function OrderPage() {
  return (
    <PageLayout>
      <section className="px-5 py-4">
        <h1 className="text-2xl font-normal mb-1">ЗАКАЗАТЬ</h1>
        <div className="w-full h-px bg-brand mb-6" />

        <div className="flex flex-col gap-8 text-lg leading-relaxed max-w-[940px]">
          {sections.map((s) => (
            <div key={s.id} id={s.id} className="flex flex-col gap-3">
              <h2 className="text-xl font-normal">{s.title}</h2>
              <div className="w-full h-px bg-brand/30" />
              {s.content}
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
