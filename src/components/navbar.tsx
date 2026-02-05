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
    { name: "Safety", href: "safety" },
    { name: "For Drivers", href: "for-drivers" },
    { name: "About", href: "about" },
  ];

  // Dynamic Styles based on scroll
  const textColor = isScrolled ? "text-slate-900" : "text-slate-700";
  const navBg = isScrolled
    ? "bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm py-3"
    : "bg-transparent py-6";

  return (
    <nav
      className={`fixed w-full top-0 z-[100] transition-all duration-300 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 transition-transform duration-300 group-hover:scale-110">
              {/* Assuming your logo looks good on white. If it's a white-only logo, you might need a dark version here */}
              <Image
                src="/logo.png"
                alt="BloomRydes Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* <span
              className={`text-xl font-black tracking-tighter ${textColor}`}
            >
              BloomRydes
            </span> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-full border border-slate-200/50">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 rounded-full hover:bg-white hover:shadow-sm ${textColor} hover:text-blue-600`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/login"
              className={`text-sm font-bold transition-colors duration-200 ${textColor} hover:text-blue-600`}
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="group inline-flex items-center justify-center px-6 py-3 font-bold text-white transition-all duration-200 bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-95"
            >
              <span>Sign Up</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? "text-slate-900 bg-slate-100"
                : "text-slate-900 bg-white/50"
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[-1] md:hidden transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="bg-white h-screen pt-24 px-8">
          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-black text-slate-900 hover:text-blue-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <div className="h-px bg-slate-100 my-2" />

            <div className="flex flex-col gap-4">
              <Link
                href="/login"
                className="flex items-center justify-center py-4 text-lg font-bold text-slate-900 border border-slate-200 rounded-2xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="flex items-center justify-center py-4 text-lg font-bold text-white bg-blue-600 rounded-2xl shadow-xl shadow-blue-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
