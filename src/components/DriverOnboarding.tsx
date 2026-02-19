"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Heart,
  ChevronLeft,
  ArrowRight,
  Camera,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Calendar,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
//  SHARED PRIMITIVES (Pro GUI Overhaul)
// ─────────────────────────────────────────────────────────────

function Inp({ leftIcon: Icon, rightSlot, error, className = "", ...props }) {
  return (
    <div className="relative group">
      {Icon && (
        <div
          className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${
            error
              ? "text-red-400"
              : "text-slate-400 group-focus-within:text-blue-600"
          }`}
        >
          <Icon size={18} strokeWidth={2} />
        </div>
      )}
      <input
        className={`w-full rounded-2xl border py-4 text-sm md:text-base text-slate-800 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 transition-all ${
          Icon ? "pl-11" : "pl-4"
        } ${rightSlot ? "pr-12" : "pr-4"} ${
          error
            ? "border-red-200 focus:border-red-400 focus:ring-red-100"
            : "border-slate-100 focus:border-blue-500 focus:ring-blue-50"
        } ${className}`}
        {...props}
      />
      {rightSlot && (
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
          {rightSlot}
        </div>
      )}
    </div>
  );
}

function Sel({ error, children, ...props }) {
  return (
    <div className="relative group">
      <select
        className={`w-full rounded-2xl border py-4 text-sm md:text-base text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 transition-all appearance-none pl-4 pr-10 ${
          error
            ? "border-red-200 focus:border-red-400 focus:ring-red-100"
            : "border-slate-100 focus:border-blue-500 focus:ring-blue-50"
        }`}
        {...props}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600">
        <ChevronDown size={18} />
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">
          {label}
        </label>
      )}
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-500 font-bold ml-1 animate-in fade-in slide-in-from-left-1">
          <AlertCircle size={14} /> {error}
        </p>
      )}
    </div>
  );
}

function PrimaryBtn({ label = "Continue", onClick }) {
  return (
    <button
      onClick={onClick}
      className="group w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-black py-4 md:py-5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 active:scale-[0.98] shadow-xl shadow-blue-600/25 mt-8"
    >
      <span className="text-base tracking-tight">{label}</span>
      <ArrowRight
        size={20}
        className="group-hover:translate-x-1 transition-transform"
      />
    </button>
  );
}

function ProgressBar({ step, total, onBack }) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onBack}
        className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all active:scale-90 shrink-0 backdrop-blur-md"
      >
        <ChevronLeft size={22} strokeWidth={3} />
      </button>
      <div className="flex-1 flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden"
          >
            <div
              className="h-full bg-white rounded-full transition-all duration-700 ease-in-out"
              style={{ width: i + 1 <= step ? "100%" : "0%" }}
            />
          </div>
        ))}
      </div>
      <div className="hidden md:block text-white/60 font-black text-[10px] uppercase tracking-[0.2em] ml-2 shrink-0">
        Step {step} / {total}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  STEPS — (Refined Visual Logic)
// ─────────────────────────────────────────────────────────────

function StepAccount({ data, onChange, onNext, phone }) {
  const [show, setShow] = useState({ pw: false });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!data.email) e.email = "Email is required";
    if (!data.password || data.password.length < 8)
      e.password = "Min 8 characters";
    setErrors(e);
    return !Object.keys(e).length;
  };

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Field label="Phone Number">
        <Inp
          leftIcon={Phone}
          value={phone}
          readOnly
          className="bg-slate-100 text-slate-500 opacity-70 border-none"
        />
      </Field>
      <Field label="Email Address" error={errors.email}>
        <Inp
          leftIcon={Mail}
          type="email"
          placeholder="name@email.com"
          value={data.email}
          error={errors.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </Field>
      <Field label="Password" error={errors.password}>
        <Inp
          leftIcon={Lock}
          type={show.pw ? "text" : "password"}
          placeholder="••••••••"
          value={data.password}
          error={errors.password}
          onChange={(e) => onChange("password", e.target.value)}
          rightSlot={
            <button
              onClick={() => setShow((s) => ({ ...s, pw: !s.pw }))}
              className="text-slate-400 hover:text-blue-600 transition-colors"
            >
              {show.pw ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          }
        />
      </Field>
      <PrimaryBtn onClick={() => validate() && onNext()} />
    </div>
  );
}

function StepPersonal({ data, onChange, onNext }) {
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const ref = useRef(null);

  const validate = () => {
    const e = {};
    if (!data.fullName) e.fullName = "Name is required";
    if (!data.dob) e.dob = "Required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col items-center py-4">
        <div
          className="relative group cursor-pointer"
          onClick={() => ref.current?.click()}
        >
          <div className="w-28 h-28 rounded-[2.5rem] bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-blue-400">
            {preview ? (
              <img src={preview} className="w-full h-full object-cover" />
            ) : (
              <User size={44} className="text-slate-300" strokeWidth={1.5} />
            )}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-blue-600 p-2.5 rounded-2xl border-4 border-white text-white shadow-xl group-hover:scale-110 transition-transform">
            <Camera size={18} />
          </div>
          <input
            ref={ref}
            type="file"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files[0];
              if (f) {
                onChange("photo", f);
                setPreview(URL.createObjectURL(f));
              }
            }}
          />
        </div>
        <p className="text-xs font-bold text-slate-400 mt-4 uppercase tracking-widest">
          Profile Photo
        </p>
      </div>

      <Field label="Full Name" error={errors.fullName}>
        <Inp
          leftIcon={User}
          placeholder="Enter your legal name"
          value={data.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Gender">
          <Sel
            value={data.gender}
            onChange={(e) => onChange("gender", e.target.value)}
          >
            <option value="">Choose...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Sel>
        </Field>
        <Field label="Date of Birth" error={errors.dob}>
          <Inp
            leftIcon={Calendar}
            type="date"
            value={data.dob}
            onChange={(e) => onChange("dob", e.target.value)}
          />
        </Field>
      </div>
      <PrimaryBtn onClick={() => validate() && onNext()} />
    </div>
  );
}

function StepEmergency({ data, onChange, onNext }) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!data.eName) e.eName = "Name required";
    if (!data.ePhone) e.ePhone = "Phone required";
    if (!data.eRel) e.eRel = "Relation required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-5 bg-rose-50/50 border border-rose-100/50 rounded-[1.5rem] flex gap-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center shrink-0">
          <Heart size={24} className="text-rose-600" fill="currentColor" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-black text-rose-900">Safety First</p>
          <p className="text-xs text-rose-600/80 leading-relaxed font-medium">
            We'll share your trip status with this contact so someone always
            knows where you are.
          </p>
        </div>
      </div>

      <Field label="Contact Name" error={errors.eName}>
        <Inp
          leftIcon={User}
          placeholder="Full Name"
          value={data.eName}
          onChange={(e) => onChange("eName", e.target.value)}
        />
      </Field>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Relationship" error={errors.eRel}>
          <Sel
            value={data.eRel}
            onChange={(e) => onChange("eRel", e.target.value)}
          >
            <option value="">Select...</option>
            <option value="Family">Family</option>
            <option value="Friend">Friend</option>
            <option value="Partner">Partner</option>
          </Sel>
        </Field>
        <Field label="Emergency Phone" error={errors.ePhone}>
          <Inp
            leftIcon={Phone}
            placeholder="+234..."
            value={data.ePhone}
            onChange={(e) => onChange("ePhone", e.target.value)}
          />
        </Field>
      </div>

      <PrimaryBtn
        label="Complete Setup"
        onClick={() => validate() && onNext()}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
const STEPS = [
  { title: "Account", subtitle: "Secure your passenger profile" },
  { title: "Identity", subtitle: "Personal info for driver matching" },
  { title: "Safety", subtitle: "Emergency contact setup" },
];

export default function PassengerOnboarding({ phone = "", onBackToChoose }) {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  const [account, setAccount] = useState({ email: "", password: "" });
  const [personal, setPersonal] = useState({
    fullName: "",
    gender: "",
    dob: "",
    photo: null,
  });
  const [emergency, setEmergency] = useState({
    eName: "",
    eRel: "",
    ePhone: "",
  });

  const upd = (setter) => (k, v) => setter((p) => ({ ...p, [k]: v }));

  const animateTo = (target) => {
    setVisible(false);
    setTimeout(() => {
      setStep(target);
      setVisible(true);
    }, 250);
  };

  if (done)
    return (
      <div className="min-h-screen bg-blue-600 flex items-center justify-center p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent opacity-50" />
        <div className="space-y-8 z-10 animate-in zoom-in-95 duration-700 max-w-sm w-full">
          <div className="w-28 h-28 bg-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl">
            <CheckCircle2 size={56} className="text-blue-600 animate-bounce" />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-white tracking-tighter">
              Welcome!
            </h2>
            <p className="text-blue-100 text-lg font-medium">
              Your profile is ready. Let's find your first ride.
            </p>
          </div>
          <button
            onClick={() => router.push("/dashboard/passenger")}
            className="w-full bg-white text-blue-600 font-black py-5 rounded-[2rem] shadow-2xl hover:scale-105 transition-all text-lg"
          >
            Start Booking Rides →
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center relative overflow-hidden p-0 md:p-6">
      {/* Decorative Accents */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-2xl z-10 flex flex-col h-screen md:h-auto">
        {/* Header Section */}
        <div className="px-6 pt-10 pb-8 space-y-6 md:text-center">
          <ProgressBar
            step={step}
            total={3}
            onBack={() => (step > 1 ? animateTo(step - 1) : onBackToChoose?.())}
          />
          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter animate-in fade-in slide-in-from-top-4 duration-500">
              {STEPS[step - 1].title}
            </h2>
            <p className="text-slate-400 text-base md:text-xl font-medium">
              {STEPS[step - 1].subtitle}
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="flex-1 md:flex-none bg-white md:rounded-[3rem] rounded-t-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] overflow-hidden">
          <div className="px-6 md:px-12 py-10">
            <div
              className={
                visible
                  ? "opacity-100 transition-opacity duration-300"
                  : "opacity-0"
              }
            >
              {step === 1 && (
                <StepAccount
                  data={account}
                  onChange={upd(setAccount)}
                  onNext={() => animateTo(2)}
                  phone={phone}
                />
              )}
              {step === 2 && (
                <StepPersonal
                  data={personal}
                  onChange={upd(setPersonal)}
                  onNext={() => animateTo(3)}
                />
              )}
              {step === 3 && (
                <StepEmergency
                  data={emergency}
                  onChange={upd(setEmergency)}
                  onNext={() => setDone(true)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
