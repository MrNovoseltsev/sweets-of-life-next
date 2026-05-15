import PageLayout from "@/widgets/page-layout/ui/PageLayout";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";
import SectionHeader from "@/shared/ui/SectionHeader";

const friends = [
  {
    name: "Love's Avenue",
    tagline: "Свадьбы. Декор. Флористика.",
    description:
      "Обожаем красивые стильные свадьбы и фотосъёмки. Продумываем каждую мелочь в декоре, создаём стильный праздник с живыми цветами и уникальной флористикой.",
    url: null,
  },
  {
    name: "Wake Up Studio",
    tagline: "Макияж. Причёски. Фотосессии.",
    description:
      "Профессиональный макияж и причёски любой сложности с выездом. Создание образа для свадьбы, фотосессии, выпускного и любого мероприятия.",
    url: null,
  },
  {
    name: "Свадебный фотограф Ксения Михалёва",
    tagline: "Фотосессии. Лавстори. Портфолио.",
    description:
      "Важное событие, которое хочется запомнить навсегда? Портфолио или просто красивые фото? Превращу ваши желания в чудесные снимки.",
    url: null,
  },
];

export default function FriendsPage() {
  return (
    <PageLayout>
      <section className="sol-container py-11">
        <Breadcrumbs
          items={[{ label: "Главная", href: "/" }, { label: "Наши друзья" }]}
        />
        <SectionHeader title="Наши друзья" />

        <p className="mb-7 max-w-[640px] font-display text-[clamp(18px,2.2vw,24px)] font-light italic text-brand-mid">
          Скажи мне, кто твой друг, и я скажу тебе, кто ты.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {friends.map((f) => (
            <div
              key={f.name}
              className="rounded-[14px] border border-brand/[0.09] bg-white p-6"
            >
              <h2 className="mb-1 font-display text-[20px] font-normal text-brand">
                {f.name}
              </h2>
              <p className="mb-3 text-[12px] tracking-[0.04em] text-brand-mid/55">
                {f.tagline}
              </p>
              <p className="text-[13px] leading-[1.6] text-brand-mid/85">
                {f.description}
              </p>
              {f.url && (
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block text-[12px] uppercase tracking-[0.08em] text-brand-mid underline-offset-2 hover:underline"
                >
                  Перейти на сайт
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
