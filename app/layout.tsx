import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ni-two-kappa.vercel.app"),
  title: "Niclas Lernkontrolle Grundrechenarten",
  description: "Teste dein Können in Addition, Subtraktion, Multiplikation und Division.",
  openGraph: {
    title: "Niclas Lernkontrolle Grundrechenarten",
    description: "Interaktiver Test für Grundschüler.",
    images: [
      {
        url: "https://ni-two-kappa.vercel.app/preview-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Niclas Lernkontrolle Grundrechenarten",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Niclas Lernkontrolle Grundrechenarten",
    description: "Teste dein Können in den Grundrechenarten.",
    images: ["https://ni-two-kappa.vercel.app/preview-v2.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}