"use client";

import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectTripHistory } from "@/store/slices/tripSlice";
import { selectToken } from "@/store/slices/authSlice";
import { getTripBookings, TripBookingPassenger } from "@/lib/api";
import type { Trip } from "@/lib/api";

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterTab = "all" | "upcoming" | "past";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  "bg-blue-500", "bg-violet-500", "bg-rose-500", "bg-amber-500",
  "bg-teal-500", "bg-emerald-500", "bg-indigo-500", "bg-orange-500",
];

function formatDepDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function formatDepTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit", minute: "2-digit",
  });
}

function getDateParts(iso: string) {
  const d = new Date(iso);
  return {
    dateShort: d.getDate().toString(),
    monthShort: d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase(),
  };
}

function getVehicleLabel(vehicle: Trip["vehicle"]): string {
  if (typeof vehicle === "object") return `${vehicle.make} ${vehicle.model}`;
  return "Vehicle";
}

// ─── PassengerCard ────────────────────────────────────────────────────────────

function PassengerCard({ passenger, index, isCompleted }: {
  passenger: TripBookingPassenger;
  index: number;
  isCompleted: boolean;
}) {
  const firstName = passenger.rider.firstName ?? "";
  const lastName = passenger.rider.lastName ?? "";
  const fullName = `${firstName} ${lastName}`.trim() || "Unknown Passenger";
  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || "??";
  const color = AVATAR_COLORS[index % AVATAR_COLORS.length];
  const shortRef = `BR-${passenger.bookingId.slice(-6).toUpperCase()}`;

  const statusMap: Record<string, { label: string; cls: string }> = {
    confirmed: { label: "Confirmed", cls: "bg-blue-50 text-blue-600 border border-blue-200" },
    pending:   { label: "Pending",   cls: "bg-amber-50 text-amber-500 border border-amber-200" },
    cancelled: { label: "Cancelled", cls: "bg-red-50 text-red-400 border border-red-200" },
    completed: { label: "Completed", cls: "bg-emerald-50 text-emerald-600 border border-emerald-200" },
  };
  const statusStyle = statusMap[passenger.status] ?? statusMap.pending;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 hover:border-blue-200 hover:shadow-sm transition-all duration-150">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className={`w-11 h-11 rounded-full ${color} flex items-center justify-center font-bold text-[13px] text-white flex-shrink-0 shadow-sm`}>
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          {/* Name + status */}
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <span className="font-semibold text-[14px] text-slate-800 truncate">{fullName}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${statusStyle.cls}`}>
              {statusStyle.label}
            </span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-1 text-[12px] text-slate-400 mb-2">
            <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.77a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .94h3a2 2 0 012 1.72c.111.501.248.996.41 1.48a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.484.162.979.299 1.48.41A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {passenger.rider.phoneNumber || "No phone"}
          </div>

          {/* Seats + amount + ref */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[12px] text-slate-500 flex items-center gap-1">
                <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
                {passenger.seatsBooked} seat{passenger.seatsBooked > 1 ? "s" : ""}
              </span>
              <span className="font-semibold text-[13px] text-slate-700">
                ₦{passenger.totalPrice.toLocaleString()}
              </span>
            </div>
            <span className="font-mono text-[11px] text-slate-400">{shortRef}</span>
          </div>
        </div>
      </div>

      {/* Action row — active trips only */}
      {!isCompleted && passenger.status !== "cancelled" && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
          <a
            href={`tel:${passenger.rider.phoneNumber}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 hover:border-blue-300 hover:text-blue-600 text-[12px] font-medium transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.77a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .94h3a2 2 0 012 1.72c.111.501.248.996.41 1.48a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.484.162.979.299 1.48.41A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Call
          </a>
          <a
            href={`https://wa.me/${passenger.rider.phoneNumber.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 hover:border-green-300 hover:text-green-600 text-[12px] font-medium transition-all"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}

// ─── TripSection ──────────────────────────────────────────────────────────────

function TripSection({ trip, expanded, onToggle, token }: {
  trip: Trip;
  expanded: boolean;
  onToggle: () => void;
  token: string | null;
}) {
  const [passengers, setPassengers] = useState<TripBookingPassenger[]>([]);
  const [loadingPassengers, setLoadingPassengers] = useState(false);
  const [passengersLoaded, setPassengersLoaded] = useState(false);
  const [passengerError, setPassengerError] = useState<string | null>(null);

  const isCompleted = trip.status === "completed";
  const booked = trip.totalSeats - trip.availableSeats;
  const { dateShort, monthShort } = getDateParts(trip.departureTime);
  const depDate = formatDepDate(trip.departureTime);
  const depTime = formatDepTime(trip.departureTime);
  const vehicleLabel = getVehicleLabel(trip.vehicle);
  const estimatedRevenue = booked * trip.pricePerSeat;
  const actualRevenue = passengers.reduce((s, p) => s + p.totalPrice, 0);

  const bookingAvatars = trip.bookings.slice(0, 4).map((id, i) => ({
    initials: id.slice(-2).toUpperCase(),
    color: AVATAR_COLORS[i % AVATAR_COLORS.length],
  }));

  async function handleToggle() {
    onToggle();
    if (
      !expanded &&
      trip.bookings.length > 0 &&
      !passengersLoaded &&
      !loadingPassengers &&
      token
    ) {
      setLoadingPassengers(true);
      setPassengerError(null);
      try {
        const result = await getTripBookings(trip._id, token);
        setPassengers(result.data);
        setPassengersLoaded(true);
      } catch (err: any) {
        setPassengerError(err?.message || "Failed to load passengers");
      } finally {
        setLoadingPassengers(false);
      }
    }
  }

  async function handleRetry() {
    if (!token) return;
    setLoadingPassengers(true);
    setPassengerError(null);
    try {
      const result = await getTripBookings(trip._id, token);
      setPassengers(result.data);
      setPassengersLoaded(true);
    } catch (err: any) {
      setPassengerError(err?.message || "Failed to load passengers");
    } finally {
      setLoadingPassengers(false);
    }
  }

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all duration-200 ${
      expanded
        ? "border-blue-300 shadow-md shadow-blue-100/50"
        : "border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm"
    }`}>
      {expanded && (
        <div className="h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      )}

      {/* ── Header ── */}
      <div
        className="flex flex-wrap md:flex-nowrap items-center gap-4 px-5 py-4 cursor-pointer select-none bg-white"
        onClick={handleToggle}
      >
        {/* Date block */}
        <div className={`flex-shrink-0 w-12 rounded-xl text-center py-2 border transition-all ${
          expanded ? "bg-blue-100 border-blue-200" : "bg-slate-50 border-slate-200"
        }`}>
          <div className="font-black text-[18px] leading-none text-slate-800" style={{ fontFamily: "'Syne',sans-serif" }}>
            {dateShort}
          </div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">{monthShort}</div>
        </div>

        {/* Route + meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-black text-[15px] text-blue-600 capitalize" style={{ fontFamily: "'Syne',sans-serif" }}>
              {trip.origin.city}
            </span>
            <svg className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" fill="none" viewBox="0 0 24 24">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span className="font-black text-[15px] text-slate-800 capitalize" style={{ fontFamily: "'Syne',sans-serif" }}>
              {trip.destination.city}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ml-1 capitalize ${
              trip.status === "completed" ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
              : trip.status === "active" ? "bg-blue-600 text-white"
              : trip.status === "scheduled" ? "bg-blue-50 text-blue-600 border border-blue-200"
              : "bg-red-50 text-red-400 border border-red-200"
            }`}>
              {trip.status}
            </span>
          </div>
          <div className="text-[12px] text-slate-400">
            {depDate} · {depTime} · {vehicleLabel}
          </div>
        </div>

        {/* Revenue */}
        <div className="w-[130px] flex-shrink-0 hidden md:block">
          <div className="text-[11px] text-slate-400 mb-1">
            {passengersLoaded ? "Actual Revenue" : "Est. Revenue"}
          </div>
          <div className="font-black text-[18px] text-emerald-600 leading-none" style={{ fontFamily: "'Syne',sans-serif" }}>
            ₦{(passengersLoaded ? actualRevenue : estimatedRevenue).toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            {booked} × ₦{trip.pricePerSeat.toLocaleString()}
          </div>
        </div>

        {/* Seat count */}
        <div className="flex-shrink-0 text-right hidden md:block">
          <div className="text-[11px] text-slate-400 mb-0.5">Passengers</div>
          <div className="font-black text-[20px] text-slate-800 leading-none" style={{ fontFamily: "'Syne',sans-serif" }}>
            {booked}
            <span className="text-[13px] font-medium text-slate-400">/{trip.totalSeats}</span>
          </div>
        </div>

        {/* Avatar stack */}
        <div className="flex -space-x-2 flex-shrink-0">
          {bookingAvatars.map((a, i) => (
            <div key={i} className={`w-7 h-7 rounded-full ${a.color} border-2 border-white flex items-center justify-center text-[9px] font-bold text-white`}>
              {a.initials}
            </div>
          ))}
          {trip.bookings.length > 4 && (
            <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[9px] font-semibold text-slate-500">
              +{trip.bookings.length - 4}
            </div>
          )}
          {trip.bookings.length === 0 && (
            <span className="text-[12px] text-slate-400 italic">No bookings</span>
          )}
        </div>

        {/* Chevron */}
        <svg className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>

      {/* ── Expanded panel ── */}
      {expanded && (
        <div className="border-t border-slate-100 px-5 pb-5 pt-4 bg-slate-50/40">

          {/* Loading */}
          {loadingPassengers && (
            <div className="flex items-center justify-center py-10 gap-3 text-slate-400">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <span className="text-[13px]">Loading passengers...</span>
            </div>
          )}

          {/* Error */}
          {passengerError && !loadingPassengers && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
              <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24">
                <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <div className="flex-1">
                <div className="text-[12px] font-semibold text-red-600">{passengerError}</div>
              </div>
              <button
                onClick={handleRetry}
                className="text-[11px] font-semibold text-red-500 hover:text-red-700 underline flex-shrink-0"
              >
                Retry
              </button>
            </div>
          )}

          {/* Passengers loaded */}
          {!loadingPassengers && passengersLoaded && (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="text-[13px] font-semibold text-slate-700 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" />
                  {passengers.length} passenger{passengers.length !== 1 ? "s" : ""} on this trip
                </div>
                {!isCompleted && passengers.length > 0 && (
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600 text-[12px] font-medium transition-all">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.77a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .94h3a2 2 0 012 1.72c.111.501.248.996.41 1.48a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.484.162.979.299 1.48.41A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      Call All
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 transition-all shadow-sm shadow-blue-200">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      Broadcast
                    </button>
                  </div>
                )}
              </div>

              {passengers.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center bg-white rounded-2xl border border-slate-200 border-dashed">
                  <div className="text-3xl mb-2 opacity-30">👥</div>
                  <div className="text-[13px] font-semibold text-slate-400">No passengers yet</div>
                  <div className="text-[12px] text-slate-400 mt-0.5">Passengers will appear here once they book</div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                  {passengers.map((passenger, i) => (
                    <PassengerCard
                      key={passenger.bookingId}
                      passenger={passenger}
                      index={i}
                      isCompleted={isCompleted}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* No bookings */}
          {!loadingPassengers && !passengersLoaded && !passengerError && trip.bookings.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 text-center bg-white rounded-2xl border border-slate-200 border-dashed">
              <div className="text-3xl mb-2 opacity-30">👥</div>
              <div className="text-[13px] font-semibold text-slate-400">No bookings yet</div>
              <div className="text-[12px] text-slate-400 mt-0.5">Passengers will appear here once they book</div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-xl border border-slate-200 bg-white flex items-center justify-center mb-4 shadow-sm">
        <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
      <div className="text-[15px] font-semibold text-slate-500 mb-1" style={{ fontFamily: "'Syne',sans-serif" }}>
        No trips found
      </div>
      <div className="text-[13px] text-slate-400 max-w-xs">
        Create and publish trips to start receiving passenger bookings
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function DriverPassengers() {
  const tripHistory = useAppSelector(selectTripHistory);
  const token = useAppSelector(selectToken);

  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [expandedId, setExpandedId] = useState<string | null>(
    tripHistory.length > 0 ? tripHistory[0]._id : null
  );
  const [search, setSearch] = useState("");

  const filtered = tripHistory.filter((t) => {
    if (activeFilter === "upcoming") return t.status === "scheduled" || t.status === "active";
    if (activeFilter === "past") return t.status === "completed" || t.status === "cancelled";
    return true;
  });

  const searchedTrips = search.trim()
    ? filtered.filter(
        (t) =>
          t.origin.city.toLowerCase().includes(search.toLowerCase()) ||
          t.destination.city.toLowerCase().includes(search.toLowerCase())
      )
    : filtered;

  const totalBookings = tripHistory.reduce((s, t) => s + t.bookings.length, 0);
  const totalPassengers = tripHistory.reduce((s, t) => s + (t.totalSeats - t.availableSeats), 0);
  const totalRevenue = tripHistory.reduce((s, t) => s + (t.totalSeats - t.availableSeats) * t.pricePerSeat, 0);
  const upcomingCount = tripHistory.filter((t) => t.status === "scheduled" || t.status === "active").length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
        .dp-root * { box-sizing: border-box; }
        .dp-root { font-family: 'DM Sans', sans-serif; background: #f8fafc; color: #1e293b; min-height: 100vh; }
        .dp-root ::-webkit-scrollbar { width: 4px; }
        .dp-root ::-webkit-scrollbar-track { background: transparent; }
        .dp-root ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .row-enter { animation: rowIn 0.22s ease-out both; }
        @keyframes rowIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <div className="dp-root">
        <div className="max-w-screen-xl mx-auto px-4 py-6 md:px-6 md:py-8">

          {/* ── Header ── */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-[26px] font-bold text-slate-900 tracking-tight flex items-center gap-2.5" style={{ fontFamily: "'Syne',sans-serif" }}>
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                Passengers
                {totalBookings > 0 && (
                  <span className="bg-blue-600 text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-full">
                    {totalBookings}
                  </span>
                )}
              </h1>
              <p className="text-slate-500 text-sm mt-1">View and manage passengers across all your trips</p>
            </div>

            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.6" />
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                placeholder="Search by city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all w-[220px]"
              />
            </div>
          </div>

          {/* ── Stats ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {[
              { label: "Total Bookings", value: totalBookings, sub: "Across all trips", color: "from-blue-50 to-white border-blue-100", vcolor: "text-blue-600" },
              { label: "Passengers Moved", value: totalPassengers, sub: "Seats filled", color: "from-emerald-50 to-white border-emerald-100", vcolor: "text-emerald-600" },
              { label: "Est. Revenue", value: `₦${totalRevenue.toLocaleString()}`, sub: "Based on seat price", color: "from-amber-50 to-white border-amber-100", vcolor: "text-amber-600" },
              { label: "Active Trips", value: upcomingCount, sub: "Taking bookings now", color: "from-violet-50 to-white border-violet-100", vcolor: "text-violet-600" },
            ].map((s) => (
              <div key={s.label} className={`rounded-2xl border bg-gradient-to-br ${s.color} px-4 py-4`}>
                <div className="text-[12px] text-slate-400 font-medium mb-2">{s.label}</div>
                <div className={`font-black text-[26px] leading-none mb-0.5 ${s.vcolor}`} style={{ fontFamily: "'Syne',sans-serif" }}>{s.value}</div>
                <div className="text-[11px] text-slate-400">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* ── Filter tabs ── */}
          <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-2">
            {([
              { key: "all" as FilterTab, label: "All Trips", count: tripHistory.length },
              { key: "upcoming" as FilterTab, label: "Upcoming", count: tripHistory.filter(t => t.status === "scheduled" || t.status === "active").length },
              { key: "past" as FilterTab, label: "Past Trips", count: tripHistory.filter(t => t.status === "completed" || t.status === "cancelled").length },
            ]).map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-medium border transition-all ${
                  activeFilter === key
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-slate-700"
                }`}
              >
                {label}
                <span className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                  activeFilter === key ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500"
                }`}>
                  {count}
                </span>
              </button>
            ))}
          </div>

          {/* ── Results meta ── */}
          {searchedTrips.length > 0 && (
            <div className="flex items-center gap-2 text-[13px] text-slate-400 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" />
              <span className="text-slate-700 font-semibold">
                {searchedTrips.length} trip{searchedTrips.length !== 1 ? "s" : ""}
              </span>
              {search && (
                <span>matching <span className="font-medium text-blue-600">"{search}"</span></span>
              )}
            </div>
          )}

          {/* ── Trip sections ── */}
          {searchedTrips.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="flex flex-col gap-3">
              {searchedTrips.map((trip, i) => (
                <div key={trip._id} className="row-enter" style={{ animationDelay: `${i * 60}ms` }}>
                  <TripSection
                    trip={trip}
                    token={token}
                    expanded={expandedId === trip._id}
                    onToggle={() => setExpandedId(expandedId === trip._id ? null : trip._id)}
                  />
                </div>
              ))}
            </div>
          )}

          {/* ── Footer ── */}
          {searchedTrips.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-8 text-[12px] text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              {totalBookings} booking{totalBookings !== 1 ? "s" : ""} loaded from server
            </div>
          )}

        </div>
      </div>
    </>
  );
}