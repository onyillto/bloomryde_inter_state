"use client";
import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectDriverUser } from "@/store/slices/authSlice";

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionCard({
  title,
  icon,
  right,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div
          className="text-[14px] font-bold text-slate-800 flex items-center gap-2"
          style={{ fontFamily: "'Syne',sans-serif" }}
        >
          {icon}
          {title}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

function EditField({
  label,
  value,
  editing,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  editing: boolean;
  onChange?: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 block">
        {label}
      </label>
      {editing ? (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[14px] text-slate-800 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
        />
      ) : (
        <div className="bg-slate-50 border border-slate-100 rounded-xl px-3.5 py-2.5 text-[14px] font-medium text-slate-700 min-h-[42px] flex items-center">
          {value || "—"}
        </div>
      )}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function DriverMyVehicle() {
  const driverUser = useAppSelector(selectDriverUser);
  const vehicleInfo = driverUser?.vehicleInfo;
  const photos = vehicleInfo?.photos ?? [];

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "gallery">(
    "overview"
  );

  const [vehicle, setVehicle] = useState({
    make: vehicleInfo?.make ?? "",
    model: vehicleInfo?.model ?? "",
    year: vehicleInfo?.year ?? "",
    color: vehicleInfo?.color ?? "",
    plate: vehicleInfo?.plateNumber ?? "",
    vin: vehicleInfo?.vin ?? "",
    seats: String(vehicleInfo?.passengerSeats ?? ""),
    fuel: "",
    mileage: "",
    engine: "",
    transmission: "",
    lastService: "",
  });

  const set = (k: keyof typeof vehicle) => (v: string) =>
    setVehicle((f) => ({ ...f, [k]: v }));

  function handleSave() {
    // TODO: call updateVehicle API endpoint when available
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  }

  const TABS = [
    { key: "overview" as const, label: "Overview" },
    { key: "gallery" as const, label: "Gallery" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
        .veh-root * { box-sizing: border-box; }
        .veh-root { font-family: 'DM Sans', sans-serif; background: #f8fafc; color: #1e293b; min-height: 100vh; }
        .veh-root ::-webkit-scrollbar { width: 4px; }
        .veh-root ::-webkit-scrollbar-track { background: transparent; }
        .veh-root ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .tab-enter { animation: tabIn 0.2s ease-out both; }
        @keyframes tabIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <div className="veh-root">
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
                    d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="7"
                    cy="17"
                    r="2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx="17"
                    cy="17"
                    r="2"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
                My Vehicle
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Manage your vehicle details and photos
              </p>
            </div>

            <div className="flex items-center gap-2">
              {editing ? (
                <>
                  <button
                    onClick={() => setEditing(false)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-medium border border-slate-200 bg-white text-slate-500 hover:border-slate-300 transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <path
                        d="M18 6L6 18M6 6l12 12"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                    Discard
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[13px] px-4 py-2 rounded-xl shadow-md shadow-blue-200 hover:-translate-y-0.5 transition-all"
                    style={{ fontFamily: "'Syne',sans-serif" }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <path
                        d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2zM17 21v-8H7v8M7 3v5h8"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 font-medium text-[13px] px-4 py-2 rounded-xl transition-all"
                >
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
                  Edit Vehicle
                </button>
              )}
            </div>
          </div>

          {/* ── Saved toast ── */}
          {saved && (
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-6 tab-enter">
              <svg
                className="w-4 h-4 text-blue-500 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-[13px] text-blue-600 font-medium">
                Vehicle details updated successfully
              </span>
            </div>
          )}

          {/* ── Hero card ── */}
          <div className="relative rounded-2xl border border-slate-200 bg-white p-6 mb-6 overflow-hidden shadow-sm">
            <div
              className="absolute top-0 right-0 w-64 h-64 opacity-[0.03] pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at top right, #2563eb, transparent 70%)",
              }}
            />

            <div className="flex flex-col md:flex-row items-start gap-6 relative">
              {/* Vehicle icon */}
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-200">
                <svg
                  className="w-10 h-10 text-white/80"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="7"
                    cy="17"
                    r="2"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <circle
                    cx="17"
                    cy="17"
                    r="2"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h2
                    className="text-[22px] font-black text-slate-900 tracking-tight"
                    style={{ fontFamily: "'Syne',sans-serif" }}
                  >
                    {[vehicle.year, vehicle.make, vehicle.model]
                      .filter(Boolean)
                      .join(" ") || "Vehicle Details"}
                  </h2>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-600 text-white">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24">
                      <path
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Verified
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-5 gap-y-1.5 mb-4">
                  {[
                    { icon: "🎨", val: vehicle.color },
                    { icon: "🔢", val: vehicle.plate },
                    {
                      icon: "💺",
                      val: vehicle.seats ? `${vehicle.seats} seats` : "",
                    },
                    { icon: "⛽", val: vehicle.fuel },
                    {
                      icon: "🛣",
                      val: vehicle.mileage ? `${vehicle.mileage} km` : "",
                    },
                  ]
                    .filter(({ val }) => Boolean(val))
                    .map(({ icon, val }) => (
                      <span
                        key={val}
                        className="flex items-center gap-1.5 text-[13px] text-slate-500"
                      >
                        <span>{icon}</span>
                        {val}
                      </span>
                    ))}
                </div>
              </div>

              {/* Plate pinned right */}
              <div className="flex-shrink-0 text-left md:text-right mt-4 md:mt-0">
                <div className="text-[11px] text-slate-400 mb-1">
                  Plate Number
                </div>
                <div
                  className="font-black text-[26px] text-slate-800 leading-none"
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  {vehicle.plate || "—"}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {[vehicle.color, vehicle.year].filter(Boolean).join(" · ") ||
                    "—"}
                </div>
              </div>
            </div>
          </div>

          {/* ── Tabs ── */}
          <div className="flex items-center gap-2 mb-6">
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
                  activeTab === t.key
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "bg-white text-slate-500 border border-slate-200 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ══ OVERVIEW TAB ═════════════════════════════════ */}
          {activeTab === "overview" && (
            <div className="tab-enter space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Vehicle details */}
                <SectionCard
                  title="Vehicle Details"
                  icon={
                    <svg
                      className="w-4 h-4 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2h-2"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="7"
                        cy="17"
                        r="2"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <circle
                        cx="17"
                        cy="17"
                        r="2"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                  }
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <EditField
                      label="Make"
                      value={vehicle.make}
                      editing={editing}
                      onChange={set("make")}
                    />
                    <EditField
                      label="Model"
                      value={vehicle.model}
                      editing={editing}
                      onChange={set("model")}
                    />
                    <EditField
                      label="Year"
                      value={vehicle.year}
                      editing={editing}
                      onChange={set("year")}
                    />
                    <EditField
                      label="Colour"
                      value={vehicle.color}
                      editing={editing}
                      onChange={set("color")}
                    />
                    <EditField
                      label="Plate Number"
                      value={vehicle.plate}
                      editing={editing}
                      onChange={set("plate")}
                    />
                    <EditField
                      label="VIN"
                      value={vehicle.vin}
                      editing={editing}
                      onChange={set("vin")}
                    />
                  </div>
                </SectionCard>

                {/* Technical specs */}
                <SectionCard
                  title="Technical Specs"
                  icon={
                    <svg
                      className="w-4 h-4 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <path
                        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                  }
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <EditField
                      label="Seats"
                      value={vehicle.seats}
                      editing={editing}
                      onChange={set("seats")}
                    />
                    <EditField
                      label="Fuel Type"
                      value={vehicle.fuel}
                      editing={editing}
                      onChange={set("fuel")}
                    />
                    <EditField
                      label="Engine"
                      value={vehicle.engine}
                      editing={editing}
                      onChange={set("engine")}
                    />
                    <EditField
                      label="Transmission"
                      value={vehicle.transmission}
                      editing={editing}
                      onChange={set("transmission")}
                    />
                    <EditField
                      label="Mileage (km)"
                      value={vehicle.mileage}
                      editing={editing}
                      onChange={set("mileage")}
                    />
                    <EditField
                      label="Last Service"
                      value={vehicle.lastService}
                      editing={editing}
                      onChange={set("lastService")}
                    />
                  </div>
                </SectionCard>
              </div>
            </div>
          )}

          {/* ══ GALLERY TAB ══════════════════════════════════ */}
          {activeTab === "gallery" && (
            <div className="tab-enter">
              <SectionCard
                title="Vehicle Photos"
                icon={
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="18"
                      height="18"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <circle
                      cx="8.5"
                      cy="8.5"
                      r="1.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M21 15l-5-5L5 21"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                }
                right={
                  <button className="flex items-center gap-1.5 text-[12px] font-semibold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl hover:bg-blue-100 transition-all">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Upload Photo
                  </button>
                }
              >
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                  {/* Real photos from backend */}
                  {photos.map((photo) => (
                    <div
                      key={photo._id}
                      className="group relative rounded-2xl overflow-hidden border border-slate-200 aspect-[4/3] cursor-pointer hover:border-blue-300 transition-all hover:shadow-md"
                    >
                      <img
                        src={photo.file.url}
                        alt={photo.label}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <button className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-md hover:bg-blue-50 transition-colors">
                          <svg
                            className="w-4 h-4 text-slate-700"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                        <button className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-md hover:bg-red-50 transition-colors">
                          <svg
                            className="w-4 h-4 text-red-400"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M8 6V4a1 1 0 011-1h6a1 1 0 011 1v2"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/60 to-transparent">
                        <span className="text-[11px] font-semibold text-white">
                          {photo.label}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Empty state */}
                  {photos.length === 0 && (
                    <div className="col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-12 text-slate-400">
                      <svg
                        className="w-12 h-12 mb-3 opacity-30"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="8.5"
                          cy="8.5"
                          r="1.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M21 15l-5-5L5 21"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <p className="text-[13px] font-medium">
                        No vehicle photos uploaded yet
                      </p>
                      <p className="text-[12px] mt-1">
                        Upload photos to help passengers recognise your vehicle
                      </p>
                    </div>
                  )}

                  {/* Upload placeholder */}
                  <div className="rounded-2xl border-2 border-dashed border-slate-200 aspect-[4/3] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                      <svg
                        className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <span className="text-[12px] font-medium text-slate-400 group-hover:text-blue-500 transition-colors">
                      Add Photo
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 text-[12px] text-slate-400 flex items-center gap-2">
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M12 8v4M12 16h.01"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                  Clear, recent photos help passengers recognise your vehicle.
                  Include front, rear and interior shots.
                </div>
              </SectionCard>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
