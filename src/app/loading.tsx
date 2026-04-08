import PageLayout from "@/widgets/page-layout/ui/PageLayout";
import { Skeleton } from "@/shared/ui/Skeleton";

export default function HomeLoading() {
  return (
    <PageLayout>
      <section className="p-2.5">
        <div className="grid grid-cols-4 gap-5 pt-2.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-[280px] rounded-[20px] border border-brand/20" />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
