import { Icons } from "./Icons";

const stats = [
  {
    label: "Total Trips",
    value: "14",
    sub: "+2 this month",
    icon: "Bus",
    accent: "blue",
  },
  {
    label: "Upcoming",
    value: "2",
    sub: "Next trip in 3 days",
    icon: "Star",
    accent: "amber",
  },
  {
    label: "Favourite Route",
    value: "Lagos → Abuja",
    sub: "Travelled 7 times",
    icon: "MapPin",
    accent: "indigo",
  },
  {
    label: "Safety Score",
    value: "100%",
    sub: "All trips shared",
    icon: "Shield",
    accent: "emerald",
  },
];

const upcomingTrips = [
  {
    id: 1,
    from: "Lagos (Jibowu)",
    to: "Abuja (Utako)",
    date: "28",
    month: "FEB",
    time: "6:00 AM",
    driver: "Emeka O.",
    price: "₦5,000",
    status: "Confirmed",
    statusColor:
      "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  },
  {
    id: 2,
    from: "Abuja (Utako)",
    to: "Port Harcourt",
    date: "12",
    month: "MAR",
    time: "7:30 AM",
    driver: "Chidi N.",
    price: "₦6,500",
    status: "Pending Call",
    statusColor: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  },
];

const quickRoutes = ["Lagos → Abuja", "Lagos → Port Harcourt", "Abuja → Enugu"];

export default function DashboardContent() {
  return (
    <>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = Icons[stat.icon as keyof typeof Icons];
          const accents: { [key: string]: string } = {
            blue: "from-blue-600/20 to-blue-600/5 border-blue-500/20 text-blue-400",
            amber:
              "from-amber-500/20 to-amber-500/5 border-amber-500/20 text-amber-400",
            indigo:
              "from-indigo-500/20 to-indigo-500/5 border-indigo-500/20 text-indigo-400",
            emerald:
              "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20 text-emerald-400",
          };
          const iconBg: { [key: string]: string } = {
            blue: "bg-blue-600/20 text-blue-400",
            amber: "bg-amber-500/20 text-amber-400",
            indigo: "bg-indigo-500/20 text-indigo-400",
            emerald: "bg-emerald-500/20 text-emerald-400",
          };
          return (
            <div
              key={i}
              className={`stat-card shimmer-border p-5 rounded-2xl bg-gradient-to-br ${
                accents[stat.accent]
              } border`}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wide">
                  {stat.label}
                </p>
                <div
                  className={`w-8 h-8 rounded-lg ${
                    iconBg[stat.accent]
                  } flex items-center justify-center`}
                >
                  <Icon />
                </div>
              </div>
              <p className="display-font text-white text-2xl font-bold leading-none mb-1">
                {stat.value}
              </p>
              <p className="text-slate-500 text-xs flex items-center gap-1">
                <Icons.TrendingUp />
                {stat.sub}
              </p>
            </div>
          );
        })}
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Upcoming Trips */}
        <div className="lg:col-span-3 bg-slate-900/60 border border-white/5 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <h2 className="display-font font-semibold text-white text-base">
              Upcoming Trips
            </h2>
            <button className="text-blue-400 text-sm font-medium flex items-center gap-1 hover:text-blue-300 transition-colors">
              View all <Icons.ArrowRight />
            </button>
          </div>
          <div className="divide-y divide-white/5">
            {upcomingTrips.map((trip) => (
              <div
                key={trip.id}
                className="trip-row flex items-start gap-4 px-6 py-5 cursor-pointer"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-blue-600/20 border border-blue-500/20 flex flex-col items-center justify-center">
                  <span className="display-font text-blue-400 text-xl font-bold leading-none">
                    {trip.date}
                  </span>
                  <span className="text-blue-400/70 text-[10px] font-semibold tracking-widest">
                    {trip.month}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-semibold text-sm">
                      {trip.from}
                    </p>
                    <span className="text-slate-500">→</span>
                    <p className="text-white font-semibold text-sm">
                      {trip.to}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 text-xs">
                    <span className="flex items-center gap-1">
                      <Icons.Clock />
                      Dep. {trip.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icons.User />
                      Driver: {trip.driver}
                    </span>
                    <span className="text-blue-400 font-semibold">
                      {trip.price}
                    </span>
                  </div>
                </div>
                <span
                  className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium ${trip.statusColor}`}
                >
                  {trip.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Quick Book */}
          <div className="bg-slate-900/60 border border-white/5 rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/5">
              <h2 className="display-font font-semibold text-white text-base flex items-center gap-2">
                <span className="text-amber-400">
                  <Icons.Zap />
                </span>
                Quick Book
              </h2>
              <p className="text-slate-500 text-xs mt-0.5 uppercase tracking-wider font-medium">
                Recent Routes
              </p>
            </div>
            <div className="p-3 flex flex-col gap-2">
              {quickRoutes.map((route, i) => (
                <button
                  key={i}
                  className="quick-route w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 text-sm text-white font-medium border border-white/5 hover:border-blue-500/30"
                >
                  <span className="flex items-center gap-2 text-slate-300">
                    <Icons.MapPin />
                    {route}
                  </span>
                  <span className="text-blue-400">
                    <Icons.ChevronRight />
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-5">
            <h2 className="display-font font-semibold text-white text-base flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                <Icons.Shield />
              </span>
              Emergency Contact
            </h2>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                C
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  Chioma Adeyemi
                </p>
                <p className="text-slate-400 text-xs mb-1">
                  Sister · +234 802 344 5678
                </p>
                <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-medium">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block"></span>
                  Trip details auto-shared
                </span>
              </div>
              <button className="ml-auto flex-shrink-0 w-8 h-8 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 flex items-center justify-center transition-colors">
                <Icons.PhoneCall />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
