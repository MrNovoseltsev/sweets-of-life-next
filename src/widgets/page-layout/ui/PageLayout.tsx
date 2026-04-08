import Header from "@/widgets/header/ui/Header";
import Footer from "@/widgets/footer/ui/Footer";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full desktop:max-w-[1000px] min-h-screen desktop:border-x desktop:border-brand bg-pattern-inner flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
