"use client";

import { useState } from "react";
import {
  Shield,
  Phone,
  User,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  Star,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  Heart,
  Users,
  MessageCircle,
  Smartphone,
  Mail,
  Info,
  Car,
  MapPin,
  Clock,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Contact = {
  id: string;
  name: string;
  phone: string;
  relationship: string;
  isDefault: boolean;
  notifyViaSMS: boolean;
  notifyViaWhatsApp: boolean;
  notifyViaEmail: boolean;
  email?: string;
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const INITIAL_CONTACTS: Contact[] = [
  {
    id: "1",
    name: "Chioma Adeyemi",
    phone: "+234 802 344 5678",
    relationship: "Sister",
    isDefault: true,
    notifyViaSMS: true,
    notifyViaWhatsApp: true,
    notifyViaEmail: false,
    email: "",
  },
  {
    id: "2",
    name: "Bola Adeyemi",
    phone: "+234 806 123 4567",
    relationship: "Father",
    isDefault: false,
    notifyViaSMS: true,
    notifyViaWhatsApp: false,
    notifyViaEmail: false,
    email: "",
  },
];

const RELATIONSHIPS = [
  "Spouse",
  "Parent",
  "Father",
  "Mother",
  "Sibling",
  "Sister",
  "Brother",
  "Friend",
  "Colleague",
  "Partner",
  "Other",
];

const RELATIONSHIP_ICONS: Record<string, string> = {
  Spouse: "💍",
  Partner: "💞",
  Father: "👨",
  Mother: "👩",
  Parent: "👨‍👩‍👧",
  Sibling: "👫",
  Sister: "👧",
  Brother: "👦",
  Friend: "🤝",
  Colleague: "💼",
  Other: "👤",
};

function getRelIcon(rel: string) {
  return RELATIONSHIP_ICONS[rel] || "👤";
}

// ─── Empty Add Form State ─────────────────────────────────────────────────────

const EMPTY_FORM = {
  name: "",
  phone: "",
  relationship: "",
  email: "",
  notifyViaSMS: true,
  notifyViaWhatsApp: true,
  notifyViaEmail: false,
};

// ─── Toggle Switch ────────────────────────────────────────────────────────────

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-10 h-5 rounded-full transition-all flex-shrink-0 ${
        on ? "bg-blue-600" : "bg-slate-700"
      }`}
    >
      <div
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${
          on ? "left-5" : "left-0.5"
        }`}
      />
    </button>
  );
}

// ─── Notify Channel Row ───────────────────────────────────────────────────────

function NotifyRow({
  icon,
  label,
  on,
  onToggle,
}: {
  icon: React.ReactNode;
  label: string;
  on: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div
        className={`flex items-center gap-2 text-[13px] ${
          on ? "text-slate-300" : "text-slate-600"
        }`}
      >
        {icon}
        {label}
      </div>
      <Toggle on={on} onToggle={onToggle} />
    </div>
  );
}

// ─── Contact Card ─────────────────────────────────────────────────────────────

function ContactCard({
  contact,
  expanded,
  onToggle,
  onSetDefault,
  onDelete,
  onUpdate,
}: {
  contact: Contact;
  expanded: boolean;
  onToggle: () => void;
  onSetDefault: () => void;
  onDelete: () => void;
  onUpdate: (updated: Contact) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Contact>(contact);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const set = (k: keyof Contact) => (v: any) =>
    setForm((f) => ({ ...f, [k]: v }));

  function handleSave() {
    onUpdate(form);
    setEditing(false);
  }

  function handleDiscard() {
    setForm(contact);
    setEditing(false);
  }

  return (
    <div
      className={`relative rounded-2xl border transition-all duration-200 overflow-hidden
        ${
          contact.isDefault
            ? expanded
              ? "border-blue-500/40 bg-blue-500/[0.04] shadow-lg shadow-blue-500/5"
              : "border-blue-500/25 bg-blue-500/[0.03] hover:border-blue-500/40"
            : expanded
            ? "border-blue-500/40 bg-slate-900/60 shadow-lg shadow-blue-500/5"
            : "border-white/5 bg-slate-900/60 hover:border-white/10 hover:bg-slate-800/50"
        }`}
    >
      {/* Default top accent */}
      {contact.isDefault && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      )}

      {/* ── Card Header ──────────────────────────────── */}
      <div
        className="flex items-center gap-4 p-5 cursor-pointer select-none"
        onClick={() => {
          if (!editing) onToggle();
        }}
      >
        {/* Avatar */}
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 border-2 transition-all
            ${
              contact.isDefault
                ? "bg-blue-500/15 border-blue-500/30"
                : "bg-white/5 border-white/10"
            }`}
        >
          {getRelIcon(contact.relationship)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="font-semibold text-[15px] text-white tracking-tight truncate"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {contact.name}
            </span>
            {contact.isDefault && (
              <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-600 text-white uppercase tracking-wider flex-shrink-0">
                <Star className="w-2.5 h-2.5" /> Default
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-[13px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-600" />
              {contact.phone}
            </span>
            <span className="text-slate-700">·</span>
            <span>{contact.relationship}</span>
          </div>
          {/* Notify channels */}
          <div className="flex items-center gap-2 mt-1.5">
            {contact.notifyViaWhatsApp && (
              <span className="flex items-center gap-1 text-[11px] text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                <MessageCircle className="w-2.5 h-2.5" /> WhatsApp
              </span>
            )}
            {contact.notifyViaSMS && (
              <span className="flex items-center gap-1 text-[11px] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-full">
                <Smartphone className="w-2.5 h-2.5" /> SMS
              </span>
            )}
            {contact.notifyViaEmail && (
              <span className="flex items-center gap-1 text-[11px] text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded-full">
                <Mail className="w-2.5 h-2.5" /> Email
              </span>
            )}
          </div>
        </div>

        {/* Right: edit + chevron */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setEditing(!editing);
            }}
            className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all
              ${
                editing
                  ? "bg-blue-600/20 border-blue-500/30 text-blue-400"
                  : "bg-white/5 border-white/10 text-slate-500 hover:border-blue-500/30 hover:text-blue-400"
              }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <ChevronDown
            className={`w-4 h-4 text-slate-600 transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* ── Expanded Panel ────────────────────────────── */}
      {expanded && (
        <div className="border-t border-white/5 px-5 pb-5 pt-4 space-y-4">
          {editing ? (
            /* Edit mode */
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-600 mb-2">
                    <User className="w-3 h-3" /> Full Name *
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => set("name")(e.target.value)}
                    placeholder="Contact's full name"
                    className="w-full bg-slate-800/80 border border-white/5 rounded-xl px-3.5 py-2.5 text-[14px] text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-600 mb-2">
                    <Phone className="w-3 h-3" /> Phone Number *
                  </label>
                  <input
                    value={form.phone}
                    onChange={(e) => set("phone")(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="w-full bg-slate-800/80 border border-white/5 rounded-xl px-3.5 py-2.5 text-[14px] text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-600 mb-2">
                    <Heart className="w-3 h-3" /> Relationship
                  </label>
                  <select
                    value={form.relationship}
                    onChange={(e) => set("relationship")(e.target.value)}
                    className="w-full bg-slate-800/80 border border-white/5 rounded-xl px-3.5 py-2.5 text-[14px] text-white focus:outline-none focus:border-blue-500/60 transition-colors"
                  >
                    <option value="" style={{ background: "#1e293b" }}>
                      Select...
                    </option>
                    {RELATIONSHIPS.map((r) => (
                      <option
                        key={r}
                        value={r}
                        style={{ background: "#1e293b" }}
                      >
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-600 mb-2">
                    <Mail className="w-3 h-3" /> Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={form.email || ""}
                    onChange={(e) => set("email")(e.target.value)}
                    placeholder="contact@email.com"
                    className="w-full bg-slate-800/80 border border-white/5 rounded-xl px-3.5 py-2.5 text-[14px] text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors"
                  />
                </div>
              </div>

              {/* Notify channels */}
              <div className="rounded-xl border border-white/5 bg-white/5 px-4 py-3">
                <div className="text-[11px] font-bold text-slate-600 uppercase tracking-widest mb-2">
                  Notify via
                </div>
                <NotifyRow
                  icon={
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                  }
                  label="WhatsApp"
                  on={form.notifyViaWhatsApp}
                  onToggle={() =>
                    set("notifyViaWhatsApp")(!form.notifyViaWhatsApp)
                  }
                />
                <NotifyRow
                  icon={<Smartphone className="w-3.5 h-3.5 text-blue-400" />}
                  label="SMS"
                  on={form.notifyViaSMS}
                  onToggle={() => set("notifyViaSMS")(!form.notifyViaSMS)}
                />
                <NotifyRow
                  icon={<Mail className="w-3.5 h-3.5 text-violet-400" />}
                  label="Email"
                  on={form.notifyViaEmail}
                  onToggle={() => set("notifyViaEmail")(!form.notifyViaEmail)}
                />
              </div>

              {/* Save / Discard */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={handleDiscard}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/5 text-slate-400 font-semibold text-[13px] py-2.5 rounded-xl hover:border-white/10 hover:text-slate-200 transition-all"
                >
                  <X className="w-4 h-4" /> Discard
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white font-bold text-[13px] py-2.5 rounded-xl hover:bg-blue-500 transition-all hover:-translate-y-0.5 shadow-md shadow-blue-600/20"
                >
                  <Check className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          ) : (
            /* View mode */
            <>
              {/* Detail grid */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    icon: <User className="w-3.5 h-3.5" />,
                    label: "Full Name",
                    value: contact.name,
                  },
                  {
                    icon: <Phone className="w-3.5 h-3.5" />,
                    label: "Phone",
                    value: contact.phone,
                  },
                  {
                    icon: <Heart className="w-3.5 h-3.5" />,
                    label: "Relationship",
                    value: contact.relationship,
                  },
                ].map(({ icon, label, value }) => (
                  <div
                    key={label}
                    className="rounded-xl bg-slate-800/60 border border-white/5 p-3"
                  >
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
                      {icon} {label}
                    </div>
                    <div className="text-[13px] font-semibold text-slate-300">
                      {value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Notify preview */}
              <div className="rounded-xl border border-white/5 bg-white/5 px-4 py-3">
                <div className="text-[11px] font-bold text-slate-600 uppercase tracking-widest mb-2.5">
                  Notification Channels
                </div>
                <div className="flex gap-2">
                  {[
                    {
                      on: contact.notifyViaWhatsApp,
                      icon: <MessageCircle className="w-3.5 h-3.5" />,
                      label: "WhatsApp",
                      activeClass:
                        "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
                    },
                    {
                      on: contact.notifyViaSMS,
                      icon: <Smartphone className="w-3.5 h-3.5" />,
                      label: "SMS",
                      activeClass:
                        "text-blue-400 bg-blue-500/10 border-blue-500/20",
                    },
                    {
                      on: contact.notifyViaEmail,
                      icon: <Mail className="w-3.5 h-3.5" />,
                      label: "Email",
                      activeClass:
                        "text-violet-400 bg-violet-500/10 border-violet-500/20",
                    },
                  ].map(({ on, icon, label, activeClass }) => (
                    <div
                      key={label}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[12px] font-semibold transition-all
                        ${
                          on
                            ? activeClass
                            : "text-slate-700 bg-slate-800/60 border-white/5"
                        }`}
                    >
                      {icon} {label}
                      {on ? (
                        <CheckCircle2 className="w-3 h-3 ml-0.5" />
                      ) : (
                        <X className="w-3 h-3 ml-0.5 opacity-40" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {!contact.isDefault && (
                  <button
                    onClick={onSetDefault}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600/10 border border-blue-500/25 text-blue-400 font-semibold text-[13px] py-2.5 rounded-xl hover:bg-blue-600/20 hover:border-blue-500/40 transition-all"
                  >
                    <Star className="w-4 h-4" /> Set as Default
                  </button>
                )}
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="flex items-center justify-center gap-2 bg-red-500/8 border border-red-500/20 text-red-400 font-semibold text-[13px] py-2.5 px-4 rounded-xl hover:bg-red-500/15 hover:border-red-500/30 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                  {!contact.isDefault && "Remove"}
                </button>
              </div>

              {/* Delete confirm */}
              {confirmDelete && (
                <div
                  className="rounded-xl border border-red-500/25 bg-red-500/8 p-4"
                  style={{ animation: "secIn 0.2s ease-out both" }}
                >
                  <div className="text-[13px] font-bold text-red-400 mb-1 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> Remove Contact?
                  </div>
                  <div className="text-[12px] text-slate-500 mb-3">
                    {contact.name} will no longer receive trip notifications.
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setConfirmDelete(false)}
                      className="flex-1 py-2 rounded-lg bg-white/5 border border-white/5 text-slate-400 text-[12px] font-semibold hover:bg-white/10 transition-all"
                    >
                      Keep
                    </button>
                    <button
                      onClick={onDelete}
                      className="flex-1 py-2 rounded-lg bg-red-500 text-white text-[12px] font-bold hover:bg-red-400 transition-all"
                    >
                      Yes, Remove
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Add Contact Form ─────────────────────────────────────────────────────────

function AddContactForm({
  onAdd,
  onCancel,
}: {
  onAdd: (c: Contact) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [error, setError] = useState("");
  const set = (k: keyof typeof form) => (v: any) =>
    setForm((f) => ({ ...f, [k]: v }));

  function handleSubmit() {
    if (!form.name.trim()) {
      setError("Full name is required");
      return;
    }
    if (!form.phone.trim()) {
      setError("Phone number is required");
      return;
    }
    setError("");
    onAdd({
      id: Date.now().toString(),
      name: form.name,
      phone: form.phone,
      relationship: form.relationship || "Other",
      email: form.email,
      isDefault: false,
      notifyViaSMS: form.notifyViaSMS,
      notifyViaWhatsApp: form.notifyViaWhatsApp,
      notifyViaEmail: form.notifyViaEmail,
    });
  }

  return (
    <div
      className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-500/6 to-blue-500/2 p-5 space-y-4"
      style={{ animation: "secIn 0.2s ease-out both" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div
          className="text-[14px] font-bold text-white flex items-center gap-2"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <Plus className="w-4 h-4 text-blue-500" />
          New Emergency Contact
        </div>
        <button
          onClick={onCancel}
          className="w-7 h-7 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 hover:text-slate-300 transition-all"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-600 mb-2">
            <User className="w-3 h-3" /> Full Name *
          </label>
          <input
            value={form.name}
            onChange={(e) => set("name")(e.target.value)}
            placeholder="e.g. Chioma Adeyemi"
            className="w-full bg-slate-800/80 border border-white/5 rounded-xl px-3.5 py-2.5 text-[14px] text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors"
          />
        </div>
        <div>
          <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-600 mb-2">
            <Phone className="w-3 h-3" /> Phone Number *
          </label>
          <input
            value={form.phone}
            onChange={(e) => set("phone")(e.target.value)}
            placeholder="+234 800 000 0000"
            className="w-full bg-slate-800/80 border border-white/5 rounded-xl px-3.5 py-2.5 text-[14px] text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors"
          />
        </div>
        <div>
          <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-600 mb-2">
            <Heart className="w-3 h-3" /> Relationship
          </label>
          <select
            value={form.relationship}
            onChange={(e) => set("relationship")(e.target.value)}
            className="w-full bg-slate-800/80 border border-white/5 rounded-xl px-3.5 py-2.5 text-[14px] text-slate-300 focus:outline-none focus:border-blue-500/60 transition-colors"
          >
            <option value="" style={{ background: "#1e293b" }}>
              Select...
            </option>
            {RELATIONSHIPS.map((r) => (
              <option key={r} value={r} style={{ background: "#1e293b" }}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-slate-600 mb-2">
            <Mail className="w-3 h-3" /> Email (Optional)
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email")(e.target.value)}
            placeholder="contact@email.com"
            className="w-full bg-slate-800/80 border border-white/5 rounded-xl px-3.5 py-2.5 text-[14px] text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/60 transition-colors"
          />
        </div>
      </div>

      {/* Notify channels */}
      <div className="rounded-xl border border-white/5 bg-white/5 px-4 py-3">
        <div className="text-[11px] font-bold text-slate-600 uppercase tracking-widest mb-2">
          Notify this contact via
        </div>
        <NotifyRow
          icon={<MessageCircle className="w-3.5 h-3.5 text-emerald-500" />}
          label="WhatsApp"
          on={form.notifyViaWhatsApp}
          onToggle={() => set("notifyViaWhatsApp")(!form.notifyViaWhatsApp)}
        />
        <NotifyRow
          icon={<Smartphone className="w-3.5 h-3.5 text-blue-400" />}
          label="SMS"
          on={form.notifyViaSMS}
          onToggle={() => set("notifyViaSMS")(!form.notifyViaSMS)}
        />
        <NotifyRow
          icon={<Mail className="w-3.5 h-3.5 text-violet-400" />}
          label="Email"
          on={form.notifyViaEmail}
          onToggle={() => set("notifyViaEmail")(!form.notifyViaEmail)}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-[12px] text-red-400">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" /> {error}
        </div>
      )}

      {/* Submit */}
      <div className="flex gap-2">
        <button
          onClick={onCancel}
          className="flex-1 flex items-center justify-center gap-2 bg-white/5 border border-white/5 text-slate-400 font-semibold text-[13px] py-2.5 rounded-xl hover:border-white/10 hover:text-slate-200 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white font-bold text-[13px] py-2.5 rounded-xl hover:bg-blue-500 transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-600/20"
        >
          <Check className="w-4 h-4" /> Add Contact
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [expandedId, setExpandedId] = useState<string | null>("1");
  const [showAddForm, setShowAddForm] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleAdd(contact: Contact) {
    setContacts((prev) => [...prev, contact]);
    setShowAddForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleSetDefault(id: string) {
    setContacts((prev) => prev.map((c) => ({ ...c, isDefault: c.id === id })));
  }

  function handleDelete(id: string) {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    setExpandedId(null);
  }

  function handleUpdate(updated: Contact) {
    setContacts((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const defaultContact = contacts.find((c) => c.isDefault);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');

        .ec-root * { box-sizing: border-box; }
        .ec-root {
          font-family: 'DM Sans', sans-serif;
          background: #0f172a;
          color: #cbd5e1;
          min-height: 100vh;
        }

        .ec-root ::-webkit-scrollbar { width: 4px; }
        .ec-root ::-webkit-scrollbar-track { background: transparent; }
        .ec-root ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }

        .card-enter { animation: cardIn 0.25s ease-out both; }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes secIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        select option { background: #1e293b; }
      `}</style>

      <div className="ec-root">
        <div className="max-w-[780px] lg:max-w-[1100px] mx-auto px-6 py-8">
          {/* ── Page Header ─────────────────────────────────────── */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1
                className="text-[28px] font-black text-white leading-tight tracking-tight flex items-center gap-3"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                <Shield className="w-7 h-7 text-blue-500" />
                Emergency Contacts
              </h1>
              <p className="text-slate-500 text-[14px] mt-1">
                People notified automatically when you book a trip
              </p>
            </div>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className={`flex items-center gap-2 font-bold text-[13px] px-4 py-2.5 rounded-xl transition-all hover:-translate-y-0.5
                ${
                  showAddForm
                    ? "bg-white/5 border border-white/5 text-slate-400 hover:border-white/10"
                    : "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20"
                }`}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {showAddForm ? (
                <X className="w-4 h-4" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              {showAddForm ? "Cancel" : "Add Contact"}
            </button>
          </div>

          {/* ── Saved toast ──────────────────────────────────────── */}
          {saved && (
            <div
              className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 rounded-xl px-4 py-3 mb-5"
              style={{ animation: "secIn 0.25s ease-out both" }}
            >
              <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span className="text-[13px] text-blue-400 font-semibold">
                Emergency contacts updated successfully
              </span>
            </div>
          )}

          {/* ── How it works banner ──────────────────────────────── */}
          <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/8 to-blue-500/3 p-5 mb-6">
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest">
                How it works
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-[13px] text-slate-400 leading-relaxed">
                When you confirm a booking, your{" "}
                <span className="text-white font-semibold">
                  default contact
                </span>{" "}
                automatically receives your driver's name, phone number, vehicle
                details, route, and departure time via your preferred channel.
                Keep this information up to date for your safety.
              </p>
            </div>

            {/* What gets shared */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              {[
                {
                  icon: <User className="w-3.5 h-3.5 text-blue-400" />,
                  text: "Driver name & phone",
                },
                {
                  icon: <Car className="w-3.5 h-3.5 text-blue-400" />,
                  text: "Vehicle & plate number",
                },
                {
                  icon: <MapPin className="w-3.5 h-3.5 text-blue-400" />,
                  text: "Pickup & destination",
                },
                {
                  icon: <Clock className="w-3.5 h-3.5 text-blue-400" />,
                  text: "Departure date & time",
                },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 text-[12px] text-slate-400"
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Stats row ────────────────────────────────────────── */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {[
              {
                label: "Total Contacts",
                value: contacts.length,
                icon: <Users className="w-4 h-4" />,
                color: "from-blue-500/10 to-blue-500/5 border-blue-500/20",
                valueColor: "text-blue-400",
              },
              {
                label: "Default Contact",
                value: defaultContact?.name.split(" ")[0] || "None",
                icon: <Star className="w-4 h-4" />,
                color: "from-white/5 to-white/[0.02] border-white/5",
                valueColor: "text-white",
              },
              {
                label: "Channels Active",
                value: defaultContact
                  ? [
                      defaultContact.notifyViaWhatsApp,
                      defaultContact.notifyViaSMS,
                      defaultContact.notifyViaEmail,
                    ].filter(Boolean).length
                  : 0,
                icon: <Bell className="w-4 h-4" />,
                color: "from-white/5 to-white/[0.02] border-white/5",
                valueColor: "text-white",
              },
            ].map((s) => (
              <div
                key={s.label}
                className={`rounded-2xl border bg-gradient-to-br ${s.color} px-4 py-4`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] text-slate-500 font-medium">
                    {s.label}
                  </span>
                  <span className="text-slate-600">{s.icon}</span>
                </div>
                <div
                  className={`font-black text-[24px] leading-none ${s.valueColor}`}
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          {/* ── Add Contact Form ─────────────────────────────────── */}
          {showAddForm && (
            <div className="mb-4">
              <AddContactForm
                onAdd={handleAdd}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          )}

          {/* ── Contacts list ────────────────────────────────────── */}
          {contacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full border border-white/5 bg-slate-900/60 flex items-center justify-center mb-5 opacity-70">
                <Shield className="w-7 h-7 text-slate-600" />
              </div>
              <div
                className="text-[16px] font-bold text-slate-500 mb-1"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                No emergency contacts
              </div>
              <div className="text-[13px] text-slate-600 mb-5">
                Add a contact to keep your loved ones informed when you travel
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 bg-blue-600 text-white font-bold text-[13px] px-5 py-2.5 rounded-xl hover:bg-blue-500 transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-600/20"
              >
                <Plus className="w-4 h-4" /> Add First Contact
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {contacts.map((contact, i) => (
                <div
                  key={contact.id}
                  className={`card-enter ${expandedId === contact.id ? "lg:col-span-2" : ""}`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <ContactCard
                    contact={contact}
                    expanded={expandedId === contact.id}
                    onToggle={() =>
                      setExpandedId(
                        expandedId === contact.id ? null : contact.id
                      )
                    }
                    onSetDefault={() => handleSetDefault(contact.id)}
                    onDelete={() => handleDelete(contact.id)}
                    onUpdate={handleUpdate}
                  />
                </div>
              ))}
            </div>
          )}

          {/* ── Max contacts hint ────────────────────────────────── */}
          {contacts.length > 0 && contacts.length < 5 && (
            <div className="flex items-center justify-center gap-2 mt-8 text-[12px] text-slate-700">
              <Users className="w-3.5 h-3.5" />
              You can add up to 5 emergency contacts · {5 -
                contacts.length}{" "}
              remaining
            </div>
          )}
          {contacts.length >= 5 && (
            <div className="flex items-center justify-center gap-2 mt-8 text-[12px] text-amber-600">
              <AlertCircle className="w-3.5 h-3.5" />
              Maximum 5 emergency contacts reached
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Bell icon (not in lucide imports above, adding inline)
function Bell(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24">
      <path
        d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
