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

import BottomNav from "@/components/BottomNav";

export const metadata: Metadata = {
  title: "WBSP - Find Skilled Workers",
  description: "Connect with nearby skilled workers instantly.",
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
      <body className="min-h-full flex justify-center bg-gray-50 text-gray-900">
        <div className="w-full max-w-md min-h-screen bg-white shadow-xl relative flex flex-col pb-20">
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
