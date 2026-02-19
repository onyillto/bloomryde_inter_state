"use client";

import React, { useState } from "react";
import { ShieldCheck, TrendingUp, Star } from "lucide-react";
import AuthForm from "@/components/AuthForm";
import ForgotPasswordForm from "../../../../components/Forgotpasswordform";
import RegisterForm from "../../../../components/Registerform";

const viewMeta = {
  auth: {
    headline: (
      <>
        Premium travel <br />
        <span className="text-blue-600">without the chaos.</span>
      </>
    ),
    sub: "Nigeria's most trusted interstate network. We connect verified travelers with professional drivers in a secure, digital ecosystem.",
  },
  forgot: {
    headline: (
      <>
        Locked out? <br />
        <span className="text-blue-600">We've got you.</span>
      </>
    ),
    sub: "Account recovery is quick and secure. Follow the steps to reset your password and get back on the road.",
  },
  register: {
    headline: (
      <>
        Your journey <br />
        <span className="text-blue-600">starts here.</span>
      </>
    ),
    sub: "Create a verified account and join 50,000+ travelers moving smarter across Nigeria.",
  },
};

export default function BloomRydesAuthPage() {
  const [view, setView] = useState("auth");
  const [animating, setAnimating] = useState(false);
  const [slideOut, setSlideOut] = useState(false);
  const [slideDir, setSlideDir] = useState("forward");

  const switchTo = (target, dir = "forward") => {
    if (animating) return;
    setSlideDir(dir);
    setAnimating(true);
    setSlideOut(true);
    setTimeout(() => {
      setView(target);
      setSlideOut(false);
      setTimeout(() => setAnimating(false), 400);
    }, 300);
  };

  const meta = viewMeta[view];

  const formSlideStyle = {
    transition: "opacity 300ms ease, transform 300ms ease",
    opacity: slideOut ? 0 : 1,
    transform: slideOut
      ? slideDir === "forward"
        ? "translateX(-28px) scale(0.97)"
        : "translateX(28px) scale(0.97)"
      : "translateX(0) scale(1)",
  };

  return (
    <div className="relative w-full flex-1 flex flex-col justify-center bg-[#020617] text-slate-200 selection:bg-blue-500/30 overflow-hidden pt-20 lg:pt-0">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <main className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 py-12 items-center">
        {/* RIGHT: Form */}
        <div className="lg:col-span-5 order-first lg:order-last">
          <div style={formSlideStyle}>
            {view === "auth" && (
              <AuthForm
                onForgotPassword={() => switchTo("forgot", "forward")}
                onRegister={() => switchTo("register", "forward")}
              />
            )}
            {view === "forgot" && (
              <ForgotPasswordForm onBack={() => switchTo("auth", "back")} />
            )}
            {view === "register" && (
              <RegisterForm
                onBack={() => switchTo("auth", "back")}
                onSwitchToLogin={() => switchTo("auth", "back")}
              />
            )}
          </div>
        </div>

        {/* LEFT: Marketing */}
        <div className="lg:col-span-7 space-y-8 order-last lg:order-first">
          <div
            style={{
              transition: "opacity 500ms ease, transform 500ms ease",
              opacity: slideOut ? 0.3 : 1,
              transform: slideOut ? "translateY(6px)" : "translateY(0)",
            }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              Network Online
            </div>

            <h1
              className="text-4xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight"
              style={{
                transition: "opacity 400ms ease",
                opacity: slideOut ? 0 : 1,
              }}
            >
              {meta.headline}
            </h1>

            <p className="text-base lg:text-lg text-slate-400 max-w-lg leading-relaxed">
              {meta.sub}
            </p>
          </div>

          <div className="hidden sm:grid grid-cols-2 gap-4 max-w-2xl">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-4 hover:bg-white/[0.06] transition-colors">
              <div className="p-2 rounded-lg bg-blue-600/20 text-blue-500 shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">
                  Vetted Only
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Biometric identity verification for all riders.
                </p>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-4 hover:bg-white/[0.06] transition-colors">
              <div className="p-2 rounded-lg bg-blue-600/20 text-blue-500 shrink-0">
                <TrendingUp size={24} />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">
                  Live Tracking
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Real-time status sharing for peace of mind.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-white/5 lg:border-none">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-[#020617] bg-slate-800"
                />
              ))}
            </div>
            <div>
              <p className="text-white font-bold text-xs lg:text-sm">
                Joined by 50,000+ travelers
              </p>
              <div className="flex text-blue-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={10} fill="currentColor" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
