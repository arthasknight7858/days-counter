import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#070514",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://axelysofi.com"),
  title: {
    default: "Axel & Sofía ✨ Nuestra Historia de Amor",
    template: "%s | Axel & Sofía",
  },
  description:
    "Un espacio especial interactivo lleno de nuestros recuerdos, canciones favoritas, cartas de amor, metas de estudio y bienestar.",
  applicationName: "Axel & Sofía",
  authors: [{ name: "Axel" }, { name: "Sofía" }],
  generator: "Next.js",
  keywords: [
    "Axel",
    "Sofía",
    "Historia de Amor",
    "Aniversario",
    "Recuerdos",
    "Playlist Romántica",
    "Tablón de Notas",
    "Educativo",
    "Pareja",
  ],
  creator: "Axel",
  publisher: "Axel & Sofía",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Axel & Sofía ✨ Nuestra Historia de Amor",
    description:
      "Un espacio especial lleno de recuerdos, canciones, amor y metas juntos.",
    url: "https://axelysofi.com",
    siteName: "Axel & Sofía",
    images: [
      {
        url: "/icon.svg",
        width: 512,
        height: 512,
        alt: "Logo e Icono Oficial de Axel & Sofía",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Axel & Sofía ✨ Nuestra Historia de Amor",
    description:
      "Un espacio especial interactivo lleno de nuestros recuerdos, canciones y metas juntos.",
    images: ["/icon.svg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://axelysofi.com/#website",
      "url": "https://axelysofi.com",
      "name": "Axel & Sofía ✨ Nuestra Historia",
      "description":
        "Espacio interactivo de amor, recuerdos, cartas, música y metas conjuntas.",
      "inLanguage": "es-ES",
      "publisher": {
        "@type": "Person",
        "name": "Axel",
      },
    },
    {
      "@type": "ProfilePage",
      "@id": "https://axelysofi.com/#profile",
      "name": "Nuestra Historia de Amor",
      "mainEntity": {
        "@type": "Person",
        "name": "Axel & Sofía",
        "relationship": "Pareja",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{new MutationObserver(function(m){for(var i=0;i<m.length;i++){if(m[i].attributeName==='bis_skin_checked'&&m[i].target){m[i].target.removeAttribute('bis_skin_checked');}}}).observe(document.documentElement,{attributes:true,subtree:true,attributeFilter:['bis_skin_checked']});}catch(e){}`,
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-[#070514] text-white selection:bg-purple-500/30 selection:text-purple-200"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
