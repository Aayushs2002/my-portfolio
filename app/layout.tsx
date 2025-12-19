import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/dom/Preloader";
import CustomCursor from "@/components/dom/CustomCursor";
import PageTransition from "@/components/dom/PageTransition";
import NoiseBackground from "@/components/dom/NoiseBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aayush Timilsina",
  description: "Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NoiseBackground />
        <PageTransition />
        <Preloader />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
