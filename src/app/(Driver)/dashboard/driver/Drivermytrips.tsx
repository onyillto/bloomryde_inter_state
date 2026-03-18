"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setTripHistory,
  setTripLoading,
  setTripError,
  selectTripHistory,
  selectTripLoading,
  selectTripError,
  selectScheduledTrips,
  selectCompletedTrips,
  selectCancelledTrips,
} from "@/store/slices/tripSlice";
import { selectToken } from "@/store/slices/authSlice";
import { getMyTrips, Trip, TripVehicle } from "@/lib/api";

// ─── Types ────────────────────────────────────────────────────────────────────

type FilterTab = "all" | "scheduled" | "active" | "completed" | "cancelled";
type SortKey = "date" | "price" | "seats";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_MAP: Record<string, { label: string; cls: string; dot: string }> =
  {
    scheduled: {
      label: "Scheduled",
      cls: "bg-blue-600 text-white",
      dot: "bg-blue-400",
    },
    active: {
      label: "Active",
      cls: "bg-emerald-50 text-emerald-600 border border-emerald-200",
      dot: "bg-emerald-500",
    },
    completed: {
      label: "Completed",
      cls: "bg-emerald-50 text-emerald-600 border border-emerald-200",
      dot: "bg-emerald-500",
    },
    cancelled: {
      label: "Cancelled",
      cls: "bg-red-50 text-red-500 border border-red-200",
      dot: "bg-red-400",
    },
  };

function formatDate(iso: string) {
  const d = new Date(iso);
  return {
    dateShort: d.getDate().toString(),
    monthShort: d.toLocaleDateString("en-GB", { month: "short" }),
    full: d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    time: d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
  };
}

function getVehicleLabel(vehicle: TripVehicle | string): string {
  if (typeof vehicle === "object") {
    return `${vehicle.make} ${vehicle.model}`;
  }
  return "Vehicle";
}

function getVehiclePlate(vehicle: TripVehicle | string): string {
  if (typeof vehicle === "object") return vehicle.plateNumber;
  return "";
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SeatBar({ total, booked }: { total: number; booked: number }) {
  const pct = total > 0 ? (booked / total) * 100 : 0;
  const color =
    pct === 100
      ? "bg-emerald-500"
      : pct >= 50
      ? "bg-blue-500"
      : pct > 0
      ? "bg-amber-400"
      : "bg-slate-200";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[11px] font-semibold text-slate-500 min-w-[40px] text-right">
        {booked}/{total}
      </span>
    </div>
  );
}

// ─── Trip Row ─────────────────────────────────────────────────────────────────

function TripRow({
  trip,
  expanded,
  onToggle,
}: {
  trip: Trip;
  expanded: boolean;
  onToggle: () => void;
}) {
  const s = STATUS_MAP[trip.status] ?? STATUS_MAP["scheduled"];
  const { dateShort, monthShort, full, time } = formatDate(trip.departureTime);
  const booked = trip.totalSeats - trip.availableSeats;
  const open = trip.availableSeats;

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
        expanded
          ? "border-blue-300 bg-blue-50/30 shadow-md shadow-blue-100/50"
          : "border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm"
      }`}
    >
      {expanded && (
        <div className="h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      )}

      {/* ── Row header ── */}
      <div
        className="flex flex-wrap md:flex-nowrap items-center gap-4 px-5 py-4 cursor-pointer select-none"
        onClick={onToggle}
      >
        {/* Date block */}
        <div
          className={`flex-shrink-0 w-12 rounded-xl text-center py-2 border transition-all ${
            expanded
              ? "bg-blue-100 border-blue-200"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <div
            className="font-black text-[18px] leading-none text-slate-800"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            {dateShort}
          </div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">
            {monthShort}
          </div>
        </div>

        {/* Route */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="font-black text-[15px] text-blue-600 truncate"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              {trip.origin.city}
            </span>
            <svg
              className="w-3.5 h-3.5 text-slate-400 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <span
              className="font-black text-[15px] text-slate-800 truncate"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              {trip.destination.city}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[12px] text-slate-400">
            <span>{time}</span>
            <span>·</span>
            <span>{getVehicleLabel(trip.vehicle)}</span>
            {trip.stops.length > 0 && (
              <>
                <span>·</span>
                <span>
                  {trip.stops.length} stop{trip.stops.length > 1 ? "s" : ""}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Seat fill bar */}
        <div className="w-[110px] flex-shrink-0 hidden md:block">
          <div className="text-[11px] text-slate-400 mb-1.5 font-medium">
            Seat fill
          </div>
          <SeatBar total={trip.totalSeats} booked={booked} />
        </div>

        {/* Price */}
        <div className="w-[90px] flex-shrink-0 text-right hidden md:block">
          <div className="text-[11px] text-slate-400 mb-0.5">Per seat</div>
          <div
            className="font-black text-[16px] leading-none text-slate-800"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            ₦{trip.pricePerSeat.toLocaleString()}
          </div>
        </div>

        {/* Status badge */}
        <div className="flex-shrink-0">
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${s.cls}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${s.dot} inline-block`}
            />
            {s.label}
          </span>
        </div>

        {/* Chevron */}
        <svg
          className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ── Expanded detail ── */}
      {expanded && <TripDetailPanel trip={trip} />}
    </div>
  );
}

// ─── Trip Detail Panel ────────────────────────────────────────────────────────

function TripDetailPanel({ trip }: { trip: Trip }) {
  const [confirmCancel, setConfirmCancel] = useState(false);
  const { full, time } = formatDate(trip.departureTime);
  const booked = trip.totalSeats - trip.availableSeats;
  const open = trip.availableSeats;
  const isScheduled = trip.status === "scheduled";
  const isActive = trip.status === "active";
  const isDone = trip.status === "completed";
  const isCancelled = trip.status === "cancelled";
  const plate = getVehiclePlate(trip.vehicle);

  return (
    <div className="border-t border-slate-100 px-5 pb-5 pt-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        {/* Trip details grid */}
        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "Origin", value: trip.origin.address },
            { label: "Destination", value: trip.destination.address },
            { label: "Departure", value: `${full} · ${time}` },
            {
              label: "Vehicle",
              value: `${getVehicleLabel(trip.vehicle)}${
                plate ? ` · ${plate}` : ""
              }`,
            },
            {
              label: "Price / Seat",
              value: `₦${trip.pricePerSeat.toLocaleString()}`,
            },
            { label: "Trip ID", value: trip._id.slice(-8).toUpperCase() },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="bg-slate-50 rounded-xl p-3 border border-slate-100"
            >
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                {label}
              </div>
              <div className="text-[13px] font-semibold text-slate-700 leading-snug break-words">
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Seat map */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col">
          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
            Seat Map
          </div>
          <div className="grid grid-cols-4 gap-1.5 mb-3">
            {Array.from({ length: trip.totalSeats }).map((_, i) => (
              <div
                key={i}
                className={`h-7 rounded-[5px] flex items-center justify-center text-[9px] font-bold border ${
                  i < booked
                    ? "bg-red-50 text-red-400 border-red-200"
                    : "bg-blue-50 text-blue-300 border-blue-200"
                }`}
              >
                {i < booked ? "×" : "○"}
              </div>
            ))}
          </div>
          <div className="flex gap-3 text-[11px] mt-auto">
            <span className="flex items-center gap-1 text-red-400 font-semibold">
              <span className="w-2 h-2 rounded-sm bg-red-200 inline-block" />
              {booked} booked
            </span>
            <span className="flex items-center gap-1 text-blue-400 font-semibold">
              <span className="w-2 h-2 rounded-sm bg-blue-200 inline-block" />
              {open} open
            </span>
          </div>
        </div>
      </div>

      {/* Stops */}
      {trip.stops.length > 0 && (
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 mb-4">
          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
            Trip Stops ({trip.stops.length})
          </div>
          <div className="flex flex-col gap-2">
            {trip.stops.map((stop, i) => (
              <div
                key={stop._id ?? i}
                className="flex items-center gap-3 text-[13px]"
              >
                <div className="w-5 h-5 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-[9px] font-bold text-amber-600 flex-shrink-0">
                  {i + 1}
                </div>
                <span className="text-slate-600 font-medium truncate">
                  {stop.address}
                </span>
                <span className="text-slate-400 text-[12px] flex-shrink-0">
                  {stop.city}, {stop.state}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preferences */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { label: `🧳 ${trip.preferences.luggagePolicy}`, show: true },
          {
            label: "⚡ Instant Booking",
            show: trip.preferences.instantBooking,
          },
          { label: "🚬 Smoking OK", show: trip.preferences.smokingAllowed },
          { label: "🐾 Pets OK", show: trip.preferences.petsAllowed },
        ]
          .filter((p) => p.show)
          .map((p) => (
            <span
              key={p.label}
              className="text-[11px] font-semibold bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full"
            >
              {p.label}
            </span>
          ))}
      </div>

      {/* Description */}
      {trip.description && (
        <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 mb-4">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
            Notes
          </div>
          <p className="text-[13px] text-slate-600">{trip.description}</p>
        </div>
      )}

      {/* Completed earnings */}
      {isDone && (
        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-4 mb-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="text-[12px] font-semibold text-emerald-700 mb-0.5">
              Trip Completed
            </div>
            <div className="text-[11px] text-slate-500">
              {booked} passengers · ₦{trip.pricePerSeat.toLocaleString()} per
              seat
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-[11px] text-slate-400 mb-0.5">Max Earned</div>
            <div
              className="font-black text-[22px] text-emerald-600 leading-none"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              ₦{(booked * trip.pricePerSeat).toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {/* Cancelled notice */}
      {isCancelled && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 flex items-center gap-3 mb-4">
          <svg
            className="w-4 h-4 text-red-400 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          <div>
            <div className="text-[13px] font-semibold text-red-500">
              Trip Cancelled
            </div>
            <div className="text-[12px] text-slate-400">
              This trip was cancelled. No earnings recorded.
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      {/* <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
        {(isScheduled || isActive) && (
          <>
            <button className="flex-1 flex items-center justify-center gap-2 bg-white text-slate-600 font-medium text-[13px] py-2.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all">
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
              Edit Trip
            </button>
            {!confirmCancel ? (
              <button
                onClick={() => setConfirmCancel(true)}
                className="flex items-center justify-center gap-2 bg-red-50 text-red-400 font-medium text-[13px] py-2.5 px-4 rounded-xl border border-red-100 hover:bg-red-100 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M15 9l-6 6M9 9l6 6"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
                Cancel Trip
              </button>
            ) : (
              <div className="flex gap-1.5">
                <button
                  onClick={() => setConfirmCancel(false)}
                  className="text-[12px] font-medium text-slate-500 bg-slate-100 border border-slate-200 px-3 py-2 rounded-xl hover:bg-slate-200 transition-all"
                >
                  Keep
                </button>
                <button className="text-[12px] font-semibold text-white bg-red-500 px-3 py-2 rounded-xl hover:bg-red-400 transition-all">
                  Yes, Cancel
                </button>
              </div>
            )}
          </>
        )}

        {isDone && (
          <>
            <button className="flex-1 flex items-center justify-center gap-2 bg-white text-slate-600 font-medium text-[13px] py-2.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                <path
                  d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              Re-create Trip
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-white text-slate-600 font-medium text-[13px] py-2.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
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
              </svg>
              View Report
            </button>
          </>
        )}

        {isCancelled && (
          <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold text-[13px] py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-sm shadow-blue-200">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
              <path
                d="M12 5v14M5 12h14"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
            Create New Trip
          </button>
        )}
      </div> */}
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ filter }: { filter: FilterTab }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-xl border border-slate-200 bg-white flex items-center justify-center mb-4 shadow-sm">
        <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24">
          <path
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div
        className="text-[15px] font-semibold text-slate-500 mb-1"
        style={{ fontFamily: "'Syne',sans-serif" }}
      >
        {filter === "all" ? "No trips yet" : `No ${filter} trips`}
      </div>
      <div className="text-[13px] text-slate-400 max-w-xs">
        Trips will show up here once created
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function DriverMyTrips() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const trips = useAppSelector(selectTripHistory);
  const isLoading = useAppSelector(selectTripLoading);
  const error = useAppSelector(selectTripError);

  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [sortBy, setSortBy] = useState<SortKey>("date");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // ── Fetch trips on mount ──────────────────────────────────
  useEffect(() => {
    if (!token) return;
    const fetch = async () => {
      dispatch(setTripLoading(true));
      dispatch(setTripError(null));
      try {
        const result = await getMyTrips(token);
        dispatch(setTripHistory(result.data.trips));
        if (result.data.trips.length > 0) {
          setExpandedId(result.data.trips[0]._id);
        }
      } catch (err: any) {
        dispatch(setTripError(err?.message || "Failed to load trips"));
      } finally {
        dispatch(setTripLoading(false));
      }
    };
    fetch();
  }, [token, dispatch]);

  // ── Filter & sort ─────────────────────────────────────────
  const filtered =
    activeFilter === "all"
      ? trips
      : trips.filter((t) => t.status === activeFilter);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price") return b.pricePerSeat - a.pricePerSeat;
    if (sortBy === "seats")
      return (
        b.totalSeats - b.availableSeats - (a.totalSeats - a.availableSeats)
      );
    return (
      new Date(b.departureTime).getTime() - new Date(a.departureTime).getTime()
    );
  });

  // ── Derived stats ─────────────────────────────────────────
  const totalPassengers = trips.reduce(
    (s, t) => s + (t.totalSeats - t.availableSeats),
    0
  );
  const totalMaxEarnings = trips
    .filter((t) => t.status === "completed")
    .reduce(
      (s, t) => s + (t.totalSeats - t.availableSeats) * t.pricePerSeat,
      0
    );
  const activeCount = trips.filter(
    (t) => t.status === "scheduled" || t.status === "active"
  ).length;

  const filterDefs: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All Trips" },
    { key: "scheduled", label: "Scheduled" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
    { key: "cancelled", label: "Cancelled" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
        .mt-root * { box-sizing: border-box; }
        .mt-root { font-family: 'DM Sans', sans-serif; background: #f8fafc; color: #1e293b; min-height: 100vh; }
        .mt-root ::-webkit-scrollbar { width: 4px; }
        .mt-root ::-webkit-scrollbar-track { background: transparent; }
        .mt-root ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .row-enter { animation: rowIn 0.22s ease-out both; }
        @keyframes rowIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <div className="mt-root">
        <div className="max-w-screen-xl mx-auto px-4 py-6 md:px-6 md:py-8">
          {/* ── Header ── */}
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
                My Trips
                <span className="bg-blue-600 text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-full">
                  {trips.length}
                </span>
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Manage, track and review all your trips
              </p>
            </div>
            {/* <button
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[13px] px-4 py-2.5 rounded-xl shadow-md shadow-blue-200 hover:-translate-y-0.5 transition-all"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
              Create Trip
            </button> */}
          </div>

          {/* ── Error banner ── */}
          {error && (
            <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl px-5 py-3 mb-6">
              <svg
                className="w-4 h-4 text-red-500 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              <p className="text-[13px] text-red-600 font-medium">{error}</p>
            </div>
          )}

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
                Loading your trips...
              </span>
            </div>
          )}

          {!isLoading && (
            <>
              {/* ── Stats ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {[
                  {
                    label: "Total Trips",
                    value: trips.length,
                    sub: "All time",
                    color: "from-blue-50 to-white border-blue-100",
                    valueColor: "text-blue-600",
                  },
                  {
                    label: "Max Earnings",
                    value: `₦${totalMaxEarnings.toLocaleString()}`,
                    sub: "From completed",
                    color: "from-emerald-50 to-white border-emerald-100",
                    valueColor: "text-emerald-600",
                  },
                  {
                    label: "Passengers",
                    value: totalPassengers,
                    sub: "Moved in total",
                    color: "from-violet-50 to-white border-violet-100",
                    valueColor: "text-violet-600",
                  },
                  {
                    label: "Active Now",
                    value: activeCount,
                    sub: "Taking bookings",
                    color: "from-amber-50 to-white border-amber-100",
                    valueColor: "text-amber-600",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className={`rounded-2xl border bg-gradient-to-br ${s.color} px-4 py-4`}
                  >
                    <div className="text-[12px] text-slate-400 font-medium mb-2">
                      {s.label}
                    </div>
                    <div
                      className={`font-black text-[26px] leading-none mb-0.5 ${s.valueColor}`}
                      style={{ fontFamily: "'Syne',sans-serif" }}
                    >
                      {s.value}
                    </div>
                    <div className="text-[11px] text-slate-400">{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* ── Filters + Sort ── */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-5 gap-4 md:gap-0">
                <div className="flex gap-2 flex-wrap overflow-x-auto pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
                  {filterDefs.map(({ key, label }) => {
                    const count =
                      key === "all"
                        ? trips.length
                        : trips.filter((t) => t.status === key).length;
                    return (
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
                        <span
                          className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                            activeFilter === key
                              ? "bg-white/25 text-white"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-slate-400">Sort:</span>
                  <div className="flex bg-white border border-slate-200 rounded-xl p-0.5 gap-0.5">
                    {[
                      { key: "date" as SortKey, label: "Date" },
                      { key: "price" as SortKey, label: "Price" },
                      { key: "seats" as SortKey, label: "Seats" },
                    ].map((s) => (
                      <button
                        key={s.key}
                        onClick={() => setSortBy(s.key)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                          sortBy === s.key
                            ? "bg-blue-600 text-white shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Results meta ── */}
              {sorted.length > 0 && (
                <div className="flex items-center gap-2 text-[13px] text-slate-400 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" />
                  <span className="text-slate-700 font-semibold">
                    {sorted.length} trip{sorted.length !== 1 ? "s" : ""}
                  </span>
                  {activeFilter !== "all" && <span>· {activeFilter}</span>}
                </div>
              )}

              {/* ── Trip rows ── */}
              {sorted.length === 0 ? (
                <EmptyState filter={activeFilter} />
              ) : (
                <div className="flex flex-col gap-3">
                  {sorted.map((trip, i) => (
                    <div
                      key={trip._id}
                      className="row-enter"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <TripRow
                        trip={trip}
                        expanded={expandedId === trip._id}
                        onToggle={() =>
                          setExpandedId(
                            expandedId === trip._id ? null : trip._id
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* ── Footer ── */}
              {sorted.length > 0 && (
                <div className="flex items-center justify-center gap-2 mt-8 text-[12px] text-slate-400">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                  {trips.length} trip{trips.length !== 1 ? "s" : ""} loaded from
                  server
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
