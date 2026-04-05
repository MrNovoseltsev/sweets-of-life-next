import PageWrapper from "@/components/layout/PageWrapper";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <PageWrapper>
      <section className="p-2.5">
        <div className="grid grid-cols-4 gap-5 pt-2.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-[280px] rounded-[20px] border border-brand/20" />
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
