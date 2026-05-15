import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm" });

export const metadata: Metadata = {
  title: "Mapa Paczkomatów InPost",
  description: "Interaktywna mapa paczkomatów InPost w Polsce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
