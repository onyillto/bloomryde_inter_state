"use client";

import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectDriverUser, selectToken } from "@/store/slices/authSlice";
import {
  selectTripHistory,
  selectTripLoading,
  setTripHistory,
  setTripLoading,
  setTripError,
} from "@/store/slices/tripSlice";
import { getMyTrips } from "@/lib/api";
import type { Trip } from "@/lib/api";
import { StarIcon, IconArrow } from "./Drivericons";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDepDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDepTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getVehicleLabel(vehicle: Trip["vehicle"]): string {
  if (typeof vehicle === "object") return `${vehicle.make} ${vehicle.model}`;
  return "Vehicle";
}

function getVehicleColor(vehicle: Trip["vehicle"]): string {
  if (typeof vehicle === "object") return vehicle.color;
  return "";
}

const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-amber-500",
  "bg-teal-500",
  "bg-emerald-500",
  "bg-indigo-500",
  "bg-orange-500",
];

// ─── SeatVisual ───────────────────────────────────────────────────────────────

function SeatVisual({ total, booked }: { total: number; booked: number }) {
  return (
    <div className="flex gap-1.5 flex-wrap mt-3">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`w-6 h-6 rounded-[5px] flex items-center justify-center text-[10px] font-bold border ${
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

// ─── PerformanceRing ──────────────────────────────────────────────────────────

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

// ─── TripCard ─────────────────────────────────────────────────────────────────

function TripCard({ trip }: { trip: Trip }) {
  const booked = trip.totalSeats - trip.availableSeats;
  const open = trip.availableSeats;
  const vehicleLabel = getVehicleLabel(trip.vehicle);
  const vehicleColor = getVehicleColor(trip.vehicle);
  const depDate = formatDepDate(trip.departureTime);
  const depTime = formatDepTime(trip.departureTime);

  const bookingAvatars = trip.bookings.slice(0, 4).map((id, i) => ({
    initials: id.slice(-2).toUpperCase(),
    color: AVATAR_COLORS[i % AVATAR_COLORS.length],
  }));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div
            className="flex items-center gap-2 text-[17px] font-black text-slate-800 tracking-tight"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            <span className="text-blue-600 capitalize">{trip.origin.city}</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-300 inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
            </span>
            <span className="capitalize">{trip.destination.city}</span>
          </div>
          <div className="text-[13px] text-slate-500 mt-0.5">
            {depDate} · {depTime} departure
          </div>
          {trip.description && (
            <div className="text-[12px] text-slate-400 mt-0.5 italic">
              "{trip.description}"
            </div>
          )}
        </div>
        <span
          className={`text-[11px] font-bold px-3 py-1.5 rounded-full capitalize ${
            trip.status === "scheduled"
              ? "bg-blue-600 text-white"
              : trip.status === "active"
              ? "bg-emerald-500 text-white"
              : trip.status === "completed"
              ? "bg-slate-100 text-slate-500 border border-slate-200"
              : "bg-red-50 text-red-500 border border-red-200"
          }`}
        >
          {trip.status}
        </span>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-slate-500">
        <span>
          💺 {trip.totalSeats} seats ·{" "}
          <span className="text-red-500 font-semibold">{booked} booked</span>
          {" · "}
          <span className="text-blue-600 font-semibold">{open} open</span>
        </span>
        <span>💵 ₦{trip.pricePerSeat.toLocaleString()} per seat</span>
        <span>
          🚗 {vehicleLabel}
          {vehicleColor ? ` · ${vehicleColor}` : ""}
        </span>
        {trip.stops.length > 0 && (
          <span>
            🛑 {trip.stops.length} stop{trip.stops.length > 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Preference chips */}
      <div className="flex flex-wrap gap-1.5 mt-2">
        {trip.preferences.instantBooking && (
          <span className="text-[10px] font-semibold bg-blue-50 text-blue-500 border border-blue-200 px-2 py-0.5 rounded-full">
            ⚡ Instant
          </span>
        )}
        {trip.preferences.smokingAllowed && (
          <span className="text-[10px] font-semibold bg-slate-50 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-full">
            🚬 Smoking OK
          </span>
        )}
        {trip.preferences.petsAllowed && (
          <span className="text-[10px] font-semibold bg-slate-50 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-full">
            🐾 Pets OK
          </span>
        )}
        <span className="text-[10px] font-semibold bg-slate-50 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-full">
          🧳 {trip.preferences.luggagePolicy}
        </span>
      </div>

      <SeatVisual total={trip.totalSeats} booked={booked} />

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2">
          {bookingAvatars.length > 0 && (
            <div className="flex -space-x-1.5">
              {bookingAvatars.map((a, i) => (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-full ${a.color} border-2 border-white flex items-center justify-center text-[10px] font-bold text-white`}
                >
                  {a.initials}
                </div>
              ))}
              {trip.bookings.length > 4 && (
                <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-semibold text-slate-500">
                  +{trip.bookings.length - 4}
                </div>
              )}
            </div>
          )}
          <span className="text-[13px] text-slate-500">
            {booked > 0 ? (
              <>
                <span className="font-semibold text-slate-700">{booked}</span>{" "}
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
          {trip.status === "scheduled" || trip.status === "active" ? (
            <button className="px-3.5 py-1.5 rounded-xl text-[13px] font-bold text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-600 hover:text-white transition-all">
              View Passengers
            </button>
          ) : (
            <button className="px-3.5 py-1.5 rounded-xl text-[13px] font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all">
              Re-create
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PerformancePanel ─────────────────────────────────────────────────────────

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
            No ratings yet — placeholder
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

// ─── DocumentsPanel ───────────────────────────────────────────────────────────

function DocumentsPanel({
  driverUser,
}: {
  driverUser: NonNullable<ReturnType<typeof selectDriverUser>>;
}) {
  const docs = driverUser.verificationDocuments;
  const vehicleDocs = driverUser.vehicleInfo.documents;
  const now = new Date();

  function getStatus(expiryISO: string): "valid" | "warn" | "expired" {
    const exp = new Date(expiryISO);
    const monthsLeft =
      (exp.getFullYear() - now.getFullYear()) * 12 +
      (exp.getMonth() - now.getMonth());
    if (monthsLeft <= 0) return "expired";
    if (monthsLeft <= 3) return "warn";
    return "valid";
  }

  function formatExpiry(iso: string) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric",
    });
  }

  const docList = [
    {
      icon: "🪪",
      name: "Driver's License (Front)",
      detail: `No. ${docs.driversLicense.number}`,
      expiry: formatExpiry(docs.driversLicense.expiryDate),
      status: getStatus(docs.driversLicense.expiryDate),
      url: docs.driversLicense.front.url,
    },
    {
      icon: "🪪",
      name: "Driver's License (Back)",
      detail: docs.driversLicense.back.fileName,
      expiry: formatExpiry(docs.driversLicense.expiryDate),
      status: getStatus(docs.driversLicense.expiryDate),
      url: docs.driversLicense.back.url,
    },
    {
      icon: "🪪",
      name: "National ID",
      detail: `No. ${docs.nationalId.number}`,
      expiry: "—",
      status: "valid" as const,
      url: docs.nationalId.document.url,
    },
    {
      icon: "🤳",
      name: "Verification Selfie",
      detail: docs.verificationSelfie.fileName,
      expiry: "—",
      status: "valid" as const,
      url: docs.verificationSelfie.url,
    },
    {
      icon: "🛡️",
      name: "Insurance Certificate",
      detail: vehicleDocs.insuranceCertificate.fileName,
      expiry: "—",
      status: "valid" as const,
      url: vehicleDocs.insuranceCertificate.url,
    },
    {
      icon: "🔧",
      name: "Road Worthiness",
      detail: vehicleDocs.roadWorthiness.fileName,
      expiry: "—",
      status: "valid" as const,
      url: vehicleDocs.roadWorthiness.url,
    },
    {
      icon: "📋",
      name: "Vehicle Registration",
      detail: vehicleDocs.registrationCertificate.fileName,
      expiry: "—",
      status: "valid" as const,
      url: vehicleDocs.registrationCertificate.url,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div
        className="text-[14px] font-bold text-slate-800 mb-4"
        style={{ fontFamily: "'Syne',sans-serif" }}
      >
        📄 Documents
      </div>
      <div className="flex flex-col divide-y divide-slate-100">
        {docList.map((doc) => (
          <div
            key={doc.name}
            className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-[15px] flex-shrink-0 ${
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
              <div className="text-[11px] text-slate-400 truncate">
                {doc.detail}
                {doc.expiry !== "—" ? ` · Exp: ${doc.expiry}` : ""}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span
                className={`text-[12px] font-bold ${
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
              </span>
              {doc.url && (
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-blue-500 hover:text-blue-700 underline"
                >
                  View
                </a>
              )}
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

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function DriverDashboardContent() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const driverUser = useAppSelector(selectDriverUser);
  const tripHistory = useAppSelector(selectTripHistory);
  const isLoading = useAppSelector(selectTripLoading);

  const [activeTab, setActiveTab] = useState<"active" | "all">("active");

  // ── Fetch trips on mount — skip if already in Redux ───────
  useEffect(() => {
    if (!token) return;
    if (tripHistory.length > 0) return;
    const fetchTrips = async () => {
      dispatch(setTripLoading(true));
      dispatch(setTripError(null));
      try {
        const result = await getMyTrips(token);
        dispatch(setTripHistory(result.data.trips));
      } catch (err: any) {
        dispatch(setTripError(err?.message || "Failed to load trips"));
      } finally {
        dispatch(setTripLoading(false));
      }
    };
    fetchTrips();
  }, [token, dispatch]);

  // ── Derived stats ─────────────────────────────────────────
  const scheduledTrips = tripHistory.filter((t) => t.status === "scheduled");
  const activeTrips = tripHistory.filter((t) => t.status === "active");
  const completedTrips = tripHistory.filter((t) => t.status === "completed");
  const totalPassengers = tripHistory.reduce(
    (s, t) => s + (t.totalSeats - t.availableSeats),
    0
  );

  const displayed =
    activeTab === "active"
      ? tripHistory.filter(
          (t) => t.status === "scheduled" || t.status === "active"
        )
      : tripHistory;

  return (
    <>
      {/* ── Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Trips",
            value: isLoading ? "—" : tripHistory.length.toString(),
            meta: `${completedTrips.length} completed`,
            icon: "🛣️",
            top: "bg-blue-500",
          },
          {
            label: "Passengers Moved",
            value: isLoading ? "—" : totalPassengers.toString(),
            meta: "Across all trips",
            icon: "👥",
            top: "bg-violet-500",
          },
          {
            label: "Rating",
            value: "—",
            meta: "No ratings yet",
            icon: "⭐",
            top: "bg-amber-400",
          },
          {
            label: "Active Trips",
            value: isLoading
              ? "—"
              : (scheduledTrips.length + activeTrips.length).toString(),
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

      {/* ── Body grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_295px] gap-6 items-start">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2
                className="text-[17px] font-black text-slate-900"
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                My Trips
              </h2>
              <div className="flex bg-slate-100 rounded-xl p-1 gap-1">
                {(["active", "all"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded-lg text-[12px] font-semibold transition-all ${
                      activeTab === tab
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                  >
                    {tab === "active" ? "Active" : "All Trips"}
                  </button>
                ))}
              </div>
            </div>
            <button className="text-[13px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
              View all <IconArrow />
            </button>
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex items-center justify-center py-16 gap-3 text-slate-400">
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
              <span className="text-[14px] font-medium">Loading trips...</span>
            </div>
          )}

          {/* Empty state */}
          {!isLoading && displayed.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-2xl border border-slate-200">
              <div className="text-4xl mb-3 opacity-30">🛣️</div>
              <div
                className="text-[15px] font-bold text-slate-500 mb-1"
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                {activeTab === "active" ? "No active trips" : "No trips yet"}
              </div>
              <div className="text-[13px] text-slate-400">
                {activeTab === "active"
                  ? "Create a trip to start taking bookings"
                  : "Your trips will appear here"}
              </div>
            </div>
          )}

          {/* Trip cards */}
          {!isLoading && (
            <div className="flex flex-col gap-4">
              {displayed.map((trip, i) => (
                <div
                  key={trip._id}
                  className="card-in"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <TripCard trip={trip} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <PerformancePanel />
          {driverUser && <DocumentsPanel driverUser={driverUser} />}
        </div>
      </div>
    </>
  );
}
