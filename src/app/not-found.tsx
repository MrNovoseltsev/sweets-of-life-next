import Link from "next/link";
import PageLayout from "@/widgets/page-layout/ui/PageLayout";

export default function NotFound() {
  return (
    <PageLayout>
      <section className="flex flex-col items-center justify-center gap-6 p-2.5 min-h-[60vh]">
        <h1 className="text-4xl font-normal">404</h1>
        <p className="text-lg text-center">Страница не найдена</p>
        <Link
          href="/"
          className="px-6 py-2.5 bg-brand text-white rounded-lg hover:bg-brand-light transition-colors"
        >
          На главную
        </Link>
      </section>
    </PageLayout>
  );
}
