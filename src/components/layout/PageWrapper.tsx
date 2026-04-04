import Header from "./Header";
import Footer from "./Footer";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-[1000px] min-h-screen border-x border-brand bg-pattern-inner">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
