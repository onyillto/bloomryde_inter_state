"use client";

import { IconBell, IconCheck } from "./Drivericons";

export default function DriverHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1
          className="text-[26px] font-black text-slate-900 leading-tight flex items-center gap-3"
          style={{ fontFamily: "'Syne',sans-serif" }}
        >
          Welcome back, Emeka
          <span className="inline-flex items-center gap-1.5 text-[12px] font-bold px-2.5 py-1 rounded-full bg-blue-600 text-white">
            <IconCheck /> Verified
          </span>
        </h1>
        <p className="text-[14px] text-slate-500 mt-1">
          You're a verified driver — passengers can find your trips.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:border-blue-300 hover:text-blue-600 transition-all relative">
          <IconBell />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 border-2 border-white" />
        </button>
        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[14px] px-5 py-2.5 rounded-xl shadow-md shadow-blue-200 hover:-translate-y-0.5 transition-all"
          style={{ fontFamily: "'Syne',sans-serif" }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
          Create New Trip
        </button>
      </div>
    </div>
  );
}
