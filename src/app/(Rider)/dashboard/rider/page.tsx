"use client";

import { useState } from "react";

// Lucide-style SVG icons as inline components
const Icons = {
  Menu: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  ),
  X: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-6 h-6"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),
  Bus: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M8 6v6M15 6v6M2 12h19.6M18 18h2M2 18h2M21 6H3a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h1M3 6l2-4h14l2 4M19 18H5a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1z" />
    </svg>
  ),
  Home: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  Search: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),
  Bookmark: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  ),
  Clock: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  User: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Shield: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Settings: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Bell: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  ),
  Plus: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M5 12h14M12 5v14" />
    </svg>
  ),
  ArrowRight: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  MapPin: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Star: () => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  PhoneCall: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 11a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      <path d="M14.05 2a9 9 0 0 1 8 7.94M14.05 6A5 5 0 0 1 18 10" />
    </svg>
  ),
  Zap: () => (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  ChevronRight: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  AlertCircle: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  ),
  TrendingUp: () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
};

const navItems = [
  { icon: "Home", label: "Dashboard", active: true, section: "MAIN" },
  { icon: "Search", label: "Find a Ride", section: "MAIN" },
  { icon: "Bookmark", label: "My Bookings", badge: 2, section: "MAIN" },
  { icon: "Clock", label: "Trip History", section: "MAIN" },
  { icon: "User", label: "My Profile", section: "ACCOUNT" },
  { icon: "Shield", label: "Emergency Contacts", section: "ACCOUNT" },
  { icon: "Settings", label: "Settings", section: "ACCOUNT" },
];

const stats = [
  {
    label: "Total Trips",
    value: "14",
    sub: "+2 this month",
    icon: "Bus",
    accent: "blue",
  },
  {
    label: "Upcoming",
    value: "2",
    sub: "Next trip in 3 days",
    icon: "Star",
    accent: "amber",
  },
  {
    label: "Favourite Route",
    value: "Lagos → Abuja",
    sub: "Travelled 7 times",
    icon: "MapPin",
    accent: "indigo",
  },
  {
    label: "Safety Score",
    value: "100%",
    sub: "All trips shared",
    icon: "Shield",
    accent: "emerald",
  },
];

const upcomingTrips = [
  {
    id: 1,
    from: "Lagos (Jibowu)",
    to: "Abuja (Utako)",
    date: "28",
    month: "FEB",
    time: "6:00 AM",
    driver: "Emeka O.",
    price: "₦5,000",
    status: "Confirmed",
    statusColor:
      "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  },
  {
    id: 2,
    from: "Abuja (Utako)",
    to: "Port Harcourt",
    date: "12",
    month: "MAR",
    time: "7:30 AM",
    driver: "Chidi N.",
    price: "₦6,500",
    status: "Pending Call",
    statusColor: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  },
];

const quickRoutes = ["Lagos → Abuja", "Lagos → Port Harcourt", "Abuja → Enugu"];

export default function PassengerDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-950 text-white font-sans overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .display-font { font-family: 'Outfit', sans-serif; }
        .sidebar-scrollbar::-webkit-scrollbar { width: 4px; }
        .sidebar-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .sidebar-scrollbar::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.3); border-radius: 99px; }
        .glass { background: rgba(255,255,255,0.04); backdrop-filter: blur(12px); }
        .stat-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .stat-card:hover { transform: translateY(-2px); }
        .trip-row { transition: background 0.15s ease; }
        .trip-row:hover { background: rgba(59,130,246,0.06); }
        .nav-item { transition: all 0.15s ease; }
        .quick-route { transition: all 0.15s ease; }
        .quick-route:hover { background: rgba(59,130,246,0.15); }
        .book-btn { transition: all 0.2s ease; }
        .book-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 25px rgba(59,130,246,0.4); }
        .shimmer-border { position: relative; }
        .shimmer-border::before { content: ''; position: absolute; inset: 0; border-radius: inherit; padding: 1px; background: linear-gradient(135deg, rgba(59,130,246,0.5), transparent, rgba(99,102,241,0.3)); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none; }
      `}</style>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex-shrink-0 flex flex-col border-r border-white/5 bg-slate-900/95 backdrop-blur-xl md:bg-slate-900/80 md:backdrop-blur-none sidebar-scrollbar overflow-y-auto transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-6 pb-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Icons.Bus />
            </div>
            <div>
              <p className="display-font font-700 text-white text-base leading-none font-bold">
                BloomRydes
              </p>
              <p className="text-blue-400 text-xs font-semibold tracking-widest uppercase mt-0.5">
                Interstate
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
          >
            <Icons.X />
          </button>
        </div>

        <div className="px-4 pb-4 flex-1">
          {["MAIN", "ACCOUNT"].map((section) => (
            <div key={section} className="mb-4">
              <p className="text-slate-500 text-[10px] font-semibold tracking-[0.15em] uppercase px-3 mb-2">
                {section}
              </p>
              {navItems
                .filter((item) => item.section === section)
                .map((item) => {
                  const Icon = Icons[item.icon];
                  const isActive = activeNav === item.label;
                  return (
                    <button
                      key={item.label}
                      onClick={() => setActiveNav(item.label)}
                      className={`nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm font-medium ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <Icon />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.badge && (
                        <span className="bg-blue-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
            </div>
          ))}
        </div>

        {/* Bottom user card */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-bold">
              A
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-semibold truncate">
                Amara Okonkwo
              </p>
              <p className="text-slate-400 text-xs truncate">Passenger</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-950 w-full">
        {/* Top bar */}
        <div className="sticky top-0 z-10 px-4 md:px-8 py-5 bg-slate-950/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
            >
              <Icons.Menu />
            </button>
            <div>
              <h1 className="display-font text-xl md:text-2xl font-bold text-white">
                Good morning, Amara 👋
              </h1>
              <p className="text-slate-400 text-xs md:text-sm mt-0.5">
                Where are you headed today?
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center text-slate-300">
              <Icons.Bell />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>
            <button className="book-btn flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-semibold text-white">
              <Icons.Plus />
              Book a Ride
            </button>
          </div>
        </div>

        <div className="p-4 md:p-8">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => {
              const Icon = Icons[stat.icon];
              const accents = {
                blue: "from-blue-600/20 to-blue-600/5 border-blue-500/20 text-blue-400",
                amber:
                  "from-amber-500/20 to-amber-500/5 border-amber-500/20 text-amber-400",
                indigo:
                  "from-indigo-500/20 to-indigo-500/5 border-indigo-500/20 text-indigo-400",
                emerald:
                  "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20 text-emerald-400",
              };
              const iconBg = {
                blue: "bg-blue-600/20 text-blue-400",
                amber: "bg-amber-500/20 text-amber-400",
                indigo: "bg-indigo-500/20 text-indigo-400",
                emerald: "bg-emerald-500/20 text-emerald-400",
              };
              return (
                <div
                  key={i}
                  className={`stat-card shimmer-border p-5 rounded-2xl bg-gradient-to-br ${
                    accents[stat.accent]
                  } border`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-slate-400 text-xs font-medium uppercase tracking-wide">
                      {stat.label}
                    </p>
                    <div
                      className={`w-8 h-8 rounded-lg ${
                        iconBg[stat.accent]
                      } flex items-center justify-center`}
                    >
                      <Icon />
                    </div>
                  </div>
                  <p className="display-font text-white text-2xl font-bold leading-none mb-1">
                    {stat.value}
                  </p>
                  <p className="text-slate-500 text-xs flex items-center gap-1">
                    <Icons.TrendingUp />
                    {stat.sub}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Bottom section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Upcoming Trips */}
            <div className="lg:col-span-3 bg-slate-900/60 border border-white/5 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <h2 className="display-font font-semibold text-white text-base">
                  Upcoming Trips
                </h2>
                <button className="text-blue-400 text-sm font-medium flex items-center gap-1 hover:text-blue-300 transition-colors">
                  View all <Icons.ArrowRight />
                </button>
              </div>
              <div className="divide-y divide-white/5">
                {upcomingTrips.map((trip) => (
                  <div
                    key={trip.id}
                    className="trip-row flex items-start gap-4 px-6 py-5 cursor-pointer rounded-xl"
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-blue-600/20 border border-blue-500/20 flex flex-col items-center justify-center">
                      <span className="display-font text-blue-400 text-xl font-bold leading-none">
                        {trip.date}
                      </span>
                      <span className="text-blue-400/70 text-[10px] font-semibold tracking-widest">
                        {trip.month}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-white font-semibold text-sm">
                          {trip.from}
                        </p>
                        <span className="text-slate-500">→</span>
                        <p className="text-white font-semibold text-sm">
                          {trip.to}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400 text-xs">
                        <span className="flex items-center gap-1">
                          <Icons.Clock />
                          Dep. {trip.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icons.User />
                          Driver: {trip.driver}
                        </span>
                        <span className="text-blue-400 font-semibold">
                          {trip.price}
                        </span>
                      </div>
                    </div>
                    <span
                      className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium ${trip.statusColor}`}
                    >
                      {trip.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right column */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {/* Quick Book */}
              <div className="bg-slate-900/60 border border-white/5 rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-white/5">
                  <h2 className="display-font font-semibold text-white text-base flex items-center gap-2">
                    <span className="text-amber-400">
                      <Icons.Zap />
                    </span>
                    Quick Book
                  </h2>
                  <p className="text-slate-500 text-xs mt-0.5 uppercase tracking-wider font-medium">
                    Recent Routes
                  </p>
                </div>
                <div className="p-3 flex flex-col gap-2">
                  {quickRoutes.map((route, i) => (
                    <button
                      key={i}
                      className="quick-route w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 text-sm text-white font-medium border border-white/5 hover:border-blue-500/30"
                    >
                      <span className="flex items-center gap-2 text-slate-300">
                        <Icons.MapPin />
                        {route}
                      </span>
                      <span className="text-blue-400">
                        <Icons.ChevronRight />
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-5">
                <h2 className="display-font font-semibold text-white text-base flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                    <Icons.Shield />
                  </span>
                  Emergency Contact
                </h2>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    C
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      Chioma Adeyemi
                    </p>
                    <p className="text-slate-400 text-xs mb-1">
                      Sister · +234 802 344 5678
                    </p>
                    <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-medium">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block"></span>
                      Trip details auto-shared
                    </span>
                  </div>
                  <button className="ml-auto flex-shrink-0 w-8 h-8 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 flex items-center justify-center transition-colors">
                    <Icons.PhoneCall />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
