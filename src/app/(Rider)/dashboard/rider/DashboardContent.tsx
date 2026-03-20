"use client";

import { useEffect } from "react";
import { Icons } from "./Icons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectRiderUser,
  selectRiderIsVerified,
  selectToken,
} from "@/store/slices/authSlice";
import { getBookedTrips, Booking } from "@/lib/api";
import {
  setBookedTrips,
  setBookedTripsLoading,
  selectBookedTrips,
  selectBookedTripsLoading,
} from "@/store/slices/bookingSlice";

export default function DashboardContent() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);
  const riderUser = useAppSelector(selectRiderUser);
  const isVerified = useAppSelector(selectRiderIsVerified);
  const bookings = useAppSelector(selectBookedTrips);
  const isLoading = useAppSelector(selectBookedTripsLoading);

  // ── Fetch booked trips on mount ───────────────────────────
  useEffect(() => {
    if (!token) return;
    const load = async () => {
      dispatch(setBookedTripsLoading(true));
      try {
        const result = await getBookedTrips(token);
        dispatch(setBookedTrips(result.data.bookings));
      } catch (_) {
        // silently fail
      } finally {
        dispatch(setBookedTripsLoading(false));
      }
    };
    load();
  }, [token, dispatch]);

  // ── Derived stats ──────────────────────────────────────────
  const totalBookings = bookings.length;
  const upcomingBookings = bookings.filter(
    (b) => b.trip.status === "scheduled" || b.trip.status === "active"
  );
  const completedBookings = bookings.filter(
    (b) => b.trip.status === "completed"
  );

  // Favourite route — most repeated origin → destination pair
  const routeCounts: Record<string, number> = {};
  bookings.forEach((b) => {
    const key = `${b.trip.origin.city} → ${b.trip.destination.city}`;
    routeCounts[key] = (routeCounts[key] ?? 0) + 1;
  });
  const favouriteRoute =
    Object.entries(routeCounts).sort((a, b) => b[1] - a[1])[0] ?? null;

  // Emergency contact
  const emergencyContact = riderUser?.emergencyContact ?? null;

  const stats = [
    {
      label: "Total Trips",
      value: totalBookings.toString(),
      sub:
        totalBookings === 0
          ? "No trips yet"
          : `${completedBookings.length} completed`,
      icon: "Bus",
      accent: "blue",
    },
    {
      label: "Upcoming",
      value: upcomingBookings.length.toString(),
      sub:
        upcomingBookings.length === 0
          ? "No upcoming trips"
          : `${upcomingBookings.length} scheduled`,
      icon: "Star",
      accent: "amber",
    },
    {
      label: "Favourite Route",
      value: favouriteRoute ? favouriteRoute[0] : "—",
      sub: favouriteRoute ? `Travelled ${favouriteRoute[1]}x` : "No trips yet",
      icon: "MapPin",
      accent: "indigo",
    },
    {
      label: "Safety Score",
      value: isVerified ? "100%" : "—",
      sub: isVerified ? "Account verified" : "Not yet verified",
      icon: "Shield",
      accent: "emerald",
    },
  ];

  const accents: Record<string, string> = {
    blue: "from-blue-600/20 to-blue-600/5 border-blue-500/20 text-blue-400",
    amber:
      "from-amber-500/20 to-amber-500/5 border-amber-500/20 text-amber-400",
    indigo:
      "from-indigo-500/20 to-indigo-500/5 border-indigo-500/20 text-indigo-400",
    emerald:
      "from-emerald-500/20 to-emerald-500/5 border-emerald-500/20 text-emerald-400",
  };

  const iconBg: Record<string, string> = {
    blue: "bg-blue-600/20 text-blue-400",
    amber: "bg-amber-500/20 text-amber-400",
    indigo: "bg-indigo-500/20 text-indigo-400",
    emerald: "bg-emerald-500/20 text-emerald-400",
  };

  return (
    <>
      {/* ── Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = Icons[stat.icon as keyof typeof Icons];
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
              <p className="display-font text-white text-2xl font-bold leading-none mb-1 truncate">
                {isLoading ? "—" : stat.value}
              </p>
              <p className="text-slate-500 text-xs flex items-center gap-1">
                <Icons.TrendingUp />
                {isLoading ? "Loading..." : stat.sub}
              </p>
            </div>
          );
        })}
      </div>

      {/* ── Bottom section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* ── Upcoming Trips ── */}
        <div className="lg:col-span-3 bg-slate-900/60 border border-white/5 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <h2 className="display-font font-semibold text-white text-base">
              Upcoming Trips
            </h2>
            <button className="text-blue-400 text-sm font-medium flex items-center gap-1 hover:text-blue-300 transition-colors">
              View all <Icons.ArrowRight />
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-14 gap-3 text-slate-500">
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeOpacity="0.3"
                />
                <path
                  d="M12 2a10 10 0 0110 10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-sm">Loading trips...</span>
            </div>
          ) : upcomingBookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-14 text-center px-6">
              <div className="w-12 h-12 rounded-xl bg-slate-800/60 border border-white/5 flex items-center justify-center mb-4 opacity-50">
                <Icons.Bus />
              </div>
              <p className="text-slate-500 text-sm font-semibold mb-1">
                No upcoming trips
              </p>
              <p className="text-slate-600 text-xs max-w-xs">
                Book a trip from the Find a Ride section to see it here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {upcomingBookings.slice(0, 3).map((booking: Booking) => {
                const trip = booking.trip;
                const dep = new Date(trip.departureTime);
                const dateNum = dep.getDate().toString();
                const monthShort = dep
                  .toLocaleDateString("en-GB", { month: "short" })
                  .toUpperCase();
                const timeStr = dep.toLocaleTimeString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                const vehicleLabel = `${trip.vehicle.make} ${trip.vehicle.model}`;
                const driverName = `${trip.driver.personalInfo.firstName} ${trip.driver.personalInfo.lastName}`;
                const isActive = trip.status === "active";
                const bookingStatusColor =
                  booking.status === "confirmed"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : booking.status === "pending"
                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    : "bg-slate-500/20 text-slate-400 border border-slate-500/30";

                return (
                  <div
                    key={booking._id}
                    className="trip-row flex items-start gap-4 px-6 py-5 cursor-pointer"
                  >
                    {/* Date block */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-blue-600/20 border border-blue-500/20 flex flex-col items-center justify-center">
                      <span className="display-font text-blue-400 text-xl font-bold leading-none">
                        {dateNum}
                      </span>
                      <span className="text-blue-400/70 text-[10px] font-semibold tracking-widest">
                        {monthShort}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-white font-semibold text-sm capitalize truncate">
                          {trip.origin.city}
                        </p>
                        <span className="text-slate-500">→</span>
                        <p className="text-white font-semibold text-sm capitalize truncate">
                          {trip.destination.city}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400 text-xs flex-wrap">
                        <span className="flex items-center gap-1">
                          <Icons.Clock />
                          Dep. {timeStr}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icons.User />
                          {driverName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icons.Bus />
                          {vehicleLabel}
                        </span>
                        <span className="text-blue-400 font-semibold">
                          ₦{booking.totalPrice.toLocaleString()}
                        </span>
                        <span className="text-slate-500">
                          {booking.seatsBooked} seat
                          {booking.seatsBooked > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>

                    {/* Booking status badge */}
                    <span
                      className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium capitalize ${bookingStatusColor}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Right column ── */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* ── Recent Routes ── */}
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
              {isLoading ? (
                <div className="px-2 py-4 text-center text-slate-600 text-xs">
                  Loading routes...
                </div>
              ) : Object.keys(routeCounts).length === 0 ? (
                <div className="px-2 py-4 text-center text-slate-600 text-xs">
                  Your recent routes will appear here after your first trip.
                </div>
              ) : (
                Object.keys(routeCounts)
                  .sort((a, b) => routeCounts[b] - routeCounts[a])
                  .slice(0, 3)
                  .map((route, i) => (
                    <button
                      key={i}
                      className="quick-route w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 text-sm text-white font-medium border border-white/5 hover:border-blue-500/30"
                    >
                      <span className="flex items-center gap-2 text-slate-300 capitalize">
                        <Icons.MapPin />
                        {route}
                      </span>
                      <span className="text-blue-400">
                        <Icons.ChevronRight />
                      </span>
                    </button>
                  ))
              )}
            </div>
          </div>

          {/* ── Emergency Contact ── */}
          <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-5">
            <h2 className="display-font font-semibold text-white text-base flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center text-red-400">
                <Icons.Shield />
              </span>
              Emergency Contact
            </h2>

            {emergencyContact ? (
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-sm font-bold flex-shrink-0 text-white">
                  {emergencyContact.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">
                    {emergencyContact.name}
                  </p>
                  <p className="text-slate-400 text-xs mb-1">
                    {emergencyContact.relationship} · {emergencyContact.phone}
                  </p>
                  <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-medium">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
                    Trip details auto-shared
                  </span>
                </div>
                <button className="ml-auto flex-shrink-0 w-8 h-8 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 flex items-center justify-center transition-colors">
                  <Icons.PhoneCall />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center rounded-xl bg-white/5 border border-white/5 border-dashed">
                <p className="text-slate-500 text-sm font-semibold mb-1">
                  No emergency contact
                </p>
                <p className="text-slate-600 text-xs max-w-[200px]">
                  Add one in the Emergency Contacts section to keep loved ones
                  informed.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
