import type { Metadata } from "next";
import React from "react";
import "./globals.css";
import Navbar from "../components/navbar";

export const metadata: Metadata = {
  title: "BloomRyde Inter State",
  description: "BloomRyde Inter State Application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0a192f]">
        {/* Dynamic Glass Background Elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[120px]" />
        </div>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
