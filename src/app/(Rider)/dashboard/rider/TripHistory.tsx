"use client";

import { useState, useEffect } from "react";
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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setBookedTrips,
  setBookedTripsLoading,
  selectBookedTrips,
  selectBookedTripsLoading,
} from "@/store/slices/bookingSlice";
import { selectToken } from "@/store/slices/authSlice";
import { getBookedTrips, Booking } from "@/lib/api";

// ─── Types ────────────────────────────────────────────────────────────────────

type SortFilter = "all" | "completed" | "cancelled";
type SortOrder = "newest" | "oldest" | "highest" | "lowest";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const AVATAR_GRADIENTS = [
  "from-blue-800 to-blue-950",
  "from-violet-800 to-violet-950",
  "from-emerald-800 to-emerald-950",
  "from-rose-800 to-rose-950",
  "from-amber-800 to-amber-950",
  "from-sky-800 to-sky-950",
];

function getAvatarGradient(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++)
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
}

function getDriverInitials(firstName: string, lastName: string) {
  return `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();
}

function formatDepDate(iso: string) {
  const d = new Date(iso);
  return {
    dateShort: d.getDate().toString(),
    monthShort: d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase(),
    year: d.getFullYear().toString(),
    full: d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    time: d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
  };
}

// ─── StarDisplay ──────────────────────────────────────────────────────────────

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
          className={`${sz} ${
            i < rating ? "text-amber-400" : "text-slate-700"
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

// ─── StatusBadge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  if (status === "completed")
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
        <CheckCircle2 className="w-3 h-3" /> Completed
      </span>
    );
  if (status === "cancelled")
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border bg-red-500/10 text-red-400 border-red-500/20">
        <XCircle className="w-3 h-3" /> Cancelled
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border bg-amber-500/10 text-amber-400 border-amber-500/20">
      <Clock className="w-3 h-3" /> {status}
    </span>
  );
}

// ─── Star Rater ───────────────────────────────────────────────────────────────

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

  if (submitted)
    return (
      <div className="flex items-center gap-2 text-[12px] text-emerald-400">
        <CheckCircle2 className="w-4 h-4" />
        Rating submitted — thank you!
      </div>
    );

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
                    : "text-slate-700 hover:text-slate-500"
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
            className="w-full bg-slate-800/80 border border-white/10 rounded-xl px-3 py-2.5 text-[13px] text-slate-200 placeholder:text-slate-500 resize-none focus:outline-none focus:border-blue-500/60 transition-colors"
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
  booking,
  expanded,
  onToggle,
  onRate,
}: {
  booking: Booking;
  expanded: boolean;
  onToggle: () => void;
  onRate: (id: string, rating: number, review: string) => void;
}) {
  const [localRating, setLocalRating] = useState<number | undefined>(undefined);
  const [localReview, setLocalReview] = useState<string | undefined>(undefined);

  const trip = booking.trip;
  const driver = trip.driver;
  const driverName = `${driver.personalInfo.firstName} ${driver.personalInfo.lastName}`;
  const initials = getDriverInitials(
    driver.personalInfo.firstName,
    driver.personalInfo.lastName
  );
  const avatarBg = getAvatarGradient(driver._id);
  const vehicleLabel = `${trip.vehicle.make} ${trip.vehicle.model}`;
  const vehicleColor = trip.vehicle.color;
  const plate = trip.vehicle.plateNumber;
  const { dateShort, monthShort, full, time } = formatDepDate(
    trip.departureTime
  );
  const isCancelled = booking.status === "cancelled";
  const isCompleted =
    trip.status === "completed" || booking.status === "confirmed";
  const ref = `BR-${booking._id.slice(-8).toUpperCase()}`;

  return (
    <div
      className={`relative rounded-2xl border transition-all duration-200 overflow-hidden ${
        expanded
          ? "border-blue-500/40 bg-slate-900/60 shadow-lg shadow-blue-500/5"
          : "border-white/5 bg-slate-900/60 hover:border-white/10 hover:bg-slate-800/50"
      }`}
    >
      {expanded && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      )}

      {/* ── Header ── */}
      <div
        className="flex items-start gap-4 p-5 cursor-pointer select-none"
        onClick={onToggle}
      >
        {/* Date block */}
        <div
          className={`flex-shrink-0 w-14 rounded-xl text-center py-2.5 border ${
            isCancelled
              ? "bg-white/5 border-white/5 opacity-60"
              : expanded
              ? "bg-blue-600/20 border-blue-500/20"
              : "bg-white/5 border-white/5"
          }`}
        >
          <div
            className={`font-black text-[22px] leading-none ${
              isCancelled ? "text-slate-600" : "text-white"
            }`}
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {dateShort}
          </div>
          <div className="text-[11px] font-semibold uppercase tracking-wide mt-0.5 text-slate-500">
            {monthShort}
          </div>
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0">
          {/* Driver row */}
          <div className="flex items-center gap-2 mb-1">
            <div
              className={`w-7 h-7 rounded-full bg-gradient-to-br ${
                isCancelled ? "from-slate-700 to-slate-800" : avatarBg
              } flex items-center justify-center text-[10px] font-bold text-blue-300 border border-white/10 flex-shrink-0`}
            >
              {initials}
            </div>
            <span
              className={`font-semibold text-[15px] tracking-tight truncate ${
                isCancelled ? "text-slate-500" : "text-white"
              }`}
            >
              {driverName}
            </span>
          </div>

          {/* Route */}
          <div className="flex items-center gap-1.5 text-[13px] mb-2">
            <span
              className={`font-medium truncate capitalize ${
                isCancelled ? "text-slate-600" : "text-slate-300"
              }`}
            >
              {trip.origin.city}
            </span>
            <svg
              className={`w-3.5 h-3.5 flex-shrink-0 ${
                isCancelled ? "text-slate-700" : "text-blue-500"
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
              className={`font-medium truncate capitalize ${
                isCancelled ? "text-slate-600" : "text-blue-400"
              }`}
            >
              {trip.destination.city}
            </span>
          </div>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5 text-[12px] text-slate-500">
              <Clock className="w-3.5 h-3.5 text-slate-600" />
              {full} · {time}
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-slate-500">
              <Car className="w-3.5 h-3.5 text-slate-600" />
              {vehicleLabel} · {vehicleColor}
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-slate-500">
              {booking.seatsBooked} seat{booking.seatsBooked > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Right: status + price + rating + chevron */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0 ml-2">
          <StatusBadge status={booking.status} />
          <div className="text-right">
            <div
              className={`font-black text-[20px] leading-none ${
                isCancelled ? "text-slate-600 line-through" : "text-blue-400"
              }`}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              ₦{booking.totalPrice.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-600 mt-0.5 capitalize">
              {booking.paymentInfo.paymentStatus}
            </div>
          </div>
          {localRating && !isCancelled && <StarDisplay rating={localRating} />}
          <ChevronDown
            className={`w-4 h-4 text-slate-600 transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* ── Expanded Panel ── */}
      {expanded && (
        <div className="border-t border-white/5 px-5 pb-5 pt-4 space-y-4">
          {/* Trip details grid */}
          <div className="grid grid-cols-3 gap-3">
            {[
              {
                icon: <MapPin className="w-3.5 h-3.5" />,
                label: "From",
                value: trip.origin.address,
              },
              {
                icon: <MapPin className="w-3.5 h-3.5" />,
                label: "To",
                value: trip.destination.address,
              },
              {
                icon: <Clock className="w-3.5 h-3.5" />,
                label: "Departed",
                value: `${full}, ${time}`,
              },
              {
                icon: <Car className="w-3.5 h-3.5" />,
                label: "Vehicle",
                value: `${vehicleLabel} · ${vehicleColor}`,
              },
              {
                icon: <TrendingUp className="w-3.5 h-3.5" />,
                label: "Plate No.",
                value: plate,
              },
              {
                icon: <Banknote className="w-3.5 h-3.5" />,
                label: "Paid",
                value: isCancelled
                  ? "Not charged"
                  : `₦${booking.totalPrice.toLocaleString()}`,
                highlight: !isCancelled,
              },
            ].map(({ icon, label, value, highlight }) => (
              <div
                key={label}
                className={`rounded-xl p-3 border ${
                  highlight
                    ? "bg-blue-600/10 border-blue-500/20"
                    : "bg-white/5 border-white/5"
                }`}
              >
                <div
                  className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider mb-1.5 ${
                    highlight ? "text-blue-500" : "text-slate-600"
                  }`}
                >
                  {icon}
                  {label}
                </div>
                <div
                  className={`text-[13px] font-semibold leading-snug break-words ${
                    highlight
                      ? "text-blue-400 text-[16px] font-black"
                      : "text-slate-300"
                  }`}
                  style={highlight ? { fontFamily: "'Syne', sans-serif" } : {}}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Stops */}
          {trip.stops.length > 0 && (
            <div className="rounded-xl bg-white/5 border border-white/5 px-4 py-3">
              <div className="text-[11px] font-semibold text-slate-600 uppercase tracking-widest mb-2">
                Stops ({trip.stops.length})
              </div>
              <div className="space-y-1.5">
                {trip.stops.map((stop, i) => (
                  <div
                    key={stop._id ?? i}
                    className="flex items-center gap-2 text-[12px] text-slate-400"
                  >
                    <div className="w-4 h-4 rounded-full bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-[8px] font-bold text-amber-400 flex-shrink-0">
                      {i + 1}
                    </div>
                    <span className="truncate">{stop.address}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preferences */}
          <div className="flex flex-wrap gap-2">
            {trip.preferences.instantBooking && (
              <span className="text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full">
                ⚡ Instant
              </span>
            )}
            {trip.preferences.smokingAllowed && (
              <span className="text-[10px] font-semibold bg-white/5 text-slate-500 border border-white/5 px-2 py-0.5 rounded-full">
                🚬 Smoking OK
              </span>
            )}
            {trip.preferences.petsAllowed && (
              <span className="text-[10px] font-semibold bg-white/5 text-slate-500 border border-white/5 px-2 py-0.5 rounded-full">
                🐾 Pets OK
              </span>
            )}
            <span className="text-[10px] font-semibold bg-white/5 text-slate-500 border border-white/5 px-2 py-0.5 rounded-full">
              🧳 {trip.preferences.luggagePolicy}
            </span>
          </div>

          {/* Reference */}
          <div className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/5 px-4 py-3">
            <div className="flex-1">
              <div className="text-[11px] font-semibold text-slate-600 uppercase tracking-widest mb-0.5">
                Booking Reference
              </div>
              <div
                className="font-mono text-[14px] font-bold text-slate-400 tracking-widest"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {ref}
              </div>
            </div>
          </div>

          {/* Rate trip — completed + unrated */}
          {!isCancelled && !localRating && (
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4">
              <div
                className="flex items-center gap-2 text-[13px] font-bold text-white mb-1"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                <Star className="w-4 h-4 text-amber-400" />
                Rate this trip
              </div>
              <div className="text-[12px] text-slate-500 mb-3">
                How was your journey with {driverName}?
              </div>
              <StarRater
                onRate={(rating, review) => {
                  setLocalRating(rating);
                  setLocalReview(review);
                  onRate(booking._id, rating, review);
                }}
              />
            </div>
          )}

          {/* Rating already submitted */}
          {!isCancelled && localRating && (
            <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
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
              {localReview && (
                <div className="flex items-start gap-2 mt-2">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-600 mt-0.5 flex-shrink-0" />
                  <p className="text-[12px] text-slate-400 italic">
                    "{localReview}"
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Cancelled banner */}
          {isCancelled && (
            <div className="rounded-xl border border-red-500/15 bg-red-500/5 px-4 py-3 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <div>
                <div className="text-[13px] font-semibold text-red-400">
                  Trip was cancelled
                </div>
                <div className="text-[12px] text-slate-500">
                  You were not charged for this trip.
                </div>
              </div>
            </div>
          )}

          {/* CTAs */}
          <div className="flex gap-2 pt-1">
            <button className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/5 text-slate-300 font-semibold text-[13px] py-2.5 rounded-xl hover:border-white/10 hover:bg-white/10 transition-all">
              <Search className="w-4 h-4" />
              Book Same Route
            </button>
            {!isCancelled && (
              <button className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/5 text-slate-300 font-semibold text-[13px] py-2.5 rounded-xl hover:border-white/10 hover:bg-white/10 transition-all">
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

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function TripHistory() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const bookings = useAppSelector(selectBookedTrips);
  const isLoading = useAppSelector(selectBookedTripsLoading);

  const [filter, setFilter] = useState<SortFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [showSort, setShowSort] = useState(false);

  // ── Fetch on mount ────────────────────────────────────────
  useEffect(() => {
    if (!token) return;
    const load = async () => {
      dispatch(setBookedTripsLoading(true));
      try {
        const result = await getBookedTrips(token);
        dispatch(setBookedTrips(result.data.bookings));
      } catch (_) {
        // silently fail
      } finally {
        dispatch(setBookedTripsLoading(false));
      }
    };
    load();
  }, [token, dispatch]);

  function handleRate(id: string, rating: number, _review: string) {
    setRatings((r) => ({ ...r, [id]: rating }));
  }

  // ── Filter — show only past/finished bookings ─────────────
  const historyBookings = bookings.filter(
    (b) =>
      b.status === "cancelled" ||
      b.trip.status === "completed" ||
      b.trip.status === "scheduled"
  );

  const filteredBookings = historyBookings
    .filter((b) => {
      if (filter === "completed") return b.status !== "cancelled";
      if (filter === "cancelled") return b.status === "cancelled";
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.trip.departureTime).getTime();
      const dateB = new Date(b.trip.departureTime).getTime();
      if (sortOrder === "newest") return dateB - dateA;
      if (sortOrder === "oldest") return dateA - dateB;
      if (sortOrder === "highest") return b.totalPrice - a.totalPrice;
      if (sortOrder === "lowest") return a.totalPrice - b.totalPrice;
      return 0;
    });

  // ── Stats ─────────────────────────────────────────────────
  const completedBookings = historyBookings.filter(
    (b) => b.status !== "cancelled"
  );
  const cancelledBookings = historyBookings.filter(
    (b) => b.status === "cancelled"
  );
  const totalSpent = completedBookings.reduce((s, b) => s + b.totalPrice, 0);

  const uniqueCities = new Set(
    completedBookings.flatMap((b) => [
      b.trip.origin.city,
      b.trip.destination.city,
    ])
  ).size;

  const ratedTrips = historyBookings.filter((b) => ratings[b._id]);
  const avgRating =
    ratedTrips.length > 0
      ? (
          ratedTrips.reduce((s, b) => s + (ratings[b._id] ?? 0), 0) /
          ratedTrips.length
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
        .trip-history-root { font-family: 'DM Sans', sans-serif; background: #0f172a; color: #cbd5e1; min-height: 100vh; }
        .trip-enter { animation: tripIn 0.25s ease-out both; }
        @keyframes tripIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .trip-history-root ::-webkit-scrollbar { width: 4px; }
        .trip-history-root ::-webkit-scrollbar-track { background: transparent; }
        .trip-history-root ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
      `}</style>

      <div className="trip-history-root">
        <div className="max-w-[780px] lg:max-w-[1100px] mx-auto px-6 py-8">
          {/* ── Header ── */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1
                className="text-[28px] font-black text-white leading-tight tracking-tight flex items-center gap-3"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                <Clock className="w-7 h-7 text-blue-500" />
                Trip History
              </h1>
              <p className="text-slate-500 text-[14px] mt-1">
                All your past journeys and ratings
              </p>
            </div>
            
          </div>

          {/* ── Loading state ── */}
          {isLoading && (
            <div className="flex items-center justify-center py-20 gap-3 text-slate-400">
              <svg
                className="w-5 h-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeOpacity="0.3"
                />
                <path
                  d="M12 2a10 10 0 0110 10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-[14px] font-medium">
                Loading trip history...
              </span>
            </div>
          )}

          {!isLoading && (
            <>
              {/* ── Stats ── */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {[
                  {
                    label: "Total Trips",
                    value: completedBookings.length,
                    sub: `${cancelledBookings.length} cancelled`,
                    color: "from-blue-600/20 to-blue-600/5 border-blue-500/20",
                    valueColor: "text-blue-400",
                  },
                  {
                    label: "Total Spent",
                    value: `₦${totalSpent.toLocaleString()}`,
                    sub: "on completed trips",
                    color: "from-white/5 to-white/[0.02] border-white/5",
                    valueColor: "text-white",
                  },
                  {
                    label: "Cities Visited",
                    value: uniqueCities,
                    sub: "unique destinations",
                    color: "from-white/5 to-white/[0.02] border-white/5",
                    valueColor: "text-white",
                  },
                  {
                    label: "Avg Rating Given",
                    value: avgRating === "—" ? "—" : `${avgRating} ★`,
                    sub: `${ratedTrips.length} trips rated`,
                    color:
                      "from-amber-500/10 to-amber-500/5 border-amber-500/20",
                    valueColor: "text-amber-400",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className={`rounded-2xl border bg-gradient-to-br ${s.color} px-4 py-4`}
                  >
                    <div className="text-[12px] text-slate-500 font-medium mb-2">
                      {s.label}
                    </div>
                    <div
                      className={`font-black text-[24px] leading-none mb-1 ${s.valueColor}`}
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {s.value}
                    </div>
                    <div className="text-[11px] text-slate-600">{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* ── Filters + Sort ── */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex gap-2">
                  {(
                    [
                      {
                        key: "all",
                        label: "All",
                        count: historyBookings.length,
                      },
                      {
                        key: "completed",
                        label: "Completed",
                        count: completedBookings.length,
                      },
                      {
                        key: "cancelled",
                        label: "Cancelled",
                        count: cancelledBookings.length,
                      },
                    ] as { key: SortFilter; label: string; count: number }[]
                  ).map(({ key, label, count }) => (
                    <button
                      key={key}
                      onClick={() => setFilter(key)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold border transition-all ${
                        filter === key
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-transparent text-slate-500 border-white/5 hover:border-blue-500/30 hover:text-slate-300"
                      }`}
                    >
                      {label}
                      <span
                        className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                          filter === key
                            ? "bg-white/20 text-white"
                            : "bg-white/5 text-slate-500"
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
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] font-semibold border border-white/5 text-slate-500 hover:border-blue-500/30 hover:text-slate-300 transition-all"
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
                    <div className="absolute right-0 top-full mt-2 bg-slate-900 border border-white/5 rounded-xl overflow-hidden shadow-xl z-10 w-40">
                      {(
                        Object.entries(sortLabels) as [SortOrder, string][]
                      ).map(([key, label]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setSortOrder(key);
                            setShowSort(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-[12px] font-medium transition-all ${
                            sortOrder === key
                              ? "bg-blue-600/20 text-blue-400"
                              : "text-slate-400"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* ── Results meta ── */}
              {filteredBookings.length > 0 && (
                <div className="flex items-center gap-2 text-[13px] text-slate-500 mb-4">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse inline-block" />
                  <span>
                    <span className="text-white font-semibold">
                      {filteredBookings.length} trip
                      {filteredBookings.length !== 1 ? "s" : ""}
                    </span>
                    {filter !== "all" && ` · ${filter}`} · sorted by{" "}
                    {sortLabels[sortOrder].toLowerCase()}
                  </span>
                </div>
              )}

              {/* ── Trip Cards ── */}
              {filteredBookings.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 rounded-full border border-white/5 bg-slate-900/60 flex items-center justify-center mb-5 opacity-70">
                    <Clock className="w-7 h-7 text-slate-600" />
                  </div>
                  <div
                    className="text-[16px] font-bold text-slate-500 mb-1"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    No trips found
                  </div>
                  <div className="text-[13px] text-slate-600">
                    {filter === "cancelled"
                      ? "You have no cancelled trips"
                      : "Your completed trips will appear here"}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {filteredBookings.map((booking, i) => {
                    const isExpanded = expandedId === booking._id;
                    return (
                      <div
                        key={booking._id}
                        className={`trip-enter ${
                          isExpanded ? "lg:col-span-2" : ""
                        }`}
                        style={{ animationDelay: `${i * 60}ms` }}
                      >
                        <TripHistoryCard
                          booking={booking}
                          expanded={isExpanded}
                          onToggle={() =>
                            setExpandedId(isExpanded ? null : booking._id)
                          }
                          onRate={handleRate}
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ── Footer ── */}
              {filteredBookings.length > 0 && (
                <div className="flex items-center justify-center gap-2 mt-8 text-[12px] text-slate-700">
                  <RotateCcw className="w-3.5 h-3.5" />
                  {historyBookings.length} booking
                  {historyBookings.length !== 1 ? "s" : ""} loaded from server
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
