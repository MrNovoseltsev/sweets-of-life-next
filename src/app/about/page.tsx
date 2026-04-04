import PageWrapper from "@/components/layout/PageWrapper";

export default function AboutPage() {
  return (
    <PageWrapper>
      <section className="px-5 py-4">
        <h1 className="text-2xl font-normal mb-1">О МАГАЗИНЕ</h1>
        <div className="w-[980px] h-px bg-brand mb-6" />

        <div className="flex flex-col gap-4 text-lg leading-relaxed max-w-[940px]">
          <p>
            Бижутерия и игрушки ручной работы уже давно не новинка, мало кого можно этим удивить.
            Но, тем не менее, такие вещи обладают своей энергетикой, своей душой, своей историей
            гораздо более богатыми, чем обычные штампованные вещи. Даже если то или иное изделие
            будет выполнено повторно, оно уже вряд ли будет точно таким же как и первое.
            В этом-то и вся прелесть!
          </p>
          <p>
            Мы предлагаем Вам разнообразить свою жизнь, жизнь своих близких и друзей с помощью
            замечательных, весёлых, удивительных, красивых и просто приятных вещей из нашего
            магазина!
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}
