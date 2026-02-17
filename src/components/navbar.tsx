"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Safety", href: "/safety" },
    { name: "For Drivers", href: "/for-drivers" },
    { name: "About", href: "/about" },
  ];

  // FIXED: Changed "text-white" to "text-slate-900" for white backgrounds
  const textColor = "text-slate-900";

  const navBg = isScrolled
    ? "bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm py-3"
    : "bg-transparent py-6";

  return (
    <nav
      className={`fixed w-full top-0 z-[100] transition-all duration-300 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-full border border-slate-200/50 bg-slate-100/50">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 rounded-full hover:bg-white hover:text-blue-600 hover:shadow-sm ${textColor}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <Link
              href="/auth"
              className="group inline-flex items-center justify-center px-6 py-3 font-bold text-white transition-all duration-200 bg-blue-600 rounded-xl hover:bg-blue-700 active:scale-95"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-900 bg-slate-100"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[-1] md:hidden transition-all duration-500 ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="bg-white h-screen pt-24 px-8 flex flex-col gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-3xl font-black text-slate-900"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/auth/login"
            className="w-full py-4 text-center font-bold text-white bg-blue-600 rounded-2xl"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
