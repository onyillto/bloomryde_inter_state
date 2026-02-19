"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiTwitter, FiInstagram, FiLinkedin, FiArrowUp } from "react-icons/fi";

const Footer = () => {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "How It Works", href: "#how-it-works" },
    { name: "Safety", href: "#safety" },
    { name: "For Drivers", href: "#for-drivers" },
    { name: "About", href: "#about" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (pathname?.startsWith("/onboarding")) return null;

  return (
    <footer className="bg-white py-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo.png"
                  alt="BloomRydes"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-black tracking-tighter text-slate-900">
                BloomRydes
              </span>
            </Link>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              © {currentYear} — Traveling Nigeria Smarter
            </p>
          </div>

          {/* Core Nav Links (Matching Navbar) */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {[FiTwitter, FiInstagram, FiLinkedin].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
            <div className="w-px h-6 bg-slate-100 hidden md:block" />
            <button
              onClick={scrollToTop}
              className="group w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-slate-200"
            >
              <FiArrowUp className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
