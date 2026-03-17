"use client";

import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { selectDriverUser, selectToken } from "@/store/slices/authSlice";
import {
  FiUser,
  FiCamera,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiShield,
  FiStar,
  FiTrendingUp,
  FiLock,
  FiBell,
  FiChevronRight,
  FiCheckCircle,
  FiAlertCircle,
  FiSave,
  FiDownload,
  FiEdit3,
  FiX,
} from "react-icons/fi";
import { MdOutlineDirectionsCar } from "react-icons/md";
import { TbRoute, TbUsers } from "react-icons/tb";
import { PiCurrencyNgnBold } from "react-icons/pi";
import { BsWhatsapp } from "react-icons/bs";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabKey = "personal" | "stats" | "security";

type DriverForm = {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  phone: string;
  dob: string;
  address: string;
  city: string;
  state: string;
};

// ─── Mock stats (no endpoint yet) ────────────────────────────────────────────

const TRIP_ACTIVITY = [
  { month: "Sep", trips: 5 },
  { month: "Oct", trips: 6 },
  { month: "Nov", trips: 5 },
  { month: "Dec", trips: 9 },
  { month: "Jan", trips: 8 },
  { month: "Feb", trips: 12 },
];

const TOP_ROUTES = [
  { from: "Lagos", to: "Abuja", count: 18 },
  { from: "Abuja", to: "Enugu", count: 12 },
  { from: "Lagos", to: "Ibadan", count: 9 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso?: string) {
  if (!iso || iso === "—") return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Field ────────────────────────────────────────────────────────────────────

function Field({
  label,
  value,
  onChange,
  editing,
  type = "text",
  icon,
  placeholder,
}: {
  label: string;
  value: string;
  onChange?: (v: string) => void;
  editing: boolean;
  type?: string;
  icon: React.ReactNode;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-2">
        {icon} {label}
      </label>
      {editing ? (
        type === "textarea" ? (
          <textarea
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange?.(e.target.value)}
            rows={3}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[14px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
          />
        ) : (
          <input
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[14px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all [color-scheme:light]"
          />
        )
      ) : (
        <div className="flex items-center bg-slate-50 border border-slate-100 rounded-xl px-3.5 py-2.5 min-h-[42px]">
          <span className="text-[14px] text-slate-700 font-medium">
            {type === "date" ? formatDate(value) : value || "—"}
          </span>
        </div>
      )}
    </div>
  );
}

// ─── TabBtn ───────────────────────────────────────────────────────────────────

function TabBtn({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
        active
          ? "bg-blue-600 text-white shadow-md shadow-blue-200"
          : "bg-white text-slate-500 border border-slate-200 hover:border-blue-300 hover:text-blue-600"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

// ─── SectionCard ─────────────────────────────────────────────────────────────

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
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div
        className="text-[13px] font-bold text-slate-700 flex items-center gap-2 mb-4 pb-3 border-b border-slate-100"
        style={{ fontFamily: "'Syne',sans-serif" }}
      >
        <span className="text-blue-500">{icon}</span>
        {title}
      </div>
      {children}
    </div>
  );
}

// ─── ActionRow ────────────────────────────────────────────────────────────────

function ActionRow({
  icon,
  label,
  sub,
  danger = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  sub?: string;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left group ${
        danger
          ? "border-red-100 bg-red-50/50 hover:bg-red-50"
          : "border-slate-100 bg-slate-50/60 hover:bg-slate-100"
      }`}
    >
      <div
        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
          danger
            ? "bg-red-100 text-red-400"
            : "bg-white border border-slate-200 text-slate-500 group-hover:text-blue-600 group-hover:border-blue-200"
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
      <FiChevronRight
        className={`w-4 h-4 flex-shrink-0 ${
          danger ? "text-red-300" : "text-slate-300 group-hover:text-blue-400"
        }`}
      />
    </button>
  );
}

// ─── Activity bar ─────────────────────────────────────────────────────────────

function ActivityBar({
  month,
  trips,
  maxTrips,
}: {
  month: string;
  trips: number;
  maxTrips: number;
}) {
  const pct = maxTrips > 0 ? (trips / maxTrips) * 100 : 0;
  return (
    <div className="flex flex-col items-center gap-1.5 flex-1">
      <span className="text-[10px] font-semibold text-slate-500">
        {trips > 0 ? trips : ""}
      </span>
      <div
        className="w-full bg-slate-100 rounded-lg overflow-hidden flex flex-col justify-end"
        style={{ height: 60 }}
      >
        <div
          className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-lg transition-all duration-700"
          style={{ height: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] text-slate-400">{month}</span>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function DriverProfile() {
  const driverUser = useAppSelector(selectDriverUser);
  const token = useAppSelector(selectToken);
  const p = driverUser?.personalInfo;
  const contacts = driverUser?.contacts;
  const vehicleInfo = driverUser?.vehicleInfo;

  const [activeTab, setActiveTab] = useState<TabKey>("personal");
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);

  // Seed form from Redux on mount
  const [form, setForm] = useState<DriverForm>({
    firstName: p?.firstName ?? "",
    lastName: p?.lastName ?? "",
    middleName: p?.middleName ?? "",
    email: p?.email ?? "",
    phone: p?.phoneNumber ?? "",
    dob: p?.dateOfBirth ?? "",
    address: p?.address ?? "",
    city: p?.city ?? "",
    state: p?.state ?? "",
  });

  const set = (k: keyof DriverForm) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setDirty(true);
  };

  const initials = `${form.firstName[0] ?? ""}${
    form.lastName[0] ?? ""
  }`.toUpperCase();
  const fullName = [form.firstName, form.middleName, form.lastName]
    .filter(Boolean)
    .join(" ");

  function handleSave() {
    // TODO: call updateDriverProfile API when endpoint is ready
    setSaved(true);
    setEditing(false);
    setDirty(false);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleDiscard() {
    setForm({
      firstName: p?.firstName ?? "",
      lastName: p?.lastName ?? "",
      middleName: p?.middleName ?? "",
      email: p?.email ?? "",
      phone: p?.phoneNumber ?? "",
      dob: p?.dateOfBirth ?? "",
      address: p?.address ?? "",
      city: p?.city ?? "",
      state: p?.state ?? "",
    });
    setEditing(false);
    setDirty(false);
  }

  const maxTrips = Math.max(...TRIP_ACTIVITY.map((d) => d.trips));
  const approvalStatus = driverUser?.approvalStatus;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
        .dp-root * { box-sizing: border-box; }
        .dp-root { font-family: 'DM Sans', sans-serif; background: #f8fafc; color: #1e293b; min-height: 100vh; }
        .dp-root ::-webkit-scrollbar { width: 4px; }
        .dp-root ::-webkit-scrollbar-track { background: transparent; }
        .dp-root ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .sec-in { animation: secIn 0.22s ease-out both; }
        @keyframes secIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <div className="dp-root">
        <div className="max-w-screen-xl mx-auto px-4 py-6 md:px-6 md:py-8">
          {/* ── Header ── */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1
                className="text-[26px] font-bold text-slate-900 tracking-tight flex items-center gap-2.5"
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                <FiUser className="w-6 h-6 text-blue-600" />
                Driver Profile
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Manage your personal details, stats and account security
              </p>
            </div>

            <div className="flex items-center gap-2">
              {editing ? (
                <>
                  <button
                    onClick={handleDiscard}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[13px] font-medium border border-slate-200 bg-white text-slate-500 hover:border-slate-300 transition-all"
                  >
                    <FiX className="w-4 h-4" /> Discard
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[13px] px-4 py-2 rounded-xl shadow-md shadow-blue-200 hover:-translate-y-0.5 transition-all"
                    style={{ fontFamily: "'Syne',sans-serif" }}
                  >
                    <FiSave className="w-4 h-4" /> Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 font-medium text-[13px] px-4 py-2 rounded-xl transition-all"
                >
                  <FiEdit3 className="w-4 h-4" /> Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* ── Saved toast ── */}
          {saved && (
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-6 sec-in">
              <FiCheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
              <span className="text-[13px] text-blue-600 font-medium">
                Profile updated successfully
              </span>
            </div>
          )}

          {/* ── Hero card ── */}
          <div className="relative rounded-2xl border border-slate-200 bg-white p-6 mb-6 overflow-hidden shadow-sm">
            <div
              className="absolute top-0 right-0 w-72 h-72 opacity-[0.025] pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at top right,#2563eb,transparent 70%)",
              }}
            />

            <div className="flex flex-col md:flex-row items-start gap-5 relative">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-black text-[26px] shadow-lg shadow-blue-200 border-2 border-blue-400/30"
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  {initials || "DR"}
                </div>
                {editing && (
                  <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl bg-blue-600 border-2 border-white flex items-center justify-center shadow-md hover:bg-blue-700 transition-colors">
                    <FiCamera className="w-3.5 h-3.5 text-white" />
                  </button>
                )}
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center">
                  <FiCheckCircle className="w-3 h-3 text-white" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h2
                    className="text-[22px] font-black text-slate-900 tracking-tight"
                    style={{ fontFamily: "'Syne',sans-serif" }}
                  >
                    {fullName || "Driver"}
                  </h2>
                  {approvalStatus === "approved" ? (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-600 text-white">
                      <FiCheckCircle className="w-3 h-3" /> Verified Driver
                    </span>
                  ) : approvalStatus === "pending" ? (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-500 text-white">
                      ⏳ Pending Approval
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-500 text-white">
                      ✕ Not Approved
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[13px] text-slate-500 mb-3">
                  {form.email && (
                    <span className="flex items-center gap-1.5">
                      <FiMail className="w-3.5 h-3.5 text-slate-400" />
                      {form.email}
                    </span>
                  )}
                  {form.phone && (
                    <span className="flex items-center gap-1.5">
                      <FiPhone className="w-3.5 h-3.5 text-slate-400" />
                      {form.phone}
                    </span>
                  )}
                  {(form.city || form.state) && (
                    <span className="flex items-center gap-1.5">
                      <FiMapPin className="w-3.5 h-3.5 text-slate-400" />
                      {[form.city, form.state].filter(Boolean).join(", ")}
                    </span>
                  )}
                </div>

                {/* Quick stats — placeholder until trip endpoints ready */}
                <div className="flex flex-wrap gap-5">
                  {[
                    {
                      label: "Trips",
                      value: "—",
                      icon: <TbRoute className="w-3.5 h-3.5" />,
                    },
                    {
                      label: "Rating",
                      value: "—",
                      icon: <FiStar className="w-3.5 h-3.5" />,
                    },
                    {
                      label: "Passengers",
                      value: "—",
                      icon: <TbUsers className="w-3.5 h-3.5" />,
                    },
                    {
                      label: "Since",
                      value: driverUser?.createdAt
                        ? new Date(driverUser.createdAt).toLocaleDateString(
                            "en-GB",
                            { month: "short", year: "numeric" }
                          )
                        : "—",
                      icon: <FiCalendar className="w-3.5 h-3.5" />,
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center gap-1.5 text-[12px] text-slate-500"
                    >
                      <span className="text-slate-400">{s.icon}</span>
                      <span className="font-semibold text-slate-700">
                        {s.value}
                      </span>
                      <span>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Earnings — placeholder until endpoint ready */}
              <div className="flex-shrink-0 text-left md:text-right mt-4 md:mt-0">
                <div className="text-[11px] text-slate-400 mb-0.5">
                  Total Earned
                </div>
                <div
                  className="font-black text-[24px] text-slate-400 leading-none flex items-center justify-end"
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  <PiCurrencyNgnBold className="w-5 h-5" />—
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  All time
                </div>
              </div>
            </div>
          </div>

          {/* ── Tabs ── */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0">
            <TabBtn
              icon={<FiUser className="w-3.5 h-3.5" />}
              label="Personal Info"
              active={activeTab === "personal"}
              onClick={() => setActiveTab("personal")}
            />
            <TabBtn
              icon={<FiTrendingUp className="w-3.5 h-3.5" />}
              label="My Stats"
              active={activeTab === "stats"}
              onClick={() => setActiveTab("stats")}
            />
            <TabBtn
              icon={<FiShield className="w-3.5 h-3.5" />}
              label="Security"
              active={activeTab === "security"}
              onClick={() => setActiveTab("security")}
            />
          </div>

          {/* ── Unsaved changes banner ── */}
          {dirty && editing && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5 sec-in">
              <FiAlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span className="text-[13px] text-amber-600 flex-1">
                You have unsaved changes.
              </span>
              <button
                onClick={handleSave}
                className="text-[12px] font-semibold text-amber-600 hover:text-amber-700 underline transition-colors"
              >
                Save now
              </button>
            </div>
          )}

          {/* ══ PERSONAL INFO TAB ════════════════════════════ */}
          {activeTab === "personal" && (
            <div className="sec-in grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Basic info */}
              <SectionCard
                title="Basic Information"
                icon={<FiUser className="w-4 h-4" />}
              >
                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="First Name"
                    value={form.firstName}
                    onChange={set("firstName")}
                    editing={editing}
                    icon={<FiUser className="w-3 h-3" />}
                  />
                  <Field
                    label="Last Name"
                    value={form.lastName}
                    onChange={set("lastName")}
                    editing={editing}
                    icon={<FiUser className="w-3 h-3" />}
                  />
                  <div className="col-span-2">
                    <Field
                      label="Middle Name"
                      value={form.middleName}
                      onChange={set("middleName")}
                      editing={editing}
                      icon={<FiUser className="w-3 h-3" />}
                    />
                  </div>
                  <div className="col-span-2">
                    <Field
                      label="Date of Birth"
                      value={form.dob}
                      onChange={set("dob")}
                      editing={editing}
                      type="date"
                      icon={<FiCalendar className="w-3 h-3" />}
                    />
                  </div>
                </div>
              </SectionCard>

              {/* Contact details */}
              <SectionCard
                title="Contact Details"
                icon={<FiPhone className="w-4 h-4" />}
              >
                <div className="grid grid-cols-1 gap-3">
                  <Field
                    label="Email Address"
                    value={form.email}
                    onChange={set("email")}
                    editing={editing}
                    type="email"
                    icon={<FiMail className="w-3 h-3" />}
                  />
                  <Field
                    label="Phone Number"
                    value={form.phone}
                    onChange={set("phone")}
                    editing={editing}
                    type="tel"
                    icon={<FiPhone className="w-3 h-3" />}
                  />
                  <Field
                    label="Address"
                    value={form.address}
                    onChange={set("address")}
                    editing={editing}
                    icon={<FiMapPin className="w-3 h-3" />}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Field
                      label="City"
                      value={form.city}
                      onChange={set("city")}
                      editing={editing}
                      icon={<FiMapPin className="w-3 h-3" />}
                    />
                    <Field
                      label="State"
                      value={form.state}
                      onChange={set("state")}
                      editing={editing}
                      icon={<FiMapPin className="w-3 h-3" />}
                    />
                  </div>
                </div>
              </SectionCard>

              {/* Emergency contact */}
              {contacts?.emergency && (
                <SectionCard
                  title="Emergency Contact"
                  icon={<FiShield className="w-4 h-4" />}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        label: "Full Name",
                        value: contacts.emergency.fullName,
                      },
                      {
                        label: "Relationship",
                        value: contacts.emergency.relationship,
                      },
                      {
                        label: "Phone Number",
                        value: contacts.emergency.phoneNumber,
                      },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="bg-slate-50 rounded-xl border border-slate-100 px-3.5 py-2.5"
                      >
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                          {label}
                        </div>
                        <div className="text-[13px] font-semibold text-slate-700">
                          {value || "—"}
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}

              {/* Guarantor */}
              {contacts?.guarantor && (
                <SectionCard
                  title="Guarantor"
                  icon={<FiShield className="w-4 h-4" />}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        label: "Full Name",
                        value: contacts.guarantor.fullName,
                      },
                      {
                        label: "Phone Number",
                        value: contacts.guarantor.phoneNumber,
                      },
                      { label: "Address", value: contacts.guarantor.address },
                      {
                        label: "Relationship & Occupation",
                        value: contacts.guarantor.relationshipAndOccupation,
                      },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="bg-slate-50 rounded-xl border border-slate-100 px-3.5 py-2.5"
                      >
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                          {label}
                        </div>
                        <div className="text-[13px] font-semibold text-slate-700">
                          {value || "—"}
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}

              {/* Vehicle summary */}
              {vehicleInfo && (
                <SectionCard
                  title="Vehicle on File"
                  icon={<MdOutlineDirectionsCar className="w-4 h-4" />}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        label: "Make & Model",
                        value: `${vehicleInfo.make} ${vehicleInfo.model}`,
                      },
                      { label: "Year", value: vehicleInfo.year },
                      { label: "Colour", value: vehicleInfo.color },
                      { label: "Plate", value: vehicleInfo.plateNumber },
                      {
                        label: "Seats",
                        value: `${vehicleInfo.passengerSeats} passengers`,
                      },
                      { label: "VIN", value: vehicleInfo.vin },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="bg-slate-50 rounded-xl border border-slate-100 px-3.5 py-2.5"
                      >
                        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                          {label}
                        </div>
                        <div className="text-[13px] font-semibold text-slate-700">
                          {value || "—"}
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}

              {/* Driver account card */}
              <SectionCard
                title="Driver Account"
                icon={<FiShield className="w-4 h-4" />}
              >
                <div
                  className={`flex items-center gap-4 p-4 rounded-2xl mb-4 shadow-lg ${
                    approvalStatus === "approved"
                      ? "bg-gradient-to-br from-blue-600 to-blue-700 shadow-blue-200"
                      : approvalStatus === "pending"
                      ? "bg-gradient-to-br from-amber-500 to-amber-600 shadow-amber-200"
                      : "bg-gradient-to-br from-red-500 to-red-600 shadow-red-200"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <FiShield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div
                      className="font-black text-white text-[15px] flex items-center gap-1.5"
                      style={{ fontFamily: "'Syne',sans-serif" }}
                    >
                      <FiCheckCircle className="w-4 h-4" />
                      {approvalStatus === "approved"
                        ? "Verified Driver"
                        : approvalStatus === "pending"
                        ? "Pending Approval"
                        : "Not Approved"}
                    </div>
                    <div className="text-white/70 text-[12px] mt-0.5">
                      {approvalStatus === "approved"
                        ? `Verified on ${formatDate(driverUser?.updatedAt)}`
                        : approvalStatus === "pending"
                        ? "Your account is under review"
                        : "Please contact support"}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {
                      label: "Member Since",
                      value: driverUser?.createdAt
                        ? formatDate(driverUser.createdAt)
                        : "—",
                    },
                    {
                      label: "Last Updated",
                      value: driverUser?.updatedAt
                        ? formatDate(driverUser.updatedAt)
                        : "—",
                    },
                    { label: "Account Type", value: "Driver" },
                    {
                      label: "Approval Status",
                      value: approvalStatus
                        ? approvalStatus.charAt(0).toUpperCase() +
                          approvalStatus.slice(1)
                        : "—",
                    },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="bg-slate-50 rounded-xl border border-slate-100 px-3.5 py-2.5"
                    >
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                        {label}
                      </div>
                      <div className="text-[13px] font-semibold text-slate-700">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          )}

          {/* ══ STATS TAB ════════════════════════════════════ */}
          {activeTab === "stats" && (
            <div className="sec-in space-y-5">
              {/* Placeholder notice */}
              <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-2xl px-5 py-3">
                <FiAlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <p className="text-[12px] text-blue-600">
                  Trip stats will populate once the trips endpoint is connected.
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {[
                  {
                    label: "Total Trips",
                    value: "—",
                    sub: "No data yet",
                    color: "from-blue-50 to-white border-blue-100",
                    vcolor: "text-blue-600",
                    icon: <TbRoute className="w-4 h-4" />,
                  },
                  {
                    label: "Total Passengers",
                    value: "—",
                    sub: "No data yet",
                    color: "from-violet-50 to-white border-violet-100",
                    vcolor: "text-violet-600",
                    icon: <TbUsers className="w-4 h-4" />,
                  },
                  {
                    label: "Average Rating",
                    value: "—",
                    sub: "No ratings yet",
                    color: "from-amber-50 to-white border-amber-100",
                    vcolor: "text-amber-600",
                    icon: <FiStar className="w-4 h-4" />,
                  },
                  {
                    label: "Total Earned",
                    value: "—",
                    sub: "No data yet",
                    color: "from-emerald-50 to-white border-emerald-100",
                    vcolor: "text-emerald-600",
                    icon: <PiCurrencyNgnBold className="w-4 h-4" />,
                  },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className={`rounded-2xl border bg-gradient-to-br ${s.color} px-4 py-4 sec-in`}
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[12px] text-slate-400">
                        {s.label}
                      </span>
                      <span className={`${s.vcolor} opacity-40`}>{s.icon}</span>
                    </div>
                    <div
                      className={`font-black text-[28px] leading-none mb-0.5 ${s.vcolor}`}
                      style={{ fontFamily: "'Syne',sans-serif" }}
                    >
                      {s.value}
                    </div>
                    <div className="text-[11px] text-slate-400">{s.sub}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <SectionCard
                  title="Trip Activity"
                  icon={<FiTrendingUp className="w-4 h-4" />}
                >
                  <div className="flex items-end gap-2">
                    {TRIP_ACTIVITY.map((d) => (
                      <ActivityBar
                        key={d.month}
                        month={d.month}
                        trips={d.trips}
                        maxTrips={maxTrips}
                      />
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[12px] text-slate-400">
                    <span>Placeholder data</span>
                    <span className="font-semibold text-slate-600">—</span>
                  </div>
                </SectionCard>

                <SectionCard
                  title="Favourite Routes"
                  icon={<TbRoute className="w-4 h-4" />}
                >
                  <div className="space-y-3">
                    {TOP_ROUTES.map((r, i) => {
                      const pct = (r.count / TOP_ROUTES[0].count) * 100;
                      return (
                        <div key={i}>
                          <div className="flex items-center justify-between text-[13px] mb-1.5">
                            <div className="flex items-center gap-2 font-medium text-slate-700">
                              <span className="text-[10px] font-bold text-slate-400 w-4">
                                #{i + 1}
                              </span>
                              <span className="text-blue-600">{r.from}</span>
                              <svg
                                className="w-3 h-3 text-slate-400"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  d="M5 12h14M13 6l6 6-6 6"
                                  stroke="currentColor"
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                />
                              </svg>
                              <span className="text-slate-700">{r.to}</span>
                            </div>
                            <span className="text-slate-500 text-[12px]">
                              {r.count}×
                            </span>
                          </div>
                          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-700"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-[12px] text-slate-400">
                    Placeholder data
                  </div>
                </SectionCard>
              </div>
            </div>
          )}

          {/* ══ SECURITY TAB ═════════════════════════════════ */}
          {activeTab === "security" && (
            <div className="sec-in grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Account status */}
              <div className="lg:col-span-2">
                <div
                  className={`flex items-center gap-4 border rounded-2xl px-5 py-4 ${
                    approvalStatus === "approved"
                      ? "bg-gradient-to-r from-blue-50 to-white border-blue-200"
                      : approvalStatus === "pending"
                      ? "bg-gradient-to-r from-amber-50 to-white border-amber-200"
                      : "bg-gradient-to-r from-red-50 to-white border-red-200"
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0 ${
                      approvalStatus === "approved"
                        ? "bg-blue-100 border-blue-200"
                        : approvalStatus === "pending"
                        ? "bg-amber-100 border-amber-200"
                        : "bg-red-100 border-red-200"
                    }`}
                  >
                    <FiCheckCircle
                      className={`w-5 h-5 ${
                        approvalStatus === "approved"
                          ? "text-blue-600"
                          : approvalStatus === "pending"
                          ? "text-amber-600"
                          : "text-red-500"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <div
                      className={`font-bold text-[14px] ${
                        approvalStatus === "approved"
                          ? "text-blue-700"
                          : approvalStatus === "pending"
                          ? "text-amber-700"
                          : "text-red-600"
                      }`}
                      style={{ fontFamily: "'Syne',sans-serif" }}
                    >
                      {approvalStatus === "approved"
                        ? "Account Verified"
                        : approvalStatus === "pending"
                        ? "Pending Verification"
                        : "Account Not Approved"}
                    </div>
                    <div
                      className={`text-[12px] mt-0.5 ${
                        approvalStatus === "approved"
                          ? "text-blue-500"
                          : approvalStatus === "pending"
                          ? "text-amber-500"
                          : "text-red-400"
                      }`}
                    >
                      {approvalStatus === "approved"
                        ? "Identity confirmed · Phone linked · Documents approved"
                        : approvalStatus === "pending"
                        ? "Your account is currently under review by BloomRydes"
                        : "Please contact support to resolve your account status"}
                    </div>
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 border ${
                      approvalStatus === "approved"
                        ? "text-blue-600 bg-blue-100 border-blue-200"
                        : approvalStatus === "pending"
                        ? "text-amber-600 bg-amber-100 border-amber-200"
                        : "text-red-500 bg-red-100 border-red-200"
                    }`}
                  >
                    {approvalStatus
                      ? approvalStatus.charAt(0).toUpperCase() +
                        approvalStatus.slice(1)
                      : "—"}
                  </span>
                </div>
              </div>

              {/* Security settings */}
              <SectionCard
                title="Security Settings"
                icon={<FiLock className="w-4 h-4" />}
              >
                <div className="space-y-2">
                  <ActionRow
                    icon={<FiPhone className="w-4 h-4" />}
                    label="Change Phone Number"
                    sub={form.phone ? `Current: ${form.phone}` : undefined}
                  />
                  <ActionRow
                    icon={<FiMail className="w-4 h-4" />}
                    label="Change Email Address"
                    sub={form.email ? `Current: ${form.email}` : undefined}
                  />
                  <ActionRow
                    icon={<FiLock className="w-4 h-4" />}
                    label="Change PIN / Password"
                    sub="Update your account password"
                  />
                  <ActionRow
                    icon={<FiBell className="w-4 h-4" />}
                    label="Login Notifications"
                    sub="Get alerts for new sign-ins"
                  />
                </div>
              </SectionCard>

              {/* Account actions */}
              <SectionCard
                title="Account Actions"
                icon={<FiShield className="w-4 h-4" />}
              >
                <div className="space-y-2">
                  <ActionRow
                    icon={<FiDownload className="w-4 h-4" />}
                    label="Download My Data"
                    sub="Export all your trip and profile data"
                  />
                  <ActionRow
                    icon={<FiAlertCircle className="w-4 h-4" />}
                    label="Deactivate Account"
                    sub="Temporarily pause your driver profile"
                    danger
                  />
                  <ActionRow
                    icon={<FiX className="w-4 h-4" />}
                    label="Delete Account"
                    sub="Permanently remove your account and data"
                    danger
                  />
                </div>
              </SectionCard>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
