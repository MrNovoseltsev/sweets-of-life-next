import PageLayout from "@/widgets/page-layout/ui/PageLayout";
import { Skeleton } from "@/shared/ui/Skeleton";

export default function CategoryLoading() {
  return (
    <PageLayout>
      <section className="sol-container py-11">
        <Skeleton className="mb-7 h-3 w-56" />
        <Skeleton className="mb-7 h-9 w-48" />

        <div className="grid grid-cols-2 gap-[18px] min-[481px]:[grid-template-columns:repeat(auto-fill,minmax(196px,1fr))]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-[12px] border border-brand/[0.08] bg-white"
            >
              <Skeleton className="aspect-square w-full rounded-none" />
              <div className="flex flex-col gap-2 px-3.5 pb-[15px] pt-[11px]">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-3.5 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
