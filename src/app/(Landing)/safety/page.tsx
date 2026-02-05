"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  MapPin,
  PhoneCall,
  UserCheck,
  Lock,
  Bell,
} from "lucide-react";

const SafetySection = () => {
  const safetyFeatures = [
    {
      title: "Verified Drivers",
      description:
        "Every driver undergoes rigorous background, NIN, and license verification.",
      icon: <UserCheck className="w-5 h-5" />,
    },
    {
      title: "Real-Time Tracking",
      description:
        "Share your live trip location with loved ones in one click.",
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      title: "24/7 SOS Support",
      description:
        "Dedicated emergency hotline available for every single journey.",
      icon: <PhoneCall className="w-5 h-5" />,
    },
  ];

  return (
    <section
      className="bg-white py-24 px-6 relative overflow-hidden"
      id="safety"
    >
      {/* Decorative Blur Background */}
      <div className="absolute top-0 right-0 w-[30%] h-[40%] bg-blue-50/50 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Text & Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-6">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Safety First Always
              </span>
            </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 leading-tight">
              Your <span className="text-blue-600">Safety</span> is <br />
              Our Priority.
            </h2>

            <p className="text-slate-500 text-lg mb-10 max-w-lg leading-relaxed">
              We've built a multi-layered security system to ensure every trip
              across Nigeria is as secure as possible.
            </p>

            <div className="space-y-6">
              {safetyFeatures.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex gap-5 p-6 bg-white border border-slate-100 rounded-[2rem] hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">
                      {feature.title}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Visual Bento Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative grid grid-cols-2 gap-4"
          >
            {/* Main Visual: Verified Driver */}
            <div className="col-span-2 relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1470&auto=format&fit=crop"
                alt="Verified Driver"
                fill
                className="object-cover"
              />
              <div className="absolute top-6 left-6 px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-bold flex items-center gap-2">
                <Lock className="w-3 h-3" /> Verified Driver Profile
              </div>
            </div>

            {/* Live Map Card */}
            <div className="bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform">
                <MapPin className="w-12 h-12" />
              </div>
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">
                Active Tech
              </p>
              <h4 className="font-bold text-lg leading-tight">
                Live Location Sharing
              </h4>
              <div className="mt-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-medium text-slate-400">
                  System Online
                </span>
              </div>
            </div>

            {/* Emergency Hotline Card */}
            <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-xl shadow-blue-100/20 group">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 mb-4 group-hover:bg-red-500 group-hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-lg leading-tight">
                24/7 Emergency Support
              </h4>
              <p className="text-[10px] text-slate-400 mt-2 font-bold uppercase tracking-tighter">
                Response time: &lt; 2 mins
              </p>
            </div>

            {/* Decorative Floating Element */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-2xl border border-slate-50 hidden md:flex items-center gap-3 z-30"
            >
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-xs font-black text-slate-800 uppercase tracking-tighter">
                Guarantor Verified
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SafetySection;
