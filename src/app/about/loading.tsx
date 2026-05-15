import PageLayout from "@/widgets/page-layout/ui/PageLayout";
import { Skeleton } from "@/shared/ui/Skeleton";

export default function AboutLoading() {
  return (
    <PageLayout>
      <section className="sol-container py-11">
        <Skeleton className="mb-7 h-3 w-44" />
        <Skeleton className="mb-5 h-9 w-52" />

        <div className="flex max-w-[760px] flex-col gap-5">
          <div className="flex flex-col gap-2.5">
            {["w-full", "w-full", "w-full", "w-full", "w-3/4"].map((w, i) => (
              <Skeleton key={i} className={`h-3.5 ${w}`} />
            ))}
          </div>
          <div className="flex flex-col gap-2.5">
            {["w-full", "w-full", "w-5/6"].map((w, i) => (
              <Skeleton key={i} className={`h-3.5 ${w}`} />
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
