import PageLayout from "@/widgets/page-layout/ui/PageLayout";
import { Skeleton } from "@/shared/ui/Skeleton";

export default function ProductLoading() {
  return (
    <PageLayout>
      <section className="sol-container py-10">
        <Skeleton className="mb-7 h-3 w-72 max-w-full" />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
          {/* Gallery */}
          <Skeleton className="aspect-square w-full rounded-[16px]" />

          {/* Info */}
          <div className="pt-2">
            <Skeleton className="mb-4 h-5 w-24 rounded-full" />
            <Skeleton className="mb-3.5 h-10 w-4/5" />
            <Skeleton className="mb-6 h-8 w-32" />
            <div className="mb-7 flex flex-col gap-2">
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-full" />
              <Skeleton className="h-3.5 w-3/4" />
            </div>
            <div className="mb-8 flex flex-col">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex gap-3 border-b border-brand/[0.07] py-[9px]"
                >
                  <Skeleton className="h-3.5 w-24" />
                  <Skeleton className="h-3.5 w-32" />
                </div>
              ))}
            </div>
            <Skeleton className="h-[52px] w-full rounded-full" />
          </div>
        </div>

        {/* Related */}
        <div className="mt-16">
          <Skeleton className="mb-5 h-9 w-60" />
          <div className="grid grid-cols-2 gap-[18px] md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
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
        </div>
      </section>
    </PageLayout>
  );
}
