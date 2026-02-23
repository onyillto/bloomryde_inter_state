"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Trip = {
  id: number;
  from: string;
  to: string;
  date: string;
  departure: string;
  totalSeats: number;
  booked: number;
  price: number;
  vehicle: string;
  vehicleColor: string;
  status: "published" | "draft";
  passengers: { initials: string; color: string }[];
};

type Doc = {
  icon: string;
  name: string;
  expiry: string;
  status: "valid" | "warn" | "expired";
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const TRIPS: Trip[] = [
  {
    id: 1,
    from: "Lagos",
    to: "Abuja",
    date: "28 Feb 2026",
    departure: "6:00 AM",
    totalSeats: 8,
    booked: 5,
    price: 5000,
    vehicle: "Toyota Hiace",
    vehicleColor: "BLACK",
    status: "published",
    passengers: [
      { initials: "AK", color: "bg-blue-500" },
      { initials: "TB", color: "bg-violet-500" },
      { initials: "NW", color: "bg-rose-500" },
      { initials: "JI", color: "bg-amber-500" },
      { initials: "OA", color: "bg-teal-500" },
    ],
  },
  {
    id: 2,
    from: "Abuja",
    to: "Enugu",
    date: "5 Mar 2026",
    departure: "7:00 AM",
    totalSeats: 8,
    booked: 2,
    price: 3500,
    vehicle: "Toyota Hiace",
    vehicleColor: "BLACK",
    status: "published",
    passengers: [
      { initials: "JA", color: "bg-blue-500" },
      { initials: "KI", color: "bg-emerald-500" },
    ],
  },
  {
    id: 3,
    from: "Lagos",
    to: "Port Harcourt",
    date: "10 Mar 2026",
    departure: "5:30 AM",
    totalSeats: 8,
    booked: 0,
    price: 6000,
    vehicle: "Toyota Hiace",
    vehicleColor: "BLACK",
    status: "draft",
    passengers: [],
  },
];

const DOCS: Doc[] = [
  { icon: "🪪", name: "Driver's License", expiry: "Jun 2028", status: "valid" },
  {
    icon: "🛡️",
    name: "Insurance Certificate",
    expiry: "Dec 2026",
    status: "valid",
  },
  { icon: "🔧", name: "Road Worthiness", expiry: "Apr 2026", status: "warn" },
  {
    icon: "📋",
    name: "Vehicle Registration",
    expiry: "Jan 2027",
    status: "valid",
  },
];

// ─── Nav SVGs ─────────────────────────────────────────────────────────────────
function IconGrid() {
  return (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24">
      <rect
        x="3"
        y="3"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect
        x="14"
        y="3"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect
        x="3"
        y="14"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect
        x="14"
        y="14"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}
function IconPlus() {
  return (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24">
      <path
        d="M12 5v14M5 12h14"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconList() {
  return (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24">
      <path
        d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24">
      <path
        d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconBar() {
  return (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24">
      <path
        d="M18 20V10M12 20V4M6 20v-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconCar() {
  return (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24">
      <path
        d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="16" cy="17" r="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="7" cy="17" r="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function IconDoc() {
  return (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24">
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <polyline
        points="14 2 14 8 20 8"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <line
        x1="16"
        y1="13"
        x2="8"
        y2="13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <line
        x1="16"
        y1="17"
        x2="8"
        y2="17"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconPerson() {
  return (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24">
      <path
        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconGear() {
  return (
    <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}
function IconLogout() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function IconBell() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
      <path
        d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
      <path
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={`w-3.5 h-3.5 ${filled ? "text-amber-400" : "text-slate-200"}`}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function SeatVisual({ total, booked }: { total: number; booked: number }) {
  return (
    <div className="flex gap-1.5 flex-wrap mt-3">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`w-6 h-6 rounded-[5px] flex items-center justify-center text-[10px] font-bold border
          ${
            i < booked
              ? "bg-red-50 text-red-500 border-red-200"
              : "bg-blue-50 text-blue-400 border-blue-200"
          }`}
        >
          {i < booked ? "×" : "○"}
        </div>
      ))}
    </div>
  );
}

function PerformanceRing({ rating }: { rating: number }) {
  const r = 34,
    circ = 2 * Math.PI * r;
  const dash = (rating / 5) * circ;
  return (
    <div className="relative w-20 h-20 flex-shrink-0">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="#dbeafe"
          strokeWidth="7"
        />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="#2563eb"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center font-black text-[17px] text-blue-600"
        style={{ fontFamily: "'Syne',sans-serif" }}
      >
        {rating}
      </div>
    </div>
  );
}

function TripCard({ trip }: { trip: Trip }) {
  const open = trip.totalSeats - trip.booked;
  const isDraft = trip.status === "draft";
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div
            className="flex items-center gap-2 text-[17px] font-black text-slate-800 tracking-tight"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            <span className="text-blue-600">{trip.from}</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300 inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
            </span>
            <span>{trip.to}</span>
          </div>
          <div className="text-[13px] text-slate-500 mt-0.5">
            {trip.date} · {trip.departure} departure
          </div>
        </div>
        <span
          className={`text-[11px] font-bold px-3 py-1.5 rounded-full ${
            isDraft
              ? "bg-slate-100 text-slate-500 border border-slate-200"
              : "bg-blue-600 text-white"
          }`}
        >
          {isDraft ? "Draft" : "Published"}
        </span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-slate-500">
        <span>
          💺 {trip.totalSeats} seats ·{" "}
          <span className="text-red-500 font-semibold">
            {trip.booked} booked
          </span>{" "}
          · <span className="text-blue-600 font-semibold">{open} open</span>
        </span>
        <span>💵 ₦{trip.price.toLocaleString()} per seat</span>
        <span>
          🚗 {trip.vehicle} · {trip.vehicleColor}
        </span>
      </div>
      <SeatVisual total={trip.totalSeats} booked={trip.booked} />
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5">
            {trip.passengers.slice(0, 4).map((p, i) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-full ${p.color} border-2 border-white flex items-center justify-center text-[10px] font-bold text-white`}
              >
                {p.initials}
              </div>
            ))}
            {trip.passengers.length > 4 && (
              <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-semibold text-slate-500">
                +{trip.passengers.length - 4}
              </div>
            )}
          </div>
          <span className="text-[13px] text-slate-500">
            {trip.booked > 0 ? (
              <>
                <span className="font-semibold text-slate-700">
                  {trip.booked}
                </span>{" "}
                passengers confirmed
              </>
            ) : (
              <span className="italic text-slate-400">No bookings yet</span>
            )}
          </span>
        </div>
        <div className="flex gap-2">
          <button className="px-3.5 py-1.5 rounded-xl text-[13px] font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all">
            Edit
          </button>
          {!isDraft ? (
            <button className="px-3.5 py-1.5 rounded-xl text-[13px] font-bold text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-600 hover:text-white transition-all">
              View Passengers
            </button>
          ) : (
            <button className="px-3.5 py-1.5 rounded-xl text-[13px] font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all">
              Publish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar nav item ─────────────────────────────────────────────────────────
function NavItem({
  icon,
  label,
  active,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  badge?: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all text-left group
        ${
          active
            ? "bg-blue-600 text-white shadow-md shadow-blue-100"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`}
    >
      <span
        className={`flex-shrink-0 transition-colors ${
          active ? "text-white" : "text-slate-400 group-hover:text-slate-600"
        }`}
      >
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      {badge && (
        <span
          className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
            active ? "bg-white/25 text-white" : "bg-blue-100 text-blue-600"
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function DriverDashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [activeTab, setActiveTab] = useState<"active" | "all">("active");

  const displayed =
    activeTab === "active"
      ? TRIPS.filter((t) => t.status === "published")
      : TRIPS;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        .dr * { box-sizing: border-box; }
        .dr { font-family: 'DM Sans', sans-serif; }
        .card-in { animation: cIn .3s ease-out both; }
        @keyframes cIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .stat-in { animation: sIn .4s ease-out both; }
        @keyframes sIn { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .sb::-webkit-scrollbar { width:3px; }
        .sb::-webkit-scrollbar-thumb { background:#dbeafe; border-radius:4px; }
      `}</style>

      <div className="dr flex h-screen bg-slate-50 overflow-hidden">
        {/* ── SIDEBAR ───────────────────────────────────────────── */}
        <aside className="sb w-[228px] flex-shrink-0 bg-white border-r border-slate-200 flex flex-col overflow-y-auto">
          {/* Logo */}
          <div className="px-5 pt-5 pb-4 border-b border-slate-100 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-[18px] shadow-md shadow-blue-200 flex-shrink-0">
                🚗
              </div>
              <div>
                <div
                  className="font-black text-[15px] text-slate-900 leading-tight"
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  BloomRydes
                </div>
                <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                  Driver Portal
                </div>
              </div>
            </div>
          </div>

          {/* Main nav */}
          <div className="px-3 pt-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
              Main
            </p>
            <div className="flex flex-col gap-0.5">
              <NavItem
                icon={<IconGrid />}
                label="Dashboard"
                active={activeNav === "dashboard"}
                onClick={() => setActiveNav("dashboard")}
              />
              <NavItem
                icon={<IconPlus />}
                label="Create Trip"
                active={activeNav === "create"}
                onClick={() => setActiveNav("create")}
              />
              <NavItem
                icon={<IconList />}
                label="My Trips"
                active={activeNav === "trips"}
                badge={3}
                onClick={() => setActiveNav("trips")}
              />
              <NavItem
                icon={<IconUsers />}
                label="Passengers"
                active={activeNav === "passengers"}
                onClick={() => setActiveNav("passengers")}
              />
              <NavItem
                icon={<IconBar />}
                label="Performance"
                active={activeNav === "performance"}
                onClick={() => setActiveNav("performance")}
              />
            </div>
          </div>

          {/* Account nav */}
          <div className="px-3 pt-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
              Account
            </p>
            <div className="flex flex-col gap-0.5">
              <NavItem
                icon={<IconCar />}
                label="My Vehicle"
                active={activeNav === "vehicle"}
                onClick={() => setActiveNav("vehicle")}
              />
              <NavItem
                icon={<IconDoc />}
                label="Documents"
                active={activeNav === "documents"}
                onClick={() => setActiveNav("documents")}
              />
              <NavItem
                icon={<IconPerson />}
                label="Profile"
                active={activeNav === "profile"}
                onClick={() => setActiveNav("profile")}
              />
              <NavItem
                icon={<IconGear />}
                label="Settings"
                active={activeNav === "settings"}
                onClick={() => setActiveNav("settings")}
              />
            </div>
          </div>

          {/* Verified card */}
          <div className="px-3 pt-4">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-4 shadow-lg shadow-blue-100">
              <div className="flex items-center gap-1.5 mb-1">
                <IconCheck />
                <span
                  className="text-[11px] font-black text-white uppercase tracking-wider"
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  Verified Driver
                </span>
              </div>
              <div className="text-[11px] text-blue-200">
                Badge active since Jan 2026
              </div>
            </div>
          </div>

          {/* User footer */}
          <div className="mt-auto px-4 py-4 border-t border-slate-100 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-[13px] flex-shrink-0 shadow-sm">
                EO
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-semibold text-slate-800 truncate">
                  Emeka Okonkwo
                </div>
                <div className="text-[11px] text-slate-400">Driver</div>
              </div>
              <button className="text-slate-400 hover:text-blue-600 transition-colors">
                <IconLogout />
              </button>
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT ──────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-[940px] mx-auto px-8 py-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1
                  className="text-[26px] font-black text-slate-900 leading-tight flex items-center gap-3"
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  Welcome back, Emeka
                  <span className="inline-flex items-center gap-1.5 text-[12px] font-bold px-2.5 py-1 rounded-full bg-blue-600 text-white">
                    <IconCheck /> Verified
                  </span>
                </h1>
                <p className="text-[14px] text-slate-500 mt-1">
                  You're a verified driver — passengers can find your trips.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:border-blue-300 hover:text-blue-600 transition-all relative">
                  <IconBell />
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 border-2 border-white" />
                </button>
                <button
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[14px] px-5 py-2.5 rounded-xl shadow-md shadow-blue-200 hover:-translate-y-0.5 transition-all"
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M12 5v14M5 12h14"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Create New Trip
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                {
                  label: "Total Trips",
                  value: "48",
                  meta: "+4 this month",
                  icon: "🛣️",
                  top: "bg-blue-500",
                },
                {
                  label: "Passengers Moved",
                  value: "312",
                  meta: "Across all trips",
                  icon: "👥",
                  top: "bg-violet-500",
                },
                {
                  label: "Rating",
                  value: "4.9",
                  meta: "From 46 ratings",
                  icon: "⭐",
                  top: "bg-amber-400",
                },
                {
                  label: "Active Trips",
                  value: "3",
                  meta: "Taking bookings",
                  icon: "📅",
                  top: "bg-blue-400",
                },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className="stat-in bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all relative overflow-hidden"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <div
                    className={`absolute top-0 left-0 right-0 h-[3px] ${s.top}`}
                  />
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-[13px] font-medium text-slate-500">
                      {s.label}
                    </span>
                    <span className="text-xl opacity-20">{s.icon}</span>
                  </div>
                  <div
                    className="text-[32px] font-black text-slate-900 leading-none mb-1"
                    style={{ fontFamily: "'Syne',sans-serif" }}
                  >
                    {s.value}
                  </div>
                  <div className="text-[12px] text-slate-400">{s.meta}</div>
                </div>
              ))}
            </div>

            {/* Body grid */}
            <div className="grid grid-cols-[1fr_295px] gap-6 items-start">
              {/* Trips list */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <h2
                      className="text-[17px] font-black text-slate-900"
                      style={{ fontFamily: "'Syne',sans-serif" }}
                    >
                      Active Trips
                    </h2>
                    <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
                      {(["active", "all"] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`px-3 py-1 rounded-lg text-[12px] font-semibold transition-all
                            ${
                              activeTab === tab
                                ? "bg-blue-600 text-white shadow-sm"
                                : "text-slate-500 hover:text-slate-700"
                            }`}
                        >
                          {tab === "active" ? "Published" : "All Trips"}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button className="text-[13px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
                    View all <IconArrow />
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {displayed.map((trip, i) => (
                    <div
                      key={trip.id}
                      className="card-in"
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <TripCard trip={trip} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-5">
                {/* Performance */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <div
                    className="text-[14px] font-bold text-slate-800 mb-4 flex items-center gap-2"
                    style={{ fontFamily: "'Syne',sans-serif" }}
                  >
                    📊 Performance
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <PerformanceRing rating={4.9} />
                    <div>
                      <div className="font-semibold text-[15px] text-slate-800">
                        Overall Rating
                      </div>
                      <div className="text-[12px] text-slate-400 mb-2">
                        Based on 46 reviews
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <StarIcon key={i} filled={i <= 4} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-slate-100 pt-3 flex flex-col gap-3">
                    {[
                      { label: "Punctuality", stars: 5 },
                      { label: "Vehicle Condition", stars: 4 },
                      { label: "Communication", stars: 5 },
                    ].map(({ label, stars }) => (
                      <div
                        key={label}
                        className="flex items-center justify-between"
                      >
                        <span className="text-[13px] text-slate-600">
                          {label}
                        </span>
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <svg
                              key={i}
                              className={`w-3 h-3 ${
                                i <= stars ? "text-amber-400" : "text-slate-200"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Documents */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <div
                    className="text-[14px] font-bold text-slate-800 mb-4 flex items-center gap-2"
                    style={{ fontFamily: "'Syne',sans-serif" }}
                  >
                    📄 Documents
                  </div>
                  <div className="flex flex-col divide-y divide-slate-100">
                    {DOCS.map((doc) => (
                      <div
                        key={doc.name}
                        className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center text-[15px] flex-shrink-0
                          ${
                            doc.status === "valid"
                              ? "bg-blue-50"
                              : doc.status === "warn"
                              ? "bg-amber-50"
                              : "bg-red-50"
                          }`}
                        >
                          {doc.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-semibold text-slate-700 truncate">
                            {doc.name}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            Expires: {doc.expiry}
                          </div>
                        </div>
                        <div
                          className={`text-[12px] font-bold flex-shrink-0
                          ${
                            doc.status === "valid"
                              ? "text-blue-600"
                              : doc.status === "warn"
                              ? "text-amber-500"
                              : "text-red-500"
                          }`}
                        >
                          {doc.status === "valid"
                            ? "✓ Valid"
                            : doc.status === "warn"
                            ? "⚠ Soon"
                            : "✗ Expired"}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-3 pt-3 border-t border-slate-100 text-[12px] font-semibold text-blue-600 hover:text-blue-700 text-center transition-colors">
                    Manage Documents →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
