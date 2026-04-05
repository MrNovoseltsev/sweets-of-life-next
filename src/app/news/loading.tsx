import PageWrapper from "@/components/layout/PageWrapper";
import { Skeleton } from "@/components/ui/skeleton";

export default function NewsLoading() {
  return (
    <PageWrapper>
      <section className="px-2.5 py-4">
        <Skeleton className="h-8 w-32 mb-2" />
        <div className="w-[980px] h-px bg-brand/20 ml-0 mb-4" />

        <div className="flex flex-col gap-6 ml-2.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex gap-5 items-start">
              <Skeleton className="w-[180px] h-[180px] shrink-0 rounded-lg" />
              <div className="flex flex-col gap-2 flex-1 pt-1">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 ml-2.5 mt-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="w-8 h-8 rounded-full" />
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
