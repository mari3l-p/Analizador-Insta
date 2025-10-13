import "./globals.css";
import NavLinks from "@/components/Navlinks";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Analizador de Instagram",
    default: "Analizador de Instagram",
  },
  description:
    "Herramienta educativa y segura para analizar archivos de redes sociales. Sin recopilación de datos ni interacción social.",
  other: {
    rating: "general",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* 👇 Aquí colocas tu script de AdSense */}
        <Script
          id="adsense-script"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7094509427442311"
          crossOrigin="anonymous"
        />
      </head>
      <body className="dark-bg white-text">
        <NavLinks />
        {children}
      </body>
    </html>
  );
}
