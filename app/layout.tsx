import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Antonio, Bebas_Neue } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const antonio = Antonio({
  variable: "--font-antonio",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Monagrow Global | Wholesale Commodities - Rice, Coffee, Sugar & Dry Fruits",
  description:
    "Leading wholesale exporter and B2B supplier of Premium Basmati Rice, Specialty Coffee, Refined Sugar, and Handpicked Dry Fruits. Direct origin sourcing with international export standards.",
  keywords: [
    "Monagrow",
    "wholesale rice",
    "basmati rice exporter",
    "bulk coffee beans",
    "sugar wholesale",
    "dry fruits wholesale",
    "B2B agro commodities",
  ],
  icons: {
    icon: [
      { url: "/favicon.png?v=3", type: "image/png" },
      { url: "/favicon.ico?v=3" },
    ],
    shortcut: "/favicon.ico?v=3",
    apple: "/favicon.png?v=3",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${playfair.variable} ${antonio.variable} ${bebasNeue.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.png?v=3" type="image/png" sizes="64x64" />
        <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico?v=3" />
        <link rel="apple-touch-icon" href="/favicon.png?v=3" />
      </head>
      <body
        className="min-h-screen bg-[#fcfcf9] text-[#192a20] antialiased selection:bg-[#2e6f40] selection:text-white font-sans"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
