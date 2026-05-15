import PageLayout from "@/widgets/page-layout/ui/PageLayout";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";
import SectionHeader from "@/shared/ui/SectionHeader";

export default function AboutPage() {
  return (
    <PageLayout>
      <section className="sol-container py-11">
        <Breadcrumbs
          items={[{ label: "Главная", href: "/" }, { label: "О магазине" }]}
        />
        <SectionHeader title="О магазине" />

        <div className="flex max-w-[760px] flex-col gap-5">
          <p className="text-[14px] leading-[1.75] text-brand-mid/85">
            Бижутерия и игрушки ручной работы уже давно не новинка, мало кого
            можно этим удивить. Но, тем не менее, такие вещи обладают своей
            энергетикой, своей душой, своей историей гораздо более богатыми, чем
            обычные штампованные вещи. Даже если то или иное изделие будет
            выполнено повторно, оно уже вряд ли будет точно таким же как и
            первое. В этом-то и вся прелесть!
          </p>
          <p className="text-[14px] leading-[1.75] text-brand-mid/85">
            Мы предлагаем Вам разнообразить свою жизнь, жизнь своих близких и
            друзей с помощью замечательных, весёлых, удивительных, красивых и
            просто приятных вещей из нашего магазина!
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
