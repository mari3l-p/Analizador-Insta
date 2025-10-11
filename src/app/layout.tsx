import "./globals.css";
import NavLinks from "@/components/Navlinks";


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
