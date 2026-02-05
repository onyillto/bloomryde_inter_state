"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FiDollarSign,
  FiClock,
  FiShield,
  FiCheckCircle,
  FiArrowRight,
  FiFileText,
  FiUserCheck,
} from "react-icons/fi";
import { BiSolidBadgeCheck } from "react-icons/bi";

const ForDrivers = () => {
  const perks = [
    {
      icon: <FiDollarSign className="w-6 h-6" />,
      title: "Keep 100% Earnings",
      desc: "No platform commissions. What the passenger pays in cash is yours to keep.",
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: "Verified Passengers",
      desc: "Travel only with passengers who have verified phone numbers and emergency contacts.",
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: "Work Your Way",
      desc: "You choose your routes, your departure times, and your preferred pickup parks.",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-blue-50 rounded-full blur-[120px] -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 shadow-sm">
              <BiSolidBadgeCheck className="text-blue-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700">
                Driver Partnership
              </span>
            </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1]">
              Your Car, <br />
              <span className="text-blue-600">Your Business.</span>
            </h1>

            <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
              Join Nigeria's most trusted interstate network. Turn your
              long-distance trips into profit while helping travelers move
              safely across the country.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/driver-onboarding"
                className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-100 hover:bg-blue-700 hover:scale-105 transition-all text-center"
              >
                Start Registration
              </Link>
              <Link
                href="#requirements"
                className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all text-center"
              >
                View Requirements
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative h-[500px] rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl"
          >
            <Image
              src="/driver.jpg"
              alt="Professional Driver"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* --- VALUE PROPOSITION --- */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {perks.map((perk, i) => (
              <div
                key={i}
                className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {perk.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">
                  {perk.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- REQUIREMENTS SECTION (DOCS) --- */}
      <section id="requirements" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">
              Registration Requirements
            </h2>
            <p className="text-slate-500">
              Prepare these documents for a 15-minute onboarding process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Valid Driver's License", icon: <FiFileText /> },
              { label: "National ID (NIN)", icon: <FiUserCheck /> },
              { label: "Vehicle Registration Docs", icon: <FiCheckCircle /> },
              { label: "Insurance Certificate", icon: <FiShield /> },
              { label: "Guarantor Information", icon: <FiUserCheck /> },
              { label: "Vehicle Road Worthiness", icon: <FiArrowRight /> },
            ].map((req, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-6 bg-white border border-slate-100 rounded-2xl"
              >
                <div className="text-blue-600 text-xl">{req.icon}</div>
                <span className="font-bold text-slate-700">{req.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- STEP PREVIEW --- */}
      <section className="py-24 bg-blue-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          {/* Subtle pattern or grid could go here */}
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-black mb-16">
            Fast-track Verification
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Submit Docs",
                desc: "Upload license & NIN",
              },
              {
                step: "02",
                title: "Vehicle Check",
                desc: "Share car photos & docs",
              },
              {
                step: "03",
                title: "Background",
                desc: "We verify your records",
              },
              {
                step: "04",
                title: "Get Verified",
                desc: "Start picking riders",
              },
            ].map((s, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-black opacity-20 mb-4">
                  {s.step}
                </div>
                <h4 className="text-xl font-bold mb-2">{s.title}</h4>
                <p className="text-blue-100 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20">
            <Link
              href="/driver-onboarding"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-blue-600 rounded-2xl font-black hover:scale-105 transition-all shadow-2xl"
            >
              Become a Driver Now <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForDrivers;
