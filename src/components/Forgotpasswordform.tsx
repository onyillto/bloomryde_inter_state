"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Smartphone,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";

// Step indicators
const steps = ["Phone", "Verify OTP", "New Password"];

export default function ForgotPasswordForm({ onBack }) {
  const [step, setStep] = useState(0); // 0: phone, 1: otp, 2: new password
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [animDir, setAnimDir] = useState("forward"); // for slide direction

  const otpRefs = useRef([]);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (step !== 1) return;
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  const goNext = () => {
    setAnimDir("forward");
    setTimeout(() => setStep((s) => s + 1), 10);
  };
  const goBack = () => {
    setAnimDir("back");
    setTimeout(() => setStep((s) => s - 1), 10);
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.length >= 10) goNext();
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
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
      setOtp(pasted.split(""));
      otpRefs.current[5]?.focus();
    }
  };

  const otpComplete = otp.every((d) => d !== "");

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otpComplete) goNext();
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password.length >= 6 && password === confirmPassword) setDone(true);
  };

  const passwordMatch =
    password && confirmPassword && password === confirmPassword;
  const passwordStrength =
    password.length === 0
      ? 0
      : password.length < 6
      ? 1
      : password.length < 10
      ? 2
      : 3;
  const strengthLabel = ["", "Weak", "Good", "Strong"];
  const strengthColor = ["", "bg-red-500", "bg-yellow-400", "bg-green-500"];

  // Success screen
  if (done) {
    return (
      <div className="relative">
        <div className="absolute -inset-4 bg-green-600/5 blur-3xl rounded-[2.5rem]"></div>
        <div className="relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center animate-[pulse_2s_ease-in-out_infinite]">
              <CheckCircle2 size={40} className="text-green-400" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Password Reset!
            </h2>
            <p className="text-slate-400 text-sm">
              Your password has been updated successfully. You can now sign in.
            </p>
          </div>
          <button
            onClick={onBack}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
          >
            Back to Sign In <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-blue-600/5 blur-3xl rounded-[2.5rem]"></div>

      <div className="relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl">
        {/* Step Progress Bar */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((label, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all duration-500 ${
                    i < step
                      ? "bg-green-500 text-white scale-95"
                      : i === step
                      ? "bg-blue-600 text-white ring-4 ring-blue-600/20"
                      : "bg-white/5 text-slate-600 border border-white/10"
                  }`}
                >
                  {i < step ? <CheckCircle2 size={14} /> : i + 1}
                </div>
                <span
                  className={`text-[9px] font-black uppercase tracking-widest transition-colors duration-300 ${
                    i === step
                      ? "text-blue-400"
                      : i < step
                      ? "text-green-400"
                      : "text-slate-600"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 h-[2px] rounded-full overflow-hidden bg-white/5 mb-4">
                  <div
                    className="h-full bg-blue-600 transition-all duration-700 ease-in-out"
                    style={{ width: i < step ? "100%" : "0%" }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* ── STEP 0: Phone Number ── */}
        {step === 0 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-400">
            <header className="space-y-2">
              <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                Forgot Password?
              </h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                Enter your registered phone number and we'll send you a
                verification code.
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
                Send OTP{" "}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </form>

            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white transition-colors mx-auto"
              >
                <ArrowLeft size={14} /> Back to Sign In
              </button>
            )}
          </div>
        )}

        {/* ── STEP 1: OTP Verification ── */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-400">
            <header className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center mb-4">
                <ShieldCheck size={22} className="text-blue-400" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                Verify OTP
              </h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                We sent a 6-digit code to{" "}
                <span className="text-white font-bold">{phone}</span>
              </p>
            </header>

            <form onSubmit={handleOtpSubmit} className="space-y-6">
              {/* OTP Boxes */}
              <div
                className="flex gap-2 justify-between"
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
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className={`w-full aspect-square max-w-[52px] text-center text-xl font-black bg-black/40 border rounded-2xl text-white focus:outline-none transition-all duration-200 ${
                      digit
                        ? "border-blue-500 ring-2 ring-blue-600/30 bg-blue-600/10"
                        : "border-white/10 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/40"
                    }`}
                    autoFocus={i === 0}
                  />
                ))}
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
                ) : (
                  <button
                    type="button"
                    onClick={() => setResendTimer(30)}
                    className="text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={!otpComplete}
                className="group w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
              >
                Verify Code{" "}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </form>

            <button
              onClick={goBack}
              className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white transition-colors mx-auto"
            >
              <ArrowLeft size={14} /> Change Number
            </button>
          </div>
        )}

        {/* ── STEP 2: New Password ── */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-400">
            <header className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-600/20 flex items-center justify-center mb-4">
                <KeyRound size={22} className="text-blue-400" />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
                New Password
              </h2>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">
                Choose a strong password for your account.
              </p>
            </header>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {/* New Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                  New Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                    <KeyRound size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600/40 focus:border-blue-600 transition-all"
                    placeholder="••••••••"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-600 hover:text-slate-400 transition-colors"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>

                {/* Strength bar */}
                {password.length > 0 && (
                  <div className="space-y-1 px-1 animate-in fade-in duration-200">
                    <div className="flex gap-1.5">
                      {[1, 2, 3].map((lvl) => (
                        <div
                          key={lvl}
                          className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                            lvl <= passwordStrength
                              ? strengthColor[passwordStrength]
                              : "bg-white/10"
                          }`}
                        />
                      ))}
                    </div>
                    <p
                      className={`text-[10px] font-bold uppercase tracking-widest ml-0.5 ${
                        passwordStrength === 1
                          ? "text-red-400"
                          : passwordStrength === 2
                          ? "text-yellow-400"
                          : "text-green-400"
                      }`}
                    >
                      {strengthLabel[passwordStrength]}
                    </p>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-1">
                  Confirm Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                    <KeyRound size={18} />
                  </div>
                  <input
                    type={showConfirm ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full bg-black/40 border rounded-2xl py-4 pl-12 pr-12 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 transition-all ${
                      confirmPassword
                        ? passwordMatch
                          ? "border-green-500/50 focus:ring-green-600/30 focus:border-green-500"
                          : "border-red-500/50 focus:ring-red-600/30 focus:border-red-500"
                        : "border-white/10 focus:ring-blue-600/40 focus:border-blue-600"
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-600 hover:text-slate-400 transition-colors"
                  >
                    {showConfirm ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
                {confirmPassword && !passwordMatch && (
                  <p className="text-[10px] text-red-400 font-bold ml-1 animate-in fade-in duration-200">
                    Passwords do not match
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={!passwordMatch || password.length < 6}
                className="group w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98] mt-2"
              >
                Reset Password{" "}
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </form>

            <button
              onClick={goBack}
              className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white transition-colors mx-auto"
            >
              <ArrowLeft size={14} /> Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
