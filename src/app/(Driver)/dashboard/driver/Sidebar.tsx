"use client";

import {
  IconGrid,
  IconPlus,
  IconList,
  IconUsers,
  IconBar,
  IconCar,
  IconDoc,
  IconPerson,
  IconGear,
  IconLogout,
  IconCheck,
} from "./Drivericons";

function NavItem({
  icon,
  label,
  active,
  badge,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  badge?: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all text-left group
        ${
          active
            ? "bg-blue-600 text-white shadow-md shadow-blue-100"
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`}
    >
      <span
        className={`flex-shrink-0 transition-colors ${
          active ? "text-white" : "text-slate-400 group-hover:text-slate-600"
        }`}
      >
        {icon}
      </span>
      <span className="flex-1">{label}</span>
      {badge && (
        <span
          className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
            active ? "bg-white/25 text-white" : "bg-blue-100 text-blue-600"
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

export default function DriverSidebar({
  activeNav,
  setActiveNav,
}: {
  activeNav: string;
  setActiveNav: (v: string) => void;
}) {
  return (
    <aside className="sb w-[228px] flex-shrink-0 bg-white border-r border-slate-200 flex flex-col overflow-y-auto">
      {/* Logo */}
      <div className="px-5 pt-5 pb-4 border-b border-slate-100 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-[18px] shadow-md shadow-blue-200 flex-shrink-0">
            🚗
          </div>
          <div>
            <div
              className="font-black text-[15px] text-slate-900 leading-tight"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              BloomRydes
            </div>
            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
              Driver Portal
            </div>
          </div>
        </div>
      </div>


      <div className="px-3 pt-4">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
          Main
        </p>
        <div className="flex flex-col gap-0.5">
          <NavItem
            icon={<IconGrid />}
            label="Dashboard"
            active={activeNav === "dashboard"}
            onClick={() => setActiveNav("dashboard")}
          />
          <NavItem
            icon={<IconPlus />}
            label="Create Trip"
            active={activeNav === "create"}
            onClick={() => setActiveNav("create")}
          />
          <NavItem
            icon={<IconList />}
            label="My Trips"
            active={activeNav === "trips"}
            badge={3}
            onClick={() => setActiveNav("trips")}
          />
          <NavItem
            icon={<IconUsers />}
            label="Passengers"
            active={activeNav === "passengers"}
            onClick={() => setActiveNav("passengers")}
          />
          <NavItem
            icon={<IconBar />}
            label="Performance"
            active={activeNav === "performance"}
            onClick={() => setActiveNav("performance")}
          />
        </div>
      </div>

      {/* Account nav */}
      <div className="px-3 pt-4">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
          Account
        </p>
        <div className="flex flex-col gap-0.5">
          <NavItem
            icon={<IconCar />}
            label="My Vehicle"
            active={activeNav === "vehicle"}
            onClick={() => setActiveNav("vehicle")}
          />
          <NavItem
            icon={<IconDoc />}
            label="Documents"
            active={activeNav === "documents"}
            onClick={() => setActiveNav("documents")}
          />
          <NavItem
            icon={<IconPerson />}
            label="Profile"
            active={activeNav === "profile"}
            onClick={() => setActiveNav("profile")}
          />
          <NavItem
            icon={<IconGear />}
            label="Settings"
            active={activeNav === "settings"}
            onClick={() => setActiveNav("settings")}
          />
        </div>
      </div>

      {/* Verified card */}
      <div className="px-3 pt-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-4 shadow-lg shadow-blue-100">
          <div className="flex items-center gap-1.5 mb-1">
            <IconCheck />
            <span
              className="text-[11px] font-black text-white uppercase tracking-wider"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              Verified Driver
            </span>
          </div>
          <div className="text-[11px] text-blue-200">
            Badge active since Jan 2026
          </div>
        </div>
      </div>

      {/* User footer */}
      <div className="mt-auto px-4 py-4 border-t border-slate-100 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-[13px] flex-shrink-0 shadow-sm">
            EO
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-slate-800 truncate">
              Emeka Okonkwo
            </div>
            <div className="text-[11px] text-slate-400">Driver</div>
          </div>
          <button className="text-slate-400 hover:text-blue-600 transition-colors">
            <IconLogout />
          </button>
        </div>
      </div>
    </aside>
  );
}
