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
  metadataBase: new URL("https://shouldido.io"),
  title: "Should I Text Them? Get a Clear Answer Instantly",
  description:
    "Not sure if you should text them? Use this simple decision tool to get a clear answer in seconds. No overthinking, just clarity.",
  openGraph: {
    title: "Should I Text Them?",
    description:
      "Get a clear answer in seconds. Stop overthinking texting decisions.",
    url: "https://shouldido.io",
    siteName: "Should I Do",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Should I Text Them?",
    description:
      "Stop overthinking. Get a clear answer instantly.",
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
