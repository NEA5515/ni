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

export const metadata = {
  metadataBase: new URL("https://ni-two-kappa.vercel.app"),

  title: "Niclas Lernstandstest Grundrechenarten",
  description: "Teste dein Können in Addition, Subtraktion, Multiplikation und Division.",

  openGraph: {
    title: "Niclas Lernstandstest Grundrechenarten",
    description: "Interaktiver Lernstandstest für Kinder.",
    url: "https://ni-two-kappa.vercel.app",
    siteName: "Niclas Lernstandstest",
    images: [
      {
        url: "https://ni-two-kappa.vercel.app/preview.jpg",
        width: 1200,
        height: 630,
        alt: "Niclas Lernstandstest",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Niclas Lernstandstest Grundrechenarten",
    description: "Teste dein Können in den Grundrechenarten.",
    images: ["https://ni-two-kappa.vercel.app/preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
