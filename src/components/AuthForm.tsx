"use client";

import React, { useState } from "react";
import { Smartphone, Mail, Lock, EyeOff, ArrowRight } from "lucide-react";

export default function AuthForm() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="relative">
      {/* Subtle Outer Glow Accent */}
      <div className="absolute -inset-4 bg-blue-600/5 blur-3xl rounded-[2.5rem]"></div>

      <div className="relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl">
        {/* Custom Tab Switcher */}
        <div className="flex p-1.5 bg-black/40 rounded-2xl mb-8 border border-white/5">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
              activeTab === "login"
                ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20"
                : "text-slate-500 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
              activeTab === "signup"
                ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20"
                : "text-slate-500 hover:text-white"
            }`}
          >
            Register
          </button>
        </div>

        <div className="space-y-6">
          <header className="space-y-2">
            <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
              {activeTab === "login" ? "Welcome back" : "Create Account"}
            </h2>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">
              {activeTab === "login"
                ? "Access your premium travel dashboard"
                : "Join the elite network of interstate travelers"}
            </p>
          </header>

          <div className="space-y-4">
            {/* Phone Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                Phone Number
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                  <Smartphone size={18} />
                </div>
                <input
                  type="tel"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600 transition-all"
                  placeholder="080 0000 0000"
                />
              </div>
            </div>

            {/* Email Input (Signup Only) */}
            {activeTab === "signup" && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600 transition-all"
                    placeholder="alex@example.com"
                  />
                </div>
              </div>
            )}

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600 transition-all"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-slate-600 hover:text-slate-400 transition-colors">
                  <EyeOff size={18} />
                </div>
              </div>
            </div>

            {/* Confirm Password (Signup Only) */}
            {activeTab === "signup" && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-500">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type="password"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}
          </div>

          {activeTab === "login" && (
            <div className="flex justify-end">
              <button className="text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors tracking-wide">
                Forgot Password?
              </button>
            </div>
          )}

          <button className="group w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98]">
            {activeTab === "login" ? "Sign In" : "Create Account"}
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>

          <div className="flex items-center justify-center gap-4 pt-2 text-slate-600 border-t border-white/5">
            <div className="flex items-center gap-2">
              <Lock size={12} className="text-blue-500/50" />
              <span className="text-[10px] uppercase font-bold tracking-widest">
                Secure 256-bit Encryption
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
