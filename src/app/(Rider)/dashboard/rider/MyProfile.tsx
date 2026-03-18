"use client";

import { useState, useRef } from "react";
import { useAppSelector } from "@/store/hooks";
import {
  selectRiderUser,
  selectRiderInitials,
  selectRiderIsVerified,
  selectToken,
} from "@/store/slices/authSlice";
import {
  FiUser,
  FiCamera,
  FiEdit3,
  FiX,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiShield,
  FiStar,
  FiTrendingUp,
  FiLock,
  FiBell,
  FiChevronRight,
  FiCheckCircle,
  FiAlertCircle,
  FiSave,
  FiDownload,
} from "react-icons/fi";
import { MdOutlineDirectionsCar } from "react-icons/md";
import { TbRoute } from "react-icons/tb";

type TabKey = "personal" | "stats" | "security";

type ProfileForm = {
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
};

const ACTIVITY = [
  { month: "Nov", trips: 1 },
  { month: "Dec", trips: 3 },
  { month: "Jan", trips: 2 },
  { month: "Feb", trips: 2 },
];

function formatDate(iso?: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

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
      <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-600 mb-2">
        {icon} {label}
      </label>
      {editing ? (
        type === "select-gender" ? (
          <select
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full bg-slate-800/80 border border-white/5 rounded-xl px-3.5 py-2.5 text-[14px] text-white focus:outline-none focus:border-blue-500/40 transition-colors appearance-none"
          >
            {["Male", "Female", "Prefer not to say"].map((o) => (
              <option key={o} value={o} style={{ background: "#1e293b" }}>
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
            className="w-full bg-slate-800/80 border border-white/5 rounded-xl px-3.5 py-2.5 text-[14px] text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/40 transition-colors [color-scheme:dark]"
          />
        )
      ) : (
        <div className="flex items-center bg-white/5 border border-white/5 rounded-xl px-3.5 py-2.5 min-h-[42px]">
          <span className="text-[14px] text-slate-300 font-medium">
            {type === "date" ? formatDate(value) : value || "—"}
          </span>
        </div>
      )}
    </div>
  );
}

function Avatar({ initials, editing }: { initials: string; editing: boolean }) {
  const fileRef = useRef<HTMLInputElement>(null);
  return (
    <div className="relative inline-block">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600/40 to-blue-900/80 flex items-center justify-center font-black text-[28px] text-blue-300 border-2 border-blue-500/30 shadow-xl shadow-blue-900/30">
        {initials}
      </div>
      <div className="absolute inset-0 rounded-full border-2 border-blue-500/15 pointer-events-none" />
      {editing && (
        <>
          <button
            onClick={() => fileRef.current?.click()}
            className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white border-2 border-[#0f172a] hover:bg-blue-500 transition-all shadow-lg"
          >
            <FiCamera size={13} />
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
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
        active
          ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
          : "bg-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5"
      }`}
    >
      {icon} {label}
    </button>
  );
}

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
        className="w-full bg-white/5 rounded-full overflow-hidden"
        style={{ height: "56px" }}
      >
        <div
          className="w-full bg-gradient-to-t from-blue-700 to-blue-500 rounded-full transition-all duration-700"
          style={{ height: `${pct}%`, marginTop: `${100 - pct}%` }}
        />
      </div>
      <span className="text-[11px] text-slate-600 font-medium">{month}</span>
    </div>
  );
}

function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-5">
      <div
        className="text-[13px] font-semibold text-white mb-4 flex items-center gap-2"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        <span className="text-blue-400">{icon}</span>
        {title}
      </div>
      {children}
    </div>
  );
}

function ActionRow({
  icon,
  label,
  sub,
  color = "text-slate-300",
  last = false,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  color?: string;
  last?: boolean;
}) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left group transition-all hover:bg-white/5 ${
        !last ? "border-b border-white/5" : ""
      }`}
    >
      <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 flex-shrink-0 group-hover:border-blue-500/30 group-hover:text-blue-400 transition-all">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-[14px] font-medium ${color}`}>{label}</div>
        <div className="text-[12px] text-slate-600 truncate">{sub}</div>
      </div>
      <FiChevronRight
        size={15}
        className="text-slate-700 group-hover:text-blue-400 transition-colors flex-shrink-0"
      />
    </button>
  );
}

export default function MyProfile() {
  const riderUser = useAppSelector(selectRiderUser);
  const initials = useAppSelector(selectRiderInitials);
  const isVerified = useAppSelector(selectRiderIsVerified);
  const token = useAppSelector(selectToken);

  const [activeTab, setActiveTab] = useState<TabKey>("personal");
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);

  // Seed form from Redux
  const [form, setForm] = useState<ProfileForm>({
    fullName: riderUser?.fullName ?? "",
    email: riderUser?.email ?? "",
    phone: riderUser?.phone ?? "",
    gender: riderUser?.gender ?? "",
    dob: riderUser?.dateOfBirth ?? "",
  });

  const set = (k: keyof ProfileForm) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setDirty(true);
  };

  function handleSave() {
    // TODO: call updateUserProfile API when rider profile update endpoint is ready
    setSaved(true);
    setEditing(false);
    setDirty(false);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleDiscard() {
    setForm({
      fullName: riderUser?.fullName ?? "",
      email: riderUser?.email ?? "",
      phone: riderUser?.phone ?? "",
      gender: riderUser?.gender ?? "",
      dob: riderUser?.dateOfBirth ?? "",
    });
    setEditing(false);
    setDirty(false);
  }

  const maxTrips = Math.max(...ACTIVITY.map((a) => a.trips));

  // Derived from form
  const memberSince = riderUser
    ? new Date((riderUser as any).createdAt ?? "").toLocaleDateString("en-GB", {
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
        .mp-root * { box-sizing: border-box; }
        .mp-root { font-family: 'DM Sans', sans-serif; background: #0f172a; color: #cbd5e1; min-height: 100vh; }
        .mp-root select option { background: #1e293b; }
        .mp-root ::-webkit-scrollbar { width: 4px; }
        .mp-root ::-webkit-scrollbar-track { background: transparent; }
        .mp-root ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        .sec-enter { animation: secIn 0.25s ease-out both; }
        @keyframes secIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <div className="mp-root">
        <div className="max-w-[1100px] mx-auto px-6 py-8">
          {/* ── Header ── */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1
                className="text-[26px] font-bold text-white tracking-tight flex items-center gap-2.5"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                <FiUser className="text-blue-400" size={24} /> My Profile
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Manage your personal information and account details
              </p>
            </div>
            <div className="flex items-center gap-2">
              {editing ? (
                <>
                  <button
                    onClick={handleDiscard}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-medium border border-white/5 bg-white/5 text-slate-400 hover:border-white/10 hover:text-slate-200 transition-all"
                  >
                    <FiX size={15} /> Discard
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[13px] px-4 py-2 rounded-xl shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 transition-all"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    <FiSave size={14} /> Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 bg-white/5 border border-white/5 hover:border-blue-500/30 hover:text-blue-400 text-slate-300 font-medium text-[13px] px-4 py-2 rounded-xl transition-all"
                >
                  <FiEdit3 size={14} /> Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* ── Saved toast ── */}
          {saved && (
            <div className="flex items-center gap-2 bg-blue-600/10 border border-blue-500/20 rounded-xl px-4 py-3 mb-6 sec-enter">
              <FiCheckCircle
                size={15}
                className="text-blue-400 flex-shrink-0"
              />
              <span className="text-[13px] text-blue-400 font-medium">
                Profile updated successfully
              </span>
            </div>
          )}

          {/* ── Hero card ── */}
          <div className="relative rounded-2xl border border-white/5 bg-slate-900/60 p-6 mb-6 overflow-hidden">
            <div className="absolute top-0 left-0 w-56 h-56 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-start gap-6 relative">
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <Avatar initials={initials} editing={editing} />
                <div
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 ${
                    isVerified
                      ? "bg-blue-600/15 border border-blue-500/20"
                      : "bg-amber-500/15 border border-amber-500/20"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                      isVerified ? "bg-blue-400" : "bg-amber-400"
                    }`}
                  />
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider ${
                      isVerified ? "text-blue-400" : "text-amber-400"
                    }`}
                  >
                    {isVerified ? "Verified" : "Unverified"}
                  </span>
                </div>
              </div>

              <div className="flex-1 min-w-0 pt-1">
                {editing ? (
                  <div className="mb-3">
                    <input
                      value={form.fullName}
                      onChange={(e) => set("fullName")(e.target.value)}
                      placeholder="Full name"
                      className="bg-slate-800/80 border border-white/5 rounded-xl px-3.5 py-2.5 text-[18px] font-black text-white focus:outline-none focus:border-blue-500/40 transition-colors w-full max-w-sm"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    />
                  </div>
                ) : (
                  <div
                    className="text-[26px] font-black text-white tracking-tight mb-1"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {form.fullName || "—"}
                  </div>
                )}

                <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-4">
                  {[
                    { icon: <FiMail size={13} />, val: form.email },
                    { icon: <FiPhone size={13} />, val: form.phone },
                  ]
                    .filter(({ val }) => Boolean(val))
                    .map(({ icon, val }) => (
                      <span
                        key={val}
                        className="flex items-center gap-1.5 text-[13px] text-slate-500"
                      >
                        <span className="text-slate-600">{icon}</span>
                        {val}
                      </span>
                    ))}
                </div>

                <div className="flex flex-wrap gap-5">
                  {[
                    {
                      label: "Total Trips",
                      value: "—",
                      icon: <MdOutlineDirectionsCar size={14} />,
                    },
                    {
                      label: "Avg Rating",
                      value: "—",
                      icon: <FiStar size={13} />,
                    },
                    {
                      label: "Member Since",
                      value: memberSince,
                      icon: <FiCalendar size={13} />,
                    },
                  ].map((s) => (
                    <div key={s.label} className="flex items-center gap-2">
                      <span className="flex items-center gap-1.5 text-[12px] text-slate-600">
                        {s.icon}
                        {s.label}
                      </span>
                      <span
                        className="font-black text-[14px] text-white"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {s.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Tabs ── */}
          <div className="flex items-center gap-2 mb-6">
            <TabBtn
              active={activeTab === "personal"}
              onClick={() => setActiveTab("personal")}
              icon={<FiUser size={15} />}
              label="Personal Info"
            />
            <TabBtn
              active={activeTab === "stats"}
              onClick={() => setActiveTab("stats")}
              icon={<FiTrendingUp size={15} />}
              label="My Stats"
            />
            <TabBtn
              active={activeTab === "security"}
              onClick={() => setActiveTab("security")}
              icon={<FiLock size={15} />}
              label="Security"
            />
          </div>

          {/* ══ Personal Info ════════════════════════════════════ */}
          {activeTab === "personal" && (
            <div className="sec-enter space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <SectionCard
                  title="Basic Information"
                  icon={<FiUser size={15} />}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Field
                        label="Full Name"
                        value={form.fullName}
                        onChange={set("fullName")}
                        editing={editing}
                        icon={<FiUser size={11} />}
                      />
                    </div>
                    <Field
                      label="Gender"
                      value={form.gender}
                      onChange={set("gender")}
                      editing={editing}
                      type="select-gender"
                      icon={<FiUser size={11} />}
                    />
                    <Field
                      label="Date of Birth"
                      value={form.dob}
                      onChange={set("dob")}
                      editing={editing}
                      type="date"
                      icon={<FiCalendar size={11} />}
                    />
                  </div>
                </SectionCard>

                <SectionCard
                  title="Contact Details"
                  icon={<FiMail size={15} />}
                >
                  <div className="grid grid-cols-1 gap-4">
                    <Field
                      label="Email Address"
                      value={form.email}
                      onChange={set("email")}
                      editing={editing}
                      type="email"
                      icon={<FiMail size={11} />}
                    />
                    <Field
                      label="Phone Number"
                      value={form.phone}
                      onChange={set("phone")}
                      editing={editing}
                      type="tel"
                      icon={<FiPhone size={11} />}
                    />
                  </div>
                </SectionCard>
              </div>

              {/* Emergency contact — from backend */}
              {riderUser?.emergencyContact && (
                <SectionCard
                  title="Emergency Contact"
                  icon={<FiShield size={15} />}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { label: "Name", value: riderUser.emergencyContact.name },
                      {
                        label: "Relationship",
                        value: riderUser.emergencyContact.relationship,
                      },
                      {
                        label: "Phone",
                        value: riderUser.emergencyContact.phone,
                      },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="bg-white/5 border border-white/5 rounded-xl px-3.5 py-2.5"
                      >
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-1">
                          {label}
                        </div>
                        <div className="text-[14px] text-slate-300 font-medium">
                          {value || "—"}
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}

              {dirty && editing && (
                <div className="flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/8 px-4 py-3">
                  <FiAlertCircle
                    size={15}
                    className="text-amber-400 flex-shrink-0"
                  />
                  <span className="text-[13px] text-amber-400 font-medium">
                    You have unsaved changes
                  </span>
                  <button
                    onClick={handleSave}
                    className="ml-auto flex items-center gap-1.5 text-[12px] font-semibold text-amber-400 border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 rounded-lg hover:bg-amber-500/20 transition-all"
                  >
                    <FiSave size={12} /> Save now
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ══ Stats ════════════════════════════════════════════ */}
          {activeTab === "stats" && (
            <div className="sec-enter space-y-4">
              {/* Placeholder notice */}
              <div className="flex items-center gap-3 bg-blue-600/10 border border-blue-500/20 rounded-xl px-4 py-3">
                <FiAlertCircle
                  size={14}
                  className="text-blue-400 flex-shrink-0"
                />
                <p className="text-[12px] text-blue-400">
                  Trip stats will populate once booking endpoints are connected.
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  {
                    icon: (
                      <MdOutlineDirectionsCar
                        size={20}
                        className="text-blue-400"
                      />
                    ),
                    label: "Total Trips",
                    value: "—",
                    sub: "No data yet",
                    color: "from-blue-600/20 to-blue-600/5 border-blue-500/20",
                    valueColor: "text-blue-400",
                  },
                  {
                    icon: <FiStar size={18} className="text-amber-400" />,
                    label: "Avg Rating Given",
                    value: "—",
                    sub: "No data yet",
                    color:
                      "from-amber-500/10 to-amber-500/5 border-amber-500/20",
                    valueColor: "text-amber-400",
                  },
                  {
                    icon: <FiMapPin size={18} className="text-violet-400" />,
                    label: "Cities Visited",
                    value: "—",
                    sub: "No data yet",
                    color: "from-white/5 to-white/[0.02] border-white/5",
                    valueColor: "text-white",
                  },
                  {
                    icon: (
                      <FiTrendingUp size={18} className="text-emerald-400" />
                    ),
                    label: "Total Spent",
                    value: "—",
                    sub: "No data yet",
                    color: "from-white/5 to-white/[0.02] border-white/5",
                    valueColor: "text-white",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className={`rounded-2xl border bg-gradient-to-br ${s.color} p-5`}
                  >
                    <div className="mb-3">{s.icon}</div>
                    <div
                      className={`font-black text-[28px] leading-none mb-1 ${s.valueColor}`}
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {s.value}
                    </div>
                    <div className="text-[13px] font-medium text-slate-300 mb-0.5">
                      {s.label}
                    </div>
                    <div className="text-[12px] text-slate-600">{s.sub}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <SectionCard
                  title="Trip Activity"
                  icon={<FiTrendingUp size={15} />}
                >
                  <div className="text-[12px] text-slate-600 mb-5">
                    Placeholder data
                  </div>
                  <div className="flex items-end gap-3 h-20">
                    {ACTIVITY.map((a) => (
                      <ActivityBar key={a.month} {...a} max={maxTrips} />
                    ))}
                  </div>
                </SectionCard>
                <SectionCard
                  title="Favourite Routes"
                  icon={<TbRoute size={16} />}
                >
                  <div className="flex flex-col items-center justify-center py-6 text-slate-600">
                    <TbRoute size={28} className="mb-2 opacity-30" />
                    <p className="text-[13px]">No routes yet</p>
                  </div>
                </SectionCard>
              </div>
            </div>
          )}

          {/* ══ Security ══════════════════════════════════════════ */}
          {activeTab === "security" && (
            <div className="sec-enter space-y-4">
              <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-blue-600/5 p-5">
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse inline-block" />
                  <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">
                    Account Status
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600/15 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <FiShield size={22} className="text-blue-400" />
                  </div>
                  <div>
                    <div
                      className="text-[16px] font-bold text-white"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {isVerified ? "Account Verified" : "Account Not Verified"}
                    </div>
                    <div className="text-[12px] text-slate-500">
                      {isVerified
                        ? `Phone and email confirmed · Member since ${memberSince}`
                        : "Please verify your phone number and email"}
                    </div>
                  </div>
                  {isVerified ? (
                    <FiCheckCircle
                      size={20}
                      className="text-blue-400 ml-auto flex-shrink-0"
                    />
                  ) : (
                    <FiAlertCircle
                      size={20}
                      className="text-amber-400 ml-auto flex-shrink-0"
                    />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <SectionCard
                  title="Security Settings"
                  icon={<FiLock size={15} />}
                >
                  {[
                    {
                      icon: <FiPhone size={14} />,
                      label: "Change Phone Number",
                      sub: riderUser?.phone
                        ? `Current: ${riderUser.phone}`
                        : "Not set",
                    },
                    {
                      icon: <FiMail size={14} />,
                      label: "Change Email Address",
                      sub: riderUser?.email ?? "Not set",
                    },
                    {
                      icon: <FiLock size={14} />,
                      label: "Change PIN / Password",
                      sub: "Update your account password",
                    },
                    {
                      icon: <FiBell size={14} />,
                      label: "Login Notifications",
                      sub: "Alert me when a new device logs in",
                    },
                  ].map((item, i, arr) => (
                    <ActionRow
                      key={item.label}
                      {...item}
                      last={i === arr.length - 1}
                    />
                  ))}
                </SectionCard>

                <div className="rounded-2xl border border-red-500/15 bg-red-500/[0.03] p-5">
                  <div
                    className="text-[13px] font-semibold text-red-400 mb-4 flex items-center gap-2"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    <FiAlertCircle size={15} /> Danger Zone
                  </div>
                  {[
                    {
                      icon: <FiDownload size={14} />,
                      label: "Download My Data",
                      sub: "Export all your account data",
                      color: "text-slate-300",
                    },
                    {
                      icon: <FiAlertCircle size={14} />,
                      label: "Deactivate Account",
                      sub: "Temporarily disable your account",
                      color: "text-amber-400",
                    },
                    {
                      icon: <FiX size={14} />,
                      label: "Delete Account",
                      sub: "Permanently delete your account and data",
                      color: "text-red-400",
                    },
                  ].map((item, i, arr) => (
                    <ActionRow
                      key={item.label}
                      {...item}
                      last={i === arr.length - 1}
                    />
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
