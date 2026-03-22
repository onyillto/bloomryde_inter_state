"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/hooks";
import {
  selectDriverUser,
  selectToken,
  selectIsAuthenticated,
} from "@/store/slices/authSlice";
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
  const router = useRouter();

  // ── Redux state ──────────────────────────────────────────────
  const driverUser = useAppSelector(selectDriverUser);
  const token = useAppSelector(selectToken);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  // ── Local UI state ───────────────────────────────────────────
  const [activeNav, setActiveNav] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ── Auth guard ───────────────────────────────────────────────
  useEffect(() => {
    if (!isAuthenticated || !driverUser) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated, driverUser, router]);

  // Don't render anything until auth is confirmed
  if (!isAuthenticated || !driverUser) return null;

  // ── Derived values ───────────────────────────────────────────
  const driverName = `${driverUser.personalInfo.firstName} ${driverUser.personalInfo.lastName}`;

  // ── Content renderer ─────────────────────────────────────────
  const renderContent = () => {
    switch (activeNav) {
      case "dashboard":
        return <DriverDashboardContent driverUser={driverUser} />;
      case "create":
        return <CreateTrip token={token} />;
      case "trips":
        return <MyTrips token={token} />;
      case "passengers":
        return <Passengers token={token} />;
      case "performance":
        return <Performance driverUser={driverUser} />;
      case "vehicle":
        return <Vehicle vehicleInfo={driverUser.vehicleInfo} />;
      case "documents":
        return <DriverDocument documents={driverUser.verificationDocuments} />;
      case "profile":
        return <DriverProfile driverUser={driverUser} token={token} />;
      case "settings":
        return <DriverSettings token={token} />;
      default:
        return <DriverDashboardContent driverUser={driverUser} />;
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

      {/* Mobile sidebar overlay */}
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
          driverName={driverName}
          approvalStatus={driverUser.approvalStatus}
        />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-screen-xl mx-auto px-4 py-6 md:px-8 md:py-8">
            <DriverHeader
              setIsSidebarOpen={setIsSidebarOpen}
              driverName={driverName}
            />
            {renderContent()}
          </div>
        </main>
      </div>
    </>
  );
}
