import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Elite Connect - Club Privé Exclusif",
  description: "Rejoignez Elite Connect, le club privé inspiré de Soho House. Un espace exclusif pour les professionnels et créatifs d'exception.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Root layout - Next.js requires html and body tags here
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get locale from the first child (which should be [locale] layout)
  // For now, default to 'fr'
  const locale = 'fr';

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
