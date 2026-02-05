"use client";

import React, { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import InterTravelLanding from "../components/intertravel-landing";
import ExperienceSection from "../components/experience-section";
import Coreeauture from "../components/corefeautures";
import TestimonialsSection from "@/components/Testimonial";

export default function Home() {
  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] = useState("up");

  // Track scroll direction for premium interaction effects
  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = current - previous;
    // Added a small threshold (5) to prevent jittering on mobile rubber-banding
    if (Math.abs(diff) > 5) {
      setScrollDirection(diff > 0 ? "down" : "up");
    }
  });

  return (
    <main className="relative">
      {/* Pro Tip: You can use scrollDirection here to 
          trigger global UI changes if needed 
      */}

      <InterTravelLanding />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <ExperienceSection />
      </motion.div>

      <Coreeauture />

      <TestimonialsSection />

      {/* Optional: Floating 'Back to top' or 'Book' button that hides on scroll down */}
      <motion.div
        animate={{
          y: scrollDirection === "down" ? 100 : 0,
          opacity: scrollDirection === "down" ? 0 : 1,
        }}
        className="fixed bottom-8 right-8 z-50 hidden md:block"
      >
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-xl shadow-blue-200">
          Chat Bot
        </button>
      </motion.div>
    </main>
  );
}
