import type { Metadata } from "next";
import { Amiri, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const amiri = Amiri({
  subsets: ["latin", "arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Al Kanzou — Carrés",
  description: "Génération de carrés numériques (wafq) — 3x3 à 10x10.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${amiri.variable} ${plexSans.variable} ${plexMono.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
