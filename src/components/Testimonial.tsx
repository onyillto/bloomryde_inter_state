"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, ArrowRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "The verification process gave me so much peace of mind. Truly a game changer for Nigeria.",
    author: "Chioma Eze",
    role: "Verified Traveler",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800&auto=format&fit=crop",
    color: "bg-teal-500",
    filter: "sepia(0.2) hue-rotate(140deg) saturate(1.5)",
  },
  {
    quote:
      "I've been driving for years, but this is the first platform that actually cares about my safety.",
    author: "Babajide Soyinka",
    role: "Verified Driver",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    color: "bg-purple-500",
    filter: "sepia(0.2) hue-rotate(240deg) saturate(1.5)",
  },
  {
    quote:
      "The direct connection to drivers makes everything faster. No more waiting for app dispatches.",
    author: "Amara Okoro",
    role: "Frequent User",
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
    color: "bg-pink-500",
    filter: "sepia(0.2) hue-rotate(300deg) saturate(1.5)",
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
            Trust is our <span className="text-blue-600">Product data</span>
          </h2>
          <p className="mt-4 text-slate-500 text-lg">
            See why thousands of Nigerians choose BloomRydes
          </p>
        </div>

        {/* Testimonial Cards Container */}
        <div className="flex overflow-x-auto gap-8 pb-12 no-scrollbar snap-x snap-mandatory">
          {testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="min-w-[90vw] md:min-w-[600px] bg-slate-50 border border-slate-100 rounded-[2.5rem] p-6 md:p-8 snap-center flex flex-col md:flex-row gap-8 items-center shadow-sm hover:shadow-xl transition-shadow duration-500"
            >
              {/* Content Side */}
              <div className="flex-1 space-y-6">
                <Quote className="text-blue-600 w-10 h-10 opacity-50" />
                <p className="text-xl md:text-2xl font-bold text-slate-800 leading-snug tracking-tight">
                  “{item.quote}”
                </p>
                <div>
                  <h4 className="font-black text-slate-900">{item.author}</h4>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {item.role}
                  </p>
                </div>
                {/* <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-bold text-sm hover:bg-blue-700 transition-all group shadow-lg shadow-blue-100">
                  Watch Story
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button> */}
              </div>

              {/* Image Side */}
              <div className="relative w-full md:w-[260px] aspect-square md:aspect-[4/5] rounded-[1.5rem] overflow-hidden group">
                <div
                  className={`absolute inset-0 ${item.color} opacity-20 z-10`}
                />
                <Image
                  src={item.image}
                  alt={item.author}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ filter: item.filter }}
                />

                {/* Play Button Overlay */}
                {/* <div className="absolute inset-0 flex items-center justify-center z-20">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 bg-slate-900/90 text-white rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-2xl"
                  >
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </motion.button>
                </div> */}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === 0 ? "w-8 bg-blue-600" : "w-2 bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
