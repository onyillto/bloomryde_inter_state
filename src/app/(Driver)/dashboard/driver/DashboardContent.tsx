"use client";

import { useState } from "react";
import { TRIPS, DOCS } from "./Driverdata";
import type { Trip, Doc } from "./DriverTypes";
import { StarIcon, IconArrow } from "./Drivericons";

function SeatVisual({ total, booked }: { total: number; booked: number }) {
  return (
    <div className="flex gap-1.5 flex-wrap mt-3">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`w-6 h-6 rounded-[5px] flex items-center justify-center text-[10px] font-bold border
          ${
            i < booked
              ? "bg-red-50 text-red-500 border-red-200"
              : "bg-blue-50 text-blue-400 border-blue-200"
          }`}
        >
          {i < booked ? "×" : "○"}
        </div>
      ))}
    </div>
  );
}

function PerformanceRing({ rating }: { rating: number }) {
  const r = 34,
    circ = 2 * Math.PI * r,
    dash = (rating / 5) * circ;
  return (
    <div className="relative w-20 h-20 flex-shrink-0">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="#dbeafe"
          strokeWidth="7"
        />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="#2563eb"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
        />
      </svg>
      <div
        className="absolute inset-0 flex items-center justify-center font-black text-[17px] text-blue-600"
        style={{ fontFamily: "'Syne',sans-serif" }}
      >
        {rating}
      </div>
    </div>
  );
}

function TripCard({ trip }: { trip: Trip }) {
  const open = trip.totalSeats - trip.booked;
  const isDraft = trip.status === "draft";
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div
            className="flex items-center gap-2 text-[17px] font-black text-slate-800 tracking-tight"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            <span className="text-blue-600">{trip.from}</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300 inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
            </span>
            <span>{trip.to}</span>
          </div>
          <div className="text-[13px] text-slate-500 mt-0.5">
            {trip.date} · {trip.departure} departure
          </div>
        </div>
        <span
          className={`text-[11px] font-bold px-3 py-1.5 rounded-full ${
            isDraft
              ? "bg-slate-100 text-slate-500 border border-slate-200"
              : "bg-blue-600 text-white"
          }`}
        >
          {isDraft ? "Draft" : "Published"}
        </span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-slate-500">
        <span>
          💺 {trip.totalSeats} seats ·{" "}
          <span className="text-red-500 font-semibold">
            {trip.booked} booked
          </span>{" "}
          · <span className="text-blue-600 font-semibold">{open} open</span>
        </span>
        <span>💵 ₦{trip.price.toLocaleString()} per seat</span>
        <span>
          🚗 {trip.vehicle} · {trip.vehicleColor}
        </span>
      </div>
      <SeatVisual total={trip.totalSeats} booked={trip.booked} />
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div className="flex -space-x-1.5">
            {trip.passengers.slice(0, 4).map((p, i) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-full ${p.color} border-2 border-white flex items-center justify-center text-[10px] font-bold text-white`}
              >
                {p.initials}
              </div>
            ))}
            {trip.passengers.length > 4 && (
              <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-semibold text-slate-500">
                +{trip.passengers.length - 4}
              </div>
            )}
          </div>
          <span className="text-[13px] text-slate-500">
            {trip.booked > 0 ? (
              <>
                <span className="font-semibold text-slate-700">
                  {trip.booked}
                </span>{" "}
                passengers confirmed
              </>
            ) : (
              <span className="italic text-slate-400">No bookings yet</span>
            )}
          </span>
        </div>
        <div className="flex gap-2">
          <button className="px-3.5 py-1.5 rounded-xl text-[13px] font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all">
            Edit
          </button>
          {!isDraft ? (
            <button className="px-3.5 py-1.5 rounded-xl text-[13px] font-bold text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-600 hover:text-white transition-all">
              View Passengers
            </button>
          ) : (
            <button className="px-3.5 py-1.5 rounded-xl text-[13px] font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all">
              Publish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function PerformancePanel() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div
        className="text-[14px] font-bold text-slate-800 mb-4"
        style={{ fontFamily: "'Syne',sans-serif" }}
      >
        📊 Performance
      </div>
      <div className="flex items-center gap-4 mb-4">
        <PerformanceRing rating={4.9} />
        <div>
          <div className="font-semibold text-[15px] text-slate-800">
            Overall Rating
          </div>
          <div className="text-[12px] text-slate-400 mb-2">
            Based on 46 reviews
          </div>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <StarIcon key={i} filled={i <= 4} />
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 pt-3 flex flex-col gap-3">
        {[
          { label: "Punctuality", stars: 5 },
          { label: "Vehicle Condition", stars: 4 },
          { label: "Communication", stars: 5 },
        ].map(({ label, stars }) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-[13px] text-slate-600">{label}</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg
                  key={i}
                  className={`w-3 h-3 ${
                    i <= stars ? "text-amber-400" : "text-slate-200"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocumentsPanel() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div
        className="text-[14px] font-bold text-slate-800 mb-4"
        style={{ fontFamily: "'Syne',sans-serif" }}
      >
        📄 Documents
      </div>
      <div className="flex flex-col divide-y divide-slate-100">
        {DOCS.map((doc: Doc) => (
          <div
            key={doc.name}
            className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-[15px] flex-shrink-0
              ${
                doc.status === "valid"
                  ? "bg-blue-50"
                  : doc.status === "warn"
                  ? "bg-amber-50"
                  : "bg-red-50"
              }`}
            >
              {doc.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-slate-700 truncate">
                {doc.name}
              </div>
              <div className="text-[11px] text-slate-400">
                Expires: {doc.expiry}
              </div>
            </div>
            <div
              className={`text-[12px] font-bold flex-shrink-0
              ${
                doc.status === "valid"
                  ? "text-blue-600"
                  : doc.status === "warn"
                  ? "text-amber-500"
                  : "text-red-500"
              }`}
            >
              {doc.status === "valid"
                ? "✓ Valid"
                : doc.status === "warn"
                ? "⚠ Soon"
                : "✗ Expired"}
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-3 pt-3 border-t border-slate-100 text-[12px] font-semibold text-blue-600 hover:text-blue-700 text-center transition-colors">
        Manage Documents →
      </button>
    </div>
  );
}

export default function DriverDashboardContent() {
  const [activeTab, setActiveTab] = useState<"active" | "all">("active");
  const displayed =
    activeTab === "active"
      ? TRIPS.filter((t) => t.status === "published")
      : TRIPS;

  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Trips",
            value: "48",
            meta: "+4 this month",
            icon: "🛣️",
            top: "bg-blue-500",
          },
          {
            label: "Passengers Moved",
            value: "312",
            meta: "Across all trips",
            icon: "👥",
            top: "bg-violet-500",
          },
          {
            label: "Rating",
            value: "4.9",
            meta: "From 46 ratings",
            icon: "⭐",
            top: "bg-amber-400",
          },
          {
            label: "Active Trips",
            value: "3",
            meta: "Taking bookings",
            icon: "📅",
            top: "bg-blue-400",
          },
        ].map((s, i) => (
          <div
            key={s.label}
            className="stat-in bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all relative overflow-hidden"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <div className={`absolute top-0 left-0 right-0 h-[3px] ${s.top}`} />
            <div className="flex items-start justify-between mb-3">
              <span className="text-[13px] font-medium text-slate-500">
                {s.label}
              </span>
              <span className="text-xl opacity-20">{s.icon}</span>
            </div>
            <div
              className="text-[32px] font-black text-slate-900 leading-none mb-1"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              {s.value}
            </div>
            <div className="text-[12px] text-slate-400">{s.meta}</div>
          </div>
        ))}
      </div>

      {/* Body grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_295px] gap-6 items-start">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2
                className="text-[17px] font-black text-slate-900"
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                Active Trips
              </h2>
              <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
                {(["active", "all"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded-lg text-[12px] font-semibold transition-all
                      ${
                        activeTab === tab
                          ? "bg-blue-600 text-white shadow-sm"
                          : "text-slate-500 hover:text-slate-700"
                      }`}
                  >
                    {tab === "active" ? "Published" : "All Trips"}
                  </button>
                ))}
              </div>
            </div>
            <button className="text-[13px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
              View all <IconArrow />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {displayed.map((trip, i) => (
              <div
                key={trip.id}
                className="card-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <TripCard trip={trip} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <PerformancePanel />
          <DocumentsPanel />
        </div>
      </div>
    </>
  );
}
