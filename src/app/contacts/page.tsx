import PageLayout from "@/widgets/page-layout/ui/PageLayout";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";
import SectionHeader from "@/shared/ui/SectionHeader";
import Mail from "@/shared/ui/icons/Mail";
import VK from "@/shared/ui/icons/VK";

export default function ContactsPage() {
  return (
    <PageLayout>
      <section className="sol-container py-11">
        <Breadcrumbs
          items={[{ label: "Главная", href: "/" }, { label: "Контакты" }]}
        />
        <SectionHeader title="Наши контакты" />

        <p className="mb-8 max-w-[640px] text-[14px] leading-[1.75] text-brand-mid/85">
          Дорогой наш посетитель! Мы понимаем, что, возможно, это выглядит
          несерьёзно, но единственный наш контакт — это почта. Так получилось,
          что на данный момент мы маленькая компания, которая не может позволить
          себе отдельный телефонный номер. НО! Будьте уверены, что ко всем
          письмам, которые вы нам напишете, мы отнесёмся с большим вниманием.
        </p>

        <div className="flex max-w-[480px] flex-col">
          <div className="flex items-center gap-4 border-b border-brand/[0.08] py-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-pale text-brand">
              <Mail />
            </div>
            <div>
              <h3 className="font-display text-[18px] text-brand">Email</h3>
              <a
                href="mailto:info@sweetsoflife.ru"
                className="text-[13px] text-brand-mid/80 transition-opacity hover:opacity-100 hover:underline"
              >
                info@sweetsoflife.ru
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4 border-b border-brand/[0.08] py-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-pale text-brand">
              <VK />
            </div>
            <div>
              <h3 className="font-display text-[18px] text-brand">ВКонтакте</h3>
              <a
                href="https://vk.com/sweetsoflifehandmade"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[13px] text-brand-mid/80 transition-opacity hover:opacity-100 hover:underline"
              >
                vk.com/sweetsoflifehandmade
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
