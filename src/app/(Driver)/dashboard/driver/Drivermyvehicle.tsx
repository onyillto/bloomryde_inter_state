"use client";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ServiceStatus = "good" | "due" | "overdue";

type ServiceItem = {
  id: number;
  label: string;
  icon: string;
  lastDone: string;
  nextDue: string;
  status: ServiceStatus;
  mileage: string;
};

type InspectionItem = {
  label: string;
  passed: boolean;
  note?: string;
};

type GalleryImage = {
  id: number;
  label: string;
  placeholder: string; // gradient CSS
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const SERVICE_ITEMS: ServiceItem[] = [
  {
    id: 1,
    label: "Engine Oil Change",
    icon: "🛢",
    lastDone: "Jan 2026",
    nextDue: "Apr 2026",
    status: "good",
    mileage: "48,000 km",
  },
  {
    id: 2,
    label: "Tyre Rotation",
    icon: "🔄",
    lastDone: "Nov 2025",
    nextDue: "Mar 2026",
    status: "due",
    mileage: "46,500 km",
  },
  {
    id: 3,
    label: "Brake Inspection",
    icon: "🛑",
    lastDone: "Oct 2025",
    nextDue: "Apr 2026",
    status: "good",
    mileage: "45,000 km",
  },
  {
    id: 4,
    label: "Air Filter",
    icon: "💨",
    lastDone: "Sep 2025",
    nextDue: "Mar 2026",
    status: "overdue",
    mileage: "44,000 km",
  },
  {
    id: 5,
    label: "Coolant Flush",
    icon: "💧",
    lastDone: "Jul 2025",
    nextDue: "Jul 2026",
    status: "good",
    mileage: "41,000 km",
  },
  {
    id: 6,
    label: "Transmission Service",
    icon: "⚙️",
    lastDone: "Jun 2025",
    nextDue: "Jun 2027",
    status: "good",
    mileage: "40,000 km",
  },
];

const INSPECTION_ITEMS: InspectionItem[] = [
  { label: "Headlights & Tail Lights", passed: true },
  { label: "Windscreen Wipers", passed: true },
  { label: "Horn", passed: true },
  { label: "Seat Belts (all seats)", passed: true },
  { label: "Spare Tyre", passed: true },
  { label: "Fire Extinguisher", passed: false, note: "Needs replacement" },
  { label: "First Aid Kit", passed: true },
  { label: "Side Mirrors", passed: true },
  { label: "Dashboard Warning Lights", passed: true },
  { label: "AC / Climate Control", passed: false, note: "Cooling weak" },
];

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 1,
    label: "Front View",
    placeholder: "linear-gradient(135deg,#1e3a5f 0%,#2d5986 100%)",
  },
  {
    id: 2,
    label: "Rear View",
    placeholder: "linear-gradient(135deg,#1a3a4a 0%,#2a5f7a 100%)",
  },
  {
    id: 3,
    label: "Side Profile",
    placeholder: "linear-gradient(135deg,#1e3050 0%,#2d4a80 100%)",
  },
  {
    id: 4,
    label: "Interior",
    placeholder: "linear-gradient(135deg,#2a2040 0%,#3a3060 100%)",
  },
  {
    id: 5,
    label: "Dashboard",
    placeholder: "linear-gradient(135deg,#1a2a3a 0%,#2a4060 100%)",
  },
  {
    id: 6,
    label: "Cargo Space",
    placeholder: "linear-gradient(135deg,#1e2a20 0%,#2d4030 100%)",
  },
];

const STATUS_MAP: Record<
  ServiceStatus,
  { label: string; cls: string; dot: string; bg: string }
> = {
  good: {
    label: "Good",
    cls: "text-emerald-600 border-emerald-200 bg-emerald-50",
    dot: "bg-emerald-500",
    bg: "bg-emerald-50",
  },
  due: {
    label: "Due",
    cls: "text-amber-600  border-amber-200  bg-amber-50",
    dot: "bg-amber-400",
    bg: "bg-amber-50",
  },
  overdue: {
    label: "Overdue",
    cls: "text-red-500    border-red-200    bg-red-50",
    dot: "bg-red-400",
    bg: "bg-red-50",
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionCard({
  title,
  icon,
  right,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div
          className="text-[14px] font-bold text-slate-800 flex items-center gap-2"
          style={{ fontFamily: "'Syne',sans-serif" }}
        >
          {icon}
          {title}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

function EditField({
  label,
  value,
  editing,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  editing: boolean;
  onChange?: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 block">
        {label}
      </label>
      {editing ? (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[14px] text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
        />
      ) : (
        <div className="bg-slate-50 border border-slate-100 rounded-xl px-3.5 py-2.5 text-[14px] font-medium text-slate-700 min-h-[42px] flex items-center">
          {value || "—"}
        </div>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function DriverMyVehicle() {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "overview" | "service" | "inspection" | "gallery"
  >("overview");

  const [vehicle, setVehicle] = useState({
    make: "Toyota",
    model: "Hiace",
    year: "2019",
    color: "Black",
    plate: "LSD-432-AE",
    vin: "JTFST22P900107493",
    seats: "8",
    fuel: "Petrol",
    mileage: "48,500",
    engine: "2.7L 4-Cylinder",
    transmission: "Manual",
    lastService: "January 2026",
  });

  const set = (k: keyof typeof vehicle) => (v: string) =>
    setVehicle((f) => ({ ...f, [k]: v }));

  function handleSave() {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  }

  const passedCount = INSPECTION_ITEMS.filter((i) => i.passed).length;
  const failedCount = INSPECTION_ITEMS.filter((i) => !i.passed).length;
  const overdueCount = SERVICE_ITEMS.filter(
    (i) => i.status === "overdue"
  ).length;
  const dueCount = SERVICE_ITEMS.filter((i) => i.status === "due").length;

  const TABS = [
    { key: "overview" as const, label: "Overview" },
    { key: "service" as const, label: "Service" },
    { key: "inspection" as const, label: "Inspection" },
    { key: "gallery" as const, label: "Gallery" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
        .veh-root * { box-sizing: border-box; }
        .veh-root { font-family: 'DM Sans', sans-serif; background: #f8fafc; color: #1e293b; min-height: 100vh; }
        .veh-root ::-webkit-scrollbar { width: 4px; }
        .veh-root ::-webkit-scrollbar-track { background: transparent; }
        .veh-root ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .tab-enter { animation: tabIn 0.2s ease-out both; }
        @keyframes tabIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <div className="veh-root">
        <div className="max-w-screen-xl mx-auto px-6 py-8">
          {/* ── Header ──────────────────────────────────────── */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1
                className="text-[26px] font-bold text-slate-900 tracking-tight flex items-center gap-2.5"
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="7"
                    cy="17"
                    r="2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx="17"
                    cy="17"
                    r="2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
                My Vehicle
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Manage your vehicle details, service records and photos
              </p>
            </div>

            <div className="flex items-center gap-2">
              {editing ? (
                <>
                  <button
                    onClick={() => setEditing(false)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-medium border border-slate-200 bg-white text-slate-500 hover:border-slate-300 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <path
                        d="M18 6L6 18M6 6l12 12"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                    Discard
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[13px] px-4 py-2 rounded-xl shadow-md shadow-blue-200 hover:-translate-y-0.5 transition-all"
                    style={{ fontFamily: "'Syne',sans-serif" }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <path
                        d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2zM17 21v-8H7v8M7 3v5h8"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 font-medium text-[13px] px-4 py-2 rounded-xl transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                  Edit Vehicle
                </button>
              )}
            </div>
          </div>

          {/* ── Saved toast ──────────────────────────────────── */}
          {saved && (
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-6 tab-enter">
              <svg
                className="w-4 h-4 text-blue-500 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-[13px] text-blue-600 font-medium">
                Vehicle details updated successfully
              </span>
            </div>
          )}

          {/* ── Hero card ────────────────────────────────────── */}
          <div className="relative rounded-2xl border border-slate-200 bg-white p-6 mb-6 overflow-hidden shadow-sm">
            {/* bg decoration */}
            <div
              className="absolute top-0 right-0 w-64 h-64 opacity-[0.03] pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at top right, #2563eb, transparent 70%)",
              }}
            />

            <div className="flex items-start gap-6 relative">
              {/* Vehicle icon */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-200">
                <svg
                  className="w-10 h-10 text-white/80"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="7"
                    cy="17"
                    r="2"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <circle
                    cx="17"
                    cy="17"
                    r="2"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h2
                    className="text-[22px] font-black text-slate-900 tracking-tight"
                    style={{ fontFamily: "'Syne',sans-serif" }}
                  >
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </h2>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-600 text-white">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24">
                      <path
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Verified
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-4">
                  {[
                    { icon: "🎨", val: vehicle.color },
                    { icon: "🔢", val: vehicle.plate },
                    { icon: "💺", val: `${vehicle.seats} seats` },
                    { icon: "⛽", val: vehicle.fuel },
                    { icon: "🛣", val: `${vehicle.mileage} km` },
                  ].map(({ icon, val }) => (
                    <span
                      key={val}
                      className="flex items-center gap-1.5 text-[13px] text-slate-500"
                    >
                      <span>{icon}</span>
                      {val}
                    </span>
                  ))}
                </div>

                {/* Alert chips */}
                <div className="flex flex-wrap gap-2">
                  {overdueCount > 0 && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-50 text-red-500 border border-red-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse inline-block" />
                      {overdueCount} service{overdueCount > 1 ? "s" : ""}{" "}
                      overdue
                    </span>
                  )}
                  {dueCount > 0 && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-500 border border-amber-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                      {dueCount} service{dueCount > 1 ? "s" : ""} due soon
                    </span>
                  )}
                  {failedCount > 0 && (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-orange-50 text-orange-500 border border-orange-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 inline-block" />
                      {failedCount} inspection item{failedCount > 1 ? "s" : ""}{" "}
                      failed
                    </span>
                  )}
                  {overdueCount === 0 &&
                    dueCount === 0 &&
                    failedCount === 0 && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                          />
                        </svg>
                        All clear
                      </span>
                    )}
                </div>
              </div>

              {/* Mileage ring */}
              <div className="flex-shrink-0 text-right">
                <div className="text-[11px] text-slate-400 mb-1">
                  Current Mileage
                </div>
                <div
                  className="font-black text-[26px] text-slate-800 leading-none"
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  {vehicle.mileage}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  kilometres
                </div>
              </div>
            </div>
          </div>

          {/* ── Tabs ─────────────────────────────────────────── */}
          <div className="flex items-center gap-2 mb-6">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all
                  ${
                    activeTab === t.key
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "bg-white text-slate-500 border border-slate-200 hover:border-blue-300 hover:text-blue-600"
                  }`}
              >
                {t.label}
                {t.key === "service" && overdueCount + dueCount > 0 && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center
                    ${
                      activeTab === t.key
                        ? "bg-white/25 text-white"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {overdueCount + dueCount}
                  </span>
                )}
                {t.key === "inspection" && failedCount > 0 && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center
                    ${
                      activeTab === t.key
                        ? "bg-white/25 text-white"
                        : "bg-orange-100 text-orange-500"
                    }`}
                  >
                    {failedCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* ══ OVERVIEW TAB ═════════════════════════════════ */}
          {activeTab === "overview" && (
            <div className="tab-enter space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Vehicle details */}
                <SectionCard
                  title="Vehicle Details"
                  icon={
                    <svg
                      className="w-4 h-4 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="7"
                        cy="17"
                        r="2"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <circle
                        cx="17"
                        cy="17"
                        r="2"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                  }
                >
                  <div className="grid grid-cols-2 gap-3">
                    <EditField
                      label="Make"
                      value={vehicle.make}
                      editing={editing}
                      onChange={set("make")}
                    />
                    <EditField
                      label="Model"
                      value={vehicle.model}
                      editing={editing}
                      onChange={set("model")}
                    />
                    <EditField
                      label="Year"
                      value={vehicle.year}
                      editing={editing}
                      onChange={set("year")}
                    />
                    <EditField
                      label="Colour"
                      value={vehicle.color}
                      editing={editing}
                      onChange={set("color")}
                    />
                    <EditField
                      label="Plate Number"
                      value={vehicle.plate}
                      editing={editing}
                      onChange={set("plate")}
                    />
                    <EditField
                      label="VIN"
                      value={vehicle.vin}
                      editing={editing}
                      onChange={set("vin")}
                    />
                  </div>
                </SectionCard>

                {/* Technical specs */}
                <SectionCard
                  title="Technical Specs"
                  icon={
                    <svg
                      className="w-4 h-4 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                  }
                >
                  <div className="grid grid-cols-2 gap-3">
                    <EditField
                      label="Seats"
                      value={vehicle.seats}
                      editing={editing}
                      onChange={set("seats")}
                    />
                    <EditField
                      label="Fuel Type"
                      value={vehicle.fuel}
                      editing={editing}
                      onChange={set("fuel")}
                    />
                    <EditField
                      label="Engine"
                      value={vehicle.engine}
                      editing={editing}
                      onChange={set("engine")}
                    />
                    <EditField
                      label="Transmission"
                      value={vehicle.transmission}
                      editing={editing}
                      onChange={set("transmission")}
                    />
                    <EditField
                      label="Mileage (km)"
                      value={vehicle.mileage}
                      editing={editing}
                      onChange={set("mileage")}
                    />
                    <EditField
                      label="Last Service"
                      value={vehicle.lastService}
                      editing={editing}
                      onChange={set("lastService")}
                    />
                  </div>
                </SectionCard>
              </div>

              {/* Quick health summary */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    label: "Service Health",
                    value: `${
                      SERVICE_ITEMS.filter((s) => s.status === "good").length
                    }/${SERVICE_ITEMS.length} OK`,
                    sub:
                      overdueCount > 0
                        ? `${overdueCount} overdue`
                        : "All on track",
                    color:
                      overdueCount > 0
                        ? "from-red-50 to-white border-red-100"
                        : "from-emerald-50 to-white border-emerald-100",
                    vcolor:
                      overdueCount > 0 ? "text-red-500" : "text-emerald-600",
                  },
                  {
                    label: "Inspection Score",
                    value: `${passedCount}/${INSPECTION_ITEMS.length}`,
                    sub:
                      failedCount > 0
                        ? `${failedCount} items failed`
                        : "Passed all checks",
                    color:
                      failedCount > 0
                        ? "from-orange-50 to-white border-orange-100"
                        : "from-emerald-50 to-white border-emerald-100",
                    vcolor:
                      failedCount > 0 ? "text-orange-500" : "text-emerald-600",
                  },
                  {
                    label: "Road Worthiness",
                    value: "Apr 2026",
                    sub: "Expires in 2 months",
                    color: "from-amber-50 to-white border-amber-100",
                    vcolor: "text-amber-600",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className={`rounded-2xl border bg-gradient-to-br ${s.color} px-4 py-4`}
                  >
                    <div className="text-[12px] text-slate-400 mb-2">
                      {s.label}
                    </div>
                    <div
                      className={`font-black text-[24px] leading-none mb-0.5 ${s.vcolor}`}
                      style={{ fontFamily: "'Syne',sans-serif" }}
                    >
                      {s.value}
                    </div>
                    <div className="text-[11px] text-slate-400">{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ SERVICE TAB ══════════════════════════════════ */}
          {activeTab === "service" && (
            <div className="tab-enter">
              <SectionCard
                title="Service Records"
                icon={
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                }
                right={
                  <button className="flex items-center gap-1.5 text-[12px] font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl hover:bg-blue-100 transition-all">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Log Service
                  </button>
                }
              >
                <div className="flex flex-col gap-3">
                  {SERVICE_ITEMS.map((item) => {
                    const s = STATUS_MAP[item.status];
                    return (
                      <div
                        key={item.id}
                        className={`flex items-center gap-4 rounded-xl border p-4 transition-all ${
                          item.status !== "good"
                            ? s.bg +
                              " border-" +
                              (item.status === "overdue" ? "red" : "amber") +
                              "-200"
                            : "bg-slate-50 border-slate-100"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-[18px] flex-shrink-0 ${
                            item.status !== "good"
                              ? "bg-white shadow-sm"
                              : "bg-white border border-slate-200"
                          }`}
                        >
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-[14px] text-slate-800 mb-0.5">
                            {item.label}
                          </div>
                          <div className="flex items-center gap-3 text-[12px] text-slate-400">
                            <span>Last: {item.lastDone}</span>
                            <span>·</span>
                            <span>Next: {item.nextDue}</span>
                            <span>·</span>
                            <span>{item.mileage}</span>
                          </div>
                        </div>
                        <span
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1.5 flex-shrink-0 ${s.cls}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full inline-block ${
                              s.dot
                            } ${
                              item.status === "overdue" ? "animate-pulse" : ""
                            }`}
                          />
                          {s.label}
                        </span>
                        <button className="flex-shrink-0 text-[12px] font-medium text-slate-400 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:border-blue-300 hover:text-blue-600 transition-all">
                          Update
                        </button>
                      </div>
                    );
                  })}
                </div>
              </SectionCard>
            </div>
          )}

          {/* ══ INSPECTION TAB ═══════════════════════════════ */}
          {activeTab === "inspection" && (
            <div className="tab-enter">
              <SectionCard
                title="Vehicle Inspection Checklist"
                icon={
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                }
                right={
                  <div className="flex items-center gap-3">
                    <span className="text-[12px] text-slate-400">
                      <span className="font-bold text-emerald-600">
                        {passedCount}
                      </span>{" "}
                      passed ·{" "}
                      <span className="font-bold text-red-500">
                        {failedCount}
                      </span>{" "}
                      failed
                    </span>
                    <button className="flex items-center gap-1.5 text-[12px] font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl hover:bg-blue-100 transition-all">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                      Re-inspect
                    </button>
                  </div>
                }
              >
                {/* Progress bar */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] text-slate-500">Overall</span>
                    <span className="text-[12px] font-bold text-slate-700">
                      {Math.round(
                        (passedCount / INSPECTION_ITEMS.length) * 100
                      )}
                      %
                    </span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-700"
                      style={{
                        width: `${
                          (passedCount / INSPECTION_ITEMS.length) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {INSPECTION_ITEMS.map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 border ${
                        item.passed
                          ? "bg-slate-50 border-slate-100"
                          : "bg-red-50 border-red-200"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          item.passed ? "bg-emerald-100" : "bg-red-100"
                        }`}
                      >
                        {item.passed ? (
                          <svg
                            className="w-3.5 h-3.5 text-emerald-600"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M20 6L9 17l-5-5"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-3.5 h-3.5 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M18 6L6 18M6 6l12 12"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className={`text-[13px] font-medium ${
                            item.passed ? "text-slate-700" : "text-red-600"
                          }`}
                        >
                          {item.label}
                        </div>
                        {item.note && (
                          <div className="text-[11px] text-red-400 mt-0.5">
                            {item.note}
                          </div>
                        )}
                      </div>
                      {!item.passed && (
                        <button className="flex-shrink-0 text-[11px] font-semibold text-red-500 bg-white border border-red-200 px-2.5 py-1 rounded-lg hover:bg-red-50 transition-all">
                          Fix
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          )}

          {/* ══ GALLERY TAB ══════════════════════════════════ */}
          {activeTab === "gallery" && (
            <div className="tab-enter">
              <SectionCard
                title="Vehicle Photos"
                icon={
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <circle
                      cx="8.5"
                      cy="8.5"
                      r="1.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M21 15l-5-5L5 21"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                }
                right={
                  <button className="flex items-center gap-1.5 text-[12px] font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl hover:bg-blue-100 transition-all">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Upload Photo
                  </button>
                }
              >
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {GALLERY_IMAGES.map((img) => (
                    <div
                      key={img.id}
                      className="group relative rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] cursor-pointer hover:border-blue-300 transition-all hover:shadow-md"
                    >
                      {/* Placeholder gradient standing in for real photo */}
                      <div
                        className="absolute inset-0"
                        style={{ background: img.placeholder }}
                      />
                      {/* Car silhouette */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <svg
                          className="w-16 h-16 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2"
                            stroke="currentColor"
                            strokeWidth="1"
                          />
                          <circle
                            cx="7"
                            cy="17"
                            r="2"
                            stroke="currentColor"
                            strokeWidth="1"
                          />
                          <circle
                            cx="17"
                            cy="17"
                            r="2"
                            stroke="currentColor"
                            strokeWidth="1"
                          />
                        </svg>
                      </div>
                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-md hover:bg-blue-50 transition-colors">
                          <svg
                            className="w-4 h-4 text-slate-700"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                        <button className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-md hover:bg-red-50 transition-colors">
                          <svg
                            className="w-4 h-4 text-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                      {/* Label */}
                      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/60 to-transparent">
                        <span className="text-[11px] font-semibold text-white">
                          {img.label}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Upload placeholder */}
                  <div className="rounded-2xl border-2 border-dashed border-slate-200 aspect-[4/3] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                      <svg
                        className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <span className="text-[12px] font-medium text-slate-400 group-hover:text-blue-500 transition-colors">
                      Add Photo
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 text-[12px] text-slate-400 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M12 8v4M12 16h.01"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                  Clear, recent photos help passengers recognise your vehicle.
                  Include front, rear and interior shots.
                </div>
              </SectionCard>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
