
"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FiTarget,
  FiEye,
  FiAward,
  FiGlobe,
  FiTrendingUp,
  FiShield,
} from "react-icons/fi";
import { BiSolidQuoteAltLeft } from "react-icons/bi";

const AboutPage = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="bg-white overflow-hidden">
      {/* --- EXTRA-TERRESTRIAL HERO --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full blur-[120px] opacity-60 animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-50 rounded-full blur-[150px] opacity-60" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-slate-900 text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              Our Origin Story
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 tracking-tighter leading-none mb-8">
              Moving <span className="text-blue-600">Millions</span> <br />
              Beyond Borders.
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
              We didn't just build an app. We built a trust infrastructure for
              the 200 million Nigerians moving across the giant of Africa.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- FLOATING VISUAL SECTION --- */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 h-[600px]">
          <motion.div
            style={{ y: y1 }}
            className="relative rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <Image
              src="https://images.unsplash.com/photo-1650692212199-f7290e50ca35?q=80&w=3072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Lagos Highway"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="relative rounded-[3rem] overflow-hidden shadow-2xl translate-y-20"
          >
            <Image
              src="https://images.unsplash.com/photo-1636935529049-2078e9ee3e6c?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Tech and Travel"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* --- THE MISSION (GLASSMORPHISM) --- */}
      <section className="py-32 px-6 bg-slate-900 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8">
                The Mission <br />
                <span className="text-blue-500 text-3xl md:text-5xl opacity-80">
                  Empowering every mile.
                </span>
              </h2>
              <div className="space-y-8">
                {[
                  {
                    icon: <FiTarget />,
                    title: "Precision Matching",
                    text: "Connecting the right driver to the right traveler using advanced route logic.",
                  },
                  {
                    icon: <FiShield />,
                    title: "Safety Infrastructure",
                    text: "Setting the gold standard for interstate security through multi-level vetting.",
                  },
                  {
                    icon: <FiGlobe />,
                    title: "National Scale",
                    text: "Bridging the gap between 36 states with a single, unified travel network.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">
                        {item.title}
                      </h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative p-12 bg-white/5 border border-white/10 rounded-[4rem] backdrop-blur-xl">
              <BiSolidQuoteAltLeft className="text-blue-600 text-6xl mb-6 opacity-50" />
              <p className="text-2xl md:text-3xl font-medium text-white italic leading-snug">
                "BloomRydes was born out of a simple observation: travel is a
                necessity, but safety is a right. We are making that right
                accessible to every Nigerian."
              </p>
              <div className="mt-10 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center font-black text-white text-xl">
                  B
                </div>
                <div>
                  <p className="text-white font-bold">The Founding Team</p>
                  <p className="text-blue-400 text-sm">BloomRydes Interstate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS GRID --- */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "States Covered", val: "36", icon: <FiTrendingUp /> },
              { label: "Verified Partners", val: "1.2k+", icon: <FiAward /> },
              { label: "Monthly Travelers", val: "15k+", icon: <FiEye /> },
              { label: "Success Rate", val: "99.9%", icon: <FiShield /> },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center space-y-4 p-8 rounded-[2rem] hover:bg-slate-50 transition-colors"
              >
                <div className="text-blue-600 flex justify-center text-2xl mb-2">
                  {stat.icon}
                </div>
                <h3 className="text-5xl font-black text-slate-900">
                  {stat.val}
                </h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FINAL CTA --- */}
      <section className="pb-32 px-6">
        <div className="max-w-5xl mx-auto rounded-[3.5rem] bg-gradient-to-br from-blue-600 to-indigo-700 p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8">
              Ready to move?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-5 bg-white text-blue-600 rounded-2xl font-black hover:scale-105 transition-all shadow-xl">
                Book Your Ride
              </button>
              <button className="px-10 py-5 bg-blue-900/30 border border-white/20 text-white rounded-2xl font-black hover:bg-blue-900/50 transition-all">
                Partner With Us
              </button>
            </div>
          </div>
          {/* Subtle decoration */}
          <div className="absolute top-[-20%] left-[-10%] w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        </div>
      </section>
    </div>
  );
};

export default AboutPage;