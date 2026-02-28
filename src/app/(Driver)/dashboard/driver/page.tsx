"use client";

import { useState } from "react";
import DriverSidebar from "./Sidebar";
import DriverHeader from "./Header";
import DriverDashboardContent from "./DashboardContent";
import CreateTrip from "./Createtrip";
import MyTrips from "./Drivermytrips";
import DriverRegistration from "./Driverregistration";
import Passengers from "./Driverpassengers";
import Performance from "./Driverperformance";
import Vehicle from "./Drivermyvehicle";
import DriverDocument from "./DriverDocument";
import DriverProfile from "./DriverProfile";
import DriverSettings from "./Driversettings";

export default function DriverDashboardPage() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeNav) {
      case "dashboard":
        return <DriverDashboardContent />;
      case "create":
        return <CreateTrip />;
      case "trips":
        return <MyTrips />;
      case "passengers":
        return <Passengers />;
      case "performance":
        return <Performance />;
      case "vehicle":
        return <Vehicle />;
      case "documents":
        return <DriverDocument />;
      case "profile":
        return <DriverProfile />;
      case "settings":
        return <DriverSettings />;
      default:
        return <DriverDashboardContent />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        .dr * { box-sizing: border-box; }
        .dr { font-family: 'DM Sans', sans-serif; }
        .card-in { animation: cIn .3s ease-out both; }
        @keyframes cIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .stat-in { animation: sIn .4s ease-out both; }
        @keyframes sIn { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        .sb::-webkit-scrollbar { width:3px; }
        .sb::-webkit-scrollbar-thumb { background:#dbeafe; border-radius:4px; }
      `}</style>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="dr flex h-screen bg-slate-50 overflow-hidden">
        <DriverSidebar
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-screen-xl mx-auto px-4 py-6 md:px-8 md:py-8">
            <DriverHeader setIsSidebarOpen={setIsSidebarOpen} />
            {renderContent()}
          </div>
        </main>
      </div>
    </>
  );
}
