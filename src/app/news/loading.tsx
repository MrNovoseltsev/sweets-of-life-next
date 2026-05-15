import PageLayout from "@/widgets/page-layout/ui/PageLayout";
import { Skeleton } from "@/shared/ui/Skeleton";

export default function NewsLoading() {
  return (
    <PageLayout>
      <section className="sol-container py-11">
        <Skeleton className="mb-7 h-3 w-40" />
        <Skeleton className="mb-5 h-9 w-44" />

        <div className="grid grid-cols-1 gap-6 [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-[12px] border border-brand/[0.09] bg-white"
            >
              <Skeleton className="h-[200px] w-full rounded-none" />
              <div className="flex flex-col gap-2 px-[18px] pb-5 pt-4">
                <Skeleton className="h-2.5 w-24" />
                <Skeleton className="h-5 w-4/5" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
