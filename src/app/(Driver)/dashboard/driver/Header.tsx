"use client";

import { IconBell, IconCheck } from "./Drivericons";

export default function DriverHeader({
  setIsSidebarOpen,
}: {
  setIsSidebarOpen: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-3 mb-8">
      {/* Left: hamburger + title block */}
      <div className="flex items-start gap-3 min-w-0 flex-1">
        {/* Hamburger — mobile only */}
        <button
          className="md:hidden flex-shrink-0 w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:border-blue-300 hover:text-blue-600 transition-all mt-0.5"
          onClick={() => setIsSidebarOpen(true)}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Title + subtitle */}
        <div className="min-w-0">
          <h1
            className="font-black text-slate-900 leading-tight flex flex-wrap items-center gap-2 text-[20px] md:text-[26px]"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            <span>Welcome back, Emeka</span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-600 text-white flex-shrink-0">
              <IconCheck /> Verified
            </span>
          </h1>
          <p className="text-[12px] md:text-[14px] text-slate-500 mt-1 leading-snug">
            You're a verified driver — passengers can find your trips.
          </p>
        </div>
      </div>

      {/* Right: bell — always pinned top-right */}
      <button className="flex-shrink-0 w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-500 hover:border-blue-300 hover:text-blue-600 transition-all relative mt-0.5">
        <IconBell />
        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600 border-2 border-white" />
      </button>
    </div>
  );
}
