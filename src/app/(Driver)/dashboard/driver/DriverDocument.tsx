"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type DocStatus = "valid" | "expiring" | "expired" | "pending" | "missing";

type Document = {
  id: number;
  name: string;
  icon: string;
  category: "personal" | "vehicle" | "insurance";
  status: DocStatus;
  issueDate: string;
  expiryDate: string;
  issuedBy: string;
  fileType: string;
  fileSize: string;
  required: boolean;
  notes?: string;
};

type FilterTab = "all" | "personal" | "vehicle" | "insurance";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const DOCUMENTS: Document[] = [
  {
    id: 1,
    name: "Driver's Licence",
    icon: "🪪",
    category: "personal",
    status: "valid",
    issueDate: "Jun 2022",
    expiryDate: "Jun 2028",
    issuedBy: "Federal Road Safety Corps",
    fileType: "PDF",
    fileSize: "1.2 MB",
    required: true,
  },
  {
    id: 2,
    name: "National ID Card",
    icon: "🆔",
    category: "personal",
    status: "valid",
    issueDate: "Mar 2020",
    expiryDate: "Mar 2030",
    issuedBy: "National Identity Management Commission",
    fileType: "JPG",
    fileSize: "820 KB",
    required: true,
  },
  {
    id: 3,
    name: "Proof of Address",
    icon: "🏠",
    category: "personal",
    status: "expiring",
    issueDate: "Feb 2025",
    expiryDate: "Feb 2026",
    issuedBy: "EKEDC (Utility Bill)",
    fileType: "PDF",
    fileSize: "560 KB",
    required: true,
    notes: "Expires in 3 days. Upload a newer utility bill.",
  },
  {
    id: 4,
    name: "Vehicle Registration",
    icon: "📋",
    category: "vehicle",
    status: "valid",
    issueDate: "Jan 2024",
    expiryDate: "Jan 2027",
    issuedBy: "Lagos State Motor Vehicle Admin",
    fileType: "PDF",
    fileSize: "980 KB",
    required: true,
  },
  {
    id: 5,
    name: "Road Worthiness Certificate",
    icon: "🔧",
    category: "vehicle",
    status: "expiring",
    issueDate: "Apr 2025",
    expiryDate: "Apr 2026",
    issuedBy: "FRSC Vehicle Inspection",
    fileType: "PDF",
    fileSize: "740 KB",
    required: true,
    notes: "Expires in ~2 months. Schedule a re-inspection.",
  },
  {
    id: 6,
    name: "Hackney Permit",
    icon: "🚖",
    category: "vehicle",
    status: "expired",
    issueDate: "Jan 2025",
    expiryDate: "Jan 2026",
    issuedBy: "Lagos State Govt Transport",
    fileType: "PDF",
    fileSize: "610 KB",
    required: true,
    notes: "Expired. Your trips are paused until this is renewed.",
  },
  {
    id: 7,
    name: "Third-Party Insurance",
    icon: "🛡️",
    category: "insurance",
    status: "valid",
    issueDate: "Dec 2025",
    expiryDate: "Dec 2026",
    issuedBy: "AXA Mansard Insurance",
    fileType: "PDF",
    fileSize: "1.1 MB",
    required: true,
  },
  {
    id: 8,
    name: "Comprehensive Insurance",
    icon: "📄",
    category: "insurance",
    status: "pending",
    issueDate: "—",
    expiryDate: "—",
    issuedBy: "Leadway Assurance",
    fileType: "—",
    fileSize: "—",
    required: false,
    notes: "Document submitted on 20 Feb 2026. Under review.",
  },
  {
    id: 9,
    name: "Passengers Liability Cover",
    icon: "👥",
    category: "insurance",
    status: "missing",
    issueDate: "—",
    expiryDate: "—",
    issuedBy: "—",
    fileType: "—",
    fileSize: "—",
    required: false,
    notes: "Not uploaded yet. Strongly recommended for interstate trips.",
  },
];

const STATUS_META: Record<
  DocStatus,
  {
    label: string;
    badgeCls: string;
    dotCls: string;
    cardBorder: string;
    cardBg: string;
    pulse?: boolean;
  }
> = {
  valid: {
    label: "Valid",
    badgeCls: "bg-emerald-50 text-emerald-600 border-emerald-200",
    dotCls: "bg-emerald-500",
    cardBorder: "border-slate-200",
    cardBg: "bg-white",
  },
  expiring: {
    label: "Expiring",
    badgeCls: "bg-amber-50  text-amber-600  border-amber-200",
    dotCls: "bg-amber-400",
    cardBorder: "border-amber-300",
    cardBg: "bg-amber-50/30",
    pulse: true,
  },
  expired: {
    label: "Expired",
    badgeCls: "bg-red-50    text-red-500    border-red-200",
    dotCls: "bg-red-500",
    cardBorder: "border-red-300",
    cardBg: "bg-red-50/30",
    pulse: true,
  },
  pending: {
    label: "Pending",
    badgeCls: "bg-blue-50   text-blue-600   border-blue-200",
    dotCls: "bg-blue-400",
    cardBorder: "border-blue-200",
    cardBg: "bg-blue-50/20",
  },
  missing: {
    label: "Missing",
    badgeCls: "bg-slate-100 text-slate-500  border-slate-200",
    dotCls: "bg-slate-400",
    cardBorder: "border-dashed border-slate-300",
    cardBg: "bg-slate-50/60",
  },
};

const CATEGORY_LABEL: Record<string, string> = {
  personal: "Personal",
  vehicle: "Vehicle",
  insurance: "Insurance",
};

// ─── Upload Modal ─────────────────────────────────────────────────────────────

function UploadModal({
  doc,
  onClose,
}: {
  doc: Document | null;
  onClose: () => void;
}) {
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  if (!doc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md tab-enter">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <div
              className="font-bold text-[15px] text-slate-800 flex items-center gap-2"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              <span className="text-[18px]">{doc.icon}</span>
              {doc.status === "missing" || doc.status === "expired"
                ? "Upload"
                : "Replace"}{" "}
              Document
            </div>
            <div className="text-[12px] text-slate-400 mt-0.5">{doc.name}</div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <svg
              className="w-4 h-4 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="px-5 py-4">
          {!uploaded ? (
            <>
              {/* Drop zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragging(true);
                }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  setUploaded(true);
                }}
                className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 text-center transition-all cursor-pointer mb-4
                  ${
                    dragging
                      ? "border-blue-400 bg-blue-50"
                      : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                  }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    dragging ? "bg-blue-100" : "bg-slate-100"
                  }`}
                >
                  <svg
                    className={`w-6 h-6 transition-colors ${
                      dragging ? "text-blue-500" : "text-slate-400"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-slate-700 mb-0.5">
                    Drag & drop your file here
                  </div>
                  <div className="text-[12px] text-slate-400">
                    or{" "}
                    <span className="text-blue-600 font-medium cursor-pointer hover:underline">
                      browse files
                    </span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                  PDF, JPG, PNG · Max 5 MB
                </div>
              </div>

              {/* Expiry date */}
              <div className="mb-4">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 block">
                  Document Expiry Date
                </label>
                <input
                  type="date"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[14px] text-slate-700 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              <div className="mb-4">
                <label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1.5 block">
                  Issued By
                </label>
                <input
                  type="text"
                  placeholder={
                    doc.issuedBy !== "—"
                      ? doc.issuedBy
                      : "Authority or organisation name"
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-[14px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              <button
                onClick={() => setUploaded(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[14px] py-3 rounded-xl transition-all shadow-md shadow-blue-200 hover:-translate-y-0.5"
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                Upload Document
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-1">
                <svg
                  className="w-7 h-7 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div
                className="font-bold text-[16px] text-slate-800"
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                Document Uploaded
              </div>
              <div className="text-[13px] text-slate-500 max-w-xs">
                Your <span className="font-semibold">{doc.name}</span> is now
                under review. We'll notify you once it's verified.
              </div>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[13px] rounded-xl transition-all shadow-sm shadow-blue-200"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Document Card ────────────────────────────────────────────────────────────

function DocumentCard({
  doc,
  onUpload,
  onView,
}: {
  doc: Document;
  onUpload: (d: Document) => void;
  onView: (d: Document) => void;
}) {
  const s = STATUS_META[doc.status];
  const isMissing = doc.status === "missing";
  const isPending = doc.status === "pending";
  const isExpired = doc.status === "expired";
  const isExpiring = doc.status === "expiring";

  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-200 hover:shadow-md ${s.cardBorder} ${s.cardBg}`}
    >
      {/* Top accent for expired / expiring */}
      {(isExpired || isExpiring) && (
        <div
          className={`h-[3px] -mx-5 -mt-5 mb-4 rounded-t-2xl ${
            isExpired ? "bg-red-400" : "bg-amber-400"
          }`}
        />
      )}

      <div className="flex items-start gap-3 mb-3">
        {/* Icon */}
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center text-[20px] flex-shrink-0 border
          ${
            isMissing
              ? "bg-slate-100 border-slate-200 border-dashed opacity-60"
              : "bg-white border-slate-200 shadow-sm"
          }`}
        >
          {doc.icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-0.5">
            <span
              className={`font-semibold text-[14px] leading-snug ${
                isMissing ? "text-slate-400 italic" : "text-slate-800"
              }`}
            >
              {doc.name}
            </span>
            {doc.required && (
              <span className="text-[10px] font-bold text-blue-500 bg-blue-50 border border-blue-200 px-1.5 py-0.5 rounded-full flex-shrink-0">
                Required
              </span>
            )}
          </div>
          <div className="text-[11px] text-slate-400 truncate">
            {isMissing ? "Not uploaded" : doc.issuedBy}
          </div>
        </div>
      </div>

      {/* Status badge */}
      <div className="flex items-center justify-between mb-3">
        <span
          className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border ${s.badgeCls}`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full inline-block ${s.dotCls} ${
              s.pulse ? "animate-pulse" : ""
            }`}
          />
          {s.label}
        </span>
        <span className="text-[11px] text-slate-400">
          {doc.fileType !== "—"
            ? `${doc.fileType} · ${doc.fileSize}`
            : CATEGORY_LABEL[doc.category]}
        </span>
      </div>

      {/* Dates grid */}
      {!isMissing && !isPending && (
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-white/80 rounded-xl border border-slate-100 px-3 py-2">
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
              Issued
            </div>
            <div className="text-[12px] font-semibold text-slate-700">
              {doc.issueDate}
            </div>
          </div>
          <div
            className={`rounded-xl border px-3 py-2 ${
              isExpired
                ? "bg-red-50 border-red-200"
                : isExpiring
                ? "bg-amber-50 border-amber-200"
                : "bg-white/80 border-slate-100"
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
              Expires
            </div>
            <div
              className={`text-[12px] font-semibold ${
                isExpired
                  ? "text-red-500"
                  : isExpiring
                  ? "text-amber-600"
                  : "text-slate-700"
              }`}
            >
              {doc.expiryDate}
            </div>
          </div>
        </div>
      )}

      {/* Pending timeline */}
      {isPending && (
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5 mb-3">
          <div className="w-5 h-5 rounded-full border-2 border-blue-400 border-t-transparent animate-spin flex-shrink-0" />
          <span className="text-[12px] text-blue-600 font-medium">
            Under review by BloomRydes
          </span>
        </div>
      )}

      {/* Notes */}
      {doc.notes && (
        <div
          className={`flex items-start gap-2 rounded-xl px-3 py-2.5 mb-3 text-[12px]
          ${
            isExpired
              ? "bg-red-50 border border-red-100 text-red-500"
              : isExpiring
              ? "bg-amber-50 border border-amber-100 text-amber-600"
              : isPending
              ? "bg-blue-50  border border-blue-100  text-blue-600"
              : "bg-slate-50 border border-slate-100 text-slate-500"
          }`}
        >
          <svg
            className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M12 8v4M12 16h.01"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
          {doc.notes}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        {isMissing ? (
          <button
            onClick={() => onUpload(doc)}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[13px] py-2.5 rounded-xl transition-all shadow-sm shadow-blue-200 hover:-translate-y-0.5"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
              <path
                d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            Upload Document
          </button>
        ) : isPending ? (
          <>
            <button
              onClick={() => onView(doc)}
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600 text-[13px] font-medium py-2 rounded-xl transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                <path
                  d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              View
            </button>
            <button
              onClick={() => onUpload(doc)}
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-500 hover:border-amber-300 hover:text-amber-600 text-[13px] font-medium py-2 rounded-xl transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                <path
                  d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <path
                  d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              Replace
            </button>
          </>
        ) : isExpired ? (
          <button
            onClick={() => onUpload(doc)}
            className="flex-1 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-400 text-white font-semibold text-[13px] py-2.5 rounded-xl transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
              <path
                d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            Renew Now
          </button>
        ) : (
          <>
            <button
              onClick={() => onView(doc)}
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600 text-[13px] font-medium py-2 rounded-xl transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                <path
                  d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              View
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600 text-[13px] font-medium py-2 rounded-xl transition-all">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                <path
                  d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
              Download
            </button>
            {isExpiring && (
              <button
                onClick={() => onUpload(doc)}
                className="flex-1 flex items-center justify-center gap-2 bg-amber-50 border border-amber-200 text-amber-600 text-[13px] font-semibold py-2 rounded-xl hover:bg-amber-100 transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
                Renew
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── View Document Modal ──────────────────────────────────────────────────────

function ViewModal({
  doc,
  onClose,
  onUpload,
}: {
  doc: Document | null;
  onClose: () => void;
  onUpload: (d: Document) => void;
}) {
  if (!doc) return null;
  const s = STATUS_META[doc.status];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-md tab-enter">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div
            className="font-bold text-[15px] text-slate-800 flex items-center gap-2"
            style={{ fontFamily: "'Syne',sans-serif" }}
          >
            <span className="text-[18px]">{doc.icon}</span>
            {doc.name}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <svg
              className="w-4 h-4 text-slate-500"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="px-5 py-5">
          {/* Simulated document preview */}
          <div
            className="w-full h-44 rounded-2xl mb-4 flex items-center justify-center border border-slate-200 overflow-hidden"
            style={{
              background: "linear-gradient(135deg,#1e3a5f 0%,#2d5986 100%)",
            }}
          >
            <div className="flex flex-col items-center gap-2 opacity-40">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <polyline
                  points="14 2 14 8 20 8"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
              <span className="text-white text-[13px] font-medium">
                {doc.fileType} Document
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { label: "Issued By", value: doc.issuedBy },
              { label: "Category", value: CATEGORY_LABEL[doc.category] },
              { label: "Issue Date", value: doc.issueDate },
              { label: "Expiry Date", value: doc.expiryDate },
              { label: "File Type", value: doc.fileType },
              { label: "File Size", value: doc.fileSize },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-slate-50 rounded-xl border border-slate-100 px-3 py-2"
              >
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                  {label}
                </div>
                <div className="text-[12px] font-semibold text-slate-700">
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[13px] py-2.5 rounded-xl transition-all shadow-sm shadow-blue-200">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                <path
                  d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              Download
            </button>
            <button
              onClick={() => {
                onClose();
                onUpload(doc);
              }}
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 text-[13px] font-medium py-2.5 rounded-xl transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                <path
                  d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              Replace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function DriverDocuments() {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [uploadDoc, setUploadDoc] = useState<Document | null>(null);
  const [viewDoc, setViewDoc] = useState<Document | null>(null);

  const filtered =
    activeFilter === "all"
      ? DOCUMENTS
      : DOCUMENTS.filter((d) => d.category === activeFilter);

  const expiredCount = DOCUMENTS.filter((d) => d.status === "expired").length;
  const expiringCount = DOCUMENTS.filter((d) => d.status === "expiring").length;
  const missingCount = DOCUMENTS.filter((d) => d.status === "missing").length;
  const pendingCount = DOCUMENTS.filter((d) => d.status === "pending").length;
  const validCount = DOCUMENTS.filter((d) => d.status === "valid").length;

  const FILTERS: { key: FilterTab; label: string }[] = [
    { key: "all", label: "All Documents" },
    { key: "personal", label: "Personal" },
    { key: "vehicle", label: "Vehicle" },
    { key: "insurance", label: "Insurance" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
        .doc-root * { box-sizing: border-box; }
        .doc-root { font-family: 'DM Sans', sans-serif; background: #f8fafc; color: #1e293b; min-height: 100vh; }
        .doc-root ::-webkit-scrollbar { width: 4px; }
        .doc-root ::-webkit-scrollbar-track { background: transparent; }
        .doc-root ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .tab-enter { animation: tabIn 0.22s ease-out both; }
        @keyframes tabIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .card-in { animation: cardIn 0.25s ease-out both; }
        @keyframes cardIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      {/* Modals */}
      {uploadDoc && (
        <UploadModal doc={uploadDoc} onClose={() => setUploadDoc(null)} />
      )}
      {viewDoc && (
        <ViewModal
          doc={viewDoc}
          onClose={() => setViewDoc(null)}
          onUpload={(d) => {
            setViewDoc(null);
            setUploadDoc(d);
          }}
        />
      )}

      <div className="doc-root">
        <div className="max-w-[1100px] mx-auto px-6 py-8">
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
                  <path
                    d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <polyline
                    points="14 2 14 8 20 8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <line
                    x1="16"
                    y1="13"
                    x2="8"
                    y2="13"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <line
                    x1="16"
                    y1="17"
                    x2="8"
                    y2="17"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
                Documents
                <span className="bg-blue-600 text-white text-[12px] font-semibold px-2.5 py-0.5 rounded-full">
                  {DOCUMENTS.length}
                </span>
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Keep all your documents valid to stay active on the platform
              </p>
            </div>

            <button
              onClick={() =>
                setUploadDoc({
                  id: 0,
                  name: "New Document",
                  icon: "📄",
                  category: "personal",
                  status: "missing",
                  issueDate: "—",
                  expiryDate: "—",
                  issuedBy: "",
                  fileType: "—",
                  fileSize: "—",
                  required: false,
                })
              }
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[13px] px-4 py-2.5 rounded-xl shadow-md shadow-blue-200 hover:-translate-y-0.5 transition-all"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
              Upload Document
            </button>
          </div>

          {/* ── Alert banner (if issues) ───────────────────── */}
          {(expiredCount > 0 || expiringCount > 0) && (
            <div
              className={`flex items-start gap-3 rounded-2xl border px-5 py-4 mb-6 tab-enter
              ${
                expiredCount > 0
                  ? "bg-red-50 border-red-200"
                  : "bg-amber-50 border-amber-200"
              }`}
            >
              <svg
                className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  expiredCount > 0 ? "text-red-500" : "text-amber-500"
                }`}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              <div className="flex-1">
                <div
                  className={`font-semibold text-[13px] mb-0.5 ${
                    expiredCount > 0 ? "text-red-600" : "text-amber-600"
                  }`}
                >
                  {expiredCount > 0
                    ? `${expiredCount} document${
                        expiredCount > 1 ? "s have" : " has"
                      } expired — your trips may be paused`
                    : `${expiringCount} document${
                        expiringCount > 1 ? "s are" : " is"
                      } expiring soon`}
                </div>
                <div
                  className={`text-[12px] ${
                    expiredCount > 0 ? "text-red-400" : "text-amber-500"
                  }`}
                >
                  Renew them as soon as possible to avoid trip interruptions.
                </div>
              </div>
              <button
                onClick={() => setActiveFilter("all")}
                className={`flex-shrink-0 text-[12px] font-semibold px-3 py-1.5 rounded-lg transition-all
                  ${
                    expiredCount > 0
                      ? "text-red-500 bg-red-100 hover:bg-red-200"
                      : "text-amber-600 bg-amber-100 hover:bg-amber-200"
                  }`}
              >
                Review
              </button>
            </div>
          )}

          {/* ── Stats strip ──────────────────────────────────── */}
          <div className="grid grid-cols-5 gap-3 mb-6">
            {[
              {
                label: "Valid",
                count: validCount,
                color: "from-emerald-50 to-white border-emerald-100",
                vcolor: "text-emerald-600",
              },
              {
                label: "Expiring",
                count: expiringCount,
                color: "from-amber-50  to-white border-amber-100",
                vcolor: "text-amber-600",
              },
              {
                label: "Expired",
                count: expiredCount,
                color: "from-red-50    to-white border-red-100",
                vcolor: "text-red-500",
              },
              {
                label: "Pending",
                count: pendingCount,
                color: "from-blue-50   to-white border-blue-100",
                vcolor: "text-blue-600",
              },
              {
                label: "Missing",
                count: missingCount,
                color: "from-slate-50  to-white border-slate-200",
                vcolor: "text-slate-500",
              },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`rounded-2xl border bg-gradient-to-br ${s.color} px-4 py-3.5 card-in`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="text-[11px] text-slate-400 mb-1.5">
                  {s.label}
                </div>
                <div
                  className={`font-black text-[28px] leading-none ${s.vcolor}`}
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  {s.count}
                </div>
              </div>
            ))}
          </div>

          {/* ── Filter tabs ──────────────────────────────────── */}
          <div className="flex items-center gap-2 mb-6">
            {FILTERS.map(({ key, label }) => {
              const count =
                key === "all"
                  ? DOCUMENTS.length
                  : DOCUMENTS.filter((d) => d.category === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-medium border transition-all
                    ${
                      activeFilter === key
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-slate-700"
                    }`}
                >
                  {label}
                  <span
                    className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center
                    ${
                      activeFilter === key
                        ? "bg-white/25 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Document grid ─────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((doc, i) => (
              <div
                key={doc.id}
                className="card-in"
                style={{ animationDelay: `${i * 55}ms` }}
              >
                <DocumentCard
                  doc={doc}
                  onUpload={(d) => setUploadDoc(d)}
                  onView={(d) => setViewDoc(d)}
                />
              </div>
            ))}
          </div>

          {/* ── Footer tip ───────────────────────────────────── */}
          <div className="flex items-start gap-3 mt-8 bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4">
            <svg
              className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M12 8v4M12 16h.01"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <p className="text-[12px] text-blue-600">
              All required documents must be valid for your trips to remain
              active. BloomRydes reviews uploaded documents within 24 hours.
              You'll get a notification once approved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
