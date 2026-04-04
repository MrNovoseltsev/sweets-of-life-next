import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${boblic.variable} ${scriptbl.variable}`}>
      <body>{children}</body>
    </html>
  );
}
