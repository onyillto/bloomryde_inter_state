"use client";

import { useState, useEffect } from "react";
import {
  FiBookmark,
  FiClock,
  FiMapPin,
  FiChevronDown,
  FiPhone,
  FiShare2,
  FiCheckCircle,
  FiXCircle,
  FiSearch,
  FiAlertCircle,
  FiArrowRight,
  FiCalendar,
  FiUsers,
  FiMessageCircle,
  FiMail,
  FiRotateCcw,
  FiShield,
  FiCopy,
  FiTruck,
} from "react-icons/fi";
import { BsWhatsapp, BsPhoneFill } from "react-icons/bs";
import { MdOutlineDirectionsCar } from "react-icons/md";
import { PiCurrencyNgnBold } from "react-icons/pi";
import { TbCreditCard } from "react-icons/tb";
import { RiSmartphoneLine } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setBookedTrips,
  setBookedTripsLoading,
  selectBookedTrips,
  selectBookedTripsLoading,
} from "@/store/slices/bookingSlice";
import { selectToken, selectRiderUser } from "@/store/slices/authSlice";
import { getBookedTrips, Booking, BookingStatus } from "@/lib/api";

// ─── Types ────────────────────────────────────────────────────────────────────

type Filter = "all" | "confirmed" | "pending" | "cancelled";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const AVATAR_GRADIENTS = [
  "from-blue-600/30 to-blue-900/60",
  "from-indigo-600/30 to-indigo-900/60",
  "from-amber-600/30 to-amber-900/60",
  "from-emerald-600/30 to-emerald-900/60",
  "from-violet-600/30 to-violet-900/60",
  "from-rose-600/30 to-rose-900/60",
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
    full: d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    time: d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
  };
}

// ─── StarRating ───────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${
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

function StatusBadge({ status }: { status: BookingStatus }) {
  const map: Record<
    BookingStatus,
    { cls: string; icon: React.ReactNode; label: string }
  > = {
    confirmed: {
      cls: "bg-blue-500/15 text-blue-400 border-blue-500/20",
      icon: <FiCheckCircle size={11} />,
      label: "Confirmed",
    },
    pending: {
      cls: "bg-amber-500/15 text-amber-400 border-amber-500/20",
      icon: <FiClock size={11} />,
      label: "Pending",
    },
    cancelled: {
      cls: "bg-red-500/15 text-red-400 border-red-500/20",
      icon: <FiXCircle size={11} />,
      label: "Cancelled",
    },
    completed: {
      cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
      icon: <FiCheckCircle size={11} />,
      label: "Completed",
    },
  };
  const { cls, icon, label } = map[status] ?? map.pending;
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border ${cls}`}
    >
      {icon} {label}
    </span>
  );
}

// ─── BookingCard ──────────────────────────────────────────────────────────────

function BookingCard({
  booking,
  expanded,
  onToggle,
  emergencyContactName,
}: {
  booking: Booking;
  expanded: boolean;
  onToggle: () => void;
  emergencyContactName?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const trip = booking.trip;
  const driver = trip.driver;
  const driverFirstName = driver.personalInfo.firstName;
  const driverLastName = driver.personalInfo.lastName;
  const driverName = `${driverFirstName} ${driverLastName}`;
  const driverPhone = driver.personalInfo.phoneNumber;
  const initials = getDriverInitials(driverFirstName, driverLastName);
  const avatarBg = getAvatarGradient(driver._id);
  const vehicleLabel = `${trip.vehicle.make} ${trip.vehicle.model}`;
  const vehicleColor = trip.vehicle.color;
  const plate = trip.vehicle.plateNumber;
  const { dateShort, monthShort, full, time } = formatDepDate(
    trip.departureTime
  );
  const ref = `BR-${booking._id.slice(-8).toUpperCase()}`;

  function copyRef() {
    navigator.clipboard.writeText(ref).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const isActive = booking.status !== "cancelled";

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
          className={`flex-shrink-0 w-14 rounded-xl text-center py-2.5 border transition-all ${
            expanded
              ? "bg-blue-600/20 border-blue-500/20"
              : "bg-white/5 border-white/5"
          }`}
        >
          <div
            className="font-black text-[22px] leading-none text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {dateShort}
          </div>
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide mt-0.5">
            {monthShort}
          </div>
        </div>

        {/* Driver + route + meta */}
        <div className="flex-1 min-w-0">
          {/* Driver row */}
          <div className="flex items-center gap-2 mb-1">
            <div
              className={`w-7 h-7 rounded-full bg-gradient-to-br ${avatarBg} flex items-center justify-center text-[10px] font-bold text-blue-300 border border-white/10 flex-shrink-0`}
            >
              {initials}
            </div>
            <span className="font-semibold text-[14px] text-white tracking-tight truncate">
              {driverName}
            </span>
          </div>

          {/* Route */}
          <div className="flex items-center gap-1.5 text-[13px] mb-2">
            <span className="text-slate-300 font-medium truncate capitalize">
              {trip.origin.city}
            </span>
            <FiArrowRight size={13} className="text-blue-400 flex-shrink-0" />
            <span className="text-blue-400 font-medium truncate capitalize">
              {trip.destination.city}
            </span>
          </div>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5 text-[12px] text-slate-500">
              <FiClock size={11} className="text-slate-600" />
              {time}
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-slate-500">
              <MdOutlineDirectionsCar size={13} className="text-slate-600" />
              {vehicleLabel} · {vehicleColor}
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-slate-500">
              <FiUsers size={11} className="text-slate-600" />
              {booking.seatsBooked} seat{booking.seatsBooked > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Right: status + price + chevron */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0">
          <StatusBadge status={booking.status} />
          <div className="text-right">
            <div
              className="font-black text-[20px] text-blue-400 leading-none"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              ₦{booking.totalPrice.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-600 mt-0.5">
              {booking.paymentInfo.paymentStatus}
            </div>
          </div>
          <FiChevronDown
            size={16}
            className={`text-slate-600 transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* ── Expanded Panel ── */}
      {expanded && (
        <div className="border-t border-white/5 px-5 pb-5 pt-4 space-y-4">
          {/* Details grid */}
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              {
                icon: <FiMapPin size={12} />,
                label: "Pickup",
                value: trip.origin.address,
              },
              {
                icon: <FiMapPin size={12} />,
                label: "Drop-off",
                value: trip.destination.address,
              },
              {
                icon: <FiCalendar size={12} />,
                label: "Departure",
                value: `${full}, ${time}`,
              },
              {
                icon: <MdOutlineDirectionsCar size={13} />,
                label: "Vehicle",
                value: `${vehicleLabel} · ${vehicleColor}`,
              },
              {
                icon: <FiShield size={12} />,
                label: "Plate No.",
                value: plate,
              },
              {
                icon: <PiCurrencyNgnBold size={13} />,
                label: "Total (Cash)",
                value: `₦${booking.totalPrice.toLocaleString()}`,
                highlight: true,
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
                    highlight ? "text-blue-400" : "text-slate-600"
                  }`}
                >
                  {icon} {label}
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
                ⚡ Instant Booking
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
                className="font-mono text-[13px] font-bold text-slate-300 tracking-widest"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {ref}
              </div>
            </div>
            <button
              onClick={copyRef}
              className={`flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                copied
                  ? "bg-blue-600/15 border-blue-500/30 text-blue-400"
                  : "bg-white/5 border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-200"
              }`}
            >
              {copied ? <FiCheckCircle size={13} /> : <FiCopy size={13} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Driver contact card */}
          {isActive && (
            <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-blue-600/5 p-4">
              <div className="flex items-center gap-1.5 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse inline-block" />
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-widest">
                  Driver Contact
                </span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="relative flex-shrink-0">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${avatarBg} flex items-center justify-center font-bold text-sm text-blue-300 border-2 border-blue-500/30`}
                  >
                    {initials}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border-2 border-[#0f172a]">
                    <FiCheckCircle
                      size={8}
                      className="text-white"
                      strokeWidth={3}
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[14px] text-white">
                    {driverName}
                  </div>
                  <div className="text-[12px] text-slate-500 mt-0.5">
                    {vehicleLabel} · {plate}
                  </div>
                </div>
                <div
                  className="font-black text-[14px] text-white tracking-wide flex-shrink-0"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {driverPhone}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold text-[13px] py-2.5 rounded-xl hover:bg-blue-500 transition-all hover:-translate-y-0.5 shadow-md shadow-blue-600/20">
                  <BsPhoneFill size={13} /> Call Driver
                </button>
                <button className="flex items-center justify-center gap-2 bg-white/5 text-slate-300 font-medium text-[13px] py-2.5 rounded-xl border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all">
                  <BsWhatsapp size={14} /> WhatsApp
                </button>
              </div>
            </div>
          )}

          {/* Share trip OR cancelled banner */}
          {isActive ? (
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4">
              <div
                className="text-[13px] font-semibold text-white mb-1 flex items-center gap-2"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                <FiShield size={14} className="text-blue-400" />
                Share Trip Details
              </div>
              <div className="text-[12px] text-slate-500 mb-3">
                {emergencyContactName
                  ? `Auto-share to ${emergencyContactName}`
                  : "Share with your emergency contact"}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: <BsWhatsapp size={14} />, label: "WhatsApp" },
                  { icon: <RiSmartphoneLine size={15} />, label: "SMS" },
                  { icon: <FiMail size={14} />, label: "Email" },
                ].map(({ icon, label }) => (
                  <button
                    key={label}
                    onClick={() => setShared(true)}
                    className={`flex flex-col items-center gap-1.5 py-2.5 rounded-xl border text-[11px] font-medium transition-all ${
                      shared
                        ? "border-blue-500/30 bg-blue-600/10 text-blue-400"
                        : "border-white/5 bg-white/5 text-slate-400 hover:border-blue-500/30 hover:bg-blue-600/10 hover:text-blue-400"
                    }`}
                  >
                    {icon} {label}
                  </button>
                ))}
              </div>
              {shared && (
                <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-blue-400">
                  <FiCheckCircle size={11} /> Trip details shared
                </div>
              )}
            </div>
          ) : (
            <div className="rounded-xl border border-red-500/15 bg-red-500/5 px-4 py-3 flex items-center gap-3">
              <FiAlertCircle size={18} className="text-red-400 flex-shrink-0" />
              <div>
                <div className="text-[13px] font-semibold text-red-400">
                  Trip Cancelled
                </div>
                <div className="text-[12px] text-slate-500">
                  This trip was cancelled. You can search for another ride.
                </div>
              </div>
            </div>
          )}

          {/* Bottom actions */}
          <div className="flex gap-2 pt-1">
            {!isActive ? (
              <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold text-[13px] py-2.5 rounded-xl hover:bg-blue-500 transition-all shadow-md shadow-blue-600/20 hover:-translate-y-0.5">
                <FiSearch size={14} /> Find Another Ride
              </button>
            ) : (
              <>
                <button className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/5 text-slate-300 font-medium text-[13px] py-2.5 rounded-xl hover:bg-white/10 hover:border-white/10 transition-all">
                  <FiShare2 size={14} /> Share Trip
                </button>
                <button
                  onClick={() => setCancelling(!cancelling)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 font-medium text-[13px] py-2.5 rounded-xl hover:bg-red-500/15 hover:border-red-500/30 transition-all"
                >
                  <FiXCircle size={14} /> Cancel Trip
                </button>
              </>
            )}
          </div>

          {/* Cancel confirm */}
          {cancelling && (
            <div
              className="rounded-xl border border-red-500/25 bg-red-500/8 p-4"
              style={{ animation: "bookingIn 0.2s ease-out both" }}
            >
              <div className="text-[13px] font-semibold text-red-400 mb-1 flex items-center gap-2">
                <FiAlertCircle size={14} /> Confirm Cancellation
              </div>
              <div className="text-[12px] text-slate-500 mb-3">
                Are you sure you want to cancel this booking? This cannot be
                undone.
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCancelling(false)}
                  className="flex-1 py-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 text-[12px] font-medium hover:bg-white/10 transition-all"
                >
                  Keep Booking
                </button>
                <button
                  onClick={() => setCancelling(false)}
                  className="flex-1 py-2 rounded-lg bg-red-500 text-white text-[12px] font-semibold hover:bg-red-400 transition-all"
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

// ─── EmptyState ───────────────────────────────────────────────────────────────

function EmptyState({ filter }: { filter: Filter }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-xl border border-white/5 bg-slate-900/60 flex items-center justify-center mb-5 opacity-50">
        <FiBookmark size={24} className="text-slate-600" />
      </div>
      <div
        className="text-[15px] font-semibold text-slate-500 mb-1"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        {filter === "all" ? "No bookings yet" : `No ${filter} bookings`}
      </div>
      <div className="text-[13px] text-slate-600 max-w-xs">
        {filter === "all"
          ? "Search for a ride to make your first booking"
          : `You have no ${filter} trips at the moment`}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function MyBookings() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const riderUser = useAppSelector(selectRiderUser);
  const bookings = useAppSelector(selectBookedTrips);
  const isLoading = useAppSelector(selectBookedTripsLoading);

  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const emergencyContactName = riderUser?.emergencyContact?.name;

  // ── Fetch booked trips on mount ───────────────────────────
  useEffect(() => {
    if (!token) return;
    const load = async () => {
      dispatch(setBookedTripsLoading(true));
      try {
        const result = await getBookedTrips(token);
        dispatch(setBookedTrips(result.data.bookings));
        if (result.data.bookings.length > 0) {
          setExpandedId(result.data.bookings[0]._id);
        }
      } catch (_) {
        // silently fail
      } finally {
        dispatch(setBookedTripsLoading(false));
      }
    };
    load();
  }, [token, dispatch]);

  // ── Derived stats ─────────────────────────────────────────
  const confirmedCount = bookings.filter(
    (b) => b.status === "confirmed"
  ).length;
  const totalSpent = bookings
    .filter((b) => b.status !== "cancelled")
    .reduce((s, b) => s + b.totalPrice, 0);
  const upcomingCount = bookings.filter(
    (b) => b.status === "confirmed" || b.status === "pending"
  ).length;

  const filterDefs: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All", count: bookings.length },
    {
      key: "confirmed",
      label: "Confirmed",
      count: bookings.filter((b) => b.status === "confirmed").length,
    },
    {
      key: "pending",
      label: "Pending",
      count: bookings.filter((b) => b.status === "pending").length,
    },
    {
      key: "cancelled",
      label: "Cancelled",
      count: bookings.filter((b) => b.status === "cancelled").length,
    },
  ];

  const filteredBookings =
    activeFilter === "all"
      ? bookings
      : bookings.filter((b) => b.status === activeFilter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
        .mb-root * { box-sizing: border-box; }
        .mb-root { font-family: 'DM Sans', sans-serif; background: #0f172a; color: #cbd5e1; min-height: 100vh; }
        .mb-root ::-webkit-scrollbar { width: 4px; }
        .mb-root ::-webkit-scrollbar-track { background: transparent; }
        .mb-root ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        .booking-enter { animation: bookingIn 0.25s ease-out both; }
        @keyframes bookingIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="mb-root">
        <div className="max-w-[780px] lg:max-w-[1100px] mx-auto px-6 py-8">
          {/* ── Header ── */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1
                className="text-[26px] font-bold text-white leading-tight tracking-tight flex items-center gap-2.5"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                <FiBookmark className="text-blue-400" size={24} />
                My Bookings
                {confirmedCount > 0 && (
                  <span className="bg-blue-600 text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-full">
                    {confirmedCount}
                  </span>
                )}
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Manage your upcoming and past trip bookings
              </p>
            </div>
            <button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[13px] px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 transition-all"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <FiSearch size={14} /> Find a Ride
            </button>
          </div>

          {/* ── Stats ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {[
              {
                label: "Total Trips",
                value: isLoading ? "—" : bookings.length,
                icon: <FiBookmark size={14} />,
                color: "from-blue-600/20 to-blue-600/5 border-blue-500/20",
                valueColor: "text-blue-400",
              },
              {
                label: "Total Spent",
                value: isLoading ? "—" : `₦${totalSpent.toLocaleString()}`,
                icon: <TbCreditCard size={15} />,
                color: "from-white/5 to-white/[0.02] border-white/5",
                valueColor: "text-white",
              },
              {
                label: "Upcoming",
                value: isLoading ? "—" : upcomingCount,
                icon: <FiCalendar size={14} />,
                color: "from-white/5 to-white/[0.02] border-white/5",
                valueColor: "text-white",
              },
              {
                label: "Confirmed",
                value: isLoading ? "—" : confirmedCount,
                icon: <FiCheckCircle size={14} />,
                color:
                  "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20",
                valueColor: "text-emerald-400",
              },
            ].map((s) => (
              <div
                key={s.label}
                className={`rounded-2xl border bg-gradient-to-br ${s.color} px-4 py-4`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] text-slate-500 font-medium">
                    {s.label}
                  </span>
                  <span className="text-slate-600">{s.icon}</span>
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
                Loading your bookings...
              </span>
            </div>
          )}

          {!isLoading && (
            <>
              {/* ── Filter Pills ── */}
              <div className="flex gap-2 flex-wrap mb-5">
                {filterDefs.map(({ key, label, count }) => (
                  <button
                    key={key}
                    onClick={() => setActiveFilter(key)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-medium border transition-all ${
                      activeFilter === key
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-transparent text-slate-500 border-white/5 hover:border-blue-500/30 hover:text-slate-300"
                    }`}
                  >
                    {label}
                    <span
                      className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                        activeFilter === key
                          ? "bg-white/20 text-white"
                          : "bg-white/5 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                ))}
              </div>

              {/* ── Results meta ── */}
              {filteredBookings.length > 0 && (
                <div className="flex items-center gap-2 text-[13px] text-slate-500 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse inline-block" />
                  <span>
                    <span className="text-white font-semibold">
                      {filteredBookings.length} booking
                      {filteredBookings.length !== 1 ? "s" : ""}
                    </span>
                    {activeFilter !== "all" && ` · ${activeFilter}`}
                  </span>
                </div>
              )}

              {/* ── Booking Cards ── */}
              {filteredBookings.length === 0 ? (
                <EmptyState filter={activeFilter} />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {filteredBookings.map((booking, i) => {
                    const isExpanded = expandedId === booking._id;
                    return (
                      <div
                        key={booking._id}
                        className={`booking-enter ${
                          isExpanded ? "lg:col-span-2" : ""
                        }`}
                        style={{ animationDelay: `${i * 60}ms` }}
                      >
                        <BookingCard
                          booking={booking}
                          expanded={isExpanded}
                          onToggle={() =>
                            setExpandedId(isExpanded ? null : booking._id)
                          }
                          emergencyContactName={emergencyContactName}
                        />
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ── Footer ── */}
              {filteredBookings.length > 0 && (
                <div className="flex items-center justify-center gap-2 mt-8 text-[12px] text-slate-700">
                  <FiRotateCcw size={12} />
                  {bookings.length} booking{bookings.length !== 1 ? "s" : ""}{" "}
                  loaded from server
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
