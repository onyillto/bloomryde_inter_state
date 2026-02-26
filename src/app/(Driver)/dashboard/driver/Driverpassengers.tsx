"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type PassengerStatus = "confirmed" | "pending" | "cancelled";

type Passenger = {
  id: number;
  initials: string;
  color: string;
  name: string;
  phone: string;
  seats: number;
  amountOwed: number;
  paid: boolean;
  status: PassengerStatus;
  tripId: number;
  rating?: number;
};

type TripGroup = {
  tripId: number;
  from: string;
  to: string;
  date: string;
  dateShort: string;
  monthShort: string;
  departure: string;
  status: "published" | "completed";
  totalSeats: number;
  passengers: Passenger[];
};

type FilterTab = "all" | "upcoming" | "past";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const TRIP_GROUPS: TripGroup[] = [
  {
    tripId: 1,
    from: "Lagos",
    to: "Abuja",
    date: "28 Feb 2026",
    dateShort: "28",
    monthShort: "Feb",
    departure: "6:00 AM",
    status: "published",
    totalSeats: 8,
    passengers: [
      {
        id: 1,
        initials: "AK",
        color: "bg-blue-500",
        name: "Amara Kolawole",
        phone: "+234 812 345 6789",
        seats: 1,
        amountOwed: 5000,
        paid: true,
        status: "confirmed",
        tripId: 1,
      },
      {
        id: 2,
        initials: "TB",
        color: "bg-violet-500",
        name: "Tunde Balogun",
        phone: "+234 803 221 4455",
        seats: 1,
        amountOwed: 5000,
        paid: false,
        status: "confirmed",
        tripId: 1,
      },
      {
        id: 3,
        initials: "NW",
        color: "bg-rose-500",
        name: "Ngozi Williams",
        phone: "+234 908 112 3344",
        seats: 2,
        amountOwed: 10000,
        paid: false,
        status: "pending",
        tripId: 1,
      },
      {
        id: 4,
        initials: "JI",
        color: "bg-amber-500",
        name: "Joseph Ike",
        phone: "+234 816 778 9900",
        seats: 1,
        amountOwed: 5000,
        paid: true,
        status: "confirmed",
        tripId: 1,
      },
      {
        id: 5,
        initials: "OA",
        color: "bg-teal-500",
        name: "Omotunde Adeyemi",
        phone: "+234 701 345 2211",
        seats: 1,
        amountOwed: 5000,
        paid: true,
        status: "confirmed",
        tripId: 1,
      },
    ],
  },
  {
    tripId: 2,
    from: "Abuja",
    to: "Enugu",
    date: "5 Mar 2026",
    dateShort: "5",
    monthShort: "Mar",
    departure: "7:00 AM",
    status: "published",
    totalSeats: 8,
    passengers: [
      {
        id: 6,
        initials: "JA",
        color: "bg-blue-500",
        name: "James Achebe",
        phone: "+234 810 556 7723",
        seats: 1,
        amountOwed: 3500,
        paid: false,
        status: "confirmed",
        tripId: 2,
      },
      {
        id: 7,
        initials: "KI",
        color: "bg-emerald-500",
        name: "Kemi Ibrahim",
        phone: "+234 907 334 1122",
        seats: 1,
        amountOwed: 3500,
        paid: true,
        status: "confirmed",
        tripId: 2,
      },
    ],
  },
  {
    tripId: 4,
    from: "Lagos",
    to: "Ibadan",
    date: "14 Feb 2026",
    dateShort: "14",
    monthShort: "Feb",
    departure: "8:00 AM",
    status: "completed",
    totalSeats: 8,
    passengers: [
      {
        id: 8,
        initials: "MO",
        color: "bg-blue-500",
        name: "Musa Okafor",
        phone: "+234 803 112 9988",
        seats: 1,
        amountOwed: 2500,
        paid: true,
        status: "confirmed",
        tripId: 4,
        rating: 5,
      },
      {
        id: 9,
        initials: "FA",
        color: "bg-rose-500",
        name: "Fatima Abubakar",
        phone: "+234 813 445 0011",
        seats: 1,
        amountOwed: 2500,
        paid: true,
        status: "confirmed",
        tripId: 4,
        rating: 4,
      },
      {
        id: 10,
        initials: "TK",
        color: "bg-amber-500",
        name: "Tobi Kadri",
        phone: "+234 908 771 2233",
        seats: 2,
        amountOwed: 5000,
        paid: true,
        status: "confirmed",
        tripId: 4,
        rating: 5,
      },
      {
        id: 11,
        initials: "SB",
        color: "bg-violet-500",
        name: "Stella Babatunde",
        phone: "+234 701 993 4455",
        seats: 1,
        amountOwed: 2500,
        paid: true,
        status: "confirmed",
        tripId: 4,
        rating: 5,
      },
      {
        id: 12,
        initials: "CE",
        color: "bg-teal-500",
        name: "Chike Eze",
        phone: "+234 816 224 6677",
        seats: 1,
        amountOwed: 2500,
        paid: true,
        status: "confirmed",
        tripId: 4,
        rating: 4,
      },
      {
        id: 13,
        initials: "RI",
        color: "bg-indigo-500",
        name: "Remi Idowu",
        phone: "+234 803 558 8899",
        seats: 1,
        amountOwed: 2500,
        paid: true,
        status: "confirmed",
        tripId: 4,
        rating: 5,
      },
    ],
  },
];

const STATUS_MAP: Record<PassengerStatus, { label: string; cls: string }> = {
  confirmed: {
    label: "Confirmed",
    cls: "bg-blue-50 text-blue-600 border border-blue-200",
  },
  pending: {
    label: "Pending",
    cls: "bg-amber-50 text-amber-500 border border-amber-200",
  },
  cancelled: {
    label: "Cancelled",
    cls: "bg-red-50 text-red-400 border border-red-200",
  },
};

// ─── StarRating ───────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${
            i <= rating ? "text-amber-400" : "text-slate-200"
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

// ─── PassengerCard ────────────────────────────────────────────────────────────

function PassengerCard({
  p,
  isCompleted,
}: {
  p: Passenger;
  isCompleted: boolean;
}) {
  const s = STATUS_MAP[p.status];
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 hover:border-blue-200 hover:shadow-sm transition-all duration-150">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div
          className={`w-11 h-11 rounded-full ${p.color} flex items-center justify-center font-bold text-[13px] text-white flex-shrink-0 shadow-sm`}
        >
          {p.initials}
        </div>

        <div className="flex-1 min-w-0">
          {/* Name + status */}
          <div className="flex items-center justify-between gap-2 mb-0.5">
            <span className="font-semibold text-[14px] text-slate-800 truncate">
              {p.name}
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${s.cls}`}
            >
              {s.label}
            </span>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-1 text-[12px] text-slate-400 mb-2">
            <svg
              className="w-3 h-3 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.77a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .94h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            {p.phone}
          </div>

          {/* Seat + amount row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[12px] text-slate-500 flex items-center gap-1">
                <svg
                  className="w-3 h-3 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
                {p.seats} seat{p.seats > 1 ? "s" : ""}
              </span>
              <span className="font-semibold text-[13px] text-slate-700">
                ₦{p.amountOwed.toLocaleString()}
              </span>
            </div>

            {/* Payment badge or rating */}
            {isCompleted ? (
              p.rating ? (
                <StarRating rating={p.rating} />
              ) : (
                <span className="text-[11px] text-slate-400 italic">
                  No rating
                </span>
              )
            ) : (
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1
                ${
                  p.paid
                    ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                    : "bg-slate-100 text-slate-400 border border-slate-200"
                }`}
              >
                {p.paid ? (
                  <>
                    <svg
                      className="w-2.5 h-2.5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9 12l2 2 4-4"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Paid
                  </>
                ) : (
                  "Unpaid"
                )}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action row — active trips only */}
      {!isCompleted && p.status !== "cancelled" && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-slate-100">
          <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 hover:border-blue-300 hover:text-blue-600 text-[12px] font-medium transition-all">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
              <path
                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.77a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .94h3a2 2 0 012 1.72c.111.501.248.996.41 1.48a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.484.162.979.299 1.48.41A2 2 0 0122 16.92z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Call
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 hover:border-blue-300 hover:text-blue-600 text-[12px] font-medium transition-all">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
              <path
                d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Message
          </button>
          {!p.paid && (
            <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-600 text-[12px] font-medium hover:bg-emerald-100 transition-all">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                <path
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              Mark Paid
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Trip Section ─────────────────────────────────────────────────────────────

function TripSection({
  group,
  expanded,
  onToggle,
}: {
  group: TripGroup;
  expanded: boolean;
  onToggle: () => void;
}) {
  const isCompleted = group.status === "completed";
  const totalOwed = group.passengers.reduce((s, p) => s + p.amountOwed, 0);
  const totalPaid = group.passengers
    .filter((p) => p.paid)
    .reduce((s, p) => s + p.amountOwed, 0);
  const paidPct = totalOwed > 0 ? (totalPaid / totalOwed) * 100 : 0;
  const confirmed = group.passengers.filter(
    (p) => p.status === "confirmed"
  ).length;

  return (
    <div
      className={`rounded-2xl border overflow-hidden transition-all duration-200
      ${
        expanded
          ? "border-blue-300 shadow-md shadow-blue-100/50"
          : "border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm"
      }`}
    >
      {expanded && (
        <div className="h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      )}

      {/* ── Section Header ─────────────────────────────── */}
      <div
        className="flex items-center gap-4 px-5 py-4 cursor-pointer select-none bg-white"
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
            {group.dateShort}
          </div>
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">
            {group.monthShort}
          </div>
        </div>

        {/* Route + meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="font-black text-[15px] text-blue-600"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              {group.from}
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
              className="font-black text-[15px] text-slate-800"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              {group.to}
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ml-1 ${
                isCompleted
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                  : "bg-blue-600 text-white"
              }`}
            >
              {isCompleted ? "Completed" : "Published"}
            </span>
          </div>
          <div className="text-[12px] text-slate-400">
            {group.date} · {group.departure} departure
          </div>
        </div>

        {/* Payment progress */}
        <div className="w-[130px] flex-shrink-0">
          <div className="flex justify-between text-[11px] text-slate-400 mb-1.5">
            <span>Cash collected</span>
            <span className="font-semibold text-slate-600">
              {Math.round(paidPct)}%
            </span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                paidPct === 100 ? "bg-emerald-500" : "bg-blue-500"
              }`}
              style={{ width: `${paidPct}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            ₦{totalPaid.toLocaleString()} / ₦{totalOwed.toLocaleString()}
          </div>
        </div>

        {/* Passenger count */}
        <div className="flex-shrink-0 text-right">
          <div className="text-[11px] text-slate-400 mb-0.5">Passengers</div>
          <div
            className="font-black text-[20px] text-slate-800 leading-none"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            {confirmed}
            <span className="text-[13px] font-medium text-slate-400">
              /{group.totalSeats}
            </span>
          </div>
        </div>

        {/* Avatar stack */}
        <div className="flex -space-x-2 flex-shrink-0">
          {group.passengers.slice(0, 4).map((p, i) => (
            <div
              key={i}
              className={`w-7 h-7 rounded-full ${p.color} border-2 border-white flex items-center justify-center text-[9px] font-bold text-white`}
            >
              {p.initials}
            </div>
          ))}
          {group.passengers.length > 4 && (
            <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[9px] font-semibold text-slate-500">
              +{group.passengers.length - 4}
            </div>
          )}
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

      {/* ── Expanded Passenger Grid ─────────────────────── */}
      {expanded && (
        <div className="border-t border-slate-100 px-5 pb-5 pt-4 bg-slate-50/40">
          {/* Sub-header */}
          <div className="flex items-center justify-between mb-4">
            <div className="text-[13px] font-semibold text-slate-700 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" />
              {group.passengers.length} passenger
              {group.passengers.length !== 1 ? "s" : ""} on this trip
            </div>
            {!isCompleted && (
              <div className="flex gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600 text-[12px] font-medium transition-all">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.09 9.77a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .94h3a2 2 0 012 1.72c.111.501.248.996.41 1.48a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.484.162.979.299 1.48.41A2 2 0 0122 16.92z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Call All
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-700 transition-all shadow-sm shadow-blue-200">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Broadcast Message
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
            {group.passengers.map((p) => (
              <PassengerCard key={p.id} p={p} isCompleted={isCompleted} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-14 h-14 rounded-xl border border-slate-200 bg-white flex items-center justify-center mb-4 shadow-sm">
        <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24">
          <path
            d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
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
        No passengers found
      </div>
      <div className="text-[13px] text-slate-400 max-w-xs">
        Passengers will appear here once they book your trips
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function DriverPassengers() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [search, setSearch] = useState("");

  const filtered = TRIP_GROUPS.filter((g) => {
    if (activeFilter === "upcoming") return g.status === "published";
    if (activeFilter === "past") return g.status === "completed";
    return true;
  });

  const searchedGroups = search.trim()
    ? filtered
        .map((g) => ({
          ...g,
          passengers: g.passengers.filter(
            (p) =>
              p.name.toLowerCase().includes(search.toLowerCase()) ||
              p.phone.includes(search)
          ),
        }))
        .filter((g) => g.passengers.length > 0)
    : filtered;

  // All-time stats
  const allPassengers = TRIP_GROUPS.flatMap((g) => g.passengers);
  const totalPassengers = allPassengers.length;
  const totalOwed = allPassengers.reduce((s, p) => s + p.amountOwed, 0);
  const totalPaid = allPassengers
    .filter((p) => p.paid)
    .reduce((s, p) => s + p.amountOwed, 0);
  const avgRating = (() => {
    const rated = allPassengers.filter((p) => p.rating);
    return rated.length
      ? (rated.reduce((s, p) => s + (p.rating ?? 0), 0) / rated.length).toFixed(
          1
        )
      : "—";
  })();

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
        <div className="max-w-screen-xl mx-auto px-6 py-8">
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
                    d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
                Passengers
                <span className="bg-blue-600 text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-full">
                  {totalPassengers}
                </span>
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                View and manage passengers across all your trips
              </p>
            </div>

            {/* Search */}
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M21 21l-4.35-4.35"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="text"
                placeholder="Search passenger..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all w-[220px]"
              />
            </div>
          </div>

          {/* ── Stats ────────────────────────────────────────── */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {[
              {
                label: "Total Passengers",
                value: totalPassengers,
                sub: "Across all trips",
                color: "from-blue-50 to-white border-blue-100",
                vcolor: "text-blue-600",
              },
              {
                label: "Cash Collected",
                value: `₦${totalPaid.toLocaleString()}`,
                sub: `of ₦${totalOwed.toLocaleString()} total`,
                color: "from-emerald-50 to-white border-emerald-100",
                vcolor: "text-emerald-600",
              },
              {
                label: "Pending Payment",
                value: `₦${(totalOwed - totalPaid).toLocaleString()}`,
                sub: "Still to collect",
                color: "from-amber-50 to-white border-amber-100",
                vcolor: "text-amber-600",
              },
              {
                label: "Avg Rating",
                value: avgRating,
                sub: "From rated trips",
                color: "from-violet-50 to-white border-violet-100",
                vcolor: "text-violet-600",
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
                  className={`font-black text-[26px] leading-none mb-0.5 ${s.vcolor}`}
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  {s.value}
                </div>
                <div className="text-[11px] text-slate-400">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* ── Filter tabs ──────────────────────────────────── */}
          <div className="flex items-center gap-2 mb-5">
            {[
              {
                key: "all" as FilterTab,
                label: "All Trips",
                count: TRIP_GROUPS.length,
              },
              {
                key: "upcoming" as FilterTab,
                label: "Upcoming",
                count: TRIP_GROUPS.filter((g) => g.status === "published")
                  .length,
              },
              {
                key: "past" as FilterTab,
                label: "Past Trips",
                count: TRIP_GROUPS.filter((g) => g.status === "completed")
                  .length,
              },
            ].map(({ key, label, count }) => (
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
            ))}
          </div>

          {/* ── Results meta ──────────────────────────────────── */}
          {searchedGroups.length > 0 && (
            <div className="flex items-center gap-2 text-[13px] text-slate-400 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse inline-block" />
              <span className="text-slate-700 font-semibold">
                {searchedGroups.length} trip
                {searchedGroups.length !== 1 ? "s" : ""}
              </span>
              {search && (
                <span>
                  matching{" "}
                  <span className="font-medium text-blue-600">"{search}"</span>
                </span>
              )}
            </div>
          )}

          {/* ── Trip sections ─────────────────────────────────── */}
          {searchedGroups.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="flex flex-col gap-3">
              {searchedGroups.map((group, i) => (
                <div
                  key={group.tripId}
                  className="row-enter"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <TripSection
                    group={group}
                    expanded={expandedId === group.tripId}
                    onToggle={() =>
                      setExpandedId(
                        expandedId === group.tripId ? null : group.tripId
                      )
                    }
                  />
                </div>
              ))}
            </div>
          )}

          {/* ── Footer ───────────────────────────────────────── */}
          {searchedGroups.length > 0 && (
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
