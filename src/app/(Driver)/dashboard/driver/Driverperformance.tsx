"use client";

import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Period = "7d" | "30d" | "all";

type Review = {
  id: number;
  initials: string;
  color: string;
  name: string;
  route: string;
  date: string;
  rating: number;
  comment: string;
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MONTHLY_EARNINGS = [
  { month: "Sep", earnings: 18500, trips: 5, passengers: 28 },
  { month: "Oct", earnings: 22000, trips: 6, passengers: 34 },
  { month: "Nov", earnings: 19000, trips: 5, passengers: 29 },
  { month: "Dec", earnings: 31000, trips: 9, passengers: 52 },
  { month: "Jan", earnings: 27500, trips: 8, passengers: 43 },
  { month: "Feb", earnings: 43000, trips: 12, passengers: 68 },
];

const WEEKLY_EARNINGS = [
  { month: "Mon", earnings: 5000, trips: 1, passengers: 7 },
  { month: "Tue", earnings: 0, trips: 0, passengers: 0 },
  { month: "Wed", earnings: 8500, trips: 2, passengers: 11 },
  { month: "Thu", earnings: 5000, trips: 1, passengers: 6 },
  { month: "Fri", earnings: 12000, trips: 3, passengers: 18 },
  { month: "Sat", earnings: 7500, trips: 2, passengers: 14 },
  { month: "Sun", earnings: 5000, trips: 1, passengers: 12 },
];

const RATING_BREAKDOWN = [
  { stars: 5, count: 31, pct: 67 },
  { stars: 4, count: 11, pct: 24 },
  { stars: 3, count: 3, pct: 7 },
  { stars: 2, count: 1, pct: 2 },
  { stars: 1, count: 0, pct: 0 },
];

const REVIEWS: Review[] = [
  {
    id: 1,
    initials: "AK",
    color: "bg-blue-500",
    name: "Amara Kolawole",
    route: "Lagos → Abuja",
    date: "14 Feb 2026",
    rating: 5,
    comment:
      "Excellent driver! Very punctual and the car was spotless. Will definitely book again.",
  },
  {
    id: 2,
    initials: "TB",
    color: "bg-violet-500",
    name: "Tunde Balogun",
    route: "Lagos → Ibadan",
    date: "10 Feb 2026",
    rating: 4,
    comment:
      "Good trip overall. Driver was professional and the journey was smooth. Slight delay at departure.",
  },
  {
    id: 3,
    initials: "MO",
    color: "bg-rose-500",
    name: "Musa Okafor",
    route: "Abuja → Kaduna",
    date: "2 Feb 2026",
    rating: 5,
    comment:
      "Best ride I've had on this platform. Very comfortable, great music choice too!",
  },
  {
    id: 4,
    initials: "FA",
    color: "bg-amber-500",
    name: "Fatima Abubakar",
    route: "Lagos → Ibadan",
    date: "14 Feb 2026",
    rating: 5,
    comment:
      "Driver was kind, patient and very communicative. Highly recommend.",
  },
  {
    id: 5,
    initials: "CE",
    color: "bg-teal-500",
    name: "Chike Eze",
    route: "Abuja → Kaduna",
    date: "2 Feb 2026",
    rating: 4,
    comment:
      "Solid experience. A bit of traffic but the driver handled it well.",
  },
  {
    id: 6,
    initials: "SB",
    color: "bg-indigo-500",
    name: "Stella Babatunde",
    route: "Lagos → Ibadan",
    date: "14 Feb 2026",
    rating: 5,
    comment:
      "Professional, safe driver. Vehicle was clean and comfortable throughout.",
  },
];

const CATEGORY_RATINGS = [
  { label: "Punctuality", value: 4.9, icon: "⏱" },
  { label: "Vehicle Condition", value: 4.7, icon: "🚗" },
  { label: "Communication", value: 4.8, icon: "💬" },
  { label: "Safety", value: 5.0, icon: "🛡" },
  { label: "Value for Money", value: 4.6, icon: "💰" },
];

const TOP_ROUTES = [
  { from: "Lagos", to: "Abuja", trips: 18, earnings: 90000, pct: 100 },
  { from: "Abuja", to: "Enugu", trips: 12, earnings: 42000, pct: 67 },
  { from: "Lagos", to: "Ibadan", trips: 9, earnings: 22500, pct: 50 },
  { from: "Abuja", to: "Kaduna", trips: 6, earnings: 18000, pct: 33 },
  { from: "Lagos", to: "P.H", trips: 3, earnings: 18000, pct: 17 },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StarRating({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "md";
}) {
  const cls = size === "md" ? "w-4 h-4" : "w-3 h-3";
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`${cls} ${
            i <= rating ? "text-amber-400" : "text-slate-200"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function PerformanceRing({
  rating,
  size = 96,
}: {
  rating: number;
  size?: number;
}) {
  const r = size / 2 - 8;
  const circ = 2 * Math.PI * r;
  const dash = (rating / 5) * circ;
  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: size, height: size }}
    >
      <svg
        className="-rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#dbeafe"
          strokeWidth="7"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="#2563eb"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="font-black text-blue-600 leading-none"
          style={{
            fontFamily: "'Syne',sans-serif",
            fontSize: size > 80 ? 22 : 16,
          }}
        >
          {rating}
        </span>
        <span className="text-[10px] text-slate-400 font-medium">/5.0</span>
      </div>
    </div>
  );
}

// ─── Bar Chart ────────────────────────────────────────────────────────────────

function BarChart({
  data,
  metric,
}: {
  data: typeof MONTHLY_EARNINGS;
  metric: "earnings" | "trips" | "passengers";
}) {
  const max = Math.max(...data.map((d) => d[metric]));
  const colors = {
    earnings: {
      bar: "bg-blue-500",
      hover: "hover:bg-blue-600",
      label: "bg-blue-100 text-blue-700",
    },
    trips: {
      bar: "bg-violet-500",
      hover: "hover:bg-violet-600",
      label: "bg-violet-100 text-violet-700",
    },
    passengers: {
      bar: "bg-emerald-500",
      hover: "hover:bg-emerald-600",
      label: "bg-emerald-100 text-emerald-700",
    },
  };
  const c = colors[metric];
  const fmt = (v: number) =>
    metric === "earnings" ? `₦${(v / 1000).toFixed(0)}k` : `${v}`;

  return (
    <div className="flex items-end justify-between gap-2 h-32">
      {data.map((d, i) => {
        const pct = max > 0 ? (d[metric] / max) * 100 : 0;
        return (
          <div
            key={i}
            className="flex-1 flex flex-col items-center gap-1 group"
          >
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity ${c.label}`}
            >
              {fmt(d[metric])}
            </span>
            <div
              className="w-full bg-slate-100 rounded-t-lg overflow-hidden flex flex-col justify-end"
              style={{ height: "80px" }}
            >
              <div
                className={`w-full ${c.bar} ${c.hover} rounded-t-lg transition-all duration-700 cursor-pointer`}
                style={{ height: `${pct}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 font-medium">
              {d.month}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Category rating bar ──────────────────────────────────────────────────────

function CategoryBar({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: string;
}) {
  const pct = (value / 5) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-[15px] w-6 text-center flex-shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[12px] font-medium text-slate-600">
            {label}
          </span>
          <span className="text-[12px] font-bold text-slate-800">
            {value.toFixed(1)}
          </span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Review Card ──────────────────────────────────────────────────────────────

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 hover:border-blue-200 hover:shadow-sm transition-all duration-150">
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`w-10 h-10 rounded-full ${review.color} flex items-center justify-center font-bold text-[12px] text-white flex-shrink-0 shadow-sm`}
        >
          {review.initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="font-semibold text-[13px] text-slate-800">
                {review.name}
              </div>
              <div className="text-[11px] text-slate-400">
                {review.route} · {review.date}
              </div>
            </div>
            <StarRating rating={review.rating} />
          </div>
        </div>
      </div>
      <p className="text-[12px] text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
        "{review.comment}"
      </p>
    </div>
  );
}

// ─── Metric Toggle ────────────────────────────────────────────────────────────

function MetricToggle({
  value,
  onChange,
}: {
  value: "earnings" | "trips" | "passengers";
  onChange: (v: "earnings" | "trips" | "passengers") => void;
}) {
  return (
    <div className="flex bg-slate-100 rounded-xl p-0.5 gap-0.5">
      {[
        { key: "earnings" as const, label: "Earnings" },
        { key: "trips" as const, label: "Trips" },
        { key: "passengers" as const, label: "Passengers" },
      ].map((m) => (
        <button
          key={m.key}
          onClick={() => onChange(m.key)}
          className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all
            ${
              value === m.key
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}

// ─── Section Card ─────────────────────────────────────────────────────────────

function SectionCard({
  title,
  icon,
  right,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div
          className="text-[14px] font-bold text-slate-800 flex items-center gap-2"
          style={{ fontFamily: "'Syne',sans-serif" }}
        >
          {icon}
          {title}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function DriverPerformance() {
  const [period, setPeriod] = useState<Period>("30d");
  const [chartMetric, setChartMetric] = useState<
    "earnings" | "trips" | "passengers"
  >("earnings");

  const chartData = period === "7d" ? WEEKLY_EARNINGS : MONTHLY_EARNINGS;

  const totalEarnings = MONTHLY_EARNINGS.reduce((s, d) => s + d.earnings, 0);
  const totalTrips = MONTHLY_EARNINGS.reduce((s, d) => s + d.trips, 0);
  const totalPassengers = MONTHLY_EARNINGS.reduce(
    (s, d) => s + d.passengers,
    0
  );
  const avgRating = 4.9;
  const totalReviews = RATING_BREAKDOWN.reduce((s, r) => s + r.count, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
        .perf-root * { box-sizing: border-box; }
        .perf-root { font-family: 'DM Sans', sans-serif; background: #f8fafc; color: #1e293b; min-height: 100vh; }
        .perf-root ::-webkit-scrollbar { width: 4px; }
        .perf-root ::-webkit-scrollbar-track { background: transparent; }
        .perf-root ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .fade-in { animation: fadeIn 0.3s ease-out both; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <div className="perf-root">
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
                    d="M18 20V10M12 20V4M6 20v-6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Performance
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Track your earnings, ratings and trip analytics
              </p>
            </div>

            {/* Period selector */}
            <div className="flex bg-white border border-slate-200 rounded-xl p-1 gap-1 shadow-sm">
              {[
                { key: "7d" as Period, label: "7 Days" },
                { key: "30d" as Period, label: "30 Days" },
                { key: "all" as Period, label: "All Time" },
              ].map((p) => (
                <button
                  key={p.key}
                  onClick={() => setPeriod(p.key)}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all
                    ${
                      period === p.key
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-700"
                    }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── KPI Stats ────────────────────────────────────── */}
          <div className="grid grid-cols-4 gap-3 mb-6 fade-in">
            {[
              {
                label: "Total Earned",
                value: `₦${totalEarnings.toLocaleString()}`,
                sub: "+18% vs last month",
                color: "from-blue-50 to-white border-blue-100",
                vcolor: "text-blue-600",
                trend: "up",
              },
              {
                label: "Trips Completed",
                value: totalTrips,
                sub: "+4 vs last month",
                color: "from-violet-50 to-white border-violet-100",
                vcolor: "text-violet-600",
                trend: "up",
              },
              {
                label: "Passengers Moved",
                value: totalPassengers,
                sub: "+12 vs last month",
                color: "from-emerald-50 to-white border-emerald-100",
                vcolor: "text-emerald-600",
                trend: "up",
              },
              {
                label: "Overall Rating",
                value: avgRating,
                sub: `${totalReviews} reviews`,
                color: "from-amber-50 to-white border-amber-100",
                vcolor: "text-amber-600",
                trend: "up",
              },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`rounded-2xl border bg-gradient-to-br ${s.color} px-4 py-4 fade-in`}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[12px] text-slate-400 font-medium">
                    {s.label}
                  </span>
                  <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-500 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">
                    <svg
                      className="w-2.5 h-2.5"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M18 15l-6-6-6 6"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    Up
                  </span>
                </div>
                <div
                  className={`font-black text-[26px] leading-none mb-0.5 ${s.vcolor}`}
                  style={{ fontFamily: "'Syne',sans-serif" }}
                >
                  {s.value}
                </div>
                <div className="text-[11px] text-slate-400">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* ── Earnings Chart + Rating Overview ─────────────── */}
          <div className="grid grid-cols-[1fr_320px] gap-5 mb-5">
            {/* Bar chart */}
            <SectionCard
              title="Earnings Overview"
              icon={
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M18 20V10M12 20V4M6 20v-6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              }
              right={
                <MetricToggle value={chartMetric} onChange={setChartMetric} />
              }
            >
              <BarChart data={chartData} metric={chartMetric} />
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                {[
                  {
                    label: "Best month",
                    value: "Feb 2026",
                    sub: "₦43,000 earned",
                  },
                  {
                    label: "Avg / month",
                    value: `₦${Math.round(
                      totalEarnings / MONTHLY_EARNINGS.length
                    ).toLocaleString()}`,
                    sub: "Over 6 months",
                  },
                  { label: "Best day", value: "Friday", sub: "Most trips run" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-[11px] text-slate-400 mb-0.5">
                      {s.label}
                    </div>
                    <div
                      className="font-bold text-[14px] text-slate-800"
                      style={{ fontFamily: "'Syne',sans-serif" }}
                    >
                      {s.value}
                    </div>
                    <div className="text-[11px] text-slate-400">{s.sub}</div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Rating overview */}
            <SectionCard
              title="Rating Overview"
              icon={
                <svg
                  className="w-4 h-4 text-amber-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              }
            >
              {/* Big ring + number */}
              <div className="flex items-center gap-5 mb-5">
                <PerformanceRing rating={4.9} size={88} />
                <div>
                  <div
                    className="font-black text-[36px] leading-none text-slate-900 mb-1"
                    style={{ fontFamily: "'Syne',sans-serif" }}
                  >
                    4.9
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    <StarRating rating={5} size="md" />
                  </div>
                  <div className="text-[12px] text-slate-400">
                    {totalReviews} total reviews
                  </div>
                </div>
              </div>

              {/* Star breakdown */}
              <div className="space-y-2">
                {RATING_BREAKDOWN.map((r) => (
                  <div key={r.stars} className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-500 w-6 text-right flex-shrink-0">
                      {r.stars}★
                    </span>
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          r.stars >= 4
                            ? "bg-amber-400"
                            : r.stars === 3
                            ? "bg-slate-300"
                            : "bg-red-300"
                        }`}
                        style={{ width: `${r.pct}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-slate-400 w-6 flex-shrink-0">
                      {r.count}
                    </span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* ── Category Ratings + Top Routes ─────────────────── */}
          <div className="grid grid-cols-2 gap-5 mb-5">
            {/* Category ratings */}
            <SectionCard
              title="Category Ratings"
              icon={
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              }
            >
              <div className="space-y-4">
                {CATEGORY_RATINGS.map((c) => (
                  <CategoryBar key={c.label} {...c} />
                ))}
              </div>
            </SectionCard>

            {/* Top routes */}
            <SectionCard
              title="Top Routes"
              icon={
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M3 12h18M3 6h18M3 18h18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              }
            >
              <div className="space-y-3">
                {TOP_ROUTES.map((r, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-slate-400 w-4 flex-shrink-0">
                      #{i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[13px] mb-1">
                        <span className="font-semibold text-blue-600 truncate">
                          {r.from}
                        </span>
                        <svg
                          className="w-3 h-3 text-slate-400 flex-shrink-0"
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
                        <span className="font-semibold text-slate-700 truncate">
                          {r.to}
                        </span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-700"
                          style={{ width: `${r.pct}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-[12px] font-bold text-slate-700">
                        {r.trips} trips
                      </div>
                      <div className="text-[11px] text-slate-400">
                        ₦{r.earnings.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* ── Reviews ───────────────────────────────────────── */}
          <SectionCard
            title="Passenger Reviews"
            icon={
              <svg
                className="w-4 h-4 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            }
            right={
              <span className="text-[12px] text-slate-400">
                {totalReviews} reviews · avg{" "}
                <span className="font-bold text-amber-500">4.9 ★</span>
              </span>
            }
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
              {REVIEWS.map((r, i) => (
                <div
                  key={r.id}
                  className="fade-in"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <ReviewCard review={r} />
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </>
  );
}
