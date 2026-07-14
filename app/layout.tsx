import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import { AOSInit } from "@/components/AOSInit";
import AIChatWidget from "@/components/AIChatWidget";

export const metadata: Metadata = {
  title: "Karanam Sreekar | Full Stack Developer",
  description:
    "Building AI-powered web applications with React, Next.js & Node.js — turning complex ideas into scalable, production-grade products.",
  keywords: ["portfolio", "developer", "Next.js", "React", "full stack", "Sreekar Karanam", "AI"],
  openGraph: {
    title: "Karanam Sreekar | Full Stack Developer",
    description: "Building AI-powered web applications with React, Next.js & Node.js — turning complex ideas into scalable, production-grade products.",
    type: "website",
    url: "https://sreekar-portfolio-gamma.vercel.app",
    images: [
      {
        url: "https://sreekar-portfolio-gamma.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Karanam Sreekar - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karanam Sreekar | Full Stack Developer",
    description: "Building AI-powered web applications with React, Next.js & Node.js.",
    images: ["https://sreekar-portfolio-gamma.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>
          <AOSInit />
          <CustomCursor />
          <Navbar />
          {children}
          <AIChatWidget />
        </Providers>
      </body>
    </html>
  );
}
