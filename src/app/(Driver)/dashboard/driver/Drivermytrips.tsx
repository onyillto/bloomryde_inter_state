"use client";

import { useState } from "react";
import type { Trip } from "./DriverTypes";

// ─── Extended mock data ───────────────────────────────────────────────────────

type TripStatus = "published" | "draft" | "completed" | "cancelled";

type FullTrip = Omit<Trip, 'status'> & {
  status: TripStatus;
  earnings: number;
  duration: string;
  dateShort: string;
  monthShort: string;
};

const ALL_TRIPS: FullTrip[] = [
  {
    id: 1,
    from: "Lagos",
    to: "Abuja",
    date: "28 Feb 2026",
    dateShort: "28",
    monthShort: "Feb",
    departure: "6:00 AM",
    duration: "~8 hrs",
    totalSeats: 8,
    booked: 5,
    price: 5000,
    earnings: 25000,
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
    dateShort: "5",
    monthShort: "Mar",
    departure: "7:00 AM",
    duration: "~5 hrs",
    totalSeats: 8,
    booked: 2,
    price: 3500,
    earnings: 7000,
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
    dateShort: "10",
    monthShort: "Mar",
    departure: "5:30 AM",
    duration: "~7 hrs",
    totalSeats: 8,
    booked: 0,
    price: 6000,
    earnings: 0,
    vehicle: "Toyota Hiace",
    vehicleColor: "BLACK",
    status: "draft",
    passengers: [],
  },
  {
    id: 4,
    from: "Lagos",
    to: "Ibadan",
    date: "14 Feb 2026",
    dateShort: "14",
    monthShort: "Feb",
    departure: "8:00 AM",
    duration: "~2 hrs",
    totalSeats: 8,
    booked: 8,
    price: 2500,
    earnings: 20000,
    vehicle: "Toyota Hiace",
    vehicleColor: "BLACK",
    status: "completed",
    passengers: [
      { initials: "MO", color: "bg-blue-500" },
      { initials: "FA", color: "bg-rose-500" },
      { initials: "TK", color: "bg-amber-500" },
      { initials: "SB", color: "bg-violet-500" },
      { initials: "CE", color: "bg-teal-500" },
      { initials: "RI", color: "bg-indigo-500" },
      { initials: "AU", color: "bg-emerald-500" },
      { initials: "NL", color: "bg-orange-500" },
    ],
  },
  {
    id: 5,
    from: "Abuja",
    to: "Kaduna",
    date: "10 Feb 2026",
    dateShort: "10",
    monthShort: "Feb",
    departure: "7:30 AM",
    duration: "~2.5 hrs",
    totalSeats: 8,
    booked: 6,
    price: 3000,
    earnings: 18000,
    vehicle: "Toyota Hiace",
    vehicleColor: "BLACK",
    status: "completed",
    passengers: [
      { initials: "BU", color: "bg-blue-500" },
      { initials: "PC", color: "bg-violet-500" },
      { initials: "YA", color: "bg-amber-500" },
      { initials: "HK", color: "bg-emerald-500" },
      { initials: "ZM", color: "bg-rose-500" },
      { initials: "LN", color: "bg-teal-500" },
    ],
  },
  {
    id: 6,
    from: "Lagos",
    to: "Benin City",
    date: "2 Feb 2026",
    dateShort: "2",
    monthShort: "Feb",
    departure: "6:30 AM",
    duration: "~4 hrs",
    totalSeats: 8,
    booked: 3,
    price: 4000,
    earnings: 0,
    vehicle: "Toyota Hiace",
    vehicleColor: "BLACK",
    status: "cancelled",
    passengers: [
      { initials: "EI", color: "bg-blue-500" },
      { initials: "CO", color: "bg-rose-500" },
      { initials: "AB", color: "bg-amber-500" },
    ],
  },
];

type FilterTab = "all" | "published" | "draft" | "completed" | "cancelled";
type SortKey = "date" | "earnings" | "booked";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_MAP: Record<
  TripStatus,
  { label: string; cls: string; dot: string }
> = {
  published: {
    label: "Published",
    cls: "bg-blue-600 text-white",
    dot: "bg-blue-400",
  },
  draft: {
    label: "Draft",
    cls: "bg-slate-100 text-slate-500 border border-slate-200",
    dot: "bg-slate-400",
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
      <span className="text-[11px] font-semibold text-slate-500 min-w-[32px] text-right">
        {booked}/{total}
      </span>
    </div>
  );
}

function PassengerAvatars({
  passengers,
  max = 5,
}: {
  passengers: FullTrip["passengers"];
  max?: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-1.5">
        {passengers.slice(0, max).map((p, i) => (
          <div
            key={i}
            className={`w-6 h-6 rounded-full ${p.color} border-2 border-white flex items-center justify-center text-[9px] font-bold text-white`}
          >
            {p.initials}
          </div>
        ))}
        {passengers.length > max && (
          <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[9px] font-semibold text-slate-500">
            +{passengers.length - max}
          </div>
        )}
      </div>
      {passengers.length === 0 && (
        <span className="text-[12px] text-slate-400 italic">
          No passengers yet
        </span>
      )}
    </div>
  );
}

// ─── Trip Row (collapsed) ─────────────────────────────────────────────────────

function TripRow({
  trip,
  expanded,
  onToggle,
}: {
  trip: FullTrip;
  expanded: boolean;
  onToggle: () => void;
}) {
  const s = STATUS_MAP[trip.status];
  const open = trip.totalSeats - trip.booked;

  return (
    <div
      className={`rounded-2xl border transition-all duration-200 overflow-hidden
        ${
          expanded
            ? "border-blue-300 bg-blue-50/30 shadow-md shadow-blue-100/50"
            : "border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm"
        }`}
    >
      {expanded && (
        <div className="h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      )}

      {/* ── Row header ────────────────────────────────────── */}
      <div
        className="flex items-center gap-4 px-5 py-4 cursor-pointer select-none"
        onClick={onToggle}
      >
        {/* Date block */}
        <div
          className={`flex-shrink-0 w-12 rounded-xl text-center py-2 border transition-all
          ${
            expanded
              ? "bg-blue-100 border-blue-200"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <div
            className="font-black text-[18px] leading-none text-slate-800"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            {trip.dateShort}
          </div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">
            {trip.monthShort}
          </div>
        </div>

        {/* Route */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="font-black text-[15px] text-blue-600 truncate"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              {trip.from}
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
              {trip.to}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[12px] text-slate-400">
            <span>{trip.departure}</span>
            <span>·</span>
            <span>{trip.duration}</span>
            <span>·</span>
            <span>{trip.vehicle}</span>
          </div>
        </div>

        {/* Seat fill bar */}
        <div className="w-[110px] flex-shrink-0">
          <div className="text-[11px] text-slate-400 mb-1.5 font-medium">
            Seat fill
          </div>
          <SeatBar total={trip.totalSeats} booked={trip.booked} />
        </div>

        {/* Earnings */}
        <div className="w-[90px] flex-shrink-0 text-right">
          <div className="text-[11px] text-slate-400 mb-0.5">Earnings</div>
          <div
            className={`font-black text-[16px] leading-none ${
              trip.earnings > 0 ? "text-slate-800" : "text-slate-300"
            }`}
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            {trip.earnings > 0 ? `₦${trip.earnings.toLocaleString()}` : "—"}
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

      {/* ── Expanded Detail Panel ─────────────────────────── */}
      {expanded && <TripDetailPanel trip={trip} />}
    </div>
  );
}

// ─── Expanded Trip Detail ─────────────────────────────────────────────────────

function TripDetailPanel({ trip }: { trip: FullTrip }) {
  const [confirmCancel, setConfirmCancel] = useState(false);
  const open = trip.totalSeats - trip.booked;
  const isActive = trip.status === "published";
  const isDraft = trip.status === "draft";
  const isDone = trip.status === "completed";
  const isCancelled = trip.status === "cancelled";

  return (
    <div className="border-t border-slate-100 px-5 pb-5 pt-4">
      <div className="grid grid-cols-3 gap-4 mb-4">
        {/* Trip details grid */}
        <div className="col-span-2 grid grid-cols-3 gap-3">
          {[
            { label: "Pickup", value: trip.from },
            { label: "Drop-off", value: trip.to },
            { label: "Date & Time", value: `${trip.date}, ${trip.departure}` },
            {
              label: "Vehicle",
              value: `${trip.vehicle} · ${trip.vehicleColor}`,
            },
            { label: "Price / Seat", value: `₦${trip.price.toLocaleString()}` },
            { label: "Duration", value: trip.duration, highlight: false },
          ].map(({ label, value, highlight }) => (
            <div
              key={label}
              className="bg-slate-50 rounded-xl p-3 border border-slate-100"
            >
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                {label}
              </div>
              <div
                className={`text-[13px] font-semibold text-slate-700 leading-snug`}
              >
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Seat grid visual */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col">
          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
            Seat Map
          </div>
          <div className="grid grid-cols-4 gap-1.5 mb-3">
            {Array.from({ length: trip.totalSeats }).map((_, i) => (
              <div
                key={i}
                className={`h-7 rounded-[5px] flex items-center justify-center text-[9px] font-bold border
                ${
                  i < trip.booked
                    ? "bg-red-50 text-red-400 border-red-200"
                    : "bg-blue-50 text-blue-300 border-blue-200"
                }`}
              >
                {i < trip.booked ? "×" : "○"}
              </div>
            ))}
          </div>
          <div className="flex gap-3 text-[11px] mt-auto">
            <span className="flex items-center gap-1 text-red-400 font-semibold">
              <span className="w-2 h-2 rounded-sm bg-red-200 inline-block" />
              {trip.booked} booked
            </span>
            <span className="flex items-center gap-1 text-blue-400 font-semibold">
              <span className="w-2 h-2 rounded-sm bg-blue-200 inline-block" />
              {open} open
            </span>
          </div>
        </div>
      </div>

      {/* Passengers */}
      {trip.passengers.length > 0 && (
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-white p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[12px] font-bold text-slate-700 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" />
              Passengers · {trip.booked} confirmed
            </div>
            {isActive && (
              <button className="text-[12px] font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                Contact All →
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {trip.passengers.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 bg-white rounded-xl px-3 py-2.5 border border-slate-100"
              >
                <div
                  className={`w-8 h-8 rounded-full ${p.color} flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0`}
                >
                  {p.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] font-semibold text-slate-700">
                    Passenger {i + 1}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Seat {i + 1} · Cash
                  </div>
                </div>
                {isActive && (
                  <button className="text-slate-400 hover:text-blue-600 transition-colors flex-shrink-0">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.77a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .94h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Earnings summary — completed only */}
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
              {trip.booked} passengers · ₦{trip.price.toLocaleString()} per seat
              · Cash collected
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-[11px] text-slate-400 mb-0.5">
              Total Earned
            </div>
            <div
              className="font-black text-[22px] text-emerald-600 leading-none"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              ₦{trip.earnings.toLocaleString()}
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
              This trip was cancelled before departure. No earnings recorded.
            </div>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-2 pt-1">
        {isDraft && (
          <>
            <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold text-[13px] py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-sm shadow-blue-200 hover:-translate-y-0.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Publish Trip
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-600 font-medium text-[13px] py-2.5 rounded-xl hover:bg-slate-200 border border-slate-200 transition-all">
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
              Edit Draft
            </button>
            <button className="flex items-center justify-center gap-2 bg-red-50 text-red-400 font-medium text-[13px] py-2.5 px-4 rounded-xl border border-red-100 hover:bg-red-100 transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                <path
                  d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              Delete
            </button>
          </>
        )}

        {isActive && (
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
            <button className="flex-1 flex items-center justify-center gap-2 bg-white text-slate-600 font-medium text-[13px] py-2.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                <path
                  d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              View Passengers
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
                Cancel
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
      </div>
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
        {filter === "draft"
          ? "Drafts you create will appear here"
          : "Trips will show up here once created"}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function DriverMyTrips() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [sortBy, setSortBy] = useState<SortKey>("date");
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const filterDefs: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All Trips" },
    { key: "published", label: "Published" },
    { key: "draft", label: "Drafts" },
    { key: "completed", label: "Completed" },
    { key: "cancelled", label: "Cancelled" },
  ];

  const filtered =
    activeFilter === "all"
      ? ALL_TRIPS
      : ALL_TRIPS.filter((t) => t.status === activeFilter);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "earnings") return b.earnings - a.earnings;
    if (sortBy === "booked") return b.booked - a.booked;
    return b.id - a.id; // date proxy
  });

  const totalEarnings = ALL_TRIPS.filter(
    (t) => t.status === "completed"
  ).reduce((s, t) => s + t.earnings, 0);
  const totalPassengers = ALL_TRIPS.reduce((s, t) => s + t.booked, 0);

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
        <div className="max-w-[1100px] mx-auto px-6 py-8">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
                My Trips
                <span className="bg-blue-600 text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-full">
                  {ALL_TRIPS.length}
                </span>
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Manage, track and review all your trips
              </p>
            </div>
            <button
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
            </button>
          </div>

          {/* ── Stats ────────────────────────────────────────── */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              {
                label: "Total Trips",
                value: ALL_TRIPS.length,
                sub: "All time",
                color: "from-blue-50 to-white border-blue-100",
                valueColor: "text-blue-600",
              },
              {
                label: "Total Earnings",
                value: `₦${totalEarnings.toLocaleString()}`,
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
                value: ALL_TRIPS.filter((t) => t.status === "published").length,
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

          {/* ── Filters + Sort ────────────────────────────────── */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex gap-2 flex-wrap">
              {filterDefs.map(({ key, label }) => {
                const count =
                  key === "all"
                    ? ALL_TRIPS.length
                    : ALL_TRIPS.filter((t) => t.status === key).length;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveFilter(key)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-medium border transition-all
                      ${
                        activeFilter === key
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-slate-700"
                      }`}
                  >
                    {label}
                    <span
                      className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center
                      ${
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
                  { key: "earnings" as SortKey, label: "Earnings" },
                  { key: "booked" as SortKey, label: "Seats" },
                ].map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSortBy(s.key)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all
                      ${
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

          {/* ── Results meta ──────────────────────────────────── */}
          {sorted.length > 0 && (
            <div className="flex items-center gap-2 text-[13px] text-slate-400 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" />
              <span className="text-slate-700 font-semibold">
                {sorted.length} trip{sorted.length !== 1 ? "s" : ""}
              </span>
              {activeFilter !== "all" && ` · ${activeFilter}`}
            </div>
          )}

          {/* ── Trip Rows ─────────────────────────────────────── */}
          {sorted.length === 0 ? (
            <EmptyState filter={activeFilter} />
          ) : (
            <div className="flex flex-col gap-3">
              {sorted.map((trip, i) => (
                <div
                  key={trip.id}
                  className="row-enter"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <TripRow
                    trip={trip}
                    expanded={expandedId === trip.id}
                    onToggle={() =>
                      setExpandedId(expandedId === trip.id ? null : trip.id)
                    }
                  />
                </div>
              ))}
            </div>
          )}

          {/* ── Footer ───────────────────────────────────────── */}
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
              Last synced just now
            </div>
          )}
        </div>
      </div>
    </>
  );
}
