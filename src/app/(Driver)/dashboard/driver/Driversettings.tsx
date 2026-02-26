"use client";

import { useState } from "react";
import {
  FiBell,
  FiShield,
  FiSmartphone,
  FiMail,
  FiMoon,
  FiGlobe,
  FiHelpCircle,
  FiMessageCircle,
  FiChevronRight,
  FiCheckCircle,
  FiAlertCircle,
  FiLock,
  FiTrash2,
  FiDownload,
  FiLogOut,
  FiInfo,
  FiVolume2,
  FiEye,
  FiEyeOff,
  FiRefreshCw,
  FiX,
} from "react-icons/fi";
import {
  MdOutlineDirectionsCar,
  MdOutlinePayments,
  MdOutlineRoute,
} from "react-icons/md";
import { TbUsers, TbRoute } from "react-icons/tb";
import { BsWhatsapp, BsToggleOn } from "react-icons/bs";
import { PiCurrencyNgnBold } from "react-icons/pi";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabKey = "trips" | "notifications" | "privacy" | "support";

// ─── Toggle ───────────────────────────────────────────────────────────────────

function Toggle({
  on,
  onToggle,
  disabled = false,
}: {
  on: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`relative w-11 h-6 rounded-full transition-all flex-shrink-0 ${
        disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
      } ${on ? "bg-blue-600" : "bg-slate-200"}`}
    >
      <div
        className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200 ${
          on ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

// ─── SettingRow ───────────────────────────────────────────────────────────────

function SettingRow({
  icon,
  label,
  sub,
  on,
  onToggle,
  last = false,
  disabled = false,
}: {
  icon: React.ReactNode;
  label: string;
  sub?: string;
  on: boolean;
  onToggle: () => void;
  last?: boolean;
  disabled?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-3.5 ${
        !last ? "border-b border-slate-100" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 border transition-all
          ${
            on
              ? "bg-blue-50 border-blue-200 text-blue-500"
              : "bg-slate-50 border-slate-200 text-slate-400"
          }`}
        >
          {icon}
        </div>
        <div>
          <div
            className={`text-[13px] font-medium ${
              disabled ? "text-slate-400" : "text-slate-700"
            }`}
          >
            {label}
          </div>
          {sub && (
            <div className="text-[11px] text-slate-400 mt-0.5 max-w-xs">
              {sub}
            </div>
          )}
        </div>
      </div>
      <Toggle on={on} onToggle={onToggle} disabled={disabled} />
    </div>
  );
}

// ─── SelectRow ────────────────────────────────────────────────────────────────

function SelectRow({
  icon,
  label,
  sub,
  value,
  options,
  onChange,
  last = false,
}: {
  icon: React.ReactNode;
  label: string;
  sub?: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-3.5 ${
        !last ? "border-b border-slate-100" : ""
      }`}
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 bg-slate-50 border border-slate-200 text-slate-400">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-medium text-slate-700">{label}</div>
          {sub && (
            <div className="text-[11px] text-slate-400 mt-0.5">{sub}</div>
          )}
        </div>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="ml-4 flex-shrink-0 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-[12px] font-medium text-slate-700 focus:outline-none focus:border-blue-400 transition-all appearance-none cursor-pointer pr-7"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 8px center",
        }}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

// ─── LinkRow ──────────────────────────────────────────────────────────────────

function LinkRow({
  icon,
  label,
  sub,
  danger = false,
  badge,
  last = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  sub?: string;
  danger?: boolean;
  badge?: string;
  last?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 py-3.5 text-left group ${
        !last ? "border-b border-slate-100" : ""
      }`}
    >
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border transition-all
        ${
          danger
            ? "bg-red-50 border-red-200 text-red-400"
            : "bg-slate-50 border-slate-200 text-slate-400 group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-500"
        }`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div
          className={`text-[13px] font-medium ${
            danger ? "text-red-500" : "text-slate-700"
          }`}
        >
          {label}
        </div>
        {sub && <div className="text-[11px] text-slate-400 mt-0.5">{sub}</div>}
      </div>
      {badge && (
        <span className="text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full flex-shrink-0">
          {badge}
        </span>
      )}
      <FiChevronRight
        className={`w-4 h-4 flex-shrink-0 transition-colors ${
          danger ? "text-red-300" : "text-slate-300 group-hover:text-blue-400"
        }`}
      />
    </button>
  );
}

// ─── SectionCard ─────────────────────────────────────────────────────────────

function SectionCard({
  title,
  icon,
  children,
  accent,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  accent?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div
        className={`px-5 pt-4 pb-3 border-b border-slate-100 flex items-center gap-2 ${
          accent ?? ""
        }`}
      >
        <span className="text-blue-500">{icon}</span>
        <span
          className="text-[13px] font-bold text-slate-700"
          style={{ fontFamily: "'Syne',sans-serif" }}
        >
          {title}
        </span>
      </div>
      <div className="px-5">{children}</div>
    </div>
  );
}

// ─── TabBtn ───────────────────────────────────────────────────────────────────

function TabBtn({
  icon,
  label,
  active,
  onClick,
  badge,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all
        ${
          active
            ? "bg-blue-600 text-white shadow-md shadow-blue-200"
            : "bg-white text-slate-500 border border-slate-200 hover:border-blue-300 hover:text-blue-600"
        }`}
    >
      {icon}
      {label}
      {badge && badge > 0 && (
        <span
          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center
          ${active ? "bg-white/25 text-white" : "bg-red-100 text-red-500"}`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

// ─── Confirm Modal ────────────────────────────────────────────────────────────

function ConfirmModal({
  title,
  message,
  confirmLabel,
  danger = false,
  onConfirm,
  onClose,
}: {
  title: string;
  message: string;
  confirmLabel: string;
  danger?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-sm p-6 sec-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
        >
          <FiX className="w-3.5 h-3.5 text-slate-500" />
        </button>
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
            danger ? "bg-red-100" : "bg-blue-100"
          }`}
        >
          {danger ? (
            <FiAlertCircle className="w-6 h-6 text-red-500" />
          ) : (
            <FiCheckCircle className="w-6 h-6 text-blue-600" />
          )}
        </div>
        <div
          className="font-bold text-[16px] text-slate-800 mb-2"
          style={{ fontFamily: "'Syne',sans-serif" }}
        >
          {title}
        </div>
        <p className="text-[13px] text-slate-500 mb-5 leading-relaxed">
          {message}
        </p>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 text-[13px] font-medium hover:bg-slate-100 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 py-2.5 rounded-xl text-white text-[13px] font-semibold transition-all shadow-sm
              ${
                danger
                  ? "bg-red-500 hover:bg-red-400 shadow-red-200"
                  : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
              }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function DriverSettings() {
  const [activeTab, setActiveTab] = useState<TabKey>("trips");
  const [modal, setModal] = useState<null | "logout" | "deactivate" | "delete">(
    null
  );
  const [saved, setSaved] = useState(false);

  // ── Trip & Availability settings ──
  const [available, setAvailable] = useState(true);
  const [autoAccept, setAutoAccept] = useState(false);
  const [showSeatsLeft, setShowSeatsLeft] = useState(true);
  const [allowGroupBook, setAllowGroupBook] = useState(true);
  const [cashOnly, setCashOnly] = useState(true);
  const [defaultSeats, setDefaultSeats] = useState("8");
  const [advanceNotice, setAdvanceNotice] = useState("24 hours");
  const [tripRadius, setTripRadius] = useState("National");
  const [currency, setCurrency] = useState("NGN (₦)");

  // ── Notification settings ──
  const [notifBooking, setNotifBooking] = useState(true);
  const [notifCancel, setNotifCancel] = useState(true);
  const [notifPayment, setNotifPayment] = useState(true);
  const [notifReminder, setNotifReminder] = useState(true);
  const [notifRating, setNotifRating] = useState(true);
  const [notifPromo, setNotifPromo] = useState(false);
  const [notifSms, setNotifSms] = useState(true);
  const [notifWhatsapp, setNotifWhatsapp] = useState(true);
  const [notifEmail, setNotifEmail] = useState(false);
  const [notifSound, setNotifSound] = useState(true);

  // ── Privacy settings ──
  const [showPhone, setShowPhone] = useState(false);
  const [showLastSeen, setShowLastSeen] = useState(true);
  const [showRatings, setShowRatings] = useState(true);
  const [showEarnings, setShowEarnings] = useState(false);
  const [dataAnalytics, setDataAnalytics] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  // ── Language / appearance ──
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("Africa/Lagos (WAT)");

  function handleSaveToast() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const notifAlertCount = [!notifBooking, !notifCancel, !notifPayment].filter(
    Boolean
  ).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
        .st-root * { box-sizing: border-box; }
        .st-root { font-family: 'DM Sans', sans-serif; background: #f8fafc; color: #1e293b; min-height: 100vh; }
        .st-root ::-webkit-scrollbar { width: 4px; }
        .st-root ::-webkit-scrollbar-track { background: transparent; }
        .st-root ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .sec-in { animation: secIn 0.22s ease-out both; }
        @keyframes secIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      {/* Confirm modals */}
      {modal === "logout" && (
        <ConfirmModal
          title="Sign out?"
          message="You'll need to sign back in to manage your trips and bookings."
          confirmLabel="Sign Out"
          onConfirm={() => {}}
          onClose={() => setModal(null)}
        />
      )}
      {modal === "deactivate" && (
        <ConfirmModal
          title="Deactivate Account?"
          message="Your profile will be hidden and passengers won't see your trips. You can reactivate at any time."
          confirmLabel="Deactivate"
          danger
          onConfirm={() => {}}
          onClose={() => setModal(null)}
        />
      )}
      {modal === "delete" && (
        <ConfirmModal
          title="Delete Account?"
          message="This permanently removes your profile, trip history and all data. This cannot be undone."
          confirmLabel="Delete Forever"
          danger
          onConfirm={() => {}}
          onClose={() => setModal(null)}
        />
      )}

      <div className="st-root">
        <div className="max-w-screen-xl mx-auto px-6 py-8">
          {/* ── Header ──────────────────────────────────────── */}
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
                Settings
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Manage your trip preferences, notifications and account settings
              </p>
            </div>

            {saved && (
              <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-4 py-2.5 sec-in">
                <FiCheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                <span className="text-[13px] text-blue-600 font-medium">
                  Settings saved
                </span>
              </div>
            )}
          </div>

          {/* ── Availability banner ───────────────────────────── */}
          <div
            className={`flex items-center gap-4 rounded-2xl border px-5 py-4 mb-6 transition-all
            ${
              available
                ? "bg-gradient-to-r from-emerald-50 to-white border-emerald-200"
                : "bg-gradient-to-r from-slate-100 to-white border-slate-200"
            }`}
          >
            <div
              className={`w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0 ${
                available
                  ? "bg-emerald-100 border-emerald-200"
                  : "bg-slate-200 border-slate-300"
              }`}
            >
              <MdOutlineDirectionsCar
                className={`w-5 h-5 ${
                  available ? "text-emerald-600" : "text-slate-500"
                }`}
              />
            </div>
            <div className="flex-1">
              <div
                className={`font-bold text-[14px] ${
                  available ? "text-emerald-700" : "text-slate-600"
                }`}
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                {available
                  ? "You're Available for Trips"
                  : "You're Currently Unavailable"}
              </div>
              <div
                className={`text-[12px] mt-0.5 ${
                  available ? "text-emerald-500" : "text-slate-400"
                }`}
              >
                {available
                  ? "Passengers can see and book your published trips"
                  : "Your trips are hidden from passengers"}
              </div>
            </div>
            <Toggle
              on={available}
              onToggle={() => {
                setAvailable((a) => !a);
                handleSaveToast();
              }}
            />
          </div>

          {/* ── Tabs ─────────────────────────────────────────── */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <TabBtn
              icon={<MdOutlineDirectionsCar className="w-3.5 h-3.5" />}
              label="Trip Preferences"
              active={activeTab === "trips"}
              onClick={() => setActiveTab("trips")}
            />
            <TabBtn
              icon={<FiBell className="w-3.5 h-3.5" />}
              label="Notifications"
              active={activeTab === "notifications"}
              onClick={() => setActiveTab("notifications")}
              badge={notifAlertCount}
            />
            <TabBtn
              icon={<FiShield className="w-3.5 h-3.5" />}
              label="Privacy"
              active={activeTab === "privacy"}
              onClick={() => setActiveTab("privacy")}
            />
            <TabBtn
              icon={<FiHelpCircle className="w-3.5 h-3.5" />}
              label="Help & Account"
              active={activeTab === "support"}
              onClick={() => setActiveTab("support")}
            />
          </div>

          {/* ══ TRIP PREFERENCES TAB ════════════════════════ */}
          {activeTab === "trips" && (
            <div className="sec-in space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Booking behaviour */}
                <SectionCard
                  title="Booking Behaviour"
                  icon={<TbRoute className="w-4 h-4" />}
                >
                  <SettingRow
                    icon={<BsToggleOn className="w-4 h-4" />}
                    label="Auto-accept Bookings"
                    sub="Passengers are confirmed instantly without your manual approval"
                    on={autoAccept}
                    onToggle={() => setAutoAccept((a) => !a)}
                  />
                  <SettingRow
                    icon={<TbUsers className="w-4 h-4" />}
                    label="Allow Group Bookings"
                    sub="Passengers can book multiple seats in one transaction"
                    on={allowGroupBook}
                    onToggle={() => setAllowGroupBook((a) => !a)}
                  />
                  <SettingRow
                    icon={<FiEye className="w-4 h-4" />}
                    label="Show Seats Remaining"
                    sub="Visible to passengers on your trip listing"
                    on={showSeatsLeft}
                    onToggle={() => setShowSeatsLeft((a) => !a)}
                    last
                  />
                </SectionCard>

                {/* Payment */}
                <SectionCard
                  title="Payment & Pricing"
                  icon={<PiCurrencyNgnBold className="w-4 h-4" />}
                >
                  <SettingRow
                    icon={<PiCurrencyNgnBold className="w-4 h-4" />}
                    label="Cash Only"
                    sub="Passengers pay you directly in cash on departure"
                    on={cashOnly}
                    onToggle={() => setCashOnly((a) => !a)}
                  />
                  <SelectRow
                    icon={<PiCurrencyNgnBold className="w-4 h-4" />}
                    label="Currency"
                    sub="Used across all your trip listings"
                    value={currency}
                    options={["NGN (₦)", "USD ($)", "GBP (£)"]}
                    onChange={setCurrency}
                  />
                  <SelectRow
                    icon={<MdOutlineDirectionsCar className="w-4 h-4" />}
                    label="Default Seats"
                    sub="Pre-filled when creating a new trip"
                    value={defaultSeats}
                    options={["4", "5", "6", "7", "8", "10", "12", "14"]}
                    onChange={setDefaultSeats}
                    last
                  />
                </SectionCard>

                {/* Scheduling */}
                <SectionCard
                  title="Scheduling"
                  icon={<MdOutlineRoute className="w-4 h-4" />}
                >
                  <SelectRow
                    icon={<FiInfo className="w-4 h-4" />}
                    label="Minimum Advance Notice"
                    sub="How early passengers must book before departure"
                    value={advanceNotice}
                    options={[
                      "1 hour",
                      "3 hours",
                      "6 hours",
                      "12 hours",
                      "24 hours",
                      "48 hours",
                    ]}
                    onChange={setAdvanceNotice}
                  />
                  <SelectRow
                    icon={<FiGlobe className="w-4 h-4" />}
                    label="Trip Radius"
                    sub="Where your trips are visible"
                    value={tripRadius}
                    options={["State only", "Regional", "National"]}
                    onChange={setTripRadius}
                    last
                  />
                </SectionCard>

                {/* App preferences */}
                <SectionCard
                  title="App Preferences"
                  icon={<FiGlobe className="w-4 h-4" />}
                >
                  <SelectRow
                    icon={<FiGlobe className="w-4 h-4" />}
                    label="Language"
                    value={language}
                    options={["English", "Yoruba", "Igbo", "Hausa", "Pidgin"]}
                    onChange={setLanguage}
                  />
                  <SelectRow
                    icon={<FiGlobe className="w-4 h-4" />}
                    label="Timezone"
                    value={timezone}
                    options={[
                      "Africa/Lagos (WAT)",
                      "UTC",
                      "Europe/London (GMT)",
                    ]}
                    onChange={setTimezone}
                    last
                  />
                </SectionCard>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleSaveToast}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[13px] px-5 py-2.5 rounded-xl shadow-md shadow-blue-200 hover:-translate-y-0.5 transition-all"
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  <FiCheckCircle className="w-4 h-4" /> Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* ══ NOTIFICATIONS TAB ════════════════════════════ */}
          {activeTab === "notifications" && (
            <div className="sec-in space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Activity alerts */}
                <SectionCard
                  title="Activity Alerts"
                  icon={<FiBell className="w-4 h-4" />}
                >
                  <SettingRow
                    icon={<TbUsers className="w-4 h-4" />}
                    label="New Booking"
                    sub="When a passenger books one of your trips"
                    on={notifBooking}
                    onToggle={() => setNotifBooking((a) => !a)}
                  />
                  <SettingRow
                    icon={<FiX className="w-4 h-4" />}
                    label="Booking Cancellation"
                    sub="When a passenger cancels their booking"
                    on={notifCancel}
                    onToggle={() => setNotifCancel((a) => !a)}
                  />
                  <SettingRow
                    icon={<PiCurrencyNgnBold className="w-4 h-4" />}
                    label="Payment Confirmation"
                    sub="When a passenger marks cash as paid"
                    on={notifPayment}
                    onToggle={() => setNotifPayment((a) => !a)}
                  />
                  <SettingRow
                    icon={<MdOutlineDirectionsCar className="w-4 h-4" />}
                    label="Trip Reminders"
                    sub="Alerts before your trip departure time"
                    on={notifReminder}
                    onToggle={() => setNotifReminder((a) => !a)}
                  />
                  <SettingRow
                    icon={
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          fill="currentColor"
                        />
                      </svg>
                    }
                    label="New Rating Received"
                    sub="When a passenger leaves you a review"
                    on={notifRating}
                    onToggle={() => setNotifRating((a) => !a)}
                  />
                  <SettingRow
                    icon={<FiInfo className="w-4 h-4" />}
                    label="Promotions & Updates"
                    sub="BloomRydes news, tips and feature updates"
                    on={notifPromo}
                    onToggle={() => setNotifPromo((a) => !a)}
                    last
                  />
                </SectionCard>

                {/* Delivery channels */}
                <SectionCard
                  title="Delivery Channels"
                  icon={<FiSmartphone className="w-4 h-4" />}
                >
                  <SettingRow
                    icon={<FiSmartphone className="w-4 h-4" />}
                    label="Push Notifications"
                    sub="On-device alerts when the app is closed"
                    on={true}
                    onToggle={() => {}}
                  />
                  <SettingRow
                    icon={<FiVolume2 className="w-4 h-4" />}
                    label="Notification Sound"
                    sub="Play a sound for incoming alerts"
                    on={notifSound}
                    onToggle={() => setNotifSound((a) => !a)}
                  />
                  <SettingRow
                    icon={<FiSmartphone className="w-4 h-4" />}
                    label="SMS Alerts"
                    sub="Text message for critical booking updates"
                    on={notifSms}
                    onToggle={() => setNotifSms((a) => !a)}
                  />
                  <SettingRow
                    icon={<BsWhatsapp className="w-4 h-4" />}
                    label="WhatsApp Messages"
                    sub="Booking summaries via WhatsApp"
                    on={notifWhatsapp}
                    onToggle={() => setNotifWhatsapp((a) => !a)}
                  />
                  <SettingRow
                    icon={<FiMail className="w-4 h-4" />}
                    label="Email Notifications"
                    sub="Weekly summaries and trip receipts"
                    on={notifEmail}
                    onToggle={() => setNotifEmail((a) => !a)}
                    last
                  />
                </SectionCard>
              </div>

              {notifAlertCount > 0 && (
                <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 sec-in">
                  <FiAlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-[13px] text-amber-600">
                    You have {notifAlertCount} critical notification
                    {notifAlertCount > 1 ? "s" : ""} disabled. We recommend
                    keeping booking and cancellation alerts on so you never miss
                    a passenger update.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ══ PRIVACY TAB ══════════════════════════════════ */}
          {activeTab === "privacy" && (
            <div className="sec-in space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Visibility */}
                <SectionCard
                  title="Profile Visibility"
                  icon={<FiEye className="w-4 h-4" />}
                >
                  <SettingRow
                    icon={<FiPhone className="w-4 h-4" />}
                    label="Show Phone Number"
                    sub="Visible to passengers after booking confirmation"
                    on={showPhone}
                    onToggle={() => setShowPhone((a) => !a)}
                  />
                  <SettingRow
                    icon={<FiEye className="w-4 h-4" />}
                    label="Show Last Seen"
                    sub="When you were last active on the platform"
                    on={showLastSeen}
                    onToggle={() => setShowLastSeen((a) => !a)}
                  />
                  <SettingRow
                    icon={
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 20 20">
                        <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                          fill="currentColor"
                        />
                      </svg>
                    }
                    label="Show My Ratings"
                    sub="Display your star rating on your public profile"
                    on={showRatings}
                    onToggle={() => setShowRatings((a) => !a)}
                  />
                  <SettingRow
                    icon={<PiCurrencyNgnBold className="w-4 h-4" />}
                    label="Show Earnings Publicly"
                    sub="Visible on your driver profile page"
                    on={showEarnings}
                    onToggle={() => setShowEarnings((a) => !a)}
                    last
                  />
                </SectionCard>

                {/* Security */}
                <SectionCard
                  title="Security"
                  icon={<FiShield className="w-4 h-4" />}
                >
                  <SettingRow
                    icon={<FiShield className="w-4 h-4" />}
                    label="Two-Factor Authentication"
                    sub="Extra verification on each new login"
                    on={twoFactor}
                    onToggle={() => setTwoFactor((a) => !a)}
                  />
                  <SettingRow
                    icon={
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <path
                          d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                          stroke="currentColor"
                          strokeWidth="1.6"
                        />
                        <polyline
                          points="22,6 12,13 2,6"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    }
                    label="Analytics & Improvement"
                    sub="Help BloomRydes improve with anonymous usage data"
                    on={dataAnalytics}
                    onToggle={() => setDataAnalytics((a) => !a)}
                    last
                  />
                </SectionCard>

                {/* Data & privacy */}
                <div className="lg:col-span-2">
                  <SectionCard
                    title="Data & Privacy"
                    icon={<FiLock className="w-4 h-4" />}
                  >
                    <LinkRow
                      icon={<FiDownload className="w-4 h-4" />}
                      label="Download My Data"
                      sub="Export all your account and trip data as a ZIP"
                      badge="GDPR"
                    />
                    <LinkRow
                      icon={<FiEyeOff className="w-4 h-4" />}
                      label="Clear Activity History"
                      sub="Remove your recent search and trip activity"
                    />
                    <LinkRow
                      icon={<FiRefreshCw className="w-4 h-4" />}
                      label="Reset All Settings"
                      sub="Restore all settings to their default values"
                    />
                    <LinkRow
                      icon={<FiTrash2 className="w-4 h-4" />}
                      label="Request Account Deletion"
                      sub="Permanently delete your account and all associated data"
                      danger
                      last
                    />
                  </SectionCard>
                </div>
              </div>
            </div>
          )}

          {/* ══ HELP & ACCOUNT TAB ═══════════════════════════ */}
          {activeTab === "support" && (
            <div className="sec-in space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Help */}
                <SectionCard
                  title="Help & Support"
                  icon={<FiHelpCircle className="w-4 h-4" />}
                >
                  <LinkRow
                    icon={<FiHelpCircle className="w-4 h-4" />}
                    label="Help Centre"
                    sub="Browse FAQs, guides and platform rules"
                    badge="New"
                  />
                  <LinkRow
                    icon={<FiMessageCircle className="w-4 h-4" />}
                    label="Chat with Support"
                    sub="Live chat with the BloomRydes support team"
                  />
                  <LinkRow
                    icon={<FiMail className="w-4 h-4" />}
                    label="Email Support"
                    sub="support@bloomrydes.ng · replies within 24 hrs"
                  />
                  <LinkRow
                    icon={<BsWhatsapp className="w-4 h-4" />}
                    label="WhatsApp Support"
                    sub="+234 900 123 4567"
                    last
                  />
                </SectionCard>

                {/* About */}
                <SectionCard
                  title="About"
                  icon={<FiInfo className="w-4 h-4" />}
                >
                  <LinkRow
                    icon={<FiInfo className="w-4 h-4" />}
                    label="Terms & Conditions"
                    sub="Platform rules and driver agreement"
                  />
                  <LinkRow
                    icon={<FiShield className="w-4 h-4" />}
                    label="Privacy Policy"
                    sub="How BloomRydes uses your data"
                  />
                  <LinkRow
                    icon={<FiInfo className="w-4 h-4" />}
                    label="App Version"
                    sub="v2.4.1 · Build 2402"
                    badge="Latest"
                    last
                  />
                </SectionCard>

                {/* Account actions */}
                <div className="lg:col-span-2">
                  <SectionCard
                    title="Account"
                    icon={<FiLogOut className="w-4 h-4" />}
                  >
                    <LinkRow
                      icon={<FiLogOut className="w-4 h-4" />}
                      label="Sign Out"
                      sub="Sign out of your driver account on this device"
                      onClick={() => setModal("logout")}
                    />
                    <LinkRow
                      icon={<FiAlertCircle className="w-4 h-4" />}
                      label="Deactivate Account"
                      sub="Temporarily pause your driver profile"
                      danger
                      onClick={() => setModal("deactivate")}
                    />
                    <LinkRow
                      icon={<FiTrash2 className="w-4 h-4" />}
                      label="Delete Account"
                      sub="Permanently remove your account and all data"
                      danger
                      last
                      onClick={() => setModal("delete")}
                    />
                  </SectionCard>
                </div>
              </div>

              {/* App info footer */}
              <div className="flex items-center justify-center gap-3 pt-2 text-[12px] text-slate-400">
                <span>BloomRydes Driver</span>
                <span>·</span>
                <span>v2.4.1</span>
                <span>·</span>
                <span>© 2026 BloomRydes Ltd</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
