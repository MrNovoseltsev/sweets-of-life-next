import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "@/features/cart/model/CartContext";
import { AuthProvider } from "@/features/auth/model/AuthContext";
import { createServerSupabaseClient } from "@/shared/lib/supabase";

const boblic = localFont({
  src: "../../public/fonts/BoblicRegular.woff",
  variable: "--font-boblic",
  display: "swap",
});

const scriptbl = localFont({
  src: "../../public/fonts/SCRIPTBL.ttf",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sweets of Life",
  description: "Авторские украшения ручной работы",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user = null;
  if (process.env.NEXT_PUBLIC_USE_MOCK !== 'true') {
    const supabase = await createServerSupabaseClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  }

  return (
    <html lang="ru" className={`${boblic.variable} ${scriptbl.variable}`}>
      <body>
        <AuthProvider initialUser={user}>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
