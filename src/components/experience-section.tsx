"use client";
import React from "react";
import {
  ShieldCheck,
  Headphones,
  CreditCard,
  MapPinned,
  Zap,
  Award,
} from "lucide-react";

interface Feature {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  highlight?: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: ShieldCheck,
    title: "Safety First",
    description:
      "Every vehicle undergoes 150-point inspection. Real-time GPS tracking for complete peace of mind.",
    highlight: "150+",
  },
  {
    id: 2,
    icon: Headphones,
    title: "24/7 Concierge",
    description:
      "Dedicated support team available round the clock. Average response time under 2 minutes.",
    highlight: "2min",
  },
  {
    id: 3,
    icon: CreditCard,
    title: "Transparent Pricing",
    description:
      "No surge pricing, no hidden fees. Lock in your fare at booking with our price guarantee.",
    highlight: "0%",
  },
  {
    id: 4,
    icon: MapPinned,
    title: "Nationwide Coverage",
    description:
      "Connecting 200+ cities across the country. New routes added every month.",
    highlight: "200+",
  },
  {
    id: 5,
    icon: Zap,
    title: "Instant Booking",
    description:
      "Book your seat in under 60 seconds. Receive instant confirmation and e-tickets.",
    highlight: "60s",
  },
  {
    id: 6,
    icon: Award,
    title: "Premium Experience",
    description:
      "Complimentary WiFi, refreshments, and extra legroom on every journey.",
    highlight: "5★",
  },
];

export default function WhyTravelWithUs() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white" />

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#5BC0EB 1px, transparent 1px), linear-gradient(90deg, #5BC0EB 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Blue Accent Shape */}
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-[#5BC0EB]/[0.08] to-[#5BC0EB]/[0.05] rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] bg-gradient-to-tr from-[#5BC0EB]/[0.06] to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#5BC0EB]" />
            <span className="text-[#5BC0EB] font-semibold text-sm tracking-wide uppercase">
              Why InterTravel
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
            Travel should be{" "}
            <span className="relative">
              <span className="relative z-10">effortless</span>
              <span className="absolute bottom-2 left-0 w-full h-3 bg-[#5BC0EB]/20 -z-0" />
            </span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            We&apos;ve reimagined interstate travel from the ground up. Every
            detail is designed around your comfort and convenience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {features.map((feature) => (
            <div key={feature.id} className="group relative">
              {/* Card */}
              <div className="relative h-full p-8 bg-white border border-slate-100 rounded-2xl transition-all duration-500 hover:border-[#5BC0EB]/20 hover:shadow-2xl hover:shadow-[#5BC0EB]/10">
                {/* Highlight Number */}
                <div className="absolute -top-4 right-8 px-3 py-1 bg-[#5BC0EB] rounded-full">
                  <span className="text-white text-xs font-bold tracking-wide">
                    {feature.highlight}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#5BC0EB]/10 to-slate-50 border border-[#5BC0EB]/20 rounded-xl transition-all duration-500 group-hover:from-[#5BC0EB] group-hover:to-[#47a8d9] group-hover:border-[#5BC0EB] group-hover:scale-105">
                    <feature.icon
                      className="w-6 h-6 text-[#5BC0EB] transition-colors duration-500 group-hover:text-white"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-[15px]">
                  {feature.description}
                </p>

                {/* Hover Arrow */}
                <div className="mt-6 flex items-center gap-2 text-[#5BC0EB] opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  <span className="text-sm font-medium">Learn more</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6 pt-12 border-t border-slate-100">
          <p className="text-slate-500">Ready to experience the difference?</p>
          <button className="group inline-flex items-center gap-3 px-8 py-4 bg-[#5BC0EB] hover:bg-[#47a8d9] text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-[#5BC0EB]/25 hover:shadow-xl hover:shadow-[#5BC0EB]/30">
            <span>Start Your Journey</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

// import React from "react";
// import { ShieldCheck, Globe, Clock, Award, ArrowRight } from "lucide-react";

// const features = [
//   {
//     title: "Curated Excellence",
//     description:
//       "Every destination and coach is hand-vetted by our experts to ensure it meets our strict 5-star hospitality standards.",
//     icon: <Award className="w-6 h-6" />,
//   },
//   {
//     title: "Seamless Logistics",
//     description:
//       "From private transfers to priority boarding, we handle the intricacies so you can focus on the journey.",
//     icon: <Globe className="w-6 h-6" />,
//   },
//   {
//     title: "24/7 Support",
//     description:
//       "Real-time assistance from a dedicated travel specialist who knows your itinerary as well as you do.",
//     icon: <Clock className="w-6 h-6" />,
//   },
//   {
//     title: "Secure & Private",
//     description:
//       "Advanced encryption for your bookings and a commitment to discretion for every journey you take.",
//     icon: <ShieldCheck className="w-6 h-6" />,
//   },
// ];

// const WhyTravelWithUs = () => {
//   return (
//     <section className="relative bg-[#0a0a0b] py-24 px-8 lg:px-16 overflow-hidden">
//       {/* Subtle Blue Glow to match brand */}
//       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -mr-64 -mt-64" />

//       <div className="relative z-10 max-w-6xl mx-auto">
//         {/* Header Section */}
//         <div className="max-w-3xl mb-16">
//           <h2 className="text-blue-500 font-medium tracking-[0.2em] uppercase text-xs mb-4">
//             The InterTravel Experience
//           </h2>
//           <h3 className="text-4xl md:text-5xl text-white font-serif italic leading-tight">
//             Why discerning travelers <br />
//             <span className="text-white/60">choose our network.</span>
//           </h3>
//         </div>

//         {/* Grid Layout - Modern Glass Style */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-3xl overflow-hidden">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="group p-10 bg-[#0f0f11] hover:bg-white/[0.02] transition-all duration-500"
//             >
//               <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
//                 {feature.icon}
//               </div>

//               <h4 className="text-xl font-semibold text-white mb-4">
//                 {feature.title}
//               </h4>

//               <p className="text-white/50 leading-relaxed mb-6 group-hover:text-white/70 transition-colors">
//                 {feature.description}
//               </p>

//               <button className="flex items-center gap-2 text-sm font-medium text-blue-500 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
//                 Explore details <ArrowRight className="w-4 h-4" />
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Brand Bottom Note */}
//         <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5 pt-12">
//           <p className="text-white/40 text-sm max-w-md">
//             Joining over 50,000+ monthly travelers who trust InterTravel for
//             their premium transit needs across the globe.
//           </p>
//           <button className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-blue-500 hover:text-white transition-all duration-300">
//             Book Your Next Trip
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default WhyTravelWithUs;
