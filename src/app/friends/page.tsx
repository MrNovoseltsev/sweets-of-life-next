import PageLayout from "@/widgets/page-layout/ui/PageLayout";

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
      <section className="px-5 py-4">
        <h1 className="text-2xl font-normal mb-1">НАШИ ДРУЗЬЯ</h1>
        <div className="w-[980px] h-px bg-brand mb-4" />

        <p className="text-lg italic mb-6 max-w-[940px]">
          Скажи мне, кто твой друг, и я скажу тебе, кто ты!
        </p>

        <div className="flex flex-col gap-6 max-w-[940px]">
          {friends.map((f) => (
            <div key={f.name} className="flex flex-col gap-1 border-l-2 border-brand pl-4">
              <h2 className="text-xl font-normal">{f.name}</h2>
              <p className="text-sm text-brand/60">{f.tagline}</p>
              <p className="text-base leading-relaxed">{f.description}</p>
              {f.url && (
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline hover:font-bold mt-1"
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
