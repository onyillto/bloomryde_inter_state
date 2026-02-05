"use client";

import React from "react";
import { FaApple, FaGooglePlay } from "react-icons/fa";

const CoreFeatures = () => {
  const features = [
    {
      title: "VERIFIED DRIVERS ONLY",
      bgColor: "bg-[#FF5F1F]",
      textColor: "text-black",
      illustration: (
        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-teal-500 rounded-full border-2 border-black flex items-center justify-center self-start">
          <span className="text-2xl sm:text-4xl">🛡️</span>
        </div>
      ),
    },
    {
      title: "FRICTIONLESS ONBOARDING",
      bgColor: "bg-[#FFD700]",
      textColor: "text-black",
      illustration: (
        <div className="w-20 h-12 sm:w-24 sm:h-16 bg-purple-200 border-2 border-black rounded-lg self-end rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" />
      ),
    },
    {
      title: "DON'T JUST HODL. GROW.",
      bgColor: "bg-[#4D9FFF]",
      textColor: "text-black",
      illustration: <div className="text-4xl sm:text-6xl self-end">🚀</div>,
    },
    {
      title: "PAY ANYONE INSTANTLY",
      bgColor: "bg-[#D8B4FE]",
      textColor: "text-black",
      illustration: (
        <div className="flex gap-2 self-end">
          <div className="w-12 h-8 sm:w-16 sm:h-10 bg-blue-400 border-2 border-black rounded-md rotate-[-10deg] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
          <div className="w-12 h-8 sm:w-16 sm:h-10 bg-indigo-600 border-2 border-black rounded-md rotate-[5deg] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
        </div>
      ),
    },
  ];

  return (
    <section className="bg-white py-12 md:py-16 px-4 md:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-gray-900 max-w-4xl mx-auto leading-[1.1]">
            Travel safely across Nigeria
            <br />
            <span className="font-normal">—with none of the hassle</span>
          </h2>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
            <button className="flex items-center justify-center gap-3 px-6 py-3 bg-black text-white rounded-full font-bold hover:scale-105 transition-all">
              <FaApple size={22} />
              <div className="text-left leading-none">
                <p className="text-[9px] uppercase">Download on the</p>
                <p className="text-base">App Store</p>
              </div>
            </button>
            <button className="flex items-center justify-center gap-3 px-6 py-3 bg-white border-2 border-black text-black rounded-full font-bold hover:bg-gray-50 transition-all">
              <FaGooglePlay size={18} />
              <div className="text-left leading-none">
                <p className="text-[9px] uppercase">Get it on</p>
                <p className="text-base">Google Play</p>
              </div>
            </button>
          </div>
        </div>

        {/* Feature Cards Container */}
        {/* We use a grid that turns into a scrollable flex on mobile */}
        <div className="flex overflow-x-auto gap-4 pb-6 snap-x snap-mandatory no-scrollbar md:grid md:grid-cols-4 md:overflow-x-visible">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`${feature.bgColor} ${feature.textColor} 
                min-w-[85vw] sm:min-w-[300px] md:min-w-0 
                aspect-[4/5] rounded-[2rem] p-6 md:p-8 
                flex flex-col justify-between border-2 border-black 
                snap-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}
            >
              {/* Responsive Text: scales based on screen width */}
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[0.85] tracking-tighter uppercase italic break-words">
                {feature.title}
              </h3>

              <div className="mt-4">{feature.illustration}</div>
            </div>
          ))}
        </div>

        {/* Mobile-only Progress Indicator */}
        <div className="flex justify-center gap-2 mt-2 md:hidden">
          {features.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300" />
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

export default CoreFeatures;
