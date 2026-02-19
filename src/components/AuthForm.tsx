"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Smartphone,
  Lock,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from "lucide-react";

const RESEND_SECONDS = 60;
const MAX_ATTEMPTS = 3;

export default function AuthForm({ onForgotPassword, onRegister }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("login"); // "login" | "register"

  // Register sub-step: 0 = phone input, 1 = otp
  const [regStep, setRegStep] = useState(0);
  const [phone, setPhone] = useState("");

  // OTP state
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpStatus, setOtpStatus] = useState("idle");
  const [attempts, setAttempts] = useState(0);
  const [resendTimer, setResendTimer] = useState(RESEND_SECONDS);
  const [verifying, setVerifying] = useState(false);
  const [lockoutTimer, setLockoutTimer] = useState(0);

  const otpRefs = useRef([]);
  const resendIntervalRef = useRef(null);
  const lockoutIntervalRef = useRef(null);

  // Reset register flow when switching tabs
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setRegStep(0);
    setPhone("");
    setOtp(["", "", "", "", "", ""]);
    setOtpStatus("idle");
    setAttempts(0);
    clearInterval(resendIntervalRef.current);
    clearInterval(lockoutIntervalRef.current);
  };

  // Start OTP countdown when entering otp step
  useEffect(() => {
    if (activeTab !== "register" || regStep !== 1) return;
    startResendCountdown();
    return () => {
      clearInterval(resendIntervalRef.current);
      clearInterval(lockoutIntervalRef.current);
    };
  }, [regStep, activeTab]);

  const startResendCountdown = () => {
    setResendTimer(RESEND_SECONDS);
    clearInterval(resendIntervalRef.current);
    resendIntervalRef.current = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) {
          clearInterval(resendIntervalRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const startLockout = () => {
    const LOCKOUT = 60;
    setLockoutTimer(LOCKOUT);
    clearInterval(lockoutIntervalRef.current);
    lockoutIntervalRef.current = setInterval(() => {
      setLockoutTimer((t) => {
        if (t <= 1) {
          clearInterval(lockoutIntervalRef.current);
          setOtpStatus("idle");
          setAttempts(0);
          setOtp(["", "", "", "", "", ""]);
          setTimeout(() => otpRefs.current[0]?.focus(), 100);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.length >= 10) setRegStep(1);
  };

  const handleOtpChange = (index, value) => {
    if (otpStatus === "locked" || verifying) return;
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    setOtpStatus("idle");
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
    if (value && index === 5) {
      const filled = [...next];
      if (filled.every((d) => d !== ""))
        setTimeout(() => verifyOtp(filled), 200);
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasted.length === 6) {
      const arr = pasted.split("");
      setOtp(arr);
      otpRefs.current[5]?.focus();
      setTimeout(() => verifyOtp(arr), 200);
    }
  };

  const verifyOtp = (digits) => {
    const code = digits.join("");
    setVerifying(true);
    setOtpStatus("idle");
    setTimeout(() => {
      setVerifying(false);
      // Demo: "123456" passes — replace with real API call
      if (code === "123456") {
        setOtpStatus("success");
        setTimeout(() => router.push("/onboarding"), 700);
      } else {
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        setOtpStatus("error");
        setOtp(["", "", "", "", "", ""]);
        setTimeout(() => otpRefs.current[0]?.focus(), 100);
        if (newAttempts >= MAX_ATTEMPTS) {
          setOtpStatus("locked");
          startLockout();
        }
      }
    }, 1200);
  };

  const handleResend = () => {
    if (resendTimer > 0 || otpStatus === "locked") return;
    setOtp(["", "", "", "", "", ""]);
    setOtpStatus("idle");
    setAttempts(0);
    startResendCountdown();
    setTimeout(() => otpRefs.current[0]?.focus(), 100);
  };

  // Register step progress bar
  const regSteps = ["Phone", "Verify", "Done"];

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-blue-600/5 blur-3xl rounded-[2.5rem]" />

      <div className="relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl">
        {/* Tab Switcher */}
        <div className="flex p-1.5 bg-black/40 rounded-2xl mb-8 border border-white/5">
          <button
            onClick={() => handleTabSwitch("login")}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
              activeTab === "login"
                ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20"
                : "text-slate-500 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => handleTabSwitch("register")}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${
              activeTab === "register"
                ? "bg-blue-600 text-white shadow-xl shadow-blue-600/20"
                : "text-slate-500 hover:text-white"
            }`}
          >
            Register
          </button>
        </div>

        {/* ══════════════ LOGIN TAB ══════════════ */}
        {activeTab === "login" && (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-2 duration-300">
            <header className="space-y-2">
              <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                Welcome back
              </h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                Access your premium travel dashboard
              </p>
            </header>

            <div className="space-y-4">
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
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors tracking-wide"
              >
                Forgot Password?
              </button>
            </div>

            <button className="group w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98]">
              Sign In
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            <div className="flex items-center justify-center gap-2 pt-2 text-slate-600 border-t border-white/5">
              <Lock size={12} className="text-blue-500/50" />
              <span className="text-[10px] uppercase font-bold tracking-widest">
                Secure 256-bit Encryption
              </span>
            </div>
          </div>
        )}

        {/* ══════════════ REGISTER TAB ══════════════ */}
        {activeTab === "register" && (
          <div className="animate-in fade-in slide-in-from-right-2 duration-300">
            {/* Register Step Progress */}
            <div className="flex items-center gap-2 mb-8">
              {regSteps.map((label, i) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all duration-500 ${
                        i < regStep
                          ? "bg-green-500 text-white scale-95"
                          : i === regStep
                          ? "bg-blue-600 text-white ring-4 ring-blue-600/20"
                          : "bg-white/5 text-slate-600 border border-white/10"
                      }`}
                    >
                      {i < regStep ? <CheckCircle2 size={14} /> : i + 1}
                    </div>
                    <span
                      className={`text-[9px] font-black uppercase tracking-widest transition-colors duration-300 ${
                        i === regStep
                          ? "text-blue-400"
                          : i < regStep
                          ? "text-green-400"
                          : "text-slate-600"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < regSteps.length - 1 && (
                    <div className="flex-1 h-[2px] rounded-full overflow-hidden bg-white/5 mb-4">
                      <div
                        className="h-full bg-blue-600 transition-all duration-700 ease-in-out"
                        style={{ width: i < regStep ? "100%" : "0%" }}
                      />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* ── Register Step 0: Phone ── */}
            {regStep === 0 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <header className="space-y-2">
                  <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                    Create Account
                  </h2>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">
                    Enter your phone number to get started. We'll send a
                    verification code via SMS.
                  </p>
                </header>

                <form onSubmit={handlePhoneSubmit} className="space-y-5">
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
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600 transition-all"
                        placeholder="080 0000 0000"
                        autoFocus
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={phone.length < 10}
                    className="group w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                  >
                    Send OTP
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </form>
              </div>
            )}

            {/* ── Register Step 1: OTP ── */}
            {regStep === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <header className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center mb-4">
                    <ShieldCheck size={22} className="text-blue-400" />
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                    Verify Your Number
                  </h2>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">
                    We sent a 6-digit code to{" "}
                    <span className="text-white font-bold">{phone}</span>
                  </p>
                </header>

                {/* Attempts warning */}
                {attempts > 0 && otpStatus !== "locked" && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                    <AlertTriangle
                      size={14}
                      className="text-yellow-400 shrink-0"
                    />
                    <p className="text-[11px] font-bold text-yellow-400">
                      {MAX_ATTEMPTS - attempts} attempt
                      {MAX_ATTEMPTS - attempts !== 1 ? "s" : ""} remaining
                    </p>
                    <div className="ml-auto flex gap-1">
                      {Array.from({ length: MAX_ATTEMPTS }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            i < attempts ? "bg-red-500" : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Lockout */}
                {otpStatus === "locked" && (
                  <div className="flex items-center gap-2 px-3 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
                    <XCircle size={16} className="text-red-400 shrink-0" />
                    <div>
                      <p className="text-[11px] font-black text-red-400 uppercase tracking-wider">
                        Temporarily Locked
                      </p>
                      <p className="text-[10px] text-red-400/70 mt-0.5">
                        Too many failed attempts. Try again in{" "}
                        <span className="font-black tabular-nums">
                          {lockoutTimer}s
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                {/* OTP Boxes */}
                <div className="space-y-3">
                  <div
                    className={`flex gap-2 justify-between ${
                      otpStatus === "error" ? "animate-[shake_0.4s_ease]" : ""
                    }`}
                    onPaste={handleOtpPaste}
                  >
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => (otpRefs.current[i] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        disabled={otpStatus === "locked" || verifying}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        className={`w-full aspect-square max-w-[52px] text-center text-xl font-black bg-black/40 border rounded-2xl text-white focus:outline-none transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
                          otpStatus === "success"
                            ? "border-green-500 ring-2 ring-green-600/30 bg-green-600/10 text-green-400"
                            : otpStatus === "error"
                            ? "border-red-500/60 bg-red-600/10"
                            : otpStatus === "locked"
                            ? "border-red-500/30 bg-red-600/5"
                            : digit
                            ? "border-blue-500 ring-2 ring-blue-600/30 bg-blue-600/10"
                            : "border-white/10 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/40"
                        }`}
                        autoFocus={i === 0}
                      />
                    ))}
                  </div>

                  {verifying && (
                    <div className="flex items-center justify-center gap-2 py-1">
                      <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      <p className="text-xs font-bold text-blue-400">
                        Verifying code...
                      </p>
                    </div>
                  )}
                  {otpStatus === "success" && (
                    <div className="flex items-center justify-center gap-2 py-1">
                      <CheckCircle2 size={14} className="text-green-400" />
                      <p className="text-xs font-bold text-green-400">
                        Verified! Setting up your profile...
                      </p>
                    </div>
                  )}
                  {otpStatus === "error" && (
                    <p className="text-center text-xs font-bold text-red-400">
                      Incorrect code. Please try again.
                    </p>
                  )}
                </div>

                {/* Resend */}
                <div className="text-center">
                  {resendTimer > 0 ? (
                    <p className="text-xs text-slate-600">
                      Resend code in{" "}
                      <span className="text-blue-400 font-bold tabular-nums">
                        {resendTimer}s
                      </span>
                    </p>
                  ) : otpStatus !== "locked" ? (
                    <button
                      type="button"
                      onClick={handleResend}
                      className="text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors"
                    >
                      Resend OTP
                    </button>
                  ) : null}
                </div>

                <button
                  onClick={() => setRegStep(0)}
                  className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white transition-colors mx-auto"
                >
                  ← Change Number
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
