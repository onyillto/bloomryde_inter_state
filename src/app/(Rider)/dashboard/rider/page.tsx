"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import DashboardContent from "./DashboardContent";
import PlaceholderContent from "./PlaceholderContent";

export default function PassengerDashboardPage() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeNav) {
      case "Dashboard":
        return <DashboardContent />;
      case "Find a Ride":
        return <PlaceholderContent title="Find a Ride" />;
      case "My Bookings":
        return <PlaceholderContent title="My Bookings" />;
      case "Trip History":
        return <PlaceholderContent title="Trip History" />;
      case "My Profile":
        return <PlaceholderContent title="My Profile" />;
      case "Emergency Contacts":
        return <PlaceholderContent title="Emergency Contacts" />;
      case "Settings":
        return <PlaceholderContent title="Settings" />;
      default:
        return <DashboardContent />;
    }
  };

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

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-slate-950 w-full">
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        <div className="p-4 md:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
