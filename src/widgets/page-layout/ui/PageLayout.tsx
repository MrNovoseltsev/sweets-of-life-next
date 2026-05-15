import Header from "@/widgets/header/ui/Header";
import Footer from "@/widgets/footer/ui/Footer";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
