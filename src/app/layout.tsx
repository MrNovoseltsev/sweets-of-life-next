import type { Metadata } from "next";
import localFont from "next/font/local";
import { Cormorant_Garamond } from "next/font/google";
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

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
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
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html
      lang="ru"
      className={`${boblic.variable} ${scriptbl.variable} ${cormorant.variable}`}
    >
      <body>
        <AuthProvider initialUser={user}>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
