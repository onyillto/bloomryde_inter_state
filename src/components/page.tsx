"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import RiderOnboarding from "@/components/RiderOnboarding";
import DriverOnboarding from "@/components/DriverOnboarding";
import { ArrowRight, User, Car } from "lucide-react";

function OnboardingContent() {
  // 1. Use the hook to get searchParams
  const searchParams = useSearchParams();
  // 2. Get the phone number from the URL
  const phone = searchParams.get("phone") ?? "";

  const [role, setRole] = useState<"rider" | "driver" | null>(null);

  const handleSelectRole = (selectedRole: "rider" | "driver") => {
    setRole(selectedRole);
  };

  const handleBackToChoose = () => {
    setRole(null);
  };

  // Render the correct onboarding flow based on the selected role
  if (role === "rider") {
    return <RiderOnboarding phone={phone} onBackToChoose={handleBackToChoose} />;
  }

  if (role === "driver") {
    return (
      <DriverOnboarding phone={phone} onBackToChoose={handleBackToChoose} />
    );
  }

  // Default view: Role selection
  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md text-center animate-in fade-in-50 duration-500">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
          One Last Step
        </h1>
        <p className="text-slate-400 text-lg mt-2 mb-10">
          How will you be using BloomRyde?
        </p>

        <div className="space-y-5">
          <RoleButton
            icon={User}
            title="I'm a Rider"
            subtitle="Book safe and comfortable interstate trips."
            onClick={() => handleSelectRole("rider")}
          />
          <RoleButton
            icon={Car}
            title="I'm a Driver"
            subtitle="Earn money by offering rides in your vehicle."
            onClick={() => handleSelectRole("driver")}
          />
        </div>
      </div>
    </div>
  );
}

function RoleButton({ icon: Icon, title, subtitle, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="group w-full text-left p-6 bg-slate-800/50 border border-slate-700/50 rounded-2xl flex items-center gap-6 hover:bg-slate-800 hover:border-blue-600/50 transition-all duration-300"
    >
      <div className="w-14 h-14 rounded-xl bg-slate-700/50 group-hover:bg-blue-600 text-blue-400 group-hover:text-white flex items-center justify-center transition-all duration-300">
        <Icon size={24} />
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-white text-lg">{title}</h3>
        <p className="text-slate-400 text-sm">{subtitle}</p>
      </div>
      <ArrowRight
        size={20}
        className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-transform"
      />
    </button>
  );
}

// 3. The useSearchParams hook must be used within a <Suspense> boundary.
export default function OnboardingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OnboardingContent />
    </Suspense>
  );
}
