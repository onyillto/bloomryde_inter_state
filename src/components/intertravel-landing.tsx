"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiShield,
  FiStar,
  FiArrowRight,
  FiMapPin,
  FiUsers,
  FiNavigation,
} from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { BiSolidBadgeCheck } from "react-icons/bi";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Premium Background Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] opacity-60" />

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `radial-gradient(#e2e8f0 0.5px, transparent 0.5px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 shadow-sm">
              <HiOutlineSparkles className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Nigeria&apos;s #1 Interstate Platform
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]">
                Travel Safe. <br />
                <span className="text-blue-600">Travel Smart.</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                Connect with verified drivers for seamless interstate journeys.
                Experience transparent pricing and safety-first travel across
                Nigeria.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 py-6 border-y border-slate-100">
              {[
                { label: "Happy Travelers", val: "10K+" },
                { label: "Verified Drivers", val: "500+" },
                { label: "Routes Covered", val: "50+" },
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-3xl font-black text-slate-900">
                    {stat.val}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book-ride"
                className="group px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                Book a Ride
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/become-driver"
                className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-black hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                Become a Driver
                <FiNavigation />
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-100 shadow-sm">
                <BiSolidBadgeCheck className="text-emerald-500 w-5 h-5" />
                <span className="text-xs font-bold text-slate-700">
                  Verified Drivers
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-100 shadow-sm">
                <FiShield className="text-blue-500 w-5 h-5" />
                <span className="text-xs font-bold text-slate-700">
                  Insurance Protected
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Image with Premium Frame */}
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl shadow-blue-100">
              <div className="aspect-[4/5] relative">
                <Image
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1470&auto=format&fit=crop"
                  alt="Professional driver"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent" />
              </div>
            </div>

            {/* Floating Premium Cards */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -left-10 top-[15%] z-20 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white shadow-xl hidden xl:flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                <FiMapPin />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  Live Route
                </p>
                <p className="text-sm font-bold text-slate-900">
                  Lagos → Abuja
                </p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute -right-6 top-[40%] z-20 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white shadow-xl hidden xl:block"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200"
                    alt="Driver"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="text-xs font-bold text-slate-900">
                      Verified Driver
                    </p>
                    <BiSolidBadgeCheck className="text-emerald-500" />
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    <FiStar className="w-3 h-3 fill-current" />
                    <span className="text-[10px] font-bold text-slate-500">
                      4.9 (234 trips)
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ x: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute left-1/2 -bottom-6 -translate-x-1/2 z-20 px-6 py-3 rounded-2xl bg-slate-900 text-white shadow-2xl flex items-center gap-3"
            >
              <div className="flex items-center gap-2">
                <FiUsers className="text-blue-400" />
                <span className="text-sm font-bold">
                  1,247 active travelers
                </span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
