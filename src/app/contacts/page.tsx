import PageWrapper from "@/components/layout/PageWrapper";

export default function ContactsPage() {
  return (
    <PageWrapper>
      <section className="px-5 py-4">
        <h1 className="text-2xl font-normal mb-1">НАШИ КОНТАКТЫ</h1>
        <div className="w-[980px] h-px bg-brand mb-6" />

        <div className="flex flex-col gap-4 text-lg leading-relaxed max-w-[940px]">
          <p>
            Дорогой наш посетитель! Мы понимаем, что, возможно, это выглядит несерьёзно, но
            единственный наш контакт — это почта. Так получилось, что на данный момент мы маленькая
            компания, которая не может позволить себе отдельный телефонный номер... НО! Будьте
            уверены, что ко всем письмам, которые вы нам напишите, мы отнесёмся с большим вниманием
            и сделаем всё, чтобы выполнить ваши желания!
          </p>
          <p>
            С радостью и нетерпением ждём ваших писем по адресу:{" "}
            <a href="mailto:info@sweetsoflife.ru" className="underline hover:font-bold">
              info@sweetsoflife.ru
            </a>
          </p>
          <p>
            И не забывайте про нашу группу{" "}
            <a
              href="https://vk.com/sweetsoflifehandmade"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:font-bold"
            >
              ВКонтакте
            </a>
            !
          </p>
        </div>
      </section>
    </PageWrapper>
  );
}
