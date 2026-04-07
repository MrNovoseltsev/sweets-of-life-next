import PageWrapper from "@/components/layout/PageWrapper";
import CatalogGrid from "@/components/CatalogGrid";

export default function CatalogPage() {
  return (
    <PageWrapper>
      <section className="p-2.5">
        <CatalogGrid />
      </section>
    </PageWrapper>
  );
}
