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
  title: "smolikja team",
  description: "Portfolio and work showcase by smolikja team - creative development and design solutions",
  keywords: ["portfolio", "design", "development", "creative", "smolikja"],
  authors: [{ name: "smolikja team" }],
  creator: "smolikja team",
  publisher: "smolikja team",
  metadataBase: new URL('https://smolikja.team'),
  openGraph: {
    title: "smolikja team",
    description: "Portfolio and work showcase by smolikja team - creative development and design solutions",
    url: "https://smolikja.team",
    siteName: "smolikja team",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "smolikja team",
    description: "Portfolio and work showcase by smolikja team - creative development and design solutions",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
