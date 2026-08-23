import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Axel & Sofía ✨ Nuestra Historia",
  description: "Un espacio especial lleno de recuerdos, canciones, amor y metas juntos.",
  authors: [{ name: "Axel" }],
  keywords: ["Axel", "Sofía", "Amor", "Aniversario", "Recuerdos", "Educativo"],
  openGraph: {
    title: "Axel & Sofía ✨ Nuestra Historia",
    description: "Un espacio especial lleno de recuerdos, canciones, amor y metas juntos.",
    type: "website",
    locale: "es_ES",
    siteName: "Axel & Sofi",
  },
  themeColor: "#070514",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-[#070514] text-white selection:bg-purple-500/30 selection:text-purple-200" suppressHydrationWarning>{children}</body>
    </html>
  );
}
