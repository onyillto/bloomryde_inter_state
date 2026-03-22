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
  Loader2,
  Car,
  FileText,
  Shield,
  Users,
  Hash,
  Palette,
  MapPin,
  CreditCard,
  UserCheck,
} from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/authSlice";
import { registerDriver } from "@/lib/api";

// ─── Type helpers ──────────────────────────────────────────────────────────────

type ErrorProp = string | undefined;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

// ─── Primitives ────────────────────────────────────────────────────────────────

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
  hint?: string;
  children: React.ReactNode;
}

function Field({ label, error, hint, children }: FieldProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">
          {label}
        </label>
      )}
      {children}
      {hint && !error && (
        <p className="text-[11px] text-slate-400 ml-1">{hint}</p>
      )}
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-500 font-bold ml-1 animate-in fade-in slide-in-from-left-1">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
    </div>
  );
}

function PrimaryBtn({
  label = "Continue",
  onClick,
  loading = false,
}: {
  label?: string;
  onClick: () => void;
  loading?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="group w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-black py-4 md:py-5 rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 active:scale-[0.98] shadow-xl shadow-blue-600/25 mt-8"
    >
      {loading ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          <span>Submitting...</span>
        </>
      ) : (
        <>
          <span className="text-base tracking-tight">{label}</span>
          <ArrowRight
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
        </>
      )}
    </button>
  );
}

function ProgressBar({
  step,
  total,
  onBack,
}: {
  step: number;
  total: number;
  onBack: () => void;
}) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onBack}
        className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 flex items-center justify-center text-white transition-all active:scale-90 shrink-0 backdrop-blur-md"
      >
        <ChevronLeft size={22} strokeWidth={3} />
      </button>
      <div className="flex-1 flex gap-1.5">
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

// ── File upload box ───────────────────────────────────────────────────────────

interface FileUploadProps {
  label: string;
  accept?: string;
  value: File | null;
  onChange: (file: File) => void;
  error?: ErrorProp;
  hint?: string;
}

function FileUpload({
  label,
  accept = "image/*,.pdf",
  value,
  onChange,
  error,
  hint,
}: FileUploadProps) {
  const ref = useRef<HTMLInputElement>(null);
  const hasError = Boolean(error);
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      <label className="block text-[11px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1">
        {label}
      </label>
      <div
        onClick={() => ref.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed py-6 px-4 cursor-pointer transition-all hover:border-blue-400 hover:bg-blue-50/30 ${
          value
            ? "border-blue-400 bg-blue-50/30"
            : hasError
            ? "border-red-200 bg-red-50/20"
            : "border-slate-200 bg-slate-50/50"
        }`}
      >
        {preview && value?.type.startsWith("image/") ? (
          <img
            src={preview}
            alt="preview"
            className="w-20 h-20 object-cover rounded-xl"
          />
        ) : (
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              value ? "bg-blue-100" : "bg-slate-100"
            }`}
          >
            <Camera
              size={22}
              className={value ? "text-blue-600" : "text-slate-400"}
            />
          </div>
        )}
        <div className="text-center">
          <p
            className={`text-[13px] font-bold ${
              value ? "text-blue-600" : "text-slate-500"
            }`}
          >
            {value ? value.name : "Tap to upload"}
          </p>
          {hint && !value && (
            <p className="text-[11px] text-slate-400 mt-0.5">{hint}</p>
          )}
          {value && (
            <p className="text-[11px] text-emerald-500 font-semibold mt-0.5">
              ✓ File selected
            </p>
          )}
        </div>
        <input
          ref={ref}
          type="file"
          className="hidden"
          accept={accept}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) {
              onChange(f);
              if (f.type.startsWith("image/"))
                setPreview(URL.createObjectURL(f));
            }
          }}
        />
      </div>
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-500 font-bold ml-1">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Error types ──────────────────────────────────────────────────────────────

type AccountErrors = { email?: string; password?: string };
type PersonalErrors = { fullName?: string; dob?: string };
type EmergencyErrors = { eName?: string; eRel?: string; ePhone?: string };
type GuarantorErrors = {
  gName?: string;
  gPhone?: string;
  gAddress?: string;
  gRelOcc?: string;
};
type VehicleErrors = {
  make?: string;
  model?: string;
  year?: string;
  color?: string;
  plateNumber?: string;
  vin?: string;
  passengerSeats?: string;
};
type DocumentErrors = {
  licenseFront?: string;
  licenseBack?: string;
  licenseNumber?: string;
  licenseExpiry?: string;
  nationalIdNumber?: string;
  nationalIdDoc?: string;
  selfie?: string;
  regCert?: string;
  insurance?: string;
  roadWorthiness?: string;
  vehiclePhoto?: string; // ← new
};

// ─── Step data types ──────────────────────────────────────────────────────────

interface StepAccountData {
  email: string;
  password: string;
}
interface StepPersonalData {
  fullName: string;
  gender: string;
  dob: string;
  photo: File | null;
  address: string;
  city: string;
  state: string;
}
interface StepEmergencyData {
  eName: string;
  eRel: string;
  ePhone: string;
}
interface StepGuarantorData {
  gName: string;
  gPhone: string;
  gAddress: string;
  gRelOcc: string;
}
interface StepVehicleData {
  make: string;
  model: string;
  year: string;
  color: string;
  plateNumber: string;
  vin: string;
  passengerSeats: string;
}
interface StepDocumentsData {
  licenseFront: File | null;
  licenseBack: File | null;
  licenseNumber: string;
  licenseExpiry: string;
  nationalIdNumber: string;
  nationalIdDoc: File | null;
  selfie: File | null;
  regCert: File | null;
  insurance: File | null;
  roadWorthiness: File | null;
  vehiclePhoto: File | null; // ← new — vehicleInfo[photos][0][file]
}

// ─── Step 1: Account ──────────────────────────────────────────────────────────

function StepAccount({
  data,
  onChange,
  onNext,
  phone,
}: {
  data: StepAccountData;
  onChange: (key: keyof StepAccountData, value: string) => void;
  onNext: () => void;
  phone: string;
}) {
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<AccountErrors>({});

  const validate = (): boolean => {
    const e: AccountErrors = {};
    if (!data.email) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      e.email = "Enter a valid email";
    if (!data.password || data.password.length < 8)
      e.password = "Min 8 characters";
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
          type={show ? "text" : "password"}
          placeholder="••••••••"
          value={data.password}
          error={errors.password}
          onChange={(e) => onChange("password", e.target.value)}
          rightSlot={
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="text-slate-400 hover:text-blue-600 transition-colors"
            >
              {show ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          }
        />
      </Field>
      <PrimaryBtn onClick={() => validate() && onNext()} />
    </div>
  );
}

// ─── Step 2: Personal ─────────────────────────────────────────────────────────

function StepPersonal({
  data,
  onChange,
  onNext,
}: {
  data: StepPersonalData;
  onChange: (
    key: keyof StepPersonalData,
    value: StepPersonalData[keyof StepPersonalData]
  ) => void;
  onNext: () => void;
}) {
  const [errors, setErrors] = useState<PersonalErrors>({});
  const [preview, setPreview] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const validate = (): boolean => {
    const e: PersonalErrors = {};
    if (!data.fullName) e.fullName = "Name is required";
    if (!data.dob) e.dob = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Profile photo — optional, not sent to backend separately */}
      <div className="flex flex-col items-center py-2">
        <div
          className="relative group cursor-pointer"
          onClick={() => ref.current?.click()}
        >
          <div className="w-24 h-24 rounded-[2rem] bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden transition-all group-hover:border-blue-400">
            {preview ? (
              <img
                src={preview}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={38} className="text-slate-300" strokeWidth={1.5} />
            )}
          </div>
          <div className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-xl border-4 border-white text-white shadow-xl group-hover:scale-110 transition-transform">
            <Camera size={16} />
          </div>
          <input
            ref={ref}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) {
                onChange("photo", f);
                setPreview(URL.createObjectURL(f));
              }
            }}
          />
        </div>
        <p className="text-xs font-bold text-slate-400 mt-4 uppercase tracking-widest">
          Profile Photo (optional)
        </p>
      </div>

      <Field label="Full Name" error={errors.fullName}>
        <Inp
          leftIcon={User}
          placeholder="Enter your legal name"
          value={data.fullName}
          error={errors.fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
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
            error={errors.dob}
            onChange={(e) => onChange("dob", e.target.value)}
          />
        </Field>
      </div>

      <Field label="Home Address">
        <Inp
          leftIcon={MapPin}
          placeholder="123 Main Street"
          value={data.address}
          onChange={(e) => onChange("address", e.target.value)}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="City">
          <Inp
            placeholder="Lagos"
            value={data.city}
            onChange={(e) => onChange("city", e.target.value)}
          />
        </Field>
        <Field label="State">
          <Inp
            placeholder="Lagos"
            value={data.state}
            onChange={(e) => onChange("state", e.target.value)}
          />
        </Field>
      </div>

      <PrimaryBtn onClick={() => validate() && onNext()} />
    </div>
  );
}

// ─── Step 3: Emergency ────────────────────────────────────────────────────────

function StepEmergency({
  data,
  onChange,
  onNext,
}: {
  data: StepEmergencyData;
  onChange: (key: keyof StepEmergencyData, value: string) => void;
  onNext: () => void;
}) {
  const [errors, setErrors] = useState<EmergencyErrors>({});

  const validate = (): boolean => {
    const e: EmergencyErrors = {};
    if (!data.eName) e.eName = "Name required";
    if (!data.ePhone) e.ePhone = "Phone required";
    if (!data.eRel) e.eRel = "Relation required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-5 bg-rose-50/50 border border-rose-100/50 rounded-[1.5rem] flex gap-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center shrink-0">
          <Heart size={24} className="text-rose-600" fill="currentColor" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-black text-rose-900">Emergency Contact</p>
          <p className="text-xs text-rose-600/80 leading-relaxed font-medium">
            This person will be notified in case of an emergency during your
            trips.
          </p>
        </div>
      </div>

      <Field label="Contact Full Name" error={errors.eName}>
        <Inp
          leftIcon={User}
          placeholder="Full Name"
          value={data.eName}
          error={errors.eName}
          onChange={(e) => onChange("eName", e.target.value)}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Relationship" error={errors.eRel}>
          <Sel
            value={data.eRel}
            error={errors.eRel}
            onChange={(e) => onChange("eRel", e.target.value)}
          >
            <option value="">Select...</option>
            <option value="Spouse">Spouse</option>
            <option value="Parent">Parent</option>
            <option value="Sibling">Sibling</option>
            <option value="Friend">Friend</option>
            <option value="Other">Other</option>
          </Sel>
        </Field>
        <Field label="Phone Number" error={errors.ePhone}>
          <Inp
            leftIcon={Phone}
            placeholder="+234..."
            value={data.ePhone}
            error={errors.ePhone}
            onChange={(e) => onChange("ePhone", e.target.value)}
          />
        </Field>
      </div>

      <PrimaryBtn onClick={() => validate() && onNext()} />
    </div>
  );
}

// ─── Step 4: Guarantor ────────────────────────────────────────────────────────

function StepGuarantor({
  data,
  onChange,
  onNext,
}: {
  data: StepGuarantorData;
  onChange: (key: keyof StepGuarantorData, value: string) => void;
  onNext: () => void;
}) {
  const [errors, setErrors] = useState<GuarantorErrors>({});

  const validate = (): boolean => {
    const e: GuarantorErrors = {};
    if (!data.gName) e.gName = "Name required";
    if (!data.gPhone) e.gPhone = "Phone required";
    if (!data.gAddress) e.gAddress = "Address required";
    if (!data.gRelOcc) e.gRelOcc = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-5 bg-blue-50/50 border border-blue-100/50 rounded-[1.5rem] flex gap-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center shrink-0">
          <UserCheck size={24} className="text-blue-600" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-black text-blue-900">Guarantor Details</p>
          <p className="text-xs text-blue-600/80 leading-relaxed font-medium">
            Someone who can vouch for you — a trusted person who knows you
            personally or professionally.
          </p>
        </div>
      </div>

      <Field label="Guarantor Full Name" error={errors.gName}>
        <Inp
          leftIcon={User}
          placeholder="Full Name"
          value={data.gName}
          error={errors.gName}
          onChange={(e) => onChange("gName", e.target.value)}
        />
      </Field>
      <Field label="Guarantor Phone" error={errors.gPhone}>
        <Inp
          leftIcon={Phone}
          placeholder="+234..."
          value={data.gPhone}
          error={errors.gPhone}
          onChange={(e) => onChange("gPhone", e.target.value)}
        />
      </Field>
      <Field label="Guarantor Address" error={errors.gAddress}>
        <Inp
          leftIcon={MapPin}
          placeholder="456 High Street, Abuja"
          value={data.gAddress}
          error={errors.gAddress}
          onChange={(e) => onChange("gAddress", e.target.value)}
        />
      </Field>
      <Field
        label="Relationship & Occupation"
        error={errors.gRelOcc}
        hint='e.g. "Uncle / Businessman"'
      >
        <Inp
          leftIcon={Users}
          placeholder="Uncle / Businessman"
          value={data.gRelOcc}
          error={errors.gRelOcc}
          onChange={(e) => onChange("gRelOcc", e.target.value)}
        />
      </Field>

      <PrimaryBtn onClick={() => validate() && onNext()} />
    </div>
  );
}

// ─── Step 5: Vehicle ──────────────────────────────────────────────────────────

function StepVehicle({
  data,
  onChange,
  onNext,
}: {
  data: StepVehicleData;
  onChange: (key: keyof StepVehicleData, value: string) => void;
  onNext: () => void;
}) {
  const [errors, setErrors] = useState<VehicleErrors>({});

  const validate = (): boolean => {
    const e: VehicleErrors = {};
    if (!data.make) e.make = "Required";
    if (!data.model) e.model = "Required";
    if (!data.year) e.year = "Required";
    if (!data.color) e.color = "Required";
    if (!data.plateNumber) e.plateNumber = "Required";
    if (!data.vin) e.vin = "Required";
    if (!data.passengerSeats) e.passengerSeats = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) =>
    (currentYear - i).toString()
  );

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] flex gap-3 items-center">
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
          <Car size={20} className="text-blue-600" />
        </div>
        <p className="text-[13px] text-slate-600 font-medium">
          Enter your vehicle details exactly as they appear on your registration
          documents.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Make" error={errors.make}>
          <Inp
            placeholder="Toyota"
            value={data.make}
            error={errors.make}
            onChange={(e) => onChange("make", e.target.value)}
          />
        </Field>
        <Field label="Model" error={errors.model}>
          <Inp
            placeholder="Camry"
            value={data.model}
            error={errors.model}
            onChange={(e) => onChange("model", e.target.value)}
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Year" error={errors.year}>
          <Sel
            value={data.year}
            error={errors.year}
            onChange={(e) => onChange("year", e.target.value)}
          >
            <option value="">Select year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </Sel>
        </Field>
        <Field label="Color" error={errors.color}>
          <Inp
            leftIcon={Palette}
            placeholder="Silver"
            value={data.color}
            error={errors.color}
            onChange={(e) => onChange("color", e.target.value)}
          />
        </Field>
      </div>

      <Field label="Plate Number" error={errors.plateNumber}>
        <Inp
          leftIcon={Hash}
          placeholder="ABC-123DE"
          value={data.plateNumber}
          error={errors.plateNumber}
          onChange={(e) =>
            onChange("plateNumber", e.target.value.toUpperCase())
          }
          className="uppercase"
        />
      </Field>

      <Field
        label="VIN (Vehicle ID Number)"
        error={errors.vin}
        hint="17-character code found on your dashboard or registration doc"
      >
        <Inp
          leftIcon={CreditCard}
          placeholder="1HGCM82633A004352"
          value={data.vin}
          error={errors.vin}
          onChange={(e) => onChange("vin", e.target.value.toUpperCase())}
          className="uppercase font-mono text-sm"
        />
      </Field>

      <Field label="Passenger Seats" error={errors.passengerSeats}>
        <Sel
          value={data.passengerSeats}
          error={errors.passengerSeats}
          onChange={(e) => onChange("passengerSeats", e.target.value)}
        >
          <option value="">Select...</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((n) => (
            <option key={n} value={n}>
              {n} seat{n > 1 ? "s" : ""}
            </option>
          ))}
        </Sel>
      </Field>

      <PrimaryBtn onClick={() => validate() && onNext()} />
    </div>
  );
}

// ─── Step 6: Documents ────────────────────────────────────────────────────────

function StepDocuments({
  data,
  onChange,
  onNext,
  loading,
  submitError,
}: {
  data: StepDocumentsData;
  onChange: (
    key: keyof StepDocumentsData,
    value: StepDocumentsData[keyof StepDocumentsData]
  ) => void;
  onNext: () => void;
  loading: boolean;
  submitError: string | null;
}) {
  const [errors, setErrors] = useState<DocumentErrors>({});

  const validate = (): boolean => {
    const e: DocumentErrors = {};
    if (!data.licenseFront) e.licenseFront = "Required";
    if (!data.licenseBack) e.licenseBack = "Required";
    if (!data.licenseNumber) e.licenseNumber = "Required";
    if (!data.licenseExpiry) e.licenseExpiry = "Required";
    if (!data.nationalIdNumber) e.nationalIdNumber = "Required";
    if (!data.nationalIdDoc) e.nationalIdDoc = "Required";
    if (!data.selfie) e.selfie = "Required";
    if (!data.regCert) e.regCert = "Required";
    if (!data.insurance) e.insurance = "Required";
    if (!data.roadWorthiness) e.roadWorthiness = "Required";
    if (!data.vehiclePhoto) e.vehiclePhoto = "Required"; // ← new
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const container = document.querySelector(".overflow-y-auto");
      if (container) container.scrollTo({ top: 0, behavior: "smooth" });
    }
    return Object.keys(e).length === 0;
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ── Driver's License ── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
            <FileText size={13} className="text-blue-600" />
          </div>
          <h3 className="text-[12px] font-black uppercase tracking-widest text-slate-500">
            Driver's License
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FileUpload
            label="Front Side"
            value={data.licenseFront}
            error={errors.licenseFront}
            onChange={(f) => onChange("licenseFront", f)}
            hint="Clear photo of front"
          />
          <FileUpload
            label="Back Side"
            value={data.licenseBack}
            error={errors.licenseBack}
            onChange={(f) => onChange("licenseBack", f)}
            hint="Clear photo of back"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="License Number" error={errors.licenseNumber}>
            <Inp
              placeholder="DL12345678"
              value={data.licenseNumber}
              error={errors.licenseNumber}
              onChange={(e) => onChange("licenseNumber", e.target.value)}
            />
          </Field>
          <Field label="Expiry Date" error={errors.licenseExpiry}>
            <Inp
              leftIcon={Calendar}
              type="date"
              value={data.licenseExpiry}
              error={errors.licenseExpiry}
              onChange={(e) => onChange("licenseExpiry", e.target.value)}
            />
          </Field>
        </div>
      </div>

      <div className="h-px bg-slate-100" />

      {/* ── National ID ── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-violet-100 flex items-center justify-center">
            <Shield size={13} className="text-violet-600" />
          </div>
          <h3 className="text-[12px] font-black uppercase tracking-widest text-slate-500">
            National ID (NIN)
          </h3>
        </div>
        <Field label="NIN Number" error={errors.nationalIdNumber}>
          <Inp
            placeholder="NIN123456789"
            value={data.nationalIdNumber}
            error={errors.nationalIdNumber}
            onChange={(e) => onChange("nationalIdNumber", e.target.value)}
          />
        </Field>
        <FileUpload
          label="NIN Document"
          value={data.nationalIdDoc}
          error={errors.nationalIdDoc}
          onChange={(f) => onChange("nationalIdDoc", f)}
          hint="Upload NIN slip or ID card"
        />
      </div>

      <div className="h-px bg-slate-100" />

      {/* ── Verification Selfie ── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center">
            <Camera size={13} className="text-emerald-600" />
          </div>
          <h3 className="text-[12px] font-black uppercase tracking-widest text-slate-500">
            Verification Selfie
          </h3>
        </div>
        <FileUpload
          label="Selfie Photo"
          value={data.selfie}
          error={errors.selfie}
          onChange={(f) => onChange("selfie", f)}
          hint="Clear face photo — no sunglasses"
          accept="image/*"
        />
      </div>

      <div className="h-px bg-slate-100" />

      {/* ── Vehicle Documents ── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center">
            <Car size={13} className="text-amber-600" />
          </div>
          <h3 className="text-[12px] font-black uppercase tracking-widest text-slate-500">
            Vehicle Documents
          </h3>
        </div>
        <FileUpload
          label="Registration Certificate"
          value={data.regCert}
          error={errors.regCert}
          onChange={(f) => onChange("regCert", f)}
          hint="Vehicle registration paper"
        />
        <FileUpload
          label="Insurance Certificate"
          value={data.insurance}
          error={errors.insurance}
          onChange={(f) => onChange("insurance", f)}
          hint="Valid insurance document"
        />
        <FileUpload
          label="Road Worthiness Certificate"
          value={data.roadWorthiness}
          error={errors.roadWorthiness}
          onChange={(f) => onChange("roadWorthiness", f)}
          hint="Current road worthiness"
        />
      </div>

      <div className="h-px bg-slate-100" />

      {/* ── Vehicle Photo — maps to vehicleInfo[photos][0][file] ── */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center">
            <Camera size={13} className="text-blue-600" />
          </div>
          <h3 className="text-[12px] font-black uppercase tracking-widest text-slate-500">
            Vehicle Photo
          </h3>
        </div>
        <FileUpload
          label="Front View of Vehicle"
          value={data.vehiclePhoto}
          error={errors.vehiclePhoto}
          onChange={(f) => onChange("vehiclePhoto", f)}
          hint="Clear photo of the front of your vehicle"
          accept="image/*"
        />
      </div>

      {/* API error */}
      {submitError && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl px-4 py-3">
          <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-600 font-medium">{submitError}</p>
        </div>
      )}

      <PrimaryBtn
        label="Submit Application"
        onClick={() => validate() && onNext()}
        loading={loading}
      />
    </div>
  );
}

// ─── Step config ──────────────────────────────────────────────────────────────

const STEPS = [
  { title: "Account", subtitle: "Secure your driver profile" },
  { title: "Identity", subtitle: "Personal info for verification" },
  { title: "Emergency", subtitle: "Who to contact in an emergency" },
  { title: "Guarantor", subtitle: "Someone who vouches for you" },
  { title: "Vehicle", subtitle: "Tell us about your car" },
  { title: "Documents", subtitle: "Upload required documents" },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function DriverOnboarding({
  phone = "",
  onBackToChoose,
}: {
  phone?: string;
  onBackToChoose?: () => void;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [account, setAccount] = useState<StepAccountData>({
    email: "",
    password: "",
  });
  const [personal, setPersonal] = useState<StepPersonalData>({
    fullName: "",
    gender: "",
    dob: "",
    photo: null,
    address: "",
    city: "",
    state: "",
  });
  const [emergency, setEmergency] = useState<StepEmergencyData>({
    eName: "",
    eRel: "",
    ePhone: "",
  });
  const [guarantor, setGuarantor] = useState<StepGuarantorData>({
    gName: "",
    gPhone: "",
    gAddress: "",
    gRelOcc: "",
  });
  const [vehicle, setVehicle] = useState<StepVehicleData>({
    make: "",
    model: "",
    year: "",
    color: "",
    plateNumber: "",
    vin: "",
    passengerSeats: "",
  });
  const [documents, setDocuments] = useState<StepDocumentsData>({
    licenseFront: null,
    licenseBack: null,
    licenseNumber: "",
    licenseExpiry: "",
    nationalIdNumber: "",
    nationalIdDoc: null,
    selfie: null,
    regCert: null,
    insurance: null,
    roadWorthiness: null,
    vehiclePhoto: null, // ← new
  });

  function makeUpdater<T extends object>(
    setter: React.Dispatch<React.SetStateAction<T>>
  ) {
    return (key: keyof T, value: T[keyof T]) =>
      setter((prev) => ({ ...prev, [key]: value }));
  }

  const animateTo = (target: number) => {
    setVisible(false);
    setTimeout(() => {
      setStep(target);
      setVisible(true);
    }, 250);
  };

  // ── Final submit ──────────────────────────────────────────────────────────
  const handleFinalSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);

    const nameParts = personal.fullName.trim().split(" ");
    const firstName = nameParts[0] ?? "";
    const lastName = nameParts.slice(1).join(" ") || firstName;

    try {
      const formData = new FormData();

      // ── Root fields ───────────────────────────────────────
      formData.append("password", account.password);

      // ── personalInfo as JSON string ───────────────────────
      formData.append(
        "personalInfo",
        JSON.stringify({
          firstName,
          lastName,
          email: account.email,
          phoneNumber: phone,
          dateOfBirth: personal.dob,
          address: personal.address || "N/A",
          city: personal.city || "N/A",
          state: personal.state || "N/A",
        })
      );

      // ── contacts as JSON string ───────────────────────────
      formData.append(
        "contacts",
        JSON.stringify({
          emergency: {
            fullName: emergency.eName,
            phoneNumber: emergency.ePhone,
            relationship: emergency.eRel,
          },
          guarantor: {
            fullName: guarantor.gName,
            phoneNumber: guarantor.gPhone,
            address: guarantor.gAddress,
            relationshipAndOccupation: guarantor.gRelOcc,
          },
        })
      );

      // ── verificationDocuments text fields only (NO JSON blob) ─
      formData.append(
        "verificationDocuments[driversLicense][number]",
        documents.licenseNumber
      );
      formData.append(
        "verificationDocuments[driversLicense][expiryDate]",
        documents.licenseExpiry
      );
      formData.append(
        "verificationDocuments[nationalId][number]",
        documents.nationalIdNumber
      );

      // ── verificationDocuments files ───────────────────────
      if (documents.licenseFront)
        formData.append(
          "verificationDocuments[driversLicense][front]",
          documents.licenseFront
        );
      if (documents.licenseBack)
        formData.append(
          "verificationDocuments[driversLicense][back]",
          documents.licenseBack
        );
      if (documents.nationalIdDoc)
        formData.append(
          "verificationDocuments[nationalId][document]",
          documents.nationalIdDoc
        );
      if (documents.selfie)
        formData.append(
          "verificationDocuments[verificationSelfie]",
          documents.selfie
        );

      // ── vehicleInfo text fields only (NO JSON blob) ───────
      formData.append("vehicleInfo[make]", vehicle.make);
      formData.append("vehicleInfo[model]", vehicle.model);
      formData.append("vehicleInfo[year]", vehicle.year);
      formData.append("vehicleInfo[color]", vehicle.color);
      formData.append("vehicleInfo[plateNumber]", vehicle.plateNumber);
      formData.append(
        "vehicleInfo[passengerSeats]",
        String(Number(vehicle.passengerSeats))
      );
      formData.append("vehicleInfo[vin]", vehicle.vin);

      // ── vehicleInfo files ─────────────────────────────────
      if (documents.regCert)
        formData.append(
          "vehicleInfo[documents][registrationCertificate]",
          documents.regCert
        );
      if (documents.insurance)
        formData.append(
          "vehicleInfo[documents][insuranceCertificate]",
          documents.insurance
        );
      if (documents.roadWorthiness)
        formData.append(
          "vehicleInfo[documents][roadWorthiness]",
          documents.roadWorthiness
        );
      if (documents.vehiclePhoto) {
        formData.append("vehicleInfo[photos][0][label]", "Front View");
        formData.append("vehicleInfo[photos][0][file]", documents.vehiclePhoto);
      }

      const result = await registerDriver(formData);

      dispatch(
        setCredentials({
          user: result.data.driver,
          token: result.token,
          role: "driver",
        })
      );

      setDone(true);
    } catch (err: any) {
      setSubmitError(err?.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen ────────────────────────────────────────────────────────
  if (done) {
    return (
      <div className="min-h-screen bg-blue-600 flex items-center justify-center p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent opacity-50" />
        <div className="space-y-8 z-10 animate-in zoom-in-95 duration-700 max-w-sm w-full">
          <div className="w-28 h-28 bg-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl">
            <CheckCircle2 size={56} className="text-blue-600 animate-bounce" />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-white tracking-tighter">
              Application Sent!
            </h2>
            <p className="text-blue-100 text-lg font-medium">
              Your driver profile is under review. We'll notify you once
              approved.
            </p>
          </div>
          <button
            onClick={() => router.push("/dashboard/driver")}
            className="w-full bg-white text-blue-600 font-black py-5 rounded-[2rem] shadow-2xl hover:scale-105 transition-all text-lg"
          >
            Go to Dashboard →
          </button>
        </div>
      </div>
    );
  }

  // ── Main flow ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center relative overflow-hidden p-0 md:p-6">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-2xl z-10 flex flex-col h-screen md:h-auto">
        {/* Header */}
        <div className="px-6 pt-10 pb-6 space-y-5">
          <ProgressBar
            step={step}
            total={6}
            onBack={() => (step > 1 ? animateTo(step - 1) : onBackToChoose?.())}
          />
          <div className="space-y-1">
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter animate-in fade-in slide-in-from-top-4 duration-500">
              {STEPS[step - 1].title}
            </h2>
            <p className="text-slate-400 text-base font-medium">
              {STEPS[step - 1].subtitle}
            </p>
          </div>
        </div>

        {/* Form card */}
        <div className="flex-1 md:flex-none bg-white md:rounded-[3rem] rounded-t-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] overflow-y-auto">
          <div className="px-6 md:px-10 py-8">
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
                  onChange={makeUpdater(setAccount)}
                  onNext={() => animateTo(2)}
                  phone={phone}
                />
              )}
              {step === 2 && (
                <StepPersonal
                  data={personal}
                  onChange={makeUpdater(setPersonal)}
                  onNext={() => animateTo(3)}
                />
              )}
              {step === 3 && (
                <StepEmergency
                  data={emergency}
                  onChange={makeUpdater(setEmergency)}
                  onNext={() => animateTo(4)}
                />
              )}
              {step === 4 && (
                <StepGuarantor
                  data={guarantor}
                  onChange={makeUpdater(setGuarantor)}
                  onNext={() => animateTo(5)}
                />
              )}
              {step === 5 && (
                <StepVehicle
                  data={vehicle}
                  onChange={makeUpdater(setVehicle)}
                  onNext={() => animateTo(6)}
                />
              )}
              {step === 6 && (
                <StepDocuments
                  data={documents}
                  onChange={makeUpdater(setDocuments)}
                  onNext={handleFinalSubmit}
                  loading={submitting}
                  submitError={submitError}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
