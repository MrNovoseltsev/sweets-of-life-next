import PageLayout from "@/widgets/page-layout/ui/PageLayout";
import CatalogGrid from "@/widgets/catalog-grid/ui/CatalogGrid";
import Breadcrumbs from "@/shared/ui/Breadcrumbs";
import SectionHeader from "@/shared/ui/SectionHeader";

export default function CatalogPage() {
  return (
    <PageLayout>
      <section className="sol-container py-11">
        <Breadcrumbs
          items={[{ label: "Главная", href: "/" }, { label: "Каталог" }]}
        />
        <SectionHeader title="Каталог" />
        <CatalogGrid />
      </section>
    </PageLayout>
  );
}
