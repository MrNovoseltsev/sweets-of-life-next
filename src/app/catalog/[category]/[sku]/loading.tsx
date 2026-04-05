import PageWrapper from "@/components/layout/PageWrapper";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductLoading() {
  return (
    <PageWrapper>
      <section className="px-5 py-4">
        <Skeleton className="h-8 w-80 mb-2" />
        <div className="w-[980px] h-px bg-brand/20 mb-6" />

        <div className="flex gap-8">
          <Skeleton className="w-[400px] h-[400px] shrink-0 rounded-xl border border-brand/20" />

          <div className="flex flex-col gap-4 flex-1">
            <Skeleton className="h-6 w-24" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="flex flex-col gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-6 border-b border-brand/20 py-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
