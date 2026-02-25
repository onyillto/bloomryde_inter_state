"use client";

import { useState, useRef } from "react";
import {
  User,
  Camera,
  Edit3,
  Check,
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Star,
  Car,
  TrendingUp,
  Lock,
  Bell,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Pencil,
  Save,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabKey = "personal" | "stats" | "security";

type ProfileForm = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  city: string;
  state: string;
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const INITIAL_FORM: ProfileForm = {
  firstName: "Amara",
  lastName: "Kolawole",
  email: "amara.kolawole@gmail.com",
  phone: "+234 812 345 6789",
  gender: "Female",
  dob: "1998-07-15",
  city: "Lagos",
  state: "Lagos State",
};

const ACTIVITY = [
  { month: "Nov", trips: 1 },
  { month: "Dec", trips: 3 },
  { month: "Jan", trips: 2 },
  { month: "Feb", trips: 2 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Field Input ──────────────────────────────────────────────────────────────

function Field({
  label,
  value,
  onChange,
  editing,
  type = "text",
  icon,
  placeholder,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  editing: boolean;
  type?: string;
  icon: React.ReactNode;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-zinc-600 mb-2">
        {icon}
        {label}
      </label>
      {editing ? (
        type === "select-gender" ? (
          <select
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full bg-zinc-800/80 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-[14px] text-white focus:outline-none focus:border-blue-500/60 focus:bg-zinc-800 transition-colors"
          >
            {["Male", "Female", "Prefer not to say"].map((o) => (
              <option key={o} value={o} style={{ background: "#141a18" }}>
                {o}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full bg-zinc-800/80 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-[14px] text-white placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/60 focus:bg-zinc-800 transition-colors [color-scheme:dark]"
          />
        )
      ) : (
        <div className="flex items-center gap-2 bg-zinc-800/40 border border-zinc-800 rounded-xl px-3.5 py-2.5 min-h-[42px]">
          <span className="text-[14px] text-zinc-300 font-medium">
            {type === "date" ? formatDate(value) : value || "—"}
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────

function Avatar({ initials, editing }: { initials: string; editing: boolean }) {
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <div className="relative inline-block">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-800 to-blue-950 flex items-center justify-center font-black text-[28px] text-blue-300 border-2 border-blue-500/30 shadow-xl shadow-blue-900/40">
        {initials}
      </div>
      {/* Verified ring */}
      <div className="absolute inset-0 rounded-full border-2 border-blue-500/20 pointer-events-none" />
      {editing && (
        <>
          <button
            onClick={() => fileRef.current?.click()}
            className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white border-2 border-zinc-900 hover:bg-blue-500 transition-all shadow-lg"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
          />
        </>
      )}
    </div>
  );
}

// ─── Tab Button ───────────────────────────────────────────────────────────────

function TabBtn({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all
        ${
          active
            ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
            : "bg-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

// ─── Activity Bar ─────────────────────────────────────────────────────────────

function ActivityBar({
  month,
  trips,
  max,
}: {
  month: string;
  trips: number;
  max: number;
}) {
  const pct = max > 0 ? (trips / max) * 100 : 0;
  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      <span className="text-[11px] font-bold text-blue-400">
        {trips > 0 ? trips : ""}
      </span>
      <div
        className="w-full bg-zinc-800 rounded-full overflow-hidden"
        style={{ height: "56px" }}
      >
        <div
          className="w-full bg-gradient-to-t from-blue-700 to-blue-500 rounded-full transition-all duration-700"
          style={{ height: `${pct}%`, marginTop: `${100 - pct}%` }}
        />
      </div>
      <span className="text-[11px] text-zinc-600 font-medium">{month}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MyProfile() {
  const [activeTab, setActiveTab] = useState<TabKey>("personal");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<ProfileForm>(INITIAL_FORM);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);

  const set = (k: keyof ProfileForm) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setDirty(true);
  };

  function handleSave() {
    setSaved(true);
    setEditing(false);
    setDirty(false);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleDiscard() {
    setForm(INITIAL_FORM);
    setEditing(false);
    setDirty(false);
  }

  const maxTrips = Math.max(...ACTIVITY.map((a) => a.trips));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');

        .my-profile-root * { box-sizing: border-box; }
        .my-profile-root { font-family: 'DM Sans', sans-serif; }

        .section-enter { animation: secIn 0.25s ease-out both; }
        @keyframes secIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .my-profile-root ::-webkit-scrollbar { width: 4px; }
        .my-profile-root ::-webkit-scrollbar-track { background: transparent; }
        .my-profile-root ::-webkit-scrollbar-thumb { background: #2a3530; border-radius: 4px; }

        select option { background: #141a18; }
      `}</style>

      <div className="my-profile-root bg-[#0b0f0e] min-h-screen text-[#e8f0ec]">
        <div className="max-w-[780px] mx-auto px-6 py-8">
          {/* ── Page Header ─────────────────────────────────────── */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1
                className="text-[28px] font-black text-white leading-tight tracking-tight flex items-center gap-3"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                <User className="w-7 h-7 text-blue-500" />
                My Profile
              </h1>
              <p className="text-zinc-500 text-[14px] mt-1">
                Manage your personal information and account details
              </p>
            </div>

            {/* Edit / Save / Discard */}
            <div className="flex items-center gap-2">
              {editing ? (
                <>
                  <button
                    onClick={handleDiscard}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-semibold border border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200 bg-zinc-800/50 transition-all"
                  >
                    <X className="w-4 h-4" /> Discard
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-[13px] px-4 py-2 rounded-xl shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 transition-all"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 bg-zinc-800 border border-zinc-700 hover:border-blue-500/40 hover:text-blue-400 text-zinc-300 font-semibold text-[13px] px-4 py-2 rounded-xl transition-all"
                >
                  <Edit3 className="w-4 h-4" /> Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* ── Saved Toast ──────────────────────────────────────── */}
          {saved && (
            <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 rounded-xl px-4 py-3 mb-6 section-enter">
              <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span className="text-[13px] text-blue-400 font-semibold">
                Profile updated successfully
              </span>
            </div>
          )}

          {/* ── Profile Hero Card ─────────────────────────────────── */}
          <div className="relative rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-[#111816] p-6 mb-6 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-0 w-48 h-48 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start gap-6 relative">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <Avatar
                  initials={`${form.firstName[0]}${form.lastName[0]}`}
                  editing={editing}
                />
                {/* Verified badge */}
                <div className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                    Verified
                  </span>
                </div>
              </div>

              {/* Name + meta */}
              <div className="flex-1 min-w-0 pt-1">
                {editing ? (
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <input
                      value={form.firstName}
                      onChange={(e) => set("firstName")(e.target.value)}
                      placeholder="First name"
                      className="bg-zinc-800/80 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-[18px] font-black text-white focus:outline-none focus:border-blue-500/60 transition-colors"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    />
                    <input
                      value={form.lastName}
                      onChange={(e) => set("lastName")(e.target.value)}
                      placeholder="Last name"
                      className="bg-zinc-800/80 border border-zinc-700 rounded-xl px-3.5 py-2.5 text-[18px] font-black text-white focus:outline-none focus:border-blue-500/60 transition-colors"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    />
                  </div>
                ) : (
                  <div
                    className="text-[26px] font-black text-white tracking-tight mb-1"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {form.firstName} {form.lastName}
                  </div>
                )}

                <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
                  <span className="flex items-center gap-1.5 text-[13px] text-zinc-500">
                    <Mail className="w-3.5 h-3.5 text-zinc-600" />
                    {form.email}
                  </span>
                  <span className="flex items-center gap-1.5 text-[13px] text-zinc-500">
                    <Phone className="w-3.5 h-3.5 text-zinc-600" />
                    {form.phone}
                  </span>
                  <span className="flex items-center gap-1.5 text-[13px] text-zinc-500">
                    <MapPin className="w-3.5 h-3.5 text-zinc-600" />
                    {form.city}, {form.state}
                  </span>
                </div>

                {/* Quick stats row */}
                <div className="flex gap-4">
                  {[
                    {
                      label: "Total Trips",
                      value: "8",
                      icon: <Car className="w-3.5 h-3.5" />,
                    },
                    {
                      label: "Avg Rating",
                      value: "4.8 ★",
                      icon: <Star className="w-3.5 h-3.5" />,
                    },
                    {
                      label: "Member Since",
                      value: "Jan 2026",
                      icon: <Calendar className="w-3.5 h-3.5" />,
                    },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 text-[12px] text-zinc-600">
                        {s.icon}
                        {s.label}
                      </div>
                      <div
                        className="font-black text-[14px] text-white"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {s.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Tabs ─────────────────────────────────────────────── */}
          <div className="flex items-center gap-2 mb-6">
            <TabBtn
              active={activeTab === "personal"}
              onClick={() => setActiveTab("personal")}
              icon={<User className="w-4 h-4" />}
              label="Personal Info"
            />
            <TabBtn
              active={activeTab === "stats"}
              onClick={() => setActiveTab("stats")}
              icon={<TrendingUp className="w-4 h-4" />}
              label="My Stats"
            />
            <TabBtn
              active={activeTab === "security"}
              onClick={() => setActiveTab("security")}
              icon={<Lock className="w-4 h-4" />}
              label="Security"
            />
          </div>

          {/* ── Tab: Personal Info ──────────────────────────────── */}
          {activeTab === "personal" && (
            <div className="section-enter space-y-4">
              {/* Basic info */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <div
                  className="text-[13px] font-bold text-white mb-4 flex items-center gap-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  <User className="w-4 h-4 text-blue-500" />
                  Basic Information
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    label="First Name"
                    value={form.firstName}
                    onChange={set("firstName")}
                    editing={editing}
                    icon={<User className="w-3 h-3" />}
                  />
                  <Field
                    label="Last Name"
                    value={form.lastName}
                    onChange={set("lastName")}
                    editing={editing}
                    icon={<User className="w-3 h-3" />}
                  />
                  <Field
                    label="Gender"
                    value={form.gender}
                    onChange={set("gender")}
                    editing={editing}
                    type="select-gender"
                    icon={<User className="w-3 h-3" />}
                  />
                  <Field
                    label="Date of Birth"
                    value={form.dob}
                    onChange={set("dob")}
                    editing={editing}
                    type="date"
                    icon={<Calendar className="w-3 h-3" />}
                  />
                </div>
              </div>

              {/* Contact info */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <div
                  className="text-[13px] font-bold text-white mb-4 flex items-center gap-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  <Mail className="w-4 h-4 text-blue-500" />
                  Contact Details
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    label="Email Address"
                    value={form.email}
                    onChange={set("email")}
                    editing={editing}
                    type="email"
                    icon={<Mail className="w-3 h-3" />}
                  />
                  <Field
                    label="Phone Number"
                    value={form.phone}
                    onChange={set("phone")}
                    editing={editing}
                    type="tel"
                    icon={<Phone className="w-3 h-3" />}
                  />
                  <Field
                    label="City"
                    value={form.city}
                    onChange={set("city")}
                    editing={editing}
                    icon={<MapPin className="w-3 h-3" />}
                    placeholder="e.g. Lagos"
                  />
                  <Field
                    label="State"
                    value={form.state}
                    onChange={set("state")}
                    editing={editing}
                    icon={<MapPin className="w-3 h-3" />}
                    placeholder="e.g. Lagos State"
                  />
                </div>
              </div>

              {/* Unsaved changes banner */}
              {dirty && editing && (
                <div className="flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
                  <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span className="text-[13px] text-amber-400 font-medium">
                    You have unsaved changes
                  </span>
                  <button
                    onClick={handleSave}
                    className="ml-auto flex items-center gap-1.5 text-[12px] font-bold text-amber-400 border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 rounded-lg hover:bg-amber-500/20 transition-all"
                  >
                    <Save className="w-3.5 h-3.5" /> Save now
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── Tab: Stats ──────────────────────────────────────── */}
          {activeTab === "stats" && (
            <div className="section-enter space-y-4">
              {/* Stat grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    icon: <Car className="w-5 h-5 text-blue-400" />,
                    label: "Total Trips",
                    value: "8",
                    sub: "Since Jan 2026",
                    color: "from-blue-500/10 to-blue-500/5 border-blue-500/20",
                    valueColor: "text-blue-400",
                  },
                  {
                    icon: <Star className="w-5 h-5 text-amber-400" />,
                    label: "Avg Rating Given",
                    value: "4.8 ★",
                    sub: "Across 6 rated trips",
                    color:
                      "from-amber-500/8 to-amber-500/3 border-amber-500/15",
                    valueColor: "text-amber-400",
                  },
                  {
                    icon: <MapPin className="w-5 h-5 text-violet-400" />,
                    label: "Cities Visited",
                    value: "6",
                    sub: "Unique destinations",
                    color: "from-zinc-800 to-zinc-900 border-zinc-800",
                    valueColor: "text-white",
                  },
                  {
                    icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
                    label: "Total Spent",
                    value: "₦29,500",
                    sub: "On completed trips",
                    color: "from-zinc-800 to-zinc-900 border-zinc-800",
                    valueColor: "text-white",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className={`rounded-2xl border bg-gradient-to-br ${s.color} p-5`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>{s.icon}</div>
                    </div>
                    <div
                      className={`font-black text-[28px] leading-none mb-1 ${s.valueColor}`}
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {s.value}
                    </div>
                    <div className="text-[13px] font-semibold text-zinc-300 mb-0.5">
                      {s.label}
                    </div>
                    <div className="text-[12px] text-zinc-600">{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* Activity chart */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <div
                  className="text-[13px] font-bold text-white mb-1 flex items-center gap-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  Trip Activity
                </div>
                <div className="text-[12px] text-zinc-600 mb-5">
                  Trips per month
                </div>
                <div className="flex items-end gap-3 h-20">
                  {ACTIVITY.map((a) => (
                    <ActivityBar key={a.month} {...a} max={maxTrips} />
                  ))}
                </div>
              </div>

              {/* Favourite routes */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <div
                  className="text-[13px] font-bold text-white mb-4 flex items-center gap-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  <Star className="w-4 h-4 text-blue-500" />
                  Favourite Routes
                </div>
                <div className="space-y-2">
                  {[
                    { from: "Lagos", to: "Abuja", count: 4, pct: 100 },
                    { from: "Abuja", to: "Enugu", count: 2, pct: 50 },
                    { from: "P.H", to: "Lagos", count: 1, pct: 25 },
                  ].map((r) => (
                    <div
                      key={r.from + r.to}
                      className="flex items-center gap-3"
                    >
                      <div className="flex items-center gap-1.5 text-[13px] min-w-[140px]">
                        <span className="text-zinc-300 font-medium">
                          {r.from}
                        </span>
                        <svg
                          className="w-3 h-3 text-blue-500 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M5 12h14M13 6l6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="text-blue-400 font-medium">
                          {r.to}
                        </span>
                      </div>
                      <div className="flex-1 bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-700 to-blue-500 rounded-full transition-all duration-700"
                          style={{ width: `${r.pct}%` }}
                        />
                      </div>
                      <span className="text-[12px] text-zinc-500 font-semibold min-w-[16px] text-right">
                        {r.count}x
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Tab: Security ────────────────────────────────────── */}
          {activeTab === "security" && (
            <div className="section-enter space-y-4">
              {/* Account status */}
              <div className="rounded-2xl border border-blue-500/25 bg-gradient-to-br from-blue-500/8 to-blue-500/3 p-5">
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest">
                    Account Status
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <div
                      className="text-[16px] font-bold text-white"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      Account Verified
                    </div>
                    <div className="text-[12px] text-zinc-500">
                      Phone number and email confirmed · Active since Jan 2026
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-blue-400 ml-auto flex-shrink-0" />
                </div>
              </div>

              {/* Security actions */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <div
                  className="text-[13px] font-bold text-white mb-4 flex items-center gap-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  <Lock className="w-4 h-4 text-blue-500" />
                  Security Settings
                </div>
                <div className="space-y-1">
                  {[
                    {
                      icon: <Phone className="w-4 h-4 text-zinc-500" />,
                      label: "Change Phone Number",
                      sub: "Verified · +234 812 345 6789",
                      chevron: true,
                    },
                    {
                      icon: <Mail className="w-4 h-4 text-zinc-500" />,
                      label: "Change Email Address",
                      sub: "amara.kolawole@gmail.com",
                      chevron: true,
                    },
                    {
                      icon: <Lock className="w-4 h-4 text-zinc-500" />,
                      label: "Change PIN / Password",
                      sub: "Last changed 30 days ago",
                      chevron: true,
                    },
                    {
                      icon: <Bell className="w-4 h-4 text-zinc-500" />,
                      label: "Login Notifications",
                      sub: "Alert me when a new device logs in",
                      chevron: true,
                    },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-transparent hover:border-zinc-800 hover:bg-zinc-800/60 text-left transition-all group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0 group-hover:border-blue-500/30 transition-colors">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[14px] font-medium text-zinc-200">
                          {item.label}
                        </div>
                        <div className="text-[12px] text-zinc-600 truncate">
                          {item.sub}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-blue-500 transition-colors flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Danger zone */}
              <div className="rounded-2xl border border-red-500/15 bg-red-500/3 p-5">
                <div
                  className="text-[13px] font-bold text-red-400 mb-4 flex items-center gap-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  <AlertCircle className="w-4 h-4" />
                  Danger Zone
                </div>
                <div className="space-y-2">
                  {[
                    {
                      label: "Download My Data",
                      sub: "Export all your account data as a file",
                      color: "text-zinc-300",
                    },
                    {
                      label: "Deactivate Account",
                      sub: "Temporarily disable your account",
                      color: "text-amber-400",
                    },
                    {
                      label: "Delete Account",
                      sub: "Permanently delete your account and all data",
                      color: "text-red-400",
                    },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/80 hover:border-zinc-700 hover:bg-zinc-800/60 text-left transition-all group"
                    >
                      <div className="flex-1">
                        <div
                          className={`text-[13px] font-semibold ${item.color}`}
                        >
                          {item.label}
                        </div>
                        <div className="text-[12px] text-zinc-600">
                          {item.sub}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-zinc-500 transition-colors flex-shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
