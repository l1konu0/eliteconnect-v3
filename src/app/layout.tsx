import type { Metadata } from "next";
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
  keywords: ["club privé", "réseau professionnel", "élite", "exclusif", "Soho House"],
  authors: [{ name: "Elite Connect" }],
  creator: "Elite Connect",
  publisher: "Elite Connect",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
