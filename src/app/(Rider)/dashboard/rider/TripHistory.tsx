"use client";

import { useState } from "react";
import {
  Clock,
  MapPin,
  Car,
  Banknote,
  Star,
  ChevronDown,
  RotateCcw,
  Search,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Filter,
  ChevronRight,
  AlertCircle,
  MessageSquare,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type TripStatus = "completed" | "cancelled";

type Trip = {
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
  year: string;
  time: string;
  duration: string;
  vehicle: string;
  vehicleColor: string;
  plate: string;
  seats: number;
  price: number;
  status: TripStatus;
  ref: string;
  myRating?: number;
  review?: string;
};

type SortFilter = "all" | "completed" | "cancelled";
type SortOrder = "newest" | "oldest" | "highest" | "lowest";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_HISTORY: Trip[] = [
  {
    id: "h1",
    driverInitials: "EO",
    driverName: "Emeka Okonkwo",
    driverRating: 5,
    driverTrips: 48,
    avatarBg: "from-blue-800 to-blue-950",
    from: "Lagos (Jibowu)",
    to: "Abuja (Utako Park)",
    date: "14 Feb 2026",
    dateShort: "14",
    monthShort: "Feb",
    year: "2026",
    time: "6:00 AM",
    duration: "~8 hrs",
    vehicle: "Toyota Hiace",
    vehicleColor: "Black",
    plate: "LSD-432-AE",
    seats: 1,
    price: 5000,
    status: "completed",
    ref: "BR-2602-00412",
    myRating: 5,
    review: "Excellent driver, very punctual and professional.",
  },
  {
    id: "h2",
    driverInitials: "NO",
    driverName: "Ngozi Obi",
    driverRating: 4,
    driverTrips: 22,
    avatarBg: "from-violet-800 to-violet-950",
    from: "Abuja (Utako Park)",
    to: "Enugu (Nike Lake Rd)",
    date: "28 Jan 2026",
    dateShort: "28",
    monthShort: "Jan",
    year: "2026",
    time: "7:00 AM",
    duration: "~6.5 hrs",
    vehicle: "Toyota Sienna",
    vehicleColor: "Blue",
    plate: "MUS-553-DF",
    seats: 2,
    price: 3500,
    status: "completed",
    ref: "BR-2601-00189",
    myRating: 4,
  },
  {
    id: "h3",
    driverInitials: "TB",
    driverName: "Tunde Bello",
    driverRating: 4,
    driverTrips: 35,
    avatarBg: "from-emerald-800 to-emerald-950",
    from: "Lagos (Jibowu)",
    to: "Ibadan (Challenge)",
    date: "10 Jan 2026",
    dateShort: "10",
    monthShort: "Jan",
    year: "2026",
    time: "8:30 AM",
    duration: "~2 hrs",
    vehicle: "Toyota Camry",
    vehicleColor: "White",
    plate: "APP-772-BQ",
    seats: 1,
    price: 2000,
    status: "completed",
    ref: "BR-2601-00047",
  },
  {
    id: "h4",
    driverInitials: "KA",
    driverName: "Kemi Adeyemi",
    driverRating: 5,
    driverTrips: 61,
    avatarBg: "from-rose-800 to-rose-950",
    from: "Port Harcourt (Waterlines)",
    to: "Lagos (Jibowu)",
    date: "22 Dec 2025",
    dateShort: "22",
    monthShort: "Dec",
    year: "2025",
    time: "5:00 AM",
    duration: "~9 hrs",
    vehicle: "Toyota Hiace",
    vehicleColor: "Silver",
    plate: "RVS-213-AE",
    seats: 1,
    price: 6000,
    status: "completed",
    ref: "BR-2512-00831",
    myRating: 5,
    review: "Very safe driver. Arrived on time. Highly recommend.",
  },
  {
    id: "h5",
    driverInitials: "MI",
    driverName: "Musa Ibrahim",
    driverRating: 4,
    driverTrips: 19,
    avatarBg: "from-amber-800 to-amber-950",
    from: "Abuja (Utako Park)",
    to: "Kano (Yankaba)",
    date: "5 Dec 2025",
    dateShort: "5",
    monthShort: "Dec",
    year: "2025",
    time: "6:30 AM",
    duration: "~5 hrs",
    vehicle: "Honda Accord",
    vehicleColor: "Grey",
    plate: "KAN-401-BD",
    seats: 1,
    price: 2500,
    status: "cancelled",
    ref: "BR-2512-00304",
  },
  {
    id: "h6",
    driverInitials: "CA",
    driverName: "Chidi Anyanwu",
    driverRating: 4,
    driverTrips: 31,
    avatarBg: "from-sky-800 to-sky-950",
    from: "Lagos (Jibowu)",
    to: "Port Harcourt (Waterlines)",
    date: "18 Nov 2025",
    dateShort: "18",
    monthShort: "Nov",
    year: "2025",
    time: "7:30 AM",
    duration: "~9 hrs",
    vehicle: "Honda Accord",
    vehicleColor: "Silver",
    plate: "KTU-218-BQ",
    seats: 1,
    price: 5500,
    status: "completed",
    ref: "BR-2511-00698",
    myRating: 4,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarDisplay({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "md";
}) {
  const sz = size === "md" ? "w-4 h-4" : "w-3 h-3";
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`${sz} ${i < rating ? "text-amber-400" : "text-zinc-700"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: TripStatus }) {
  return status === "completed" ? (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
      <CheckCircle2 className="w-3 h-3" /> Completed
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border bg-red-500/10 text-red-400 border-red-500/20">
      <XCircle className="w-3 h-3" /> Cancelled
    </span>
  );
}

// ─── Interactive Star Rater ───────────────────────────────────────────────────

function StarRater({
  onRate,
}: {
  onRate: (rating: number, review: string) => void;
}) {
  const [hover, setHover] = useState(0);
  const [selected, setSelected] = useState(0);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const labels = ["", "Terrible", "Poor", "Okay", "Good", "Excellent"];

  if (submitted) {
    return (
      <div className="flex items-center gap-2 text-[12px] text-emerald-400">
        <CheckCircle2 className="w-4 h-4" />
        Rating submitted — thank you!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => {
          const val = i + 1;
          const active = val <= (hover || selected);
          return (
            <button
              key={val}
              onMouseEnter={() => setHover(val)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setSelected(val)}
              className="transition-transform hover:scale-110 active:scale-95"
            >
              <svg
                className={`w-6 h-6 transition-colors ${
                  active
                    ? "text-amber-400"
                    : "text-zinc-700 hover:text-zinc-500"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          );
        })}
        {(hover || selected) > 0 && (
          <span className="text-[12px] font-semibold text-amber-400 ml-2">
            {labels[hover || selected]}
          </span>
        )}
      </div>

      {selected > 0 && (
        <div className="space-y-2">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Leave a review (optional)..."
            maxLength={200}
            rows={2}
            className="w-full bg-zinc-800/80 border border-zinc-700 rounded-xl px-3 py-2.5 text-[13px] text-zinc-200 placeholder:text-zinc-600 resize-none focus:outline-none focus:border-blue-500/60 transition-colors"
          />
          <button
            onClick={() => {
              onRate(selected, review);
              setSubmitted(true);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-[12px] px-4 py-2 rounded-xl transition-all hover:-translate-y-0.5 shadow-md shadow-blue-600/20"
          >
            <Star className="w-3.5 h-3.5" />
            Submit Rating
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Trip History Card ────────────────────────────────────────────────────────

function TripHistoryCard({
  trip,
  expanded,
  onToggle,
  onRate,
}: {
  trip: Trip;
  expanded: boolean;
  onToggle: () => void;
  onRate: (id: string, rating: number, review: string) => void;
}) {
  const [localRating, setLocalRating] = useState<number | undefined>(
    trip.myRating
  );

  return (
    <div
      className={`
        relative rounded-2xl border transition-all duration-200 overflow-hidden
        ${
          expanded
            ? "border-blue-500/30 bg-blue-500/[0.03] shadow-lg shadow-blue-500/5"
            : "border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-800/60"
        }
      `}
    >
      {/* Top accent when expanded */}
      {expanded && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      )}

      {/* ── Card Header ────────────────────────────────── */}
      <div
        className="flex items-start gap-4 p-5 cursor-pointer select-none"
        onClick={onToggle}
      >
        {/* Date block */}
        <div
          className={`
            flex-shrink-0 w-14 rounded-xl text-center py-2.5 border
            ${
              trip.status === "cancelled"
                ? "bg-zinc-800/80 border-zinc-800"
                : expanded
                ? "bg-blue-500/15 border-blue-500/25"
                : "bg-zinc-800 border-zinc-700"
            }
          `}
        >
          <div
            className={`font-black text-[22px] leading-none ${
              trip.status === "cancelled" ? "text-zinc-600" : "text-white"
            }`}
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {trip.dateShort}
          </div>
          <div className="text-[11px] font-semibold uppercase tracking-wide mt-0.5 text-zinc-500">
            {trip.monthShort}
          </div>
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0">
          {/* Driver row */}
          <div className="flex items-center gap-2 mb-1">
            <div
              className={`w-7 h-7 rounded-full bg-gradient-to-br ${
                trip.status === "cancelled"
                  ? "from-zinc-700 to-zinc-800"
                  : trip.avatarBg
              } flex items-center justify-center text-[10px] font-bold text-blue-300 border border-zinc-700 flex-shrink-0`}
            >
              {trip.driverInitials}
            </div>
            <span
              className={`font-semibold text-[15px] tracking-tight truncate ${
                trip.status === "cancelled" ? "text-zinc-500" : "text-white"
              }`}
            >
              {trip.driverName}
            </span>
            <StarDisplay rating={trip.driverRating} />
            <span className="text-[11px] text-zinc-600 hidden sm:inline">
              ({trip.driverTrips})
            </span>
          </div>

          {/* Route */}
          <div className="flex items-center gap-1.5 text-[13px] mb-2">
            <span
              className={`font-medium truncate ${
                trip.status === "cancelled" ? "text-zinc-600" : "text-zinc-300"
              }`}
            >
              {trip.from}
            </span>
            <svg
              className={`w-3.5 h-3.5 flex-shrink-0 ${
                trip.status === "cancelled" ? "text-zinc-700" : "text-blue-500"
              }`}
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
            <span
              className={`font-medium truncate ${
                trip.status === "cancelled" ? "text-zinc-600" : "text-blue-400"
              }`}
            >
              {trip.to}
            </span>
          </div>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5 text-[12px] text-zinc-500">
              <Clock className="w-3.5 h-3.5 text-zinc-600" />
              {trip.date} · {trip.time}
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-zinc-500">
              <Car className="w-3.5 h-3.5 text-zinc-600" />
              {trip.vehicle} · {trip.vehicleColor}
            </span>
          </div>
        </div>

        {/* Right: status + price + rating + chevron */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0 ml-2">
          <StatusBadge status={trip.status} />

          <div className="text-right">
            <div
              className={`font-black text-[20px] leading-none ${
                trip.status === "cancelled"
                  ? "text-zinc-600 line-through"
                  : "text-blue-400"
              }`}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              ₦{(trip.price * trip.seats).toLocaleString()}
            </div>
            <div className="text-[11px] text-zinc-600 mt-0.5">
              {trip.seats} seat{trip.seats > 1 ? "s" : ""}
            </div>
          </div>

          {/* My rating display (if rated) */}
          {localRating && trip.status === "completed" && (
            <StarDisplay rating={localRating} />
          )}

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
                label: "From",
                value: trip.from,
              },
              {
                icon: <MapPin className="w-3.5 h-3.5" />,
                label: "To",
                value: trip.to,
              },
              {
                icon: <Clock className="w-3.5 h-3.5" />,
                label: "Departed",
                value: `${trip.date}, ${trip.time}`,
              },
              {
                icon: <Car className="w-3.5 h-3.5" />,
                label: "Vehicle",
                value: `${trip.vehicle} · ${trip.vehicleColor}`,
              },
              {
                icon: <TrendingUp className="w-3.5 h-3.5" />,
                label: "Duration",
                value: trip.duration,
              },
              {
                icon: <Banknote className="w-3.5 h-3.5" />,
                label: "Paid",
                value:
                  trip.status === "cancelled"
                    ? "Not charged"
                    : `₦${(trip.price * trip.seats).toLocaleString()}`,
                highlight: trip.status === "completed",
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
                  className={`text-[13px] font-semibold leading-snug ${
                    highlight
                      ? "text-blue-400 text-[16px] font-black"
                      : trip.status === "cancelled" && label === "Paid"
                      ? "text-zinc-600"
                      : "text-zinc-300"
                  }`}
                  style={highlight ? { fontFamily: "'Syne', sans-serif" } : {}}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Reference */}
          <div className="flex items-center gap-3 rounded-xl bg-zinc-800/50 border border-zinc-800 px-4 py-3">
            <div className="flex-1">
              <div className="text-[11px] font-semibold text-zinc-600 uppercase tracking-widest mb-0.5">
                Booking Reference
              </div>
              <div
                className="font-mono text-[14px] font-bold text-zinc-400 tracking-widest"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {trip.ref}
              </div>
            </div>
          </div>

          {/* Rating section — only for completed + unrated */}
          {trip.status === "completed" && !localRating && (
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
              <div
                className="flex items-center gap-2 text-[13px] font-bold text-white mb-1"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                <Star className="w-4 h-4 text-amber-400" />
                Rate this trip
              </div>
              <div className="text-[12px] text-zinc-500 mb-3">
                How was your journey with {trip.driverName}?
              </div>
              <StarRater
                onRate={(rating, review) => {
                  setLocalRating(rating);
                  onRate(trip.id, rating, review);
                }}
              />
            </div>
          )}

          {/* Rating already submitted */}
          {trip.status === "completed" && localRating && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-4">
              <div className="flex items-center justify-between mb-2">
                <div
                  className="text-[13px] font-bold text-white flex items-center gap-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  <Star className="w-4 h-4 text-amber-400" />
                  Your Rating
                </div>
                <StarDisplay rating={localRating} size="md" />
              </div>
              {trip.review && (
                <div className="flex items-start gap-2 mt-2">
                  <MessageSquare className="w-3.5 h-3.5 text-zinc-600 mt-0.5 flex-shrink-0" />
                  <p className="text-[12px] text-zinc-400 italic">
                    "{trip.review}"
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Cancelled reason */}
          {trip.status === "cancelled" && (
            <div className="rounded-xl border border-red-500/15 bg-red-500/5 px-4 py-3 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <div>
                <div className="text-[13px] font-semibold text-red-400">
                  Trip was cancelled
                </div>
                <div className="text-[12px] text-zinc-500">
                  You were not charged for this trip.
                </div>
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="flex gap-2 pt-1">
            <button className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 border border-zinc-700 text-zinc-300 font-semibold text-[13px] py-2.5 rounded-xl hover:border-zinc-600 hover:bg-zinc-700 transition-all">
              <Search className="w-4 h-4" />
              Book Same Route
            </button>
            {trip.status === "completed" && (
              <button className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 border border-zinc-700 text-zinc-300 font-semibold text-[13px] py-2.5 rounded-xl hover:border-zinc-600 hover:bg-zinc-700 transition-all">
                <RotateCcw className="w-4 h-4" />
                Book Again
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TripHistory() {
  const [filter, setFilter] = useState<SortFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [showSort, setShowSort] = useState(false);

  function handleRate(id: string, rating: number, review: string) {
    setRatings((r) => ({ ...r, [id]: rating }));
  }

  const filteredTrips = MOCK_HISTORY.filter(
    (t) => filter === "all" || t.status === filter
  ).sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    if (sortOrder === "newest") return dateB - dateA;
    if (sortOrder === "oldest") return dateA - dateB;
    if (sortOrder === "highest") return b.price * b.seats - a.price * a.seats;
    if (sortOrder === "lowest") return a.price * a.seats - b.price * b.seats;
    return 0;
  });

  const completedTrips = MOCK_HISTORY.filter((t) => t.status === "completed");
  const totalSpent = completedTrips.reduce((s, t) => s + t.price * t.seats, 0);
  const ratedTrips = MOCK_HISTORY.filter((t) => t.myRating || ratings[t.id]);
  const avgRating =
    ratedTrips.length > 0
      ? (
          ratedTrips.reduce(
            (s, t) => s + (ratings[t.id] ?? t.myRating ?? 0),
            0
          ) / ratedTrips.length
        ).toFixed(1)
      : "—";

  const sortLabels: Record<SortOrder, string> = {
    newest: "Newest First",
    oldest: "Oldest First",
    highest: "Highest Fare",
    lowest: "Lowest Fare",
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');

        .trip-history-root * { box-sizing: border-box; }
        .trip-history-root { font-family: 'DM Sans', sans-serif; }

        .trip-enter {
          animation: tripIn 0.25s ease-out both;
        }
        @keyframes tripIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .trip-history-root ::-webkit-scrollbar { width: 4px; }
        .trip-history-root ::-webkit-scrollbar-track { background: transparent; }
        .trip-history-root ::-webkit-scrollbar-thumb { background: #2a3530; border-radius: 4px; }
      `}</style>

      <div className="trip-history-root bg-[#0b0f0e] min-h-screen text-[#e8f0ec]">
        <div className="max-w-[780px] mx-auto px-6 py-8">
          {/* ── Page Header ───────────────────────────────────────── */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1
                className="text-[28px] font-black text-white leading-tight tracking-tight flex items-center gap-3"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                <Clock className="w-7 h-7 text-blue-500" />
                Trip History
              </h1>
              <p className="text-zinc-500 text-[14px] mt-1">
                All your past journeys and ratings
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

          {/* ── Stats ─────────────────────────────────────────────── */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              {
                label: "Total Trips",
                value: completedTrips.length,
                sub: `${
                  MOCK_HISTORY.filter((t) => t.status === "cancelled").length
                } cancelled`,
                color: "from-blue-500/10 to-blue-500/5 border-blue-500/20",
                valueColor: "text-blue-400",
              },
              {
                label: "Total Spent",
                value: `₦${totalSpent.toLocaleString()}`,
                sub: "on completed trips",
                color: "from-zinc-800 to-zinc-900 border-zinc-800",
                valueColor: "text-white",
              },
              {
                label: "Cities Visited",
                value: new Set(
                  MOCK_HISTORY.filter((t) => t.status === "completed").flatMap(
                    (t) => [
                      t.from.split("(")[0].trim(),
                      t.to.split("(")[0].trim(),
                    ]
                  )
                ).size,
                sub: "unique destinations",
                color: "from-zinc-800 to-zinc-900 border-zinc-800",
                valueColor: "text-white",
              },
              {
                label: "Avg Rating Given",
                value: avgRating === "—" ? "—" : `${avgRating} ★`,
                sub: `${ratedTrips.length} trips rated`,
                color: "from-amber-500/8 to-amber-500/3 border-amber-500/15",
                valueColor: "text-amber-400",
              },
            ].map((s) => (
              <div
                key={s.label}
                className={`rounded-2xl border bg-gradient-to-br ${s.color} px-4 py-4`}
              >
                <div className="text-[12px] text-zinc-500 font-medium mb-2">
                  {s.label}
                </div>
                <div
                  className={`font-black text-[24px] leading-none mb-1 ${s.valueColor}`}
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {s.value}
                </div>
                <div className="text-[11px] text-zinc-600">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* ── Filters + Sort ────────────────────────────────────── */}
          <div className="flex items-center justify-between mb-5">
            {/* Filter pills */}
            <div className="flex gap-2">
              {(
                [
                  { key: "all", label: "All", count: MOCK_HISTORY.length },
                  {
                    key: "completed",
                    label: "Completed",
                    count: MOCK_HISTORY.filter((t) => t.status === "completed")
                      .length,
                  },
                  {
                    key: "cancelled",
                    label: "Cancelled",
                    count: MOCK_HISTORY.filter((t) => t.status === "cancelled")
                      .length,
                  },
                ] as { key: SortFilter; label: string; count: number }[]
              ).map(({ key, label, count }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold border transition-all
                    ${
                      filter === key
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300"
                    }`}
                >
                  {label}
                  <span
                    className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                      filter === key
                        ? "bg-white/20 text-white"
                        : "bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              ))}
            </div>

            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] font-semibold border border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300 transition-all"
              >
                <Filter className="w-3.5 h-3.5" />
                {sortLabels[sortOrder]}
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    showSort ? "rotate-90" : ""
                  }`}
                />
              </button>
              {showSort && (
                <div className="absolute right-0 top-full mt-2 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl z-10 w-40">
                  {(Object.entries(sortLabels) as [SortOrder, string][]).map(
                    ([key, label]) => (
                      <button
                        key={key}
                        onClick={() => {
                          setSortOrder(key);
                          setShowSort(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-[12px] font-medium transition-all
                        ${
                          sortOrder === key
                            ? "bg-blue-600/20 text-blue-400"
                            : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
                        }`}
                      >
                        {label}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── Results meta ─────────────────────────────────────── */}
          {filteredTrips.length > 0 && (
            <div className="flex items-center gap-2 text-[13px] text-zinc-500 mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse inline-block" />
              <span>
                <span className="text-white font-semibold">
                  {filteredTrips.length} trip
                  {filteredTrips.length !== 1 ? "s" : ""}
                </span>
                {filter !== "all" && ` · ${filter}`} · sorted by{" "}
                {sortLabels[sortOrder].toLowerCase()}
              </span>
            </div>
          )}

          {/* ── Trip Cards ───────────────────────────────────────── */}
          {filteredTrips.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full border border-zinc-800 bg-zinc-900 flex items-center justify-center mb-5 opacity-70">
                <Clock className="w-7 h-7 text-zinc-600" />
              </div>
              <div
                className="text-[16px] font-bold text-zinc-500 mb-1"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                No trips found
              </div>
              <div className="text-[13px] text-zinc-600">
                {filter === "cancelled"
                  ? "You have no cancelled trips"
                  : "Your completed trips will appear here"}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredTrips.map((trip, i) => (
                <div
                  key={trip.id}
                  className="trip-enter"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <TripHistoryCard
                    trip={trip}
                    expanded={expandedId === trip.id}
                    onToggle={() =>
                      setExpandedId(expandedId === trip.id ? null : trip.id)
                    }
                    onRate={handleRate}
                  />
                </div>
              ))}
            </div>
          )}

          {/* ── Footer ──────────────────────────────────────────── */}
          {filteredTrips.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-8 text-[12px] text-zinc-700">
              <RotateCcw className="w-3.5 h-3.5" />
              Showing all history · Last synced just now
            </div>
          )}
        </div>
      </div>
    </>
  );
}
