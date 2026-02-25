"use client";

import { useState } from "react";
import {
  Bookmark,
  Clock,
  MapPin,
  ChevronDown,
  Phone,
  Share2,
  XCircle,
  CheckCircle2,
  Car,
  Calendar,
  Users,
  Banknote,
  Copy,
  MessageCircle,
  Mail,
  Smartphone,
  RotateCcw,
  Search,
  AlertCircle,
  Shield,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type BookingStatus = "confirmed" | "pending" | "cancelled";

type Booking = {
  id: string;
  driverInitials: string;
  driverName: string;
  driverRating: number;
  driverTrips: number;
  avatarBg: string;
  from: string;
  to: string;
  date: string;
  dateShort: string;
  monthShort: string;
  time: string;
  duration: string;
  vehicle: string;
  vehicleColor: string;
  plate: string;
  seats: number;
  price: number;
  status: BookingStatus;
  ref: string;
  phone: string;
  notes?: string;
};

type Filter = "all" | "confirmed" | "pending" | "cancelled";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_BOOKINGS: Booking[] = [
  {
    id: "1",
    driverInitials: "EO",
    driverName: "Emeka Okonkwo",
    driverRating: 5,
    driverTrips: 48,
    avatarBg: "from-blue-800 to-blue-950",
    from: "Lagos (Jibowu)",
    to: "Abuja (Utako Park)",
    date: "28 Feb 2026",
    dateShort: "28",
    monthShort: "Feb",
    time: "6:00 AM",
    duration: "~8 hrs",
    vehicle: "Toyota Hiace",
    vehicleColor: "Black",
    plate: "LSD-432-AE",
    seats: 1,
    price: 5000,
    status: "confirmed",
    ref: "BR-2602-00847",
    phone: "+234 803 XXX XXXX",
  },
  {
    id: "2",
    driverInitials: "CA",
    driverName: "Chidi Anyanwu",
    driverRating: 4,
    driverTrips: 31,
    avatarBg: "from-sky-800 to-sky-950",
    from: "Abuja (Utako Park)",
    to: "Port Harcourt (Waterlines)",
    date: "12 Mar 2026",
    dateShort: "12",
    monthShort: "Mar",
    time: "7:30 AM",
    duration: "~9 hrs",
    vehicle: "Honda Accord",
    vehicleColor: "Silver",
    plate: "KTU-218-BQ",
    seats: 2,
    price: 6500,
    status: "pending",
    ref: "BR-2603-00214",
    phone: "+234 812 XXX XXXX",
    notes: "2 seats booked",
  },
  {
    id: "3",
    driverInitials: "BF",
    driverName: "Biodun Fashola",
    driverRating: 5,
    driverTrips: 67,
    avatarBg: "from-amber-800 to-amber-950",
    from: "Lagos (Jibowu)",
    to: "Enugu (Nike Lake Rd)",
    date: "5 Jan 2026",
    dateShort: "5",
    monthShort: "Jan",
    time: "5:00 AM",
    duration: "~7 hrs",
    vehicle: "Toyota Camry",
    vehicleColor: "White",
    plate: "APP-901-CX",
    seats: 1,
    price: 5500,
    status: "cancelled",
    ref: "BR-2601-00093",
    phone: "+234 809 XXX XXXX",
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

function StatusBadge({ status }: { status: BookingStatus }) {
  const map: Record<
    BookingStatus,
    { cls: string; icon: React.ReactNode; label: string }
  > = {
    confirmed: {
      cls: "bg-blue-500/15 text-blue-400 border-blue-500/20",
      icon: <CheckCircle2 className="w-3 h-3" />,
      label: "Confirmed",
    },
    pending: {
      cls: "bg-amber-500/15 text-amber-400 border-amber-500/20",
      icon: <Clock className="w-3 h-3" />,
      label: "Pending",
    },
    cancelled: {
      cls: "bg-red-500/15 text-red-400 border-red-500/20",
      icon: <XCircle className="w-3 h-3" />,
      label: "Cancelled",
    },
  };
  const { cls, icon, label } = map[status];
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${cls}`}
    >
      {icon}
      {label}
    </span>
  );
}

// ─── Booking Card ─────────────────────────────────────────────────────────────

function BookingCard({
  booking,
  expanded,
  onToggle,
}: {
  booking: Booking;
  expanded: boolean;
  onToggle: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const total = booking.price * booking.seats;

  function copyRef() {
    navigator.clipboard.writeText(booking.ref).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className={`
        relative rounded-2xl border transition-all duration-200 overflow-hidden
        ${
          expanded
            ? "border-blue-500/40 bg-blue-500/[0.03] shadow-lg shadow-blue-500/5"
            : "border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-800/60"
        }
      `}
    >
      {/* Top accent line when expanded */}
      {expanded && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      )}

      {/* ── Card Header (always visible) ─────────────── */}
      <div
        className="flex items-start gap-4 p-5 cursor-pointer select-none"
        onClick={onToggle}
      >
        {/* Date block */}
        <div
          className={`
            flex-shrink-0 w-14 rounded-xl text-center py-2.5 border
            ${
              expanded
                ? "bg-blue-500/15 border-blue-500/30"
                : "bg-zinc-800 border-zinc-700"
            }
          `}
        >
          <div
            className="font-black text-[22px] leading-none text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {booking.dateShort}
          </div>
          <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wide mt-0.5">
            {booking.monthShort}
          </div>
        </div>

        {/* Driver + Route */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {/* Inline avatar */}
            <div
              className={`w-7 h-7 rounded-full bg-gradient-to-br ${booking.avatarBg} flex items-center justify-center text-[10px] font-bold text-blue-300 border border-zinc-700 flex-shrink-0`}
            >
              {booking.driverInitials}
            </div>
            <span className="font-semibold text-[15px] text-white tracking-tight truncate">
              {booking.driverName}
            </span>
            <StarRating rating={booking.driverRating} />
            <span className="text-[11px] text-zinc-600 hidden sm:inline">
              ({booking.driverTrips})
            </span>
          </div>

          {/* Route */}
          <div className="flex items-center gap-1.5 text-[13px] mb-2">
            <span className="text-zinc-300 font-medium truncate">
              {booking.from}
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
              {booking.to}
            </span>
          </div>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5 text-[12px] text-zinc-500">
              <Clock className="w-3.5 h-3.5 text-zinc-600" />
              {booking.time} · {booking.duration}
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-zinc-500">
              <Car className="w-3.5 h-3.5 text-zinc-600" />
              {booking.vehicle} · {booking.vehicleColor}
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-zinc-500">
              <Users className="w-3.5 h-3.5 text-zinc-600" />
              {booking.seats} seat{booking.seats > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Right: Status + Price + Chevron */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <StatusBadge status={booking.status} />
          <div className="text-right">
            <div
              className="font-black text-[20px] text-blue-400 leading-none"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              ₦{total.toLocaleString()}
            </div>
            <div className="text-[11px] text-zinc-600 mt-0.5">cash</div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-zinc-600 transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* ── Expanded Panel ────────────────────────────── */}
      {expanded && (
        <div className="border-t border-zinc-800 px-5 pb-5 pt-4 space-y-4">
          {/* Trip details grid */}
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                icon: <MapPin className="w-3.5 h-3.5" />,
                label: "Pickup",
                value: booking.from,
              },
              {
                icon: <MapPin className="w-3.5 h-3.5" />,
                label: "Drop-off",
                value: booking.to,
              },
              {
                icon: <Calendar className="w-3.5 h-3.5" />,
                label: "Departure",
                value: `${booking.date}, ${booking.time}`,
              },
              {
                icon: <Car className="w-3.5 h-3.5" />,
                label: "Vehicle",
                value: `${booking.vehicle} · ${booking.vehicleColor}`,
              },
              {
                icon: <Shield className="w-3.5 h-3.5" />,
                label: "Plate No.",
                value: booking.plate,
              },
              {
                icon: <Banknote className="w-3.5 h-3.5" />,
                label: "Total (Cash)",
                value: `₦${total.toLocaleString()}`,
                highlight: true,
              },
            ].map(({ icon, label, value, highlight }) => (
              <div
                key={label}
                className={`rounded-xl p-3 border ${
                  highlight
                    ? "bg-blue-500/8 border-blue-500/20"
                    : "bg-zinc-800/60 border-zinc-800"
                }`}
              >
                <div
                  className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider mb-1.5 ${
                    highlight ? "text-blue-500" : "text-zinc-600"
                  }`}
                >
                  {icon}
                  {label}
                </div>
                <div
                  className={`text-[13px] font-semibold ${
                    highlight
                      ? "text-blue-400 text-[16px] font-black"
                      : "text-zinc-300"
                  }`}
                  style={highlight ? { fontFamily: "'Syne', sans-serif" } : {}}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Reference number */}
          <div className="flex items-center gap-3 rounded-xl bg-zinc-800/50 border border-zinc-800 px-4 py-3">
            <div className="flex-1">
              <div className="text-[11px] font-semibold text-zinc-600 uppercase tracking-widest mb-0.5">
                Booking Reference
              </div>
              <div
                className="font-mono text-[14px] font-bold text-zinc-200 tracking-widest"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {booking.ref}
              </div>
            </div>
            <button
              onClick={copyRef}
              className={`flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-lg border transition-all
                ${
                  copied
                    ? "bg-blue-500/15 border-blue-500/30 text-blue-400"
                    : "bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                }`}
            >
              {copied ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Driver contact — only for active bookings */}
          {booking.status !== "cancelled" && (
            <div className="rounded-2xl border border-blue-500/25 bg-gradient-to-br from-blue-500/8 to-blue-500/3 p-4">
              {/* Header */}
              <div className="flex items-center gap-1.5 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest">
                  Driver Contact
                </span>
              </div>

              {/* Driver info row */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${booking.avatarBg} flex items-center justify-center font-bold text-sm text-blue-300 border-2 border-blue-500/30`}
                  >
                    {booking.driverInitials}
                  </div>
                  {/* Verified dot */}
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
                <div className="flex-1">
                  <div className="font-semibold text-[15px] text-white">
                    {booking.driverName}
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] text-zinc-500 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-blue-500" />
                    Verified · {booking.driverTrips} trips
                  </div>
                </div>
                <div
                  className="font-black text-[18px] text-white tracking-wide"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {booking.phone}
                </div>
              </div>

              {/* CTA buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 bg-blue-600 text-white font-bold text-[13px] py-2.5 rounded-xl hover:bg-blue-500 transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-600/20">
                  <Phone className="w-4 h-4" />
                  Call Driver
                </button>
                <button className="flex items-center justify-center gap-2 bg-zinc-800 text-zinc-200 font-semibold text-[13px] py-2.5 rounded-xl border border-zinc-700 hover:border-zinc-600 hover:bg-zinc-700 transition-all">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </button>
              </div>
            </div>
          )}

          {/* Share trip / cancelled state */}
          {booking.status !== "cancelled" ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
              <div
                className="flex items-center gap-2 text-[13px] font-bold text-white mb-1"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                <Shield className="w-4 h-4 text-blue-500" />
                Share Trip Details
              </div>
              <div className="text-[12px] text-zinc-500 mb-3">
                Auto-shared to emergency contact · Chioma Adeyemi
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    icon: <MessageCircle className="w-4 h-4" />,
                    label: "WhatsApp",
                  },
                  { icon: <Smartphone className="w-4 h-4" />, label: "SMS" },
                  { icon: <Mail className="w-4 h-4" />, label: "Email" },
                ].map(({ icon, label }) => (
                  <button
                    key={label}
                    onClick={() => setShared(true)}
                    className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all
                      ${
                        shared
                          ? "border-blue-500/30 bg-blue-500/5 text-blue-400"
                          : "border-zinc-800 bg-zinc-800/50 text-zinc-500 hover:border-blue-500/30 hover:text-blue-400"
                      }`}
                  >
                    {icon}
                    <span className="text-[11px] font-semibold">{label}</span>
                  </button>
                ))}
              </div>
              {shared && (
                <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-blue-500">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Trip details shared successfully
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-xl border border-red-500/15 bg-red-500/5 px-4 py-3 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <div>
                <div className="text-[13px] font-semibold text-red-400">
                  Trip Cancelled
                </div>
                <div className="text-[12px] text-zinc-500">
                  This trip was cancelled. You can search for another ride.
                </div>
              </div>
            </div>
          )}

          {/* Bottom actions */}
          <div className="flex gap-2 pt-1">
            {booking.status === "cancelled" ? (
              <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white font-bold text-[13px] py-2.5 rounded-xl hover:bg-blue-500 transition-all shadow-md shadow-blue-600/20 hover:-translate-y-0.5">
                <Search className="w-4 h-4" />
                Find Another Ride
              </button>
            ) : (
              <>
                <button className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 border border-zinc-700 text-zinc-300 font-semibold text-[13px] py-2.5 rounded-xl hover:border-zinc-600 hover:bg-zinc-700 transition-all">
                  <Share2 className="w-4 h-4" />
                  Share Trip
                </button>
                {booking.status !== "cancelled" && (
                  <button
                    onClick={() => setCancelling(!cancelling)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 font-semibold text-[13px] py-2.5 rounded-xl hover:bg-red-500/15 hover:border-red-500/30 transition-all"
                  >
                    <XCircle className="w-4 h-4" />
                    Cancel Trip
                  </button>
                )}
              </>
            )}
          </div>

          {/* Cancel confirm modal inline */}
          {cancelling && (
            <div className="rounded-xl border border-red-500/25 bg-red-500/8 p-4">
              <div className="text-[13px] font-bold text-red-400 mb-1 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Confirm Cancellation
              </div>
              <div className="text-[12px] text-zinc-500 mb-3">
                Are you sure you want to cancel this booking? This action cannot
                be undone.
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCancelling(false)}
                  className="flex-1 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 text-[12px] font-semibold hover:bg-zinc-700 transition-all"
                >
                  Keep Booking
                </button>
                <button
                  onClick={() => setCancelling(false)}
                  className="flex-1 py-2 rounded-lg bg-red-500 text-white text-[12px] font-bold hover:bg-red-400 transition-all"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ filter }: { filter: Filter }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center mb-5 opacity-70">
        <Bookmark className="w-7 h-7 text-zinc-600" />
      </div>
      <div
        className="text-[16px] font-bold text-zinc-500 mb-1"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {filter === "all" ? "No bookings yet" : `No ${filter} bookings`}
      </div>
      <div className="text-[13px] text-zinc-600 max-w-xs">
        {filter === "all"
          ? "Search for a ride to make your first booking"
          : `You have no ${filter} trips at the moment`}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MyBookings() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [expandedId, setExpandedId] = useState<string | null>("1");

  const filters: { key: Filter; label: string; count?: number }[] = [
    { key: "all", label: "All", count: MOCK_BOOKINGS.length },
    {
      key: "confirmed",
      label: "Confirmed",
      count: MOCK_BOOKINGS.filter((b) => b.status === "confirmed").length,
    },
    {
      key: "pending",
      label: "Pending",
      count: MOCK_BOOKINGS.filter((b) => b.status === "pending").length,
    },
    {
      key: "cancelled",
      label: "Cancelled",
      count: MOCK_BOOKINGS.filter((b) => b.status === "cancelled").length,
    },
  ];

  const filteredBookings =
    activeFilter === "all"
      ? MOCK_BOOKINGS
      : MOCK_BOOKINGS.filter((b) => b.status === activeFilter);

  const confirmedCount = MOCK_BOOKINGS.filter(
    (b) => b.status === "confirmed"
  ).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');

        .my-bookings-root * { box-sizing: border-box; }
        .my-bookings-root { font-family: 'DM Sans', sans-serif; }

        .booking-card-enter {
          animation: bookingIn 0.25s ease-out both;
        }
        @keyframes bookingIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .my-bookings-root ::-webkit-scrollbar { width: 4px; }
        .my-bookings-root ::-webkit-scrollbar-track { background: transparent; }
        .my-bookings-root ::-webkit-scrollbar-thumb { background: #2a3530; border-radius: 4px; }
      `}</style>

      <div className="my-bookings-root bg-[#0b0f0e] min-h-screen text-[#e8f0ec]">
        <div className="max-w-[780px] mx-auto px-6 py-8">
          {/* ── Page Header ─────────────────────────────────────── */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1
                className="text-[28px] font-black text-white leading-tight tracking-tight flex items-center gap-3"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                <Bookmark className="w-7 h-7 text-blue-500" />
                My Bookings
                {confirmedCount > 0 && (
                  <span className="bg-blue-600 text-white text-[13px] font-bold px-2.5 py-0.5 rounded-full">
                    {confirmedCount}
                  </span>
                )}
              </h1>
              <p className="text-zinc-500 text-[14px] mt-1">
                Manage your upcoming and past trip bookings
              </p>
            </div>

            <button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-[13px] px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 transition-all"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <Search className="w-4 h-4" />
              Find a Ride
            </button>
          </div>

          {/* ── Summary Stats ────────────────────────────────────── */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              {
                label: "Total Trips",
                value: MOCK_BOOKINGS.length,
                icon: <Bookmark className="w-4 h-4" />,
                color: "from-blue-500/10 to-blue-500/5 border-blue-500/20",
                valueColor: "text-blue-400",
              },
              {
                label: "Total Spent",
                value: `₦${MOCK_BOOKINGS.filter((b) => b.status !== "cancelled")
                  .reduce((s, b) => s + b.price * b.seats, 0)
                  .toLocaleString()}`,
                icon: <Banknote className="w-4 h-4" />,
                color: "from-zinc-800 to-zinc-900 border-zinc-800",
                valueColor: "text-white",
              },
              {
                label: "Upcoming",
                value: MOCK_BOOKINGS.filter(
                  (b) => b.status === "confirmed" || b.status === "pending"
                ).length,
                icon: <Calendar className="w-4 h-4" />,
                color: "from-zinc-800 to-zinc-900 border-zinc-800",
                valueColor: "text-white",
              },
            ].map((s) => (
              <div
                key={s.label}
                className={`rounded-2xl border bg-gradient-to-br ${s.color} px-4 py-4`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] text-zinc-500 font-medium">
                    {s.label}
                  </span>
                  <span className="text-zinc-600">{s.icon}</span>
                </div>
                <div
                  className={`font-black text-[26px] leading-none ${s.valueColor}`}
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {/* ── Filter Pills ──────────────────────────────────────── */}
          <div className="flex gap-2 flex-wrap mb-5">
            {filters.map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold border transition-all
                  ${
                    activeFilter === key
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300"
                  }`}
              >
                {label}
                {count !== undefined && (
                  <span
                    className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center
                      ${
                        activeFilter === key
                          ? "bg-white/20 text-white"
                          : "bg-zinc-800 text-zinc-500"
                      }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* ── Results Meta ─────────────────────────────────────── */}
          {filteredBookings.length > 0 && (
            <div className="flex items-center gap-2 text-[13px] text-zinc-500 mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse inline-block" />
              <span>
                <span className="text-white font-semibold">
                  {filteredBookings.length} booking
                  {filteredBookings.length !== 1 ? "s" : ""}
                </span>
                {activeFilter !== "all" && ` · ${activeFilter}`}
              </span>
            </div>
          )}

          {/* ── Booking Cards ────────────────────────────────────── */}
          {filteredBookings.length === 0 ? (
            <EmptyState filter={activeFilter} />
          ) : (
            <div className="flex flex-col gap-3">
              {filteredBookings.map((booking, i) => (
                <div
                  key={booking.id}
                  className="booking-card-enter"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <BookingCard
                    booking={booking}
                    expanded={expandedId === booking.id}
                    onToggle={() =>
                      setExpandedId(
                        expandedId === booking.id ? null : booking.id
                      )
                    }
                  />
                </div>
              ))}
            </div>
          )}

          {/* ── Bottom refresh hint ──────────────────────────────── */}
          {filteredBookings.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-8 text-[12px] text-zinc-700">
              <RotateCcw className="w-3.5 h-3.5" />
              Last synced just now
            </div>
          )}
        </div>
      </div>
    </>
  );
}
