import Header from "@/widgets/header/ui/Header";
import Footer from "@/widgets/footer/ui/Footer";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-[1000px] min-h-screen border-x border-brand bg-pattern-inner">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
