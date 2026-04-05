import PageWrapper from "@/components/layout/PageWrapper";
import { Skeleton } from "@/components/ui/skeleton";

export default function AboutLoading() {
  return (
    <PageWrapper>
      <section className="px-5 py-4">
        <Skeleton className="h-8 w-48 mb-2" />
        <div className="w-[980px] h-px bg-brand/20 mb-6" />

        <div className="flex flex-col gap-4 max-w-[940px]">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
