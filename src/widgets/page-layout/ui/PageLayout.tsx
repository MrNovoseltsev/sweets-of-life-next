import Header from "@/widgets/header/ui/Header";
import Footer from "@/widgets/footer/ui/Footer";

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return (
    <div
      className="mx-auto w-full desktop:max-w-[1000px] min-h-screen desktop:border-x desktop:border-brand flex flex-col"
      style={{ backgroundImage: `url(${basePath}/images/patterns/bg-inner.png)`, backgroundRepeat: 'repeat' }}
    >
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
