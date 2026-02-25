"use client";

import { useState } from "react";
import {
  Settings,
  Bell,
  Shield,
  Smartphone,
  Mail,
  Moon,
  Globe,
  HelpCircle,
  MessageCircle,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Lock,
  Trash2,
  Download,
  LogOut,
  Info,
  Volume2,
  Eye,
  EyeOff,
  RefreshCw,
  X,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabKey = "notifications" | "privacy" | "appearance" | "support";

// ─── Toggle ───────────────────────────────────────────────────────────────────

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-11 h-6 rounded-full transition-all flex-shrink-0 ${
        on ? "bg-blue-600" : "bg-zinc-700"
      }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200 ${
          on ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

// ─── Setting Row ──────────────────────────────────────────────────────────────

function SettingRow({
  icon,
  label,
  sub,
  on,
  onToggle,
  last = false,
}: {
  icon: React.ReactNode;
  label: string;
  sub?: string;
  on: boolean;
  onToggle: () => void;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-3.5 ${
        !last ? "border-b border-zinc-800" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border transition-all ${
            on
              ? "bg-blue-600/15 border-blue-500/30 text-blue-400"
              : "bg-zinc-800 border-zinc-700 text-zinc-500"
          }`}
        >
          {icon}
        </div>
        <div>
          <div
            className={`text-[14px] font-medium ${
              on ? "text-zinc-200" : "text-zinc-400"
            }`}
          >
            {label}
          </div>
          {sub && (
            <div className="text-[12px] text-zinc-600 mt-0.5 max-w-[340px]">
              {sub}
            </div>
          )}
        </div>
      </div>
      <Toggle on={on} onToggle={onToggle} />
    </div>
  );
}

// ─── Action Row ───────────────────────────────────────────────────────────────

function ActionRow({
  icon,
  label,
  sub,
  onClick,
  color = "text-zinc-300",
  last = false,
}: {
  icon: React.ReactNode;
  label: string;
  sub?: string;
  onClick?: () => void;
  color?: string;
  last?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 py-3.5 text-left group transition-all ${
        !last ? "border-b border-zinc-800" : ""
      }`}
    >
      <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0 text-zinc-500 group-hover:border-blue-500/30 group-hover:text-blue-400 transition-all">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className={`text-[14px] font-medium ${color}`}>{label}</div>
        {sub && <div className="text-[12px] text-zinc-600 mt-0.5">{sub}</div>}
      </div>
      <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-blue-500 flex-shrink-0 transition-colors" />
    </button>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────

function SectionCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
      <div
        className="text-[13px] font-bold text-white mb-4 flex items-center gap-2"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        <span className="text-blue-500">{icon}</span>
        {title}
      </div>
      {children}
    </div>
  );
}

// ─── Tab Button ───────────────────────────────────────────────────────────────

function TabBtn({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all whitespace-nowrap
        ${
          active
            ? "bg-blue-600 text-white shadow-md shadow-blue-600/25"
            : "bg-transparent text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("notifications");
  const [saved, setSaved] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [deleteStep, setDeleteStep] = useState<1 | 2>(1);
  const [deleteInput, setDeleteInput] = useState("");

  // ── Notification settings ──
  const [notifs, setNotifs] = useState({
    tripReminder24h: true,
    tripReminder2h: true,
    driverContactAlert: true,
    bookingConfirmed: true,
    tripCancelled: true,
    promos: false,
    appUpdates: false,
    sms: true,
    email: true,
    push: true,
    sound: true,
  });

  // ── Privacy settings ──
  const [privacy, setPrivacy] = useState({
    autoShareTrip: true,
    allowDriverCall: true,
    shareLocation: false,
    dataAnalytics: true,
    personalisedOffers: false,
  });

  // ── Appearance ──
  const [appearance, setAppearance] = useState({
    darkMode: true,
    compactView: false,
    showTripPrices: true,
    language: "English",
    currency: "NGN (₦)",
  });

  function toggleN(k: keyof typeof notifs) {
    setNotifs((n) => ({ ...n, [k]: !n[k] }));
    triggerSaved();
  }

  function toggleP(k: keyof typeof privacy) {
    setPrivacy((p) => ({ ...p, [k]: !p[k] }));
    triggerSaved();
  }

  function toggleA(k: keyof typeof appearance) {
    if (typeof appearance[k] === "boolean") {
      setAppearance((a) => ({ ...a, [k]: !(a[k] as boolean) }));
      triggerSaved();
    }
  }

  function triggerSaved() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');

        .settings-root * { box-sizing: border-box; }
        .settings-root { font-family: 'DM Sans', sans-serif; }

        .section-enter { animation: secIn 0.25s ease-out both; }
        @keyframes secIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .modal-enter { animation: modalIn 0.2s ease-out both; }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .settings-root ::-webkit-scrollbar { width: 4px; }
        .settings-root ::-webkit-scrollbar-track { background: transparent; }
        .settings-root ::-webkit-scrollbar-thumb { background: #2a3530; border-radius: 4px; }

        select option { background: #141a18; }
      `}</style>

      <div className="settings-root bg-[#0b0f0e] min-h-screen text-[#e8f0ec]">
        <div className="max-w-[780px] mx-auto px-6 py-8">
          {/* ── Page Header ─────────────────────────────────────── */}
          <div className="mb-8">
            <h1
              className="text-[28px] font-black text-white leading-tight tracking-tight flex items-center gap-3"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <Settings className="w-7 h-7 text-blue-500" />
              Settings
            </h1>
            <p className="text-zinc-500 text-[14px] mt-1">
              Manage your app preferences, privacy, and account
            </p>
          </div>

          {/* ── Saved toast ──────────────────────────────────────── */}
          {saved && (
            <div
              className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 rounded-xl px-4 py-3 mb-5"
              style={{ animation: "secIn 0.25s ease-out both" }}
            >
              <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span className="text-[13px] text-blue-400 font-semibold">
                Settings saved automatically
              </span>
            </div>
          )}

          {/* ── Tabs ─────────────────────────────────────────────── */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
            <TabBtn
              active={activeTab === "notifications"}
              onClick={() => setActiveTab("notifications")}
              icon={<Bell className="w-4 h-4" />}
              label="Notifications"
            />
            <TabBtn
              active={activeTab === "privacy"}
              onClick={() => setActiveTab("privacy")}
              icon={<Shield className="w-4 h-4" />}
              label="Privacy & Safety"
            />
            <TabBtn
              active={activeTab === "appearance"}
              onClick={() => setActiveTab("appearance")}
              icon={<Moon className="w-4 h-4" />}
              label="Appearance"
            />
            <TabBtn
              active={activeTab === "support"}
              onClick={() => setActiveTab("support")}
              icon={<HelpCircle className="w-4 h-4" />}
              label="Help & Account"
            />
          </div>

          {/* ══ TAB: NOTIFICATIONS ══════════════════════════════════ */}
          {activeTab === "notifications" && (
            <div className="section-enter space-y-4">
              <SectionCard
                title="Trip Alerts"
                icon={<Bell className="w-4 h-4" />}
              >
                <SettingRow
                  icon={<Bell className="w-3.5 h-3.5" />}
                  label="24-hour Reminder"
                  sub="Notify me the day before my trip departs"
                  on={notifs.tripReminder24h}
                  onToggle={() => toggleN("tripReminder24h")}
                />
                <SettingRow
                  icon={<Bell className="w-3.5 h-3.5" />}
                  label="2-hour Reminder"
                  sub="Final reminder 2 hours before departure"
                  on={notifs.tripReminder2h}
                  onToggle={() => toggleN("tripReminder2h")}
                />
                <SettingRow
                  icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                  label="Booking Confirmed"
                  sub="Alert when a booking is successfully placed"
                  on={notifs.bookingConfirmed}
                  onToggle={() => toggleN("bookingConfirmed")}
                />
                <SettingRow
                  icon={<X className="w-3.5 h-3.5" />}
                  label="Trip Cancelled"
                  sub="Notify me if a driver cancels my trip"
                  on={notifs.tripCancelled}
                  onToggle={() => toggleN("tripCancelled")}
                />
                <SettingRow
                  icon={<MessageCircle className="w-3.5 h-3.5" />}
                  label="Driver Contact Alert"
                  sub="When a driver views or saves your booking"
                  on={notifs.driverContactAlert}
                  onToggle={() => toggleN("driverContactAlert")}
                  last
                />
              </SectionCard>

              <SectionCard
                title="Delivery Channels"
                icon={<Smartphone className="w-4 h-4" />}
              >
                <SettingRow
                  icon={<Smartphone className="w-3.5 h-3.5" />}
                  label="Push Notifications"
                  sub="In-app alerts on your device"
                  on={notifs.push}
                  onToggle={() => toggleN("push")}
                />
                <SettingRow
                  icon={<Mail className="w-3.5 h-3.5" />}
                  label="SMS Notifications"
                  sub="Text messages to your registered number"
                  on={notifs.sms}
                  onToggle={() => toggleN("sms")}
                />
                <SettingRow
                  icon={<Mail className="w-3.5 h-3.5" />}
                  label="Email Notifications"
                  sub="Sent to amara.kolawole@gmail.com"
                  on={notifs.email}
                  onToggle={() => toggleN("email")}
                />
                <SettingRow
                  icon={<Volume2 className="w-3.5 h-3.5" />}
                  label="Notification Sound"
                  sub="Play sound for important alerts"
                  on={notifs.sound}
                  onToggle={() => toggleN("sound")}
                  last
                />
              </SectionCard>

              <SectionCard
                title="Marketing"
                icon={<Mail className="w-4 h-4" />}
              >
                <SettingRow
                  icon={<Mail className="w-3.5 h-3.5" />}
                  label="Promotions & Offers"
                  sub="Special fares and seasonal deals"
                  on={notifs.promos}
                  onToggle={() => toggleN("promos")}
                />
                <SettingRow
                  icon={<RefreshCw className="w-3.5 h-3.5" />}
                  label="App Updates & News"
                  sub="New features and platform announcements"
                  on={notifs.appUpdates}
                  onToggle={() => toggleN("appUpdates")}
                  last
                />
              </SectionCard>
            </div>
          )}

          {/* ══ TAB: PRIVACY & SAFETY ════════════════════════════════ */}
          {activeTab === "privacy" && (
            <div className="section-enter space-y-4">
              {/* Trip sharing */}
              <SectionCard
                title="Trip Sharing"
                icon={<Shield className="w-4 h-4" />}
              >
                <div className="flex items-start gap-3 bg-blue-500/8 border border-blue-500/20 rounded-xl p-3 mb-4">
                  <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-[12px] text-zinc-400 leading-relaxed">
                    These settings control how your trip information is shared
                    with emergency contacts and drivers.
                  </p>
                </div>
                <SettingRow
                  icon={<Shield className="w-3.5 h-3.5" />}
                  label="Auto-share Trip Details"
                  sub="Send driver info to your default emergency contact on every booking"
                  on={privacy.autoShareTrip}
                  onToggle={() => toggleP("autoShareTrip")}
                />
                <SettingRow
                  icon={<Smartphone className="w-3.5 h-3.5" />}
                  label="Allow Driver to Call You"
                  sub="Driver can see your registered number once booking is confirmed"
                  on={privacy.allowDriverCall}
                  onToggle={() => toggleP("allowDriverCall")}
                />
                <SettingRow
                  icon={<Globe className="w-3.5 h-3.5" />}
                  label="Share Live Location"
                  sub="Share real-time location with emergency contact during trip"
                  on={privacy.shareLocation}
                  onToggle={() => toggleP("shareLocation")}
                  last
                />
              </SectionCard>

              {/* Data */}
              <SectionCard
                title="Data & Personalisation"
                icon={<Eye className="w-4 h-4" />}
              >
                <SettingRow
                  icon={<Eye className="w-3.5 h-3.5" />}
                  label="Usage Analytics"
                  sub="Help improve BloomRydes by sharing anonymised usage data"
                  on={privacy.dataAnalytics}
                  onToggle={() => toggleP("dataAnalytics")}
                />
                <SettingRow
                  icon={<EyeOff className="w-3.5 h-3.5" />}
                  label="Personalised Offers"
                  sub="Allow BloomRydes to tailor promotions based on your trip history"
                  on={privacy.personalisedOffers}
                  onToggle={() => toggleP("personalisedOffers")}
                  last
                />
              </SectionCard>

              {/* Legal links */}
              <SectionCard title="Legal" icon={<Lock className="w-4 h-4" />}>
                {[
                  {
                    label: "Privacy Policy",
                    sub: "How we collect and use your data",
                    icon: <Shield className="w-3.5 h-3.5" />,
                  },
                  {
                    label: "Terms of Service",
                    sub: "Platform usage rules and rider agreement",
                    icon: <Info className="w-3.5 h-3.5" />,
                  },
                  {
                    label: "Cookie Policy",
                    sub: "How we use cookies and local storage",
                    icon: <Globe className="w-3.5 h-3.5" />,
                  },
                ].map((item, i, arr) => (
                  <ActionRow
                    key={item.label}
                    {...item}
                    last={i === arr.length - 1}
                  />
                ))}
              </SectionCard>
            </div>
          )}

          {/* ══ TAB: APPEARANCE ═════════════════════════════════════ */}
          {activeTab === "appearance" && (
            <div className="section-enter space-y-4">
              <SectionCard title="Display" icon={<Moon className="w-4 h-4" />}>
                <SettingRow
                  icon={<Moon className="w-3.5 h-3.5" />}
                  label="Dark Mode"
                  sub="Use dark theme across the app"
                  on={appearance.darkMode}
                  onToggle={() => toggleA("darkMode")}
                />
                <SettingRow
                  icon={<Eye className="w-3.5 h-3.5" />}
                  label="Compact View"
                  sub="Show more trips on screen with reduced card size"
                  on={appearance.compactView}
                  onToggle={() => toggleA("compactView")}
                />
                <SettingRow
                  icon={<Eye className="w-3.5 h-3.5" />}
                  label="Show Trip Prices"
                  sub="Display fare amounts on trip cards in search results"
                  on={appearance.showTripPrices}
                  onToggle={() => toggleA("showTripPrices")}
                  last
                />
              </SectionCard>

              <SectionCard
                title="Language & Region"
                icon={<Globe className="w-4 h-4" />}
              >
                {/* Language */}
                <div className="py-3.5 border-b border-zinc-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500 flex-shrink-0 mt-0.5">
                        <Globe className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-[14px] font-medium text-zinc-200">
                          Language
                        </div>
                        <div className="text-[12px] text-zinc-600 mt-0.5">
                          App display language
                        </div>
                      </div>
                    </div>
                    <select
                      value={appearance.language}
                      onChange={(e) => {
                        setAppearance((a) => ({
                          ...a,
                          language: e.target.value,
                        }));
                        triggerSaved();
                      }}
                      className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-1.5 text-[13px] text-zinc-300 focus:outline-none focus:border-blue-500/60 transition-colors"
                    >
                      {["English", "Yoruba", "Igbo", "Hausa", "Pidgin"].map(
                        (l) => (
                          <option
                            key={l}
                            value={l}
                            style={{ background: "#141a18" }}
                          >
                            {l}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                {/* Currency */}
                <div className="py-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500 flex-shrink-0 mt-0.5">
                        <span className="text-[13px] font-bold">₦</span>
                      </div>
                      <div>
                        <div className="text-[14px] font-medium text-zinc-200">
                          Currency Display
                        </div>
                        <div className="text-[12px] text-zinc-600 mt-0.5">
                          How fare prices are displayed
                        </div>
                      </div>
                    </div>
                    <select
                      value={appearance.currency}
                      onChange={(e) => {
                        setAppearance((a) => ({
                          ...a,
                          currency: e.target.value,
                        }));
                        triggerSaved();
                      }}
                      className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-1.5 text-[13px] text-zinc-300 focus:outline-none focus:border-blue-500/60 transition-colors"
                    >
                      {["NGN (₦)", "USD ($)", "GBP (£)", "EUR (€)"].map((c) => (
                        <option
                          key={c}
                          value={c}
                          style={{ background: "#141a18" }}
                        >
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </SectionCard>

              {/* Preview card */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
                <div
                  className="text-[13px] font-bold text-white mb-4 flex items-center gap-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  <Eye className="w-4 h-4 text-blue-500" />
                  Preview
                </div>
                <div
                  className={`rounded-xl border p-4 transition-all ${
                    appearance.darkMode
                      ? "bg-zinc-800 border-zinc-700"
                      : "bg-white border-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-800 to-blue-950 flex items-center justify-center text-[12px] font-bold text-blue-300 flex-shrink-0 border-2 border-blue-500/30">
                      EO
                    </div>
                    <div className="flex-1">
                      <div
                        className={`font-semibold text-[14px] ${
                          appearance.darkMode ? "text-white" : "text-zinc-900"
                        }`}
                      >
                        Emeka Okonkwo
                      </div>
                      <div
                        className={`text-[12px] ${
                          appearance.darkMode
                            ? "text-zinc-400"
                            : "text-zinc-500"
                        }`}
                      >
                        Lagos → Abuja · 6:00 AM
                      </div>
                    </div>
                    {appearance.showTripPrices && (
                      <div
                        className="font-black text-[18px] text-blue-400"
                        style={{ fontFamily: "'Syne', sans-serif" }}
                      >
                        {appearance.currency.includes("NGN")
                          ? "₦"
                          : appearance.currency.includes("USD")
                          ? "$"
                          : appearance.currency.includes("GBP")
                          ? "£"
                          : "€"}
                        5,000
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-[11px] text-zinc-600 mt-2 text-center">
                  This is how trip cards will appear with your current settings
                </div>
              </div>
            </div>
          )}

          {/* ══ TAB: HELP & ACCOUNT ══════════════════════════════════ */}
          {activeTab === "support" && (
            <div className="section-enter space-y-4">
              {/* App info */}
              <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/8 to-blue-500/3 p-5">
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest">
                    BloomRydes Interstate
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div
                      className="font-black text-[18px] text-white"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      v1.0.0
                    </div>
                    <div className="text-[12px] text-zinc-500 mt-0.5">
                      Latest version · Released Feb 2026
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> Up to date
                  </div>
                </div>
              </div>

              {/* Help links */}
              <SectionCard
                title="Help & Support"
                icon={<HelpCircle className="w-4 h-4" />}
              >
                {[
                  {
                    icon: <HelpCircle className="w-3.5 h-3.5" />,
                    label: "Help Centre",
                    sub: "FAQs, guides, and how-to articles",
                  },
                  {
                    icon: <MessageCircle className="w-3.5 h-3.5" />,
                    label: "Chat with Support",
                    sub: "Get help from our team · Usually replies in < 1 hr",
                  },
                  {
                    icon: <Mail className="w-3.5 h-3.5" />,
                    label: "Email Support",
                    sub: "support@bloomrydes.ng",
                  },
                  {
                    icon: <AlertCircle className="w-3.5 h-3.5" />,
                    label: "Report a Problem",
                    sub: "Something not working? Let us know",
                  },
                ].map((item, i, arr) => (
                  <ActionRow
                    key={item.label}
                    {...item}
                    last={i === arr.length - 1}
                  />
                ))}
              </SectionCard>

              {/* Account actions */}
              <SectionCard title="Account" icon={<Lock className="w-4 h-4" />}>
                {[
                  {
                    icon: <Download className="w-3.5 h-3.5" />,
                    label: "Download My Data",
                    sub: "Export all your account data as a file",
                  },
                  {
                    icon: <RefreshCw className="w-3.5 h-3.5" />,
                    label: "Clear Cache",
                    sub: "Free up local storage · May slow initial loads",
                  },
                ].map((item, i, arr) => (
                  <ActionRow
                    key={item.label}
                    {...item}
                    last={i === arr.length - 1}
                  />
                ))}
              </SectionCard>

              {/* Sign out */}
              <button
                onClick={() => setShowLogoutModal(true)}
                className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl border border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-800/60 transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500 group-hover:border-red-500/30 group-hover:text-red-400 transition-all flex-shrink-0">
                  <LogOut className="w-4 h-4" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-[14px] font-semibold text-zinc-300 group-hover:text-red-400 transition-colors">
                    Sign Out
                  </div>
                  <div className="text-[12px] text-zinc-600">
                    Sign out of your BloomRydes account
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-700 group-hover:text-red-400 transition-colors flex-shrink-0" />
              </button>

              {/* Danger zone */}
              <div className="rounded-2xl border border-red-500/15 bg-red-500/3 p-5">
                <div
                  className="text-[13px] font-bold text-red-400 mb-4 flex items-center gap-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  <AlertCircle className="w-4 h-4" />
                  Danger Zone
                </div>
                {[
                  {
                    icon: <AlertCircle className="w-3.5 h-3.5" />,
                    label: "Deactivate Account",
                    sub: "Temporarily pause your account · You can reactivate anytime",
                    color: "text-amber-400",
                  },
                  {
                    icon: <Trash2 className="w-3.5 h-3.5" />,
                    label: "Delete Account",
                    sub: "Permanently delete your account and all trip data",
                    color: "text-red-400",
                    onClick: () => setShowDeleteModal(true),
                  },
                ].map((item, i, arr) => (
                  <ActionRow
                    key={item.label}
                    {...item}
                    last={i === arr.length - 1}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Logout Modal ────────────────────────────────────────── */}
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="w-full max-w-[360px] rounded-2xl border border-zinc-800 bg-zinc-900 p-6 modal-enter">
              <div className="w-14 h-14 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center mx-auto mb-4">
                <LogOut className="w-6 h-6 text-zinc-400" />
              </div>
              <div
                className="text-[18px] font-black text-white text-center mb-2"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Sign Out?
              </div>
              <div className="text-[13px] text-zinc-500 text-center mb-6">
                You'll need to log in again to access your bookings and profile.
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-400 font-semibold text-[14px] hover:border-zinc-600 hover:text-zinc-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold text-[14px] hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Delete Account Modal ─────────────────────────────────── */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="w-full max-w-[400px] rounded-2xl border border-red-500/25 bg-zinc-900 p-6 modal-enter">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteStep(1);
                  setDeleteInput("");
                }}
                className="absolute top-4 right-4 w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500 hover:text-zinc-300 transition-all"
                style={{ position: "absolute" }}
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {deleteStep === 1 ? (
                <>
                  <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/25 flex items-center justify-center mx-auto mb-4">
                    <Trash2 className="w-6 h-6 text-red-400" />
                  </div>
                  <div
                    className="text-[18px] font-black text-white text-center mb-2"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Delete Account?
                  </div>
                  <div className="text-[13px] text-zinc-500 text-center mb-5">
                    This will permanently delete your account, all bookings,
                    trip history, and personal data. This action{" "}
                    <span className="text-red-400 font-semibold">
                      cannot be undone
                    </span>
                    .
                  </div>

                  {/* What gets deleted */}
                  <div className="rounded-xl border border-zinc-800 bg-zinc-800/40 p-4 mb-5 space-y-2">
                    {[
                      "Your profile and personal information",
                      "All booking history and references",
                      "Trip history and ratings",
                      "Emergency contacts list",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-[12px] text-zinc-500"
                      >
                        <X className="w-3 h-3 text-red-500 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowDeleteModal(false);
                        setDeleteStep(1);
                      }}
                      className="flex-1 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-400 font-semibold text-[14px] hover:border-zinc-600 hover:text-zinc-200 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setDeleteStep(2)}
                      className="flex-1 py-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 font-bold text-[14px] hover:bg-red-500/25 transition-all"
                    >
                      Continue
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="text-[18px] font-black text-white text-center mb-2"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Final Confirmation
                  </div>
                  <div className="text-[13px] text-zinc-500 text-center mb-5">
                    Type{" "}
                    <span className="font-mono font-bold text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded">
                      DELETE
                    </span>{" "}
                    to confirm
                  </div>
                  <input
                    value={deleteInput}
                    onChange={(e) => setDeleteInput(e.target.value)}
                    placeholder="Type DELETE to confirm"
                    className="w-full bg-zinc-800/80 border border-zinc-700 rounded-xl px-4 py-3 text-[14px] text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-500/60 transition-colors mb-4 text-center font-mono tracking-widest"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => setDeleteStep(1)}
                      className="flex-1 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-400 font-semibold text-[14px] hover:border-zinc-600 transition-all"
                    >
                      Back
                    </button>
                    <button
                      disabled={deleteInput !== "DELETE"}
                      className={`flex-1 py-3 rounded-xl font-bold text-[14px] transition-all ${
                        deleteInput === "DELETE"
                          ? "bg-red-500 text-white hover:bg-red-400 shadow-lg shadow-red-500/20"
                          : "bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-700"
                      }`}
                    >
                      Delete My Account
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
