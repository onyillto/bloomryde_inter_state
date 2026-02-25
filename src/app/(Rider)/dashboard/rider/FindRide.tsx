"use client";

import { useState } from "react";
import {
  FiMapPin,
  FiClock,
  FiUsers,
  FiPhone,
  FiBookmark,
  FiSearch,
  FiCalendar,
  FiStar,
  FiShield,
  FiChevronDown,
  FiAlertCircle,
  FiCheckCircle,
  FiArrowRight,
  FiMessageCircle,
  FiMail,
  FiShare2,
  FiTruck,
} from "react-icons/fi";
import { BsWhatsapp, BsPhoneFill } from "react-icons/bs";
import { PiSeatFill } from "react-icons/pi";
import { RiShieldCheckLine } from "react-icons/ri";
import { TbRoute } from "react-icons/tb";

// ─── Types ────────────────────────────────────────────────────────────────────

type Trip = {
  id: number;
  driverInitials: string;
  driverName: string;
  rating: number;
  totalTrips: number;
  from: string;
  to: string;
  departure: string;
  duration: string;
  vehicle: string;
  vehicleColor: string;
  plate: string;
  seats: number;
  seatsLeft: number;
  price: number;
  notes?: string;
  avatarBg: string;
};

type Filter = "all" | "rating" | "price" | "earliest" | "verified";

// ─── Color reference (matches DashboardContent exactly) ──────────────────────
// bg root:      #0f172a
// card bg:      bg-slate-900/60  border-white/5
// card solid:   bg-slate-900     border-slate-800
// inner row:    bg-white/5       border-white/5
// text primary: text-white
// text body:    text-slate-300 / text-slate-400
// text muted:   text-slate-500
// accent:       text-blue-400    bg-blue-600/20   border-blue-500/20
// accent hover: hover:bg-blue-600/30  hover:border-blue-500/30
// amber:        text-amber-400   bg-amber-500/20  border-amber-500/20
// emerald:      text-emerald-400 bg-emerald-500/20 border-emerald-500/20
// divider:      divide-white/5
// btn solid:    bg-blue-600  hover:bg-blue-500

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_TRIPS: Trip[] = [
  {
    id: 1,
    driverInitials: "EO",
    driverName: "Emeka Okonkwo",
    rating: 5,
    totalTrips: 48,
    from: "Lagos (Jibowu)",
    to: "Abuja (Utako Park)",
    departure: "6:00 AM",
    duration: "~8 hrs",
    vehicle: "Toyota Hiace",
    vehicleColor: "Black",
    plate: "LSD-432-AE",
    seats: 8,
    seatsLeft: 3,
    price: 5000,
    avatarBg: "from-blue-600/30 to-blue-900/60",
  },
  {
    id: 2,
    driverInitials: "CA",
    driverName: "Chidi Anyanwu",
    rating: 4,
    totalTrips: 31,
    from: "Lagos (Jibowu)",
    to: "Abuja (Utako Park)",
    departure: "7:30 AM",
    duration: "~8.5 hrs",
    vehicle: "Honda Accord",
    vehicleColor: "Silver",
    plate: "KTU-218-BQ",
    seats: 4,
    seatsLeft: 4,
    price: 4500,
    avatarBg: "from-indigo-600/30 to-indigo-900/60",
  },
  {
    id: 3,
    driverInitials: "BF",
    driverName: "Biodun Fashola",
    rating: 5,
    totalTrips: 67,
    from: "Lagos (Jibowu)",
    to: "Abuja (Utako Park)",
    departure: "5:00 AM",
    duration: "~8 hrs",
    vehicle: "Toyota Camry",
    vehicleColor: "White",
    plate: "APP-901-CX",
    seats: 4,
    seatsLeft: 1,
    price: 5500,
    notes: "AC · Non-smoking",
    avatarBg: "from-amber-600/30 to-amber-900/60",
  },
  {
    id: 4,
    driverInitials: "NO",
    driverName: "Ngozi Obi",
    rating: 4,
    totalTrips: 22,
    from: "Lagos (Jibowu)",
    to: "Abuja (Utako Park)",
    departure: "8:00 AM",
    duration: "~9 hrs",
    vehicle: "Toyota Sienna",
    vehicleColor: "Blue",
    plate: "MUS-553-DF",
    seats: 7,
    seatsLeft: 5,
    price: 4000,
    avatarBg: "from-emerald-600/30 to-emerald-900/60",
  },
];

const CITIES = [
  "Lagos (Jibowu)",
  "Lagos (Mile 2)",
  "Abuja (Utako Park)",
  "Abuja (Wuse Park)",
  "Port Harcourt (Waterlines)",
  "Enugu (Nike Lake Rd)",
  "Ibadan (Challenge)",
  "Kano (Yankaba)",
  "Benin City",
  "Warri",
];

// ─── StarRating ───────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <FiStar
          key={i}
          size={11}
          className={i < rating ? "text-amber-400" : "text-slate-700"}
          fill={i < rating ? "currentColor" : "none"}
        />
      ))}
    </div>
  );
}

// ─── SeatIndicator ────────────────────────────────────────────────────────────

function SeatIndicator({ total, left }: { total: number; left: number }) {
  const taken = total - left;
  return (
    <div className="flex gap-1 flex-wrap mt-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          title={i < taken ? "Taken" : "Available"}
          className={`w-6 h-6 rounded-md flex items-center justify-center transition-all
            ${
              i < taken
                ? "bg-red-500/15 text-red-400 border border-red-500/20"
                : "bg-blue-600/20 text-blue-400 border border-blue-500/20"
            }`}
        >
          {i < taken ? (
            <span className="text-[9px] font-bold leading-none">✕</span>
          ) : (
            <PiSeatFill size={11} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── SelectField ──────────────────────────────────────────────────────────────

function SelectField({
  label,
  value,
  onChange,
  children,
  icon,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none flex">
          {icon}
        </span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-800/80 border border-white/5 rounded-xl pl-9 pr-8 py-2.5 text-[13px] text-white focus:outline-none focus:border-blue-500/40 transition-colors appearance-none"
        >
          {children}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none flex">
          <FiChevronDown size={13} />
        </span>
      </div>
    </div>
  );
}

// ─── TripCard ─────────────────────────────────────────────────────────────────

function TripCard({
  trip,
  selected,
  onSelect,
  onContact,
}: {
  trip: Trip;
  selected: boolean;
  onSelect: () => void;
  onContact: () => void;
}) {
  const isAlmostFull = trip.seatsLeft === 1;
  const isFull = trip.seatsLeft === 0;

  return (
    <div
      onClick={onSelect}
      className={`
        relative rounded-2xl border p-5 cursor-pointer
        transition-all duration-200 ease-out
        ${
          selected
            ? "border-blue-500/40 bg-slate-900/60 shadow-lg shadow-blue-500/5"
            : "border-white/5 bg-slate-900/60 hover:border-white/10 hover:bg-slate-800/50"
        }
      `}
    >
      {/* Top accent when selected */}
      {selected && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-t-2xl" />
      )}

      <div className="flex items-start gap-4">
        {/* ── Avatar ───────────────────────────────── */}
        <div className="relative flex-shrink-0">
          <div
            className={`w-11 h-11 rounded-full bg-gradient-to-br ${
              trip.avatarBg
            }
              flex items-center justify-center font-bold text-sm text-blue-300
              border-2 ${
                selected ? "border-blue-500/40" : "border-white/10"
              } transition-colors`}
          >
            {trip.driverInitials}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border-2 border-[#0f172a]">
            <FiCheckCircle size={8} className="text-white" strokeWidth={3} />
          </div>
        </div>

        {/* ── Main Info ─────────────────────────────── */}
        <div className="flex-1 min-w-0">
          {/* Driver + stars */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-[14px] text-white tracking-tight truncate">
              {trip.driverName}
            </span>
            <StarRating rating={trip.rating} />
            <span className="text-[11px] text-slate-500 flex-shrink-0">
              ({trip.totalTrips})
            </span>
          </div>

          {/* Route */}
          <div className="flex items-center gap-1.5 text-[13px] mb-2.5">
            <FiMapPin size={12} className="text-slate-500 flex-shrink-0" />
            <span className="text-slate-300 font-medium truncate">
              {trip.from}
            </span>
            <FiArrowRight size={13} className="text-blue-400 flex-shrink-0" />
            <span className="text-blue-400 font-medium truncate">
              {trip.to}
            </span>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5 text-[12px] text-slate-400">
              <FiClock size={11} className="text-slate-500" />
              Dep. {trip.departure}
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-slate-400">
              <FiClock size={11} className="text-slate-500" />
              {trip.duration}
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-slate-400">
              <FiTruck size={11} className="text-slate-500" />
              {trip.vehicle} · {trip.vehicleColor}
            </span>
            {trip.notes && (
              <span className="flex items-center gap-1.5 text-[12px] text-blue-400/80">
                <FiCheckCircle size={11} className="text-blue-500" />
                {trip.notes}
              </span>
            )}
          </div>

          {/* Seat visualizer — shown when selected */}
          {selected && (
            <div className="mt-3">
              <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">
                Seat availability
              </span>
              <SeatIndicator total={trip.seats} left={trip.seatsLeft} />
            </div>
          )}
        </div>

        {/* ── Right col ─────────────────────────────── */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0 ml-1">
          {/* Price */}
          <div className="text-right">
            <div
              className="font-bold text-[22px] text-blue-400 leading-none"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              ₦{trip.price.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">per person</div>
          </div>

          {/* Seats badge */}
          <div
            className={`text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap
              ${
                isAlmostFull
                  ? "bg-red-500/15 text-red-400 border border-red-500/20"
                  : isFull
                  ? "bg-white/5 text-slate-500 border border-white/5"
                  : "bg-white/5 text-slate-400 border border-white/5"
              }`}
          >
            {isAlmostFull
              ? "⚡ 1 seat left"
              : isFull
              ? "Full"
              : `${trip.seatsLeft} seats left`}
          </div>

          {/* Contact button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onContact();
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-semibold transition-all duration-150
              ${
                selected
                  ? "bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-600/25 hover:-translate-y-0.5"
                  : "bg-blue-600/20 text-blue-400 border border-blue-500/20 hover:bg-blue-600/30 hover:border-blue-500/30"
              }`}
          >
            <FiPhone size={12} />
            Contact
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ContactPanel ─────────────────────────────────────────────────────────────

function ContactPanel({
  trip,
  passengers,
  date,
  onConfirm,
}: {
  trip: Trip;
  passengers: number;
  date: string;
  onConfirm: () => void;
}) {
  const [shared, setShared] = useState(false);
  const total = trip.price * passengers;
  const refNum = `BR-${Date.now().toString().slice(-6)}`;

  return (
    <div className="flex flex-col gap-4">
      {/* ── Driver contact revealed ──────────────── */}
      <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-blue-600/5 p-5">
        <div className="flex items-center gap-1.5 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse inline-block" />
          <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-widest">
            Driver Contact Revealed
          </span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-shrink-0">
            <div
              className={`w-11 h-11 rounded-full bg-gradient-to-br ${trip.avatarBg}
                flex items-center justify-center font-bold text-sm text-blue-300
                border-2 border-blue-500/30`}
            >
              {trip.driverInitials}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border-2 border-[#0f172a]">
              <FiCheckCircle size={8} className="text-white" strokeWidth={3} />
            </div>
          </div>
          <div>
            <div className="font-semibold text-[14px] text-white">
              {trip.driverName}
            </div>
            <div className="text-[12px] text-slate-500">
              {trip.vehicle} · {trip.plate}
            </div>
          </div>
        </div>

        <div
          className="font-bold text-[22px] tracking-wide text-white mb-2"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          +234 803 XXX XXXX
        </div>
        <div className="font-mono text-[11px] text-slate-500 bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg inline-block tracking-wider">
          REF: {refNum}
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <button className="flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold text-[13px] py-2.5 rounded-xl hover:bg-blue-500 transition-all hover:-translate-y-0.5 shadow-md shadow-blue-600/20">
            <BsPhoneFill size={13} />
            Call Driver
          </button>
          <button className="flex items-center justify-center gap-2 bg-white/5 text-slate-300 font-medium text-[13px] py-2.5 rounded-xl border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all">
            <FiBookmark size={13} />
            Save Contact
          </button>
        </div>
      </div>

      {/* ── Booking summary ──────────────────────── */}
      <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-4">
        <p
          className="text-[12px] font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <TbRoute size={14} className="text-blue-400" />
          Booking Summary
        </p>
        <div className="flex flex-col gap-2">
          {[
            [
              "Route",
              `${trip.from.split("(")[0].trim()} → ${trip.to
                .split("(")[0]
                .trim()}`,
            ],
            ["Date & Time", `${date}, ${trip.departure}`],
            ["Passengers", `${passengers} person${passengers > 1 ? "s" : ""}`],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between items-center text-[13px]"
            >
              <span className="text-slate-500">{label}</span>
              <span className="text-slate-300 font-medium">{value}</span>
            </div>
          ))}
          <div className="border-t border-white/5 mt-1 pt-2 flex justify-between items-center">
            <span className="text-[13px] text-slate-500">Total (cash)</span>
            <span
              className="font-bold text-[18px] text-blue-400"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              ₦{total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* ── Share trip ───────────────────────────── */}
      <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-4">
        <p
          className="text-[12px] font-semibold text-white uppercase tracking-wider mb-1 flex items-center gap-2"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <RiShieldCheckLine size={14} className="text-emerald-400" />
          Share Trip Details
        </p>
        <p className="text-[12px] text-slate-500 mb-3">
          Auto-shared to emergency contact · Chioma Adeyemi
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: <BsWhatsapp size={15} />, label: "WhatsApp" },
            { icon: <FiMessageCircle size={15} />, label: "SMS" },
            { icon: <FiMail size={15} />, label: "Email" },
          ].map(({ icon, label }) => (
            <button
              key={label}
              onClick={() => setShared(true)}
              className={`flex flex-col items-center gap-1.5 py-2.5 rounded-xl border text-[11px] font-medium transition-all
                ${
                  shared
                    ? "border-blue-500/30 bg-blue-600/10 text-blue-400"
                    : "border-white/5 bg-white/5 text-slate-400 hover:border-blue-500/30 hover:bg-blue-600/10 hover:text-blue-400"
                }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
        {shared && (
          <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-emerald-400">
            <FiCheckCircle size={11} />
            Trip details shared
          </div>
        )}
      </div>

      {/* ── Confirm button ───────────────────────── */}
      <button
        onClick={onConfirm}
        className="w-full bg-blue-600 text-white font-bold text-[14px] py-3.5 rounded-2xl hover:bg-blue-500 transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        <FiCheckCircle size={16} />
        Confirm Booking
      </button>
    </div>
  );
}

// ─── ConfirmedState ───────────────────────────────────────────────────────────

function ConfirmedState({
  trip,
  onReset,
}: {
  trip: Trip;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-5">
      <div className="w-16 h-16 rounded-full bg-blue-600/20 border border-blue-500/20 flex items-center justify-center mb-5 animate-bounce">
        <FiCheckCircle size={32} className="text-blue-400" />
      </div>
      <p
        className="font-bold text-[20px] text-white mb-1"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        Booking Confirmed!
      </p>
      <p className="text-slate-400 text-sm mb-1">
        Your trip with{" "}
        <span className="text-white font-semibold">{trip.driverName}</span> is
        locked in.
      </p>
      <p className="text-slate-500 text-sm mb-7">
        Visit <span className="text-blue-400">My Bookings</span> for full
        details.
      </p>
      <button
        onClick={onReset}
        className="px-5 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10 hover:border-white/10 transition-all"
      >
        Book Another Trip
      </button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FindRide() {
  const [from, setFrom] = useState("Lagos (Jibowu)");
  const [to, setTo] = useState("Abuja (Utako Park)");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [searched, setSearched] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [contactedTrip, setContactedTrip] = useState<Trip | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const filters: { key: Filter; icon: React.ReactNode; label: string }[] = [
    { key: "all", icon: <TbRoute size={12} />, label: "All Trips" },
    { key: "rating", icon: <FiStar size={12} />, label: "Top Rated" },
    {
      key: "price",
      icon: <span className="text-[10px] font-bold leading-none">₦</span>,
      label: "Lowest Fare",
    },
    { key: "earliest", icon: <FiClock size={12} />, label: "Earliest" },
    { key: "verified", icon: <FiShield size={12} />, label: "Verified" },
  ];

  const filteredTrips = [...MOCK_TRIPS].sort((a, b) => {
    if (activeFilter === "rating") return b.rating - a.rating;
    if (activeFilter === "price") return a.price - b.price;
    if (activeFilter === "earliest")
      return a.departure.localeCompare(b.departure);
    return 0;
  });

  const sameCities = from === to;

  function handleSearch() {
    if (sameCities) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSearched(true);
      setSelectedTrip(null);
      setContactedTrip(null);
      setConfirmed(false);
    }, 900);
  }

  function handleReset() {
    setSearched(false);
    setSelectedTrip(null);
    setContactedTrip(null);
    setConfirmed(false);
  }

  const formattedDate = date
    ? new Date(date + "T00:00:00").toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      })
    : "28 Feb";

  const showPanel = !!(contactedTrip || confirmed);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');

        .fr-root * { box-sizing: border-box; }
        .fr-root {
          font-family: 'DM Sans', sans-serif;
          background: #0f172a;
          color: #cbd5e1;
          min-height: 100vh;
        }
        .fr-root select option { background: #1e293b; }
        .fr-root ::-webkit-scrollbar { width: 4px; }
        .fr-root ::-webkit-scrollbar-track { background: transparent; }
        .fr-root ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }

        .card-enter { animation: cardIn 0.25s ease-out both; }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .panel-enter { animation: panelIn 0.3s ease-out both; }
        @keyframes panelIn {
          from { opacity: 0; transform: translateX(14px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .loading-btn {
          background: linear-gradient(90deg, #2563eb 0%, #60a5fa 50%, #2563eb 100%);
          background-size: 200% 100%;
          animation: shimmer 1.4s linear infinite;
        }
        @keyframes shimmer {
          from { background-position: 200% center; }
          to   { background-position: -200% center; }
        }
      `}</style>

      <div className="fr-root">
        <div className="max-w-[1100px] mx-auto px-6 py-8">
          {/* ── Page Header ──────────────────────────────────────── */}
          <div className="mb-7">
            <h1
              className="text-[26px] font-bold text-white leading-tight tracking-tight flex items-center gap-2.5"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <FiSearch className="text-blue-400" size={24} />
              Find a Ride
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Search verified drivers on your route and connect directly
            </p>
          </div>

          {/* ── Search Card ─────────────────────────────────────── */}
          <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-5 mb-6">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4 flex items-center gap-1.5">
              <FiMapPin size={12} className="text-blue-400" />
              Search Trips
            </p>

            {/* 4-col search row */}
            <div className="grid grid-cols-4 gap-3 mb-3">
              <SelectField
                label="From"
                value={from}
                onChange={setFrom}
                icon={<FiMapPin size={13} />}
              >
                {CITIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </SelectField>

              <SelectField
                label="To"
                value={to}
                onChange={setTo}
                icon={<FiMapPin size={13} />}
              >
                {CITIES.filter((c) => c !== from).map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </SelectField>

              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                  Departure Date
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none flex">
                    <FiCalendar size={13} />
                  </span>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-800/80 border border-white/5 rounded-xl pl-9 pr-3 py-2.5 text-[13px] text-white focus:outline-none focus:border-blue-500/40 transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>

              <SelectField
                label="Passengers"
                value={passengers}
                onChange={(v) => setPassengers(Number(v))}
                icon={<FiUsers size={13} />}
              >
                {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                  <option key={n} value={n}>
                    {n} passenger{n > 1 ? "s" : ""}
                  </option>
                ))}
              </SelectField>
            </div>

            {/* Same city warning */}
            {sameCities && (
              <div className="flex items-center gap-2 text-[12px] text-amber-400 mb-3 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2">
                <FiAlertCircle size={13} />
                Departure and destination cannot be the same
              </div>
            )}

            {/* Search button */}
            <button
              onClick={handleSearch}
              disabled={loading || sameCities}
              className={`w-full py-3 rounded-xl font-semibold text-white text-[14px] transition-all flex items-center justify-center gap-2
                ${
                  loading
                    ? "loading-btn cursor-not-allowed"
                    : sameCities
                    ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500 hover:-translate-y-0.5 shadow-lg shadow-blue-600/20"
                }`}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <FiSearch size={15} className={loading ? "animate-spin" : ""} />
              {loading ? "Searching..." : "Find Available Trips"}
            </button>
          </div>

          {/* ── Results ─────────────────────────────────────────── */}
          {searched && !loading && (
            <div className={`flex gap-5 items-start ${showPanel ? "" : ""}`}>
              {/* LEFT: Trip list */}
              <div className={`min-w-0 ${showPanel ? "flex-1" : "w-full"}`}>
                {/* Meta row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-[13px] text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse inline-block" />
                    <span>
                      <span className="text-white font-semibold">
                        {filteredTrips.length} trips
                      </span>{" "}
                      found · {from.split("(")[0].trim()} →{" "}
                      {to.split("(")[0].trim()}
                      {` · ${formattedDate} · ${passengers} pax`}
                    </span>
                  </div>
                  <button
                    onClick={handleReset}
                    className="text-[12px] text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors"
                  >
                    <FiSearch size={11} /> New Search
                  </button>
                </div>

                {/* Filter pills */}
                <div className="flex gap-2 flex-wrap mb-4">
                  {filters.map(({ key, icon, label }) => (
                    <button
                      key={key}
                      onClick={() => setActiveFilter(key)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-medium border transition-all
                        ${
                          activeFilter === key
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-transparent text-slate-500 border-white/5 hover:border-blue-500/30 hover:text-slate-300"
                        }`}
                    >
                      {icon}
                      {label}
                    </button>
                  ))}
                </div>

                {/* Trip cards */}
                <div className="flex flex-col gap-3">
                  {filteredTrips.map((trip, i) => (
                    <div
                      key={trip.id}
                      className="card-enter"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <TripCard
                        trip={trip}
                        selected={selectedTrip?.id === trip.id}
                        onSelect={() => {
                          setSelectedTrip(
                            selectedTrip?.id === trip.id ? null : trip
                          );
                          setContactedTrip(null);
                          setConfirmed(false);
                        }}
                        onContact={() => {
                          setSelectedTrip(trip);
                          setContactedTrip(trip);
                          setConfirmed(false);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT: Contact / Confirm panel */}
              {showPanel && (
                <div className="w-[320px] flex-shrink-0 sticky top-6 panel-enter">
                  <div className="rounded-2xl border border-white/5 bg-slate-900/60 overflow-hidden">
                    {confirmed && contactedTrip ? (
                      <ConfirmedState
                        trip={contactedTrip}
                        onReset={handleReset}
                      />
                    ) : contactedTrip ? (
                      <div className="p-5 overflow-y-auto max-h-[calc(100vh-120px)]">
                        <ContactPanel
                          trip={contactedTrip}
                          passengers={passengers}
                          date={formattedDate}
                          onConfirm={() => setConfirmed(true)}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Pre-search empty state ──────────────────────────── */}
          {!searched && !loading && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-14 h-14 rounded-xl border border-white/5 bg-slate-900/60 flex items-center justify-center mb-4 opacity-50">
                <FiMapPin size={26} className="text-slate-600" />
              </div>
              <p
                className="text-[15px] font-semibold text-slate-600 mb-1"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Enter your route above
              </p>
              <p className="text-[13px] text-slate-700 max-w-xs">
                Choose your departure, destination, and date to find available
                drivers
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
