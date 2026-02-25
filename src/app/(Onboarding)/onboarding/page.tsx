"use client";

import React, { useState } from "react";
import { ArrowRight, User, Car, CheckCircle2 } from "lucide-react";
import RiderOnboarding from "../../../components/RiderOnboarding";
import DriverOnboarding from "../../../components/DriverOnboarding";

// ─────────────────────────────────────────────────────────────
//  CHOOSE TYPE SCREEN (Desktop Optimized)
// ─────────────────────────────────────────────────────────────
function ChooseTypePage({ onSelect }: { onSelect: (role: "rider" | "driver") => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-400/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto space-y-12">
        {/* Header Section - Responsive Text Sizes */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-300 animate-ping" />
            Interstate Travel Redefined
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[1.05]">
            Choose your <span className="text-blue-200">BloomRyde</span>{" "}
            journey.
          </h1>
          <p className="text-white/70 text-base md:text-xl font-medium max-w-xl mx-auto leading-relaxed">
            Whether you're heading home or driving there, we've got the tools to
            make it seamless.
          </p>
        </div>

        {/* Role Cards - Grid switches to 2 columns on small/medium screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 max-w-5xl mx-auto">
          {/* Rider Card - "Light Pro" Aesthetic */}
          <button
            onClick={() => onSelect("rider")}
            className="group relative bg-white rounded-[2.5rem] p-8 lg:p-12 text-left transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)] active:scale-[0.98] overflow-hidden border border-transparent hover:border-white/50"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <User size={120} strokeWidth={1} />
            </div>

            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-8 shadow-2xl shadow-blue-600/40 group-hover:scale-110 transition-transform duration-500">
              <User size={32} className="text-white" strokeWidth={2.5} />
            </div>

            <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
              I want to Ride
            </h3>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed font-medium">
              Book affordable interstate seats and travel with verified,
              top-rated drivers.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "Doorstep terminal pickup",
                "Real-time trip tracking",
                "Secure cash payments",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-slate-700 font-bold text-sm"
                >
                  <CheckCircle2 size={18} className="text-blue-600" />
                  {item}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest group-hover:gap-4 transition-all">
              Start Booking <ArrowRight size={20} />
            </div>
          </button>

          {/* Driver Card - "Dark Pro" Aesthetic */}
          <button
            onClick={() => onSelect("driver")}
            className="group relative bg-slate-900 rounded-[2.5rem] p-8 lg:p-12 text-left transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)] active:scale-[0.98] overflow-hidden border border-white/5"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Car size={120} strokeWidth={1} className="text-white" />
            </div>

            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-2xl shadow-white/10 group-hover:scale-110 transition-transform duration-500">
              <Car size={32} className="text-slate-900" strokeWidth={2.5} />
            </div>

            <h3 className="text-3xl font-black text-white mb-3 tracking-tight">
              I want to Drive
            </h3>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed font-medium">
              Turn your empty seats into earnings. You set the price, we find
              the people.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "Keep 100% of your cash",
                "Verified passenger IDs",
                "Full trip control",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-slate-300 font-bold text-sm"
                >
                  <CheckCircle2 size={18} className="text-blue-400" />
                  {item}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-white font-black text-sm uppercase tracking-widest group-hover:text-blue-400 group-hover:gap-4 transition-all">
              Become a Driver <ArrowRight size={20} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  ROOT PAGE EXPORT
// ─────────────────────────────────────────────────────────────
export default function OnboardingPage({ searchParams }: { searchParams: { phone?: string } }) {
  const phone = searchParams?.phone ?? "";
  const [role, setRole] = useState<"rider" | "driver" | null>(null);
  const [visible, setVisible] = useState(true);
  const [dir, setDir] = useState("forward");

  const navigate = (target: "rider" | "driver" | null, direction: "forward" | "back") => {
    setDir(direction);
    setVisible(false);
    setTimeout(() => {
      setRole(target);
      setVisible(true);
    }, 300);
  };

  const pageStyle = {
    transition:
      "opacity 400ms cubic-bezier(0.4, 0, 0.2, 1), transform 400ms cubic-bezier(0.4, 0, 0.2, 1)",
    opacity: visible ? 1 : 0,
    transform: visible
      ? "scale(1) translateX(0)"
      : dir === "forward"
      ? "scale(0.98) translateX(-40px)"
      : "scale(0.98) translateX(40px)",
  };

  return (
    <div className="bg-slate-900 overflow-hidden min-h-screen">
      <div style={pageStyle} className="min-h-screen">
        {role === null && (
          <ChooseTypePage onSelect={(r) => navigate(r, "forward")} />
        )}
        {role === "rider" && (
          <RiderOnboarding
            phone={phone}
            onBackToChoose={() => navigate(null, "back")}
          />
        )}
        {role === "driver" && (
          <DriverOnboarding
            phone={phone}
            onBackToChoose={() => navigate(null, "back")}
          />
        )}
      </div>
    </div>
  );
}
