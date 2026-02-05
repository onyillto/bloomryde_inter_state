import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export const metadata: Metadata = {
  title: "BloomRyde | Premium Interstate Travel",
  description: "Nigeria's #1 verified interstate travel matching platform.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-white antialiased text-slate-900">
        {/* Simple, Static Premium Background - Optimized for Performance */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          {/* Top Left Soft Blue Glow */}
          <div
            className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-50/50 blur-[100px]"
            style={{ willChange: "transform" }}
          />
          {/* Bottom Right Soft Indigo Glow */}
          <div
            className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-50/30 blur-[100px]"
            style={{ willChange: "transform" }}
          />
        </div>

        <Navbar />

        {/* Main Content Area */}
        <main className="relative flex flex-col min-h-screen">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
