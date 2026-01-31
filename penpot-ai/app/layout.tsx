import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PenpotAI - AI-Powered UI Mockup Generator",
  description:
    "Transform natural language prompts into production-ready UI mockups using AI. Mobile-first, accessible, and export-ready designs.",
  keywords: [
    "UI design",
    "mockup generator",
    "AI design",
    "Penpot",
    "Gemini AI",
    "mobile-first",
  ],
  authors: [{ name: "PenpotAI" }],
  creator: "PenpotAI",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PenpotAI",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "PenpotAI",
    title: "PenpotAI - AI-Powered UI Mockup Generator",
    description:
      "Transform natural language prompts into production-ready UI mockups",
  },
  twitter: {
    card: "summary_large_image",
    title: "PenpotAI - AI-Powered UI Mockup Generator",
    description:
      "Transform natural language prompts into production-ready UI mockups",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
