import PageLayout from "@/widgets/page-layout/ui/PageLayout";
import CatalogGrid from "@/widgets/catalog-grid/ui/CatalogGrid";

export default function CatalogPage() {
  return (
    <PageLayout>
      <section className="p-2.5">
        <CatalogGrid />
      </section>
    </PageLayout>
  );
}
