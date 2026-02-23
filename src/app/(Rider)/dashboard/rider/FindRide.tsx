"use client";

import { useState } from "react";

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
    avatarBg: "from-blue-800 to-blue-950",
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
    avatarBg: "from-sky-800 to-sky-950",
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
    avatarBg: "from-amber-800 to-amber-950",
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
    avatarBg: "from-violet-800 to-violet-950",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${
            i < rating ? "text-amber-400" : "text-zinc-700"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function SeatIndicator({ total, left }: { total: number; left: number }) {
  const taken = total - left;
  return (
    <div className="flex gap-1 flex-wrap mt-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`w-5 h-5 rounded-[4px] flex items-center justify-center text-[9px] font-bold transition-all
            ${
              i < taken
                ? "bg-red-500/15 text-red-400 border border-red-500/20"
                : "bg-blue-500/12 text-blue-400 border border-blue-500/20"
            }`}
        >
          {i < taken ? "×" : "○"}
        </div>
      ))}
    </div>
  );
}

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
        group relative rounded-2xl border p-5 cursor-pointer
        transition-all duration-200 ease-out
        ${
          selected
            ? "border-blue-500/60 bg-blue-500/[0.04] shadow-lg shadow-blue-500/5"
            : "border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-800/60"
        }
      `}
    >
      {/* Selected indicator */}
      {selected && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-t-2xl" />
      )}

      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div
            className={`w-12 h-12 rounded-full bg-gradient-to-br ${
              trip.avatarBg
            }
              flex items-center justify-center font-bold text-sm text-blue-300
              border-2 ${
                selected ? "border-blue-500/40" : "border-zinc-700"
              } transition-colors`}
          >
            {trip.driverInitials}
          </div>
          {/* Verified badge */}
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border-2 border-zinc-900">
            <svg
              className="w-2 h-2 text-zinc-900"
              fill="none"
              viewBox="0 0 12 12"
            >
              <path
                d="M2 6l3 3 5-5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-semibold text-[15px] text-white tracking-tight">
              {trip.driverName}
            </span>
            <StarRating rating={trip.rating} />
            <span className="text-[11px] text-zinc-500">
              ({trip.totalTrips})
            </span>
          </div>

          {/* Route */}
          <div className="flex items-center gap-1.5 text-sm mb-3">
            <span className="text-zinc-300 font-medium truncate">
              {trip.from}
            </span>
            <svg
              className="w-3.5 h-3.5 text-blue-500 flex-shrink-0"
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
            <span className="text-blue-400 font-medium truncate">
              {trip.to}
            </span>
          </div>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            <div className="flex items-center gap-1.5 text-[12px] text-zinc-400">
              <svg
                className="w-3.5 h-3.5 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 6v6l4 2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              {trip.departure}
            </div>
            <div className="flex items-center gap-1.5 text-[12px] text-zinc-400">
              <svg
                className="w-3.5 h-3.5 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              {trip.duration}
            </div>
            <div className="flex items-center gap-1.5 text-[12px] text-zinc-400">
              <svg
                className="w-3.5 h-3.5 text-zinc-500"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle
                  cx="16"
                  cy="17"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle
                  cx="7"
                  cy="17"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              {trip.vehicle} · {trip.vehicleColor}
            </div>
            {trip.notes && (
              <div className="flex items-center gap-1.5 text-[12px] text-blue-500/70">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                {trip.notes}
              </div>
            )}
          </div>

          {/* Seat visualizer (shown when selected) */}
          {selected && (
            <div className="mt-3">
              <span className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">
                Seat availability
              </span>
              <SeatIndicator total={trip.seats} left={trip.seatsLeft} />
            </div>
          )}
        </div>

        {/* Right: Price + CTA */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0 ml-2">
          <div className="text-right">
            <div
              className="font-black text-2xl text-blue-400 leading-none"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              ₦{trip.price.toLocaleString()}
            </div>
            <div className="text-[11px] text-zinc-500 mt-0.5">per person</div>
          </div>

          {/* Seats left badge */}
          <div
            className={`text-[11px] font-semibold px-2.5 py-1 rounded-full
            ${
              isAlmostFull
                ? "bg-red-500/15 text-red-400 border border-red-500/20"
                : isFull
                ? "bg-zinc-700/50 text-zinc-500"
                : "bg-zinc-800 text-zinc-400 border border-zinc-700"
            }`}
          >
            {isAlmostFull
              ? "⚡ 1 seat left!"
              : isFull
              ? "Full"
              : `${trip.seatsLeft} seats left`}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onContact();
            }}
            className={`mt-1 px-4 py-2 rounded-xl text-[13px] font-bold transition-all duration-150
              ${
                selected
                  ? "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/25 hover:-translate-y-0.5"
                  : "bg-zinc-800 text-blue-400 border border-zinc-700 hover:border-blue-500/40 hover:bg-zinc-700 group-hover:border-blue-500/30"
              }`}
          >
            Contact Driver
          </button>
        </div>
      </div>
    </div>
  );
}

function ContactPanel({
  trip,
  passengers,
  date,
  onConfirm,
  onClose,
}: {
  trip: Trip;
  passengers: number;
  date: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const [shared, setShared] = useState(false);
  const total = trip.price * passengers;
  const refNum = `BR-${Date.now().toString().slice(-8)}`;

  return (
    <div className="flex flex-col gap-4">
      {/* Revealed contact */}
      <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/8 to-blue-500/3 p-5">
        <div className="flex items-center gap-1.5 mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest">
            Driver Contact Revealed
          </span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-12 h-12 rounded-full bg-gradient-to-br ${trip.avatarBg} flex items-center justify-center font-bold text-sm text-blue-300 border-2 border-blue-500/30 relative`}
          >
            {trip.driverInitials}
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border-2 border-zinc-900">
              <svg
                className="w-2 h-2 text-zinc-900"
                fill="none"
                viewBox="0 0 12 12"
              >
                <path
                  d="M2 6l3 3 5-5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div>
            <div className="font-semibold text-[15px]">{trip.driverName}</div>
            <div className="text-[12px] text-zinc-500">
              {trip.vehicle} · {trip.vehicleColor} · {trip.plate}
            </div>
          </div>
        </div>

        <div
          className="font-black text-[26px] tracking-wide text-white mb-1"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          +234 803 XXX XXXX
        </div>
        <div className="font-mono text-[11px] text-zinc-500 bg-zinc-800/60 px-3 py-1.5 rounded-lg inline-block tracking-wider">
          REF: {refNum}
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <button className="flex items-center justify-center gap-2 bg-blue-600 text-white font-bold text-[13px] py-2.5 rounded-xl hover:bg-blue-500 transition-all hover:-translate-y-0.5 shadow-md shadow-blue-600/20">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
              <path
                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .99h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
            </svg>
            Call Driver
          </button>
          <button className="flex items-center justify-center gap-2 bg-zinc-800 text-zinc-200 font-semibold text-[13px] py-2.5 rounded-xl border border-zinc-700 hover:border-zinc-600 hover:bg-zinc-700 transition-all">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
              <path
                d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M17 21v-8H7v8M7 3v5h8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Save Contact
          </button>
        </div>
      </div>

      {/* Booking Summary */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
        <div
          className="text-[13px] font-bold text-white mb-3"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Booking Summary
        </div>
        <div className="flex flex-col gap-2 text-[13px]">
          {[
            [
              "Route",
              `${trip.from.split("(")[0].trim()} → ${trip.to
                .split("(")[0]
                .trim()}`,
            ],
            ["Date & Time", `${date || "28 Feb"}, ${trip.departure}`],
            ["Passengers", `${passengers} person${passengers > 1 ? "s" : ""}`],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between items-center">
              <span className="text-zinc-500">{label}</span>
              <span className="text-zinc-200 font-medium">{value}</span>
            </div>
          ))}
          <div className="border-t border-zinc-800 mt-1 pt-2 flex justify-between items-center">
            <span className="text-zinc-500">Total to Pay Driver</span>
            <span
              className="font-black text-lg text-blue-400"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              ₦{total.toLocaleString()} cash
            </span>
          </div>
        </div>
      </div>

      {/* Share Trip */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
        <div
          className="text-[13px] font-bold text-white mb-1"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          🛡️ Share Trip Details
        </div>
        <div className="text-[12px] text-zinc-500 mb-3">
          Auto-shared to emergency contact · Chioma Adeyemi
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: "💬", label: "WhatsApp" },
            { icon: "📱", label: "SMS" },
            { icon: "📧", label: "Email" },
          ].map(({ icon, label }) => (
            <button
              key={label}
              onClick={() => setShared(true)}
              className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all
                ${
                  shared
                    ? "border-blue-500/30 bg-blue-500/5 text-blue-400"
                    : "border-zinc-800 bg-zinc-800/50 text-zinc-400 hover:border-blue-500/30 hover:bg-blue-500/5 hover:text-blue-400"
                }`}
            >
              <span className="text-xl">{icon}</span>
              <span className="text-[11px] font-semibold">{label}</span>
            </button>
          ))}
        </div>
        {shared && (
          <div className="mt-2 text-[11px] text-blue-500 text-center">
            ✓ Trip details shared successfully
          </div>
        )}
      </div>

      <button
        onClick={onConfirm}
        className="w-full bg-blue-600 text-white font-black text-[15px] py-4 rounded-2xl hover:bg-blue-500 transition-all hover:-translate-y-0.5 shadow-xl shadow-blue-600/20"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        ✅ Confirm Booking
      </button>
    </div>
  );
}

function ConfirmedState({
  trip,
  onReset,
}: {
  trip: Trip;
  onReset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="w-20 h-20 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center mb-6 animate-bounce">
        <svg
          className="w-10 h-10 text-blue-400"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div
        className="font-black text-2xl text-white mb-2"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        Booking Confirmed!
      </div>
      <div className="text-zinc-400 text-sm mb-2">
        Your trip with{" "}
        <span className="text-white font-semibold">{trip.driverName}</span> is
        locked in.
      </div>
      <div className="text-zinc-500 text-sm mb-8">
        Check <span className="text-blue-400">My Bookings</span> for reminders
        and driver contact.
      </div>
      <button
        onClick={onReset}
        className="px-6 py-2.5 bg-zinc-800 border border-zinc-700 rounded-xl text-sm font-semibold text-zinc-300 hover:bg-zinc-700 transition-all"
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

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "All Trips" },
    { key: "rating", label: "⭐ Highest Rated" },
    { key: "price", label: "💰 Lowest Price" },
    { key: "earliest", label: "🕐 Earliest" },
    { key: "verified", label: "✅ Verified Only" },
  ];

  const filteredTrips = [...MOCK_TRIPS].sort((a, b) => {
    if (activeFilter === "rating") return b.rating - a.rating;
    if (activeFilter === "price") return a.price - b.price;
    if (activeFilter === "earliest")
      return a.departure.localeCompare(b.departure);
    return 0;
  });

  function handleSearch() {
    if (!from || !to) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSearched(true);
      setSelectedTrip(null);
      setContactedTrip(null);
      setConfirmed(false);
    }, 900);
  }

  function handleContact(trip: Trip) {
    setSelectedTrip(trip);
    setContactedTrip(trip);
  }

  function handleConfirm() {
    setConfirmed(true);
  }

  function handleReset() {
    setSearched(false);
    setSelectedTrip(null);
    setContactedTrip(null);
    setConfirmed(false);
  }

  return (
    <>
      {/* Font import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');

        * { box-sizing: border-box; }

        .find-ride-root {
          font-family: 'DM Sans', sans-serif;
          background: #0b0f0e;
          color: #e8f0ec;
          min-height: 100vh;
        }

        select option { background: #141a18; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2a3530; border-radius: 4px; }

        .trip-card-enter {
          animation: slideUp 0.25s ease-out both;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .panel-enter {
          animation: fadeSlide 0.3s ease-out both;
        }

        @keyframes fadeSlide {
          from { opacity: 0; transform: translateX(16px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .search-btn-loading {
          animation: shimmer 1.2s linear infinite;
          background: linear-gradient(90deg, #3b82f6 25%, #60a5fa 50%, #3b82f6 75%);
          background-size: 200% 100%;
        }

        @keyframes shimmer {
          from { background-position: 200% center; }
          to { background-position: -200% center; }
        }
      `}</style>

      <div className="find-ride-root">
        <div className="max-w-[1100px] mx-auto px-6 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1
              className="text-[28px] font-black text-white leading-tight tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Find a Ride
            </h1>
            <p className="text-zinc-500 text-[14px] mt-1">
              Search verified drivers on your route and connect directly
            </p>
          </div>

          {/* Search Card */}
          <div className="rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-[#111816] p-6 mb-6 shadow-xl">
            <div
              className="text-[13px] font-bold text-zinc-400 mb-4 flex items-center gap-2"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <svg
                className="w-4 h-4 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle
                  cx="12"
                  cy="10"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              Search Trips
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3 md:grid-cols-4">
              {/* From */}
              <div className="col-span-1">
                <label className="block text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                  From
                </label>
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full bg-zinc-800/80 border border-zinc-700 rounded-xl px-3 py-2.5 text-[14px] text-white focus:outline-none focus:border-emerald-500/60 transition-colors"
                >
                  <option>Lagos (Jibowu)</option>
                  <option>Lagos (Mile 2)</option>
                  <option>Abuja (Utako Park)</option>
                  <option>Port Harcourt (Waterlines)</option>
                  <option>Enugu</option>
                  <option>Ibadan</option>
                </select>
              </div>

              {/* Swap icon between From/To */}
              <div
                className="hidden md:flex items-end justify-center pb-1 col-span-0"
                style={{ marginTop: "20px" }}
              ></div>

              {/* To */}
              <div className="col-span-1">
                <label className="block text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                  To
                </label>
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full bg-zinc-800/80 border border-zinc-700 rounded-xl px-3 py-2.5 text-[14px] text-white focus:outline-none focus:border-emerald-500/60 transition-colors"
                >
                  <option>Abuja (Utako Park)</option>
                  <option>Port Harcourt (Waterlines)</option>
                  <option>Enugu</option>
                  <option>Ibadan</option>
                  <option>Kano</option>
                  <option>Lagos (Jibowu)</option>
                </select>
              </div>

              {/* Date */}
              <div className="col-span-1">
                <label className="block text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-zinc-800/80 border border-zinc-700 rounded-xl px-3 py-2.5 text-[14px] text-white focus:outline-none focus:border-emerald-500/60 transition-colors [color-scheme:dark]"
                />
              </div>

              {/* Passengers */}
              <div className="col-span-1">
                <label className="block text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                  Passengers
                </label>
                <select
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  className="w-full bg-zinc-800/80 border border-zinc-700 rounded-xl px-3 py-2.5 text-[14px] text-white focus:outline-none focus:border-emerald-500/60 transition-colors"
                >
                  {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                    <option key={n} value={n}>
                      {n} passenger{n > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSearch}
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-bold text-white transition-all
                ${
                  loading
                    ? "search-btn-loading cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500 hover:-translate-y-0.5 shadow-lg shadow-blue-600/20"
                }`}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {loading ? "Searching..." : "Find Available Trips →"}
            </button>
          </div>

          {/* Results */}
          {searched && !loading && (
            <div className="flex gap-6 items-start">
              {/* Left: Results list */}
              <div className="flex-1 min-w-0">
                {/* Results meta + filters */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-[13px] text-zinc-500">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse inline-block" />
                    <span>
                      <span className="text-white font-semibold">
                        {filteredTrips.length} trips
                      </span>{" "}
                      found · {from.split("(")[0].trim()} →{" "}
                      {to.split("(")[0].trim()}
                      {date &&
                        ` · ${new Date(date + "T00:00:00").toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                          }
                        )}`}
                      {` · ${passengers} pax`}
                    </span>
                  </div>
                </div>

                {/* Filter pills */}
                <div className="flex gap-2 flex-wrap mb-5">
                  {filters.map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setActiveFilter(key)}
                      className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold border transition-all
                        ${
                          activeFilter === key
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300"
                        }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* Trip Cards */}
                <div className="flex flex-col gap-3">
                  {filteredTrips.map((trip, i) => (
                    <div
                      key={trip.id}
                      className="trip-card-enter"
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
                        onContact={() => handleContact(trip)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Contact/Booking panel */}
              {(contactedTrip || confirmed) && (
                <div className="w-[340px] flex-shrink-0 sticky top-6 panel-enter">
                  {confirmed && contactedTrip ? (
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden">
                      <ConfirmedState
                        trip={contactedTrip}
                        onReset={handleReset}
                      />
                    </div>
                  ) : contactedTrip ? (
                    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 overflow-y-auto max-h-[calc(100vh-120px)]">
                      <ContactPanel
                        trip={contactedTrip}
                        passengers={passengers}
                        date={
                          date
                            ? new Date(date + "T00:00:00").toLocaleDateString(
                                "en-GB",
                                {
                                  day: "numeric",
                                  month: "short",
                                }
                              )
                            : "28 Feb"
                        }
                        onConfirm={handleConfirm}
                        onClose={() => setContactedTrip(null)}
                      />
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          )}

          {/* Empty pre-search state */}
          {!searched && !loading && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center mb-5 opacity-60">
                <svg
                  className="w-8 h-8 text-zinc-600"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <div
                className="text-[16px] font-bold text-zinc-600 mb-1"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Enter your route above
              </div>
              <div className="text-[13px] text-zinc-700">
                Choose your departure, destination, and date to find available
                trips
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
