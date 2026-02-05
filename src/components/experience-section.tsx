"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  Phone,
  DollarSign,
  Shield,
  CheckCircle,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      icon: <Search className="w-8 h-8" />,
      title: "Search & Match",
      description:
        "Search for trips by route and date. Find verified drivers heading your way.",
      features: ["Filter by time", "Compare ratings", "Vehicle details"],
      color: "blue",
    },
    {
      number: "02",
      icon: <Phone className="w-8 h-8" />,
      title: "Connect Directly",
      description:
        "Contact your driver via phone. No middleman, just direct communication.",
      features: ["Phone access", "Pickup details", "Direct chat"],
      color: "indigo",
    },
    {
      number: "03",
      icon: <DollarSign className="w-8 h-8" />,
      title: "Pay in Person",
      description:
        "Simple cash payment directly to your driver. Transparent pricing.",
      features: ["Cash on arrival", "No hidden fees", "Agreed price"],
      color: "blue",
    },
    {
      number: "04",
      icon: <Shield className="w-8 h-8" />,
      title: "Travel Safe",
      description:
        "Enjoy your journey with verified drivers and real-time trip sharing.",
      features: ["Verified ID", "SOS system", "Trip tracking"],
      color: "indigo",
    },
  ];

  const differences = [
    { feature: "Driver Verification", bloomrydes: true, rideHailing: false },
    { feature: "Direct Communication", bloomrydes: true, rideHailing: false },
    { feature: "Cash Payment", bloomrydes: true, rideHailing: false },
    { feature: "Interstate Routes", bloomrydes: true, rideHailing: false },
    { feature: "No Service Fees", bloomrydes: true, rideHailing: false },
  ];

  return (
    <section className="relative bg-white py-24 sm:py-32 overflow-hidden">
      {/* Premium Background Accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6"
          >
            <CheckCircle className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold tracking-wider uppercase text-blue-700">
              Simple Process
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight"
          >
            How It <span className="text-blue-600">Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            BloomRydes is a matching platform. We connect you with verified
            drivers for seamless interstate travel.
          </motion.p>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative bg-white border border-slate-100 rounded-3xl p-8 shadow-sm shadow-blue-100/50 hover:shadow-xl hover:shadow-blue-50 transition-all duration-300"
            >
              <div className="text-5xl font-black text-slate-50 absolute top-6 right-8 select-none">
                {step.number}
              </div>

              <div
                className={`w-14 h-14 rounded-2xl ${
                  index % 2 === 0 ? "bg-blue-600" : "bg-slate-900"
                } flex items-center justify-center mb-8 shadow-lg`}
              >
                <div className="text-white">{step.icon}</div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {step.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                {step.description}
              </p>

              <ul className="space-y-3">
                {step.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2 text-xs font-semibold text-slate-700"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-blue-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Comparison Section */}
        {/* Comparison Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-slate-50 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-16 border border-slate-100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 mb-6 shadow-sm">
                <BadgeCheck className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  The BloomRydes Edge
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
                Not your average <br className="hidden md:block" /> ride service
              </h3>
              <p className="text-slate-600 mb-8 leading-relaxed text-sm md:text-base">
                We've built a{" "}
                <span className="text-blue-600 font-bold">
                  trust-based ecosystem
                </span>{" "}
                for long-distance travel. No algorithms, no hidden fees, just
                people helping people move safely.
              </p>

              <div className="grid gap-3">
                {[
                  {
                    t: "Direct Connection",
                    d: "Talk to your driver instantly via phone.",
                  },
                  {
                    t: "Interstate Specialist",
                    d: "Designed specifically for Nigeria's long-haul routes.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm md:text-base">
                        {item.t}
                      </h4>
                      <p className="text-xs text-slate-500">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Refined Table */}
            <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-2xl shadow-blue-100/50 border border-slate-100 relative overflow-hidden">
              {/* Decorative Glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-50" />

              <h4 className="text-lg font-bold text-slate-900 mb-8 flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                Comparison
                <span className="text-xs font-medium text-slate-400 border-l-0 md:border-l md:pl-2 border-slate-200">
                  BloomRydes vs. Traditional Apps
                </span>
              </h4>

              <div className="space-y-0">
                {/* Table Header */}
                <div className="grid grid-cols-12 mb-4 pb-2 border-b border-slate-50">
                  <div className="col-span-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Feature
                  </div>
                  <div className="col-span-3 text-center text-[10px] font-bold uppercase tracking-widest text-blue-600">
                    BloomRydes
                  </div>
                  <div className="col-span-3 text-center text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Others
                  </div>
                </div>

                {/* Table Rows */}
                {differences.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 items-center py-4 border-b border-slate-50 last:border-0 group"
                  >
                    <div className="col-span-6">
                      <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                        {item.feature}
                      </span>
                    </div>

                    <div className="col-span-3 flex justify-center">
                      <motion.div
                        initial={{ scale: 0.8 }}
                        whileInView={{ scale: 1 }}
                        className="relative"
                      >
                        <CheckCircle className="w-5 h-5 text-blue-600 relative z-10" />
                        <motion.div
                          animate={{
                            scale: [1, 1.4, 1],
                            opacity: [0.3, 0, 0.3],
                          }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="absolute inset-0 bg-blue-400 rounded-full blur-md"
                        />
                      </motion.div>
                    </div>

                    <div className="col-span-3 flex justify-center">
                      <div className="w-5 h-5 rounded-full border-2 border-slate-100 bg-slate-50/50" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50 flex justify-center">
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full uppercase tracking-[0.15em] shadow-sm border border-blue-100">
                  Superior Safety & Savings
                </span>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-2">
            Find a Ride <ArrowRight className="w-5 h-5" />
          </button>
          <button className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-lg shadow-slate-200 hover:bg-black hover:scale-105 transition-all flex items-center gap-2">
            Drive with Us <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
