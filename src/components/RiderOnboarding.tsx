"use client";

import React, { useState, useRef, CSSProperties } from "react";
import { useRouter } from "next/navigation";
import {
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Calendar,
  Heart,
  ChevronLeft,
  ArrowRight,
  Camera,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
//  TYPE HELPERS
// ─────────────────────────────────────────────────────────────

/** Error prop is always a string message or undefined — never boolean */
type ErrorProp = string | undefined;

// ─────────────────────────────────────────────────────────────
//  STEP DATA TYPES
// ─────────────────────────────────────────────────────────────

interface StepAccountData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface StepPersonalData {
  fullName: string;
  gender: string;
  dob: string;
  photo: File | null;
}

interface StepEmergencyData {
  eName: string;
  eRel: string;
  ePhone: string;
}

// ─────────────────────────────────────────────────────────────
//  ERROR STATE TYPES  (all string, never boolean)
// ─────────────────────────────────────────────────────────────

type AccountErrors = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};
type PersonalErrors = { fullName?: string; gender?: string; dob?: string };
type EmergencyErrors = { eName?: string; eRel?: string; ePhone?: string };

// ─────────────────────────────────────────────────────────────
//  SHARED PRIMITIVES
// ─────────────────────────────────────────────────────────────

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

interface InpProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ComponentType<IconProps>;
  rightSlot?: React.ReactNode;
  error?: ErrorProp;
}

function Inp({
  leftIcon: Icon,
  rightSlot,
  error,
  className = "",
  ...props
}: InpProps) {
  const hasError = Boolean(error);
  return (
    <div className="relative group">
      {Icon && (
        <div
          className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${
            hasError
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
          hasError
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

interface SelProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: ErrorProp;
  children: React.ReactNode;
}

function Sel({ error, children, ...props }: SelProps) {
  const hasError = Boolean(error);
  return (
    <div className="relative group">
      <select
        className={`w-full rounded-2xl border py-4 text-sm md:text-base text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-4 transition-all appearance-none pl-4 pr-10 ${
          hasError
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

interface FieldProps {
  label?: string;
  error?: ErrorProp;
  children: React.ReactNode;
}

function Field({ label, error, children }: FieldProps) {
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

interface PrimaryBtnProps {
  label?: string;
  onClick: () => void;
}

function PrimaryBtn({ label = "Continue", onClick }: PrimaryBtnProps) {
  return (
    <button
      type="button"
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

interface ProgressBarProps {
  step: number;
  total: number;
  onBack: () => void;
}

function ProgressBar({ step, total, onBack }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
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
      <div className="hidden md:block text-white/60 font-black text-xs uppercase tracking-widest ml-2">
        Step {step} of {total}
      </div>
    </div>
  );
}

interface ProfilePhotoUploadProps {
  preview: string | null;
  onFile: (file: File, url: string) => void;
}

function ProfilePhotoUpload({ preview, onFile }: ProfilePhotoUploadProps) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <div className="relative">
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-all group hover:border-blue-400">
          {preview ? (
            <img
              src={preview}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <User
              size={40}
              className="text-slate-300 group-hover:text-blue-400 transition-colors"
              strokeWidth={1.5}
            />
          )}
        </div>
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all border-4 border-white active:scale-90"
        >
          <Camera size={18} strokeWidth={2.5} />
        </button>
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const f = e.target.files?.[0];
            if (f) onFile(f, URL.createObjectURL(f));
          }}
        />
      </div>
      <div className="text-center">
        <p className="text-sm font-bold text-slate-900">Add a Profile Photo</p>
        <p className="text-xs text-slate-400 mt-0.5">
          Helps drivers identify you
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  STEP 1 — Account
// ─────────────────────────────────────────────────────────────

interface StepAccountProps {
  data: StepAccountData;
  onChange: (key: keyof StepAccountData, value: string) => void;
  onNext: () => void;
  phone: string;
}

function StepAccount({ data, onChange, onNext, phone }: StepAccountProps) {
  const [show, setShow] = useState({ pw: false, cpw: false });
  const [errors, setErrors] = useState<AccountErrors>({});

  const validate = (): boolean => {
    const e: AccountErrors = {};
    if (!data.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.email)) e.email = "Enter a valid email";
    if (!data.password || data.password.length < 8)
      e.password = "Minimum 8 characters";
    if (data.password !== data.confirmPassword)
      e.confirmPassword = "Passwords don't match";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Field label="Phone Number">
        <Inp
          leftIcon={Phone}
          value={phone}
          readOnly
          className="bg-slate-100 text-slate-500 opacity-70 cursor-not-allowed border-none shadow-none"
        />
      </Field>

      <Field label="Email Address" error={errors.email}>
        <Inp
          leftIcon={Mail}
          type="email"
          placeholder="name@example.com"
          value={data.email}
          error={errors.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange("email", e.target.value);
            setErrors((p) => ({ ...p, email: undefined }));
          }}
        />
      </Field>

      <Field label="Create Password" error={errors.password}>
        <Inp
          leftIcon={Lock}
          type={show.pw ? "text" : "password"}
          placeholder="••••••••"
          value={data.password}
          error={errors.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange("password", e.target.value);
            setErrors((p) => ({ ...p, password: undefined }));
          }}
          rightSlot={
            <button
              type="button"
              onClick={() => setShow((s) => ({ ...s, pw: !s.pw }))}
              className="text-slate-400 hover:text-blue-600 transition-colors"
            >
              {show.pw ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          }
        />
      </Field>

      <Field label="Confirm Password" error={errors.confirmPassword}>
        <Inp
          leftIcon={Lock}
          type={show.cpw ? "text" : "password"}
          placeholder="••••••••"
          value={data.confirmPassword}
          error={errors.confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange("confirmPassword", e.target.value);
            setErrors((p) => ({ ...p, confirmPassword: undefined }));
          }}
          rightSlot={
            <button
              type="button"
              onClick={() => setShow((s) => ({ ...s, cpw: !s.cpw }))}
              className="text-slate-400 hover:text-blue-600 transition-colors"
            >
              {show.cpw ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          }
        />
      </Field>

      <PrimaryBtn onClick={() => validate() && onNext()} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  STEP 2 — Personal
// ─────────────────────────────────────────────────────────────

interface StepPersonalProps {
  data: StepPersonalData;
  onChange: (
    key: keyof StepPersonalData,
    value: StepPersonalData[keyof StepPersonalData]
  ) => void;
  onNext: () => void;
}

function StepPersonal({ data, onChange, onNext }: StepPersonalProps) {
  const [errors, setErrors] = useState<PersonalErrors>({});
  const [preview, setPreview] = useState<string | null>(null);

  const validate = (): boolean => {
    const e: PersonalErrors = {};
    if (!data.fullName.trim()) e.fullName = "Full name is required";
    if (!data.gender) e.gender = "Select your gender";
    if (!data.dob) e.dob = "Select your date of birth";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <ProfilePhotoUpload
        preview={preview}
        onFile={(f, url) => {
          onChange("photo", f);
          setPreview(url);
        }}
      />

      <Field label="Legal Full Name" error={errors.fullName}>
        <Inp
          leftIcon={User}
          placeholder="John Doe"
          value={data.fullName}
          error={errors.fullName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange("fullName", e.target.value);
            setErrors((p) => ({ ...p, fullName: undefined }));
          }}
        />
      </Field>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Gender" error={errors.gender}>
          <Sel
            value={data.gender}
            error={errors.gender}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              onChange("gender", e.target.value);
              setErrors((p) => ({ ...p, gender: undefined }));
            }}
          >
            <option value="">Choose...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Sel>
        </Field>

        <Field label="Date of Birth" error={errors.dob}>
          <Inp
            leftIcon={Calendar}
            type="date"
            value={data.dob}
            error={errors.dob}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onChange("dob", e.target.value);
              setErrors((p) => ({ ...p, dob: undefined }));
            }}
          />
        </Field>
      </div>

      <PrimaryBtn onClick={() => validate() && onNext()} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  STEP 3 — Emergency
// ─────────────────────────────────────────────────────────────

interface StepEmergencyProps {
  data: StepEmergencyData;
  onChange: (key: keyof StepEmergencyData, value: string) => void;
  onNext: () => void;
}

function StepEmergency({ data, onChange, onNext }: StepEmergencyProps) {
  const [errors, setErrors] = useState<EmergencyErrors>({});

  const validate = (): boolean => {
    const e: EmergencyErrors = {};
    if (!data.eName.trim()) e.eName = "Name is required";
    if (!data.eRel) e.eRel = "Select relationship";
    if (!data.ePhone || data.ePhone.length < 10)
      e.ePhone = "Enter valid phone number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-start gap-4 p-5 rounded-[1.5rem] bg-rose-50/50 border border-rose-100/50">
        <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0">
          <Heart size={20} className="text-rose-600" fill="currentColor" />
        </div>
        <div>
          <p className="text-sm font-black text-rose-900">Safety Contact</p>
          <p className="text-xs text-rose-600/80 mt-1 leading-relaxed font-medium">
            We'll share your real-time location with this person during
            interstate trips for your security.
          </p>
        </div>
      </div>

      <Field label="Contact Person Name" error={errors.eName}>
        <Inp
          leftIcon={User}
          placeholder="Emergency Contact Name"
          value={data.eName}
          error={errors.eName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange("eName", e.target.value);
            setErrors((p) => ({ ...p, eName: undefined }));
          }}
        />
      </Field>

      <Field label="Relationship" error={errors.eRel}>
        <Sel
          value={data.eRel}
          error={errors.eRel}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            onChange("eRel", e.target.value);
            setErrors((p) => ({ ...p, eRel: undefined }));
          }}
        >
          <option value="">How do you know them?</option>
          <option value="Family">Family Member</option>
          <option value="Friend">Close Friend</option>
          <option value="Partner">Spouse / Partner</option>
          <option value="Colleague">Colleague</option>
        </Sel>
      </Field>

      <Field label="Contact Phone" error={errors.ePhone}>
        <Inp
          leftIcon={Phone}
          type="tel"
          placeholder="+234 ..."
          value={data.ePhone}
          error={errors.ePhone}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onChange("ePhone", e.target.value);
            setErrors((p) => ({ ...p, ePhone: undefined }));
          }}
        />
      </Field>

      <PrimaryBtn
        label="Complete Registration"
        onClick={() => validate() && onNext()}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

interface RiderOnboardingProps {
  phone?: string;
  onBackToChoose?: () => void;
}

const STEP_META = [
  { title: "Account", subtitle: "Secure your access" },
  { title: "Identity", subtitle: "Verify your profile" },
  { title: "Safety", subtitle: "Emergency backup" },
] as const;

/** Generic field updater — fully typed, no implicit any */
function makeUpdater<T extends object>(
  setter: React.Dispatch<React.SetStateAction<T>>
) {
  return (key: keyof T, value: T[keyof T]) =>
    setter((prev) => ({ ...prev, [key]: value }));
}

export default function RiderOnboarding({
  phone = "",
  onBackToChoose,
}: RiderOnboardingProps) {
  const [step, setStep] = useState<number>(1);
  const [done, setDone] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(true);
  const router = useRouter();

  const [account, setAccount] = useState<StepAccountData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [personal, setPersonal] = useState<StepPersonalData>({
    fullName: "",
    gender: "",
    dob: "",
    photo: null,
  });
  const [emergency, setEmergency] = useState<StepEmergencyData>({
    eName: "",
    eRel: "",
    ePhone: "",
  });

  const animateTo = (target: number) => {
    setVisible(false);
    setTimeout(() => {
      setStep(target);
      setVisible(true);
    }, 270);
  };

  const goNext = () => (step < 3 ? animateTo(step + 1) : setDone(true));
  const goBack = () => (step > 1 ? animateTo(step - 1) : onBackToChoose?.());

  // ── Success screen ──
  if (done) {
    return (
      <div className="min-h-screen bg-blue-600 flex items-center justify-center p-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent opacity-50" />
        <div className="text-center space-y-8 max-w-sm w-full z-10 animate-in zoom-in-95 duration-700">
          <div className="flex justify-center">
            <div className="w-28 h-28 rounded-[2.5rem] bg-white flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.3)]">
              <CheckCircle2
                size={56}
                className="text-blue-600 animate-bounce"
              />
            </div>
          </div>
          <div className="space-y-3">
            <h2 className="text-4xl font-black text-white tracking-tighter">
              You're Ready!
            </h2>
            <p className="text-blue-100 text-lg font-medium leading-relaxed">
              Your rider profile is live. Let's start your journey.
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/dashboard/rider")}
            className="w-full bg-white text-blue-700 font-black py-5 rounded-[2rem] shadow-2xl hover:scale-105 transition-all active:scale-95 text-lg"
          >
            Open Dashboard →
          </button>
        </div>
      </div>
    );
  }

  /** Inline style typed as CSSProperties — no implicit any on style object */
  const slideStyle: CSSProperties = {
    transition: "all 400ms cubic-bezier(0.4, 0, 0.2, 1)",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(10px) scale(0.98)",
  };

  // ── Main flow ──
  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center relative overflow-hidden p-0 md:p-6">
      {/* Background accents */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main container */}
      <div className="w-full max-w-2xl z-10 flex flex-col h-screen md:h-auto">
        {/* Header */}
        <div className="px-6 pt-8 pb-6 space-y-6 md:text-center">
          <ProgressBar step={step} total={3} onBack={goBack} />
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">
              {STEP_META[step - 1].title}
            </h2>
            <p className="text-slate-400 text-sm md:text-lg font-medium mt-2">
              {STEP_META[step - 1].subtitle}
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="flex-1 md:flex-none bg-white md:rounded-[3rem] rounded-t-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500">
          <div className="px-6 md:px-12 py-10">
            <div style={slideStyle}>
              {step === 1 && (
                <StepAccount
                  data={account}
                  onChange={makeUpdater(setAccount)}
                  onNext={goNext}
                  phone={phone}
                />
              )}
              {step === 2 && (
                <StepPersonal
                  data={personal}
                  onChange={makeUpdater(setPersonal)}
                  onNext={goNext}
                />
              )}
              {step === 3 && (
                <StepEmergency
                  data={emergency}
                  onChange={makeUpdater(setEmergency)}
                  onNext={goNext}
                />
              )}
            </div>
          </div>

          {/* Desktop step dots */}
          <div className="hidden md:flex justify-center pb-8 opacity-20">
            <div className="flex gap-1.5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full ${
                    i === step ? "bg-blue-600" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
