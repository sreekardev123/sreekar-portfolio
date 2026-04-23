import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import { AOSInit } from "@/components/AOSInit";

export const metadata: Metadata = {
  title: "Karanam Sreekar | Full Stack Developer",
  description:
    "Premium portfolio showcasing stunning web development, modern design, and 3D experiences.",
  keywords: ["portfolio", "developer", "Next.js", "React", "full stack"],
  openGraph: {
    title: "Karanam Sreekar | Full Stack Developer",
    description: "Premium portfolio with stunning animations and 3D experiences",
    type: "website",
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
        </Providers>
      </body>
    </html>
  );
}
