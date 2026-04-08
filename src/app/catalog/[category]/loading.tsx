import PageLayout from "@/widgets/page-layout/ui/PageLayout";
import { Skeleton } from "@/shared/ui/Skeleton";

export default function CategoryLoading() {
  return (
    <PageLayout>
      <section className="px-2.5 py-4">
        <Skeleton className="h-8 w-48 mb-2" />
        <div className="w-[980px] h-px bg-brand/20 ml-2.5 mb-4" />

        <div className="flex flex-wrap gap-4 ml-2.5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="w-[220px] border border-brand/20 rounded-xl overflow-hidden">
              <Skeleton className="w-full h-[180px] rounded-none" />
              <div className="p-2 flex flex-col gap-2">
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-3 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
