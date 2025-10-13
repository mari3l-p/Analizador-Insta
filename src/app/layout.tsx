import "./globals.css";
import NavLinks from "@/components/Navlinks";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Analizador de Instagram', // %s will be replaced by the page's title
    default: 'Analizador de Instagram', // The default title if a page doesn't set one
  },
}


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
