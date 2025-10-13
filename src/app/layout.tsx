import "./globals.css";
import NavLinks from "@/components/Navlinks";

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
    <html lang="en">
      <body className="dark-bg white-text">
        <NavLinks></NavLinks>
        {children}
      </body>
    </html>
  );
}
