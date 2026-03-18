"use client";

import { useState, useEffect } from "react";
import {
  FiMapPin, FiClock, FiUsers, FiPhone, FiBookmark, FiSearch,
  FiCalendar, FiStar, FiChevronDown, FiAlertCircle,
  FiCheckCircle, FiArrowRight, FiMessageCircle, FiMail, FiTruck,
} from "react-icons/fi";
import { BsWhatsapp, BsPhoneFill } from "react-icons/bs";
import { PiSeatFill } from "react-icons/pi";
import { RiShieldCheckLine } from "react-icons/ri";
import { TbRoute } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setSearchResults, setSearchLoading, setSearchError,
  setLastSearch, clearSearchResults,
  setSelectedTrip, setContactedTrip, setConfirmedTrip, resetBookingFlow,
  selectSearchResults, selectSearchLoading, selectSearchError,
  selectSelectedTrip, selectContactedTrip,
} from "@/store/slices/bookingSlice";
import { selectToken, selectRiderUser } from "@/store/slices/authSlice";
import { searchTrips, getAvailableTrips, Trip, TripVehicle } from "@/lib/api";

// ─── Types ────────────────────────────────────────────────────────────────────

type Filter = "all" | "price" | "earliest" | "seats";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const AVATAR_GRADIENTS = [
  "from-blue-600/30 to-blue-900/60",
  "from-indigo-600/30 to-indigo-900/60",
  "from-amber-600/30 to-amber-900/60",
  "from-emerald-600/30 to-emerald-900/60",
  "from-violet-600/30 to-violet-900/60",
  "from-rose-600/30 to-rose-900/60",
];

function getAvatarGradient(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = id.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
}

function getDriverInitials(driverId: string) {
  return driverId.slice(-2).toUpperCase();
}

function getVehicleLabel(vehicle: TripVehicle | string): string {
  if (typeof vehicle === "object") return `${vehicle.make} ${vehicle.model}`;
  return "Vehicle";
}

function getVehiclePlate(vehicle: TripVehicle | string): string {
  if (typeof vehicle === "object") return vehicle.plateNumber;
  return "";
}

function getVehicleColor(vehicle: TripVehicle | string): string {
  if (typeof vehicle === "object") return vehicle.color;
  return "";
}

function formatDepTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

function formatDepDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// ─── SeatIndicator ────────────────────────────────────────────────────────────

function SeatIndicator({ total, left }: { total: number; left: number }) {
  const taken = total - left;
  return (
    <div className="flex gap-1 flex-wrap mt-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          title={i < taken ? "Taken" : "Available"}
          className={`w-6 h-6 rounded-md flex items-center justify-center transition-all ${
            i < taken
              ? "bg-red-500/15 text-red-400 border border-red-500/20"
              : "bg-blue-600/20 text-blue-400 border border-blue-500/20"
          }`}
        >
          {i < taken
            ? <span className="text-[9px] font-bold leading-none">✕</span>
            : <PiSeatFill size={11} />
          }
        </div>
      ))}
    </div>
  );
}

// ─── SelectField (passengers only) ───────────────────────────────────────────

function SelectField({ label, value, onChange, children, icon }: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none flex">{icon}</span>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-800/80 border border-white/5 rounded-xl pl-9 pr-8 py-2.5 text-[13px] text-white focus:outline-none focus:border-blue-500/40 transition-colors appearance-none"
        >
          {children}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none flex">
          <FiChevronDown size={13} />
        </span>
      </div>
    </div>
  );
}

// ─── TripCard ─────────────────────────────────────────────────────────────────

function TripCard({ trip, selected, onSelect, onContact }: {
  trip: Trip;
  selected: boolean;
  onSelect: () => void;
  onContact: () => void;
}) {
  const isAlmostFull = trip.availableSeats === 1;
  const isFull = trip.availableSeats === 0;
  const initials = getDriverInitials(trip.driver);
  const avatarBg = getAvatarGradient(trip._id);
  const vehicleLabel = getVehicleLabel(trip.vehicle);
  const vehicleColor = getVehicleColor(trip.vehicle);
  const plate = getVehiclePlate(trip.vehicle);
  const depTime = formatDepTime(trip.departureTime);
  const depDate = formatDepDate(trip.departureTime);

  return (
    <div
      onClick={onSelect}
      className={`relative rounded-2xl border p-5 cursor-pointer transition-all duration-200 ease-out ${
        selected
          ? "border-blue-500/40 bg-slate-900/60 shadow-lg shadow-blue-500/5"
          : "border-white/5 bg-slate-900/60 hover:border-white/10 hover:bg-slate-800/50"
      }`}
    >
      {selected && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-t-2xl" />
      )}

      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${avatarBg} flex items-center justify-center font-bold text-sm text-blue-300 border-2 ${selected ? "border-blue-500/40" : "border-white/10"} transition-colors`}>
            {initials}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border-2 border-[#0f172a]">
            <FiCheckCircle size={8} className="text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0">
          {/* Route */}
          <div className="flex items-center gap-1.5 text-[13px] mb-1.5">
            <FiMapPin size={12} className="text-slate-500 flex-shrink-0" />
            <span className="text-slate-300 font-semibold truncate capitalize">{trip.origin.city}</span>
            <FiArrowRight size={13} className="text-blue-400 flex-shrink-0" />
            <span className="text-blue-400 font-semibold truncate capitalize">{trip.destination.city}</span>
          </div>

          {/* Address */}
          <p className="text-[11px] text-slate-600 truncate mb-2">{trip.origin.address}</p>

          {/* Meta */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2">
            <span className="flex items-center gap-1.5 text-[12px] text-slate-400">
              <FiClock size={11} className="text-slate-500" />
              {depDate} · {depTime}
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-slate-400">
              <FiTruck size={11} className="text-slate-500" />
              {vehicleLabel}{vehicleColor ? ` · ${vehicleColor}` : ""}
            </span>
            {plate && <span className="text-[12px] text-slate-500">{plate}</span>}
            {trip.stops.length > 0 && (
              <span className="flex items-center gap-1.5 text-[12px] text-slate-400">
                <FiMapPin size={11} className="text-slate-500" />
                {trip.stops.length} stop{trip.stops.length > 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Preference chips */}
          <div className="flex flex-wrap gap-1.5">
            {trip.preferences.instantBooking && (
              <span className="text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full">⚡ Instant</span>
            )}
            {trip.preferences.smokingAllowed && (
              <span className="text-[10px] font-semibold bg-white/5 text-slate-500 border border-white/5 px-2 py-0.5 rounded-full">🚬 Smoking OK</span>
            )}
            {trip.preferences.petsAllowed && (
              <span className="text-[10px] font-semibold bg-white/5 text-slate-500 border border-white/5 px-2 py-0.5 rounded-full">🐾 Pets OK</span>
            )}
            <span className="text-[10px] font-semibold bg-white/5 text-slate-500 border border-white/5 px-2 py-0.5 rounded-full">
              🧳 {trip.preferences.luggagePolicy}
            </span>
          </div>

          {trip.description && (
            <p className="text-[12px] text-slate-500 mt-1.5 italic truncate">"{trip.description}"</p>
          )}

          {/* Stops when selected */}
          {selected && trip.stops.length > 0 && (
            <div className="mt-3 space-y-1">
              <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Stops</span>
              {trip.stops.map((stop, i) => (
                <div key={stop._id ?? i} className="flex items-center gap-2 text-[12px] text-slate-400">
                  <div className="w-4 h-4 rounded-full bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-[8px] font-bold text-amber-400 flex-shrink-0">{i + 1}</div>
                  <span className="truncate">{stop.address}</span>
                </div>
              ))}
            </div>
          )}

          {/* Seat map when selected */}
          {selected && (
            <div className="mt-3">
              <span className="text-[11px] text-slate-500 font-medium uppercase tracking-wider">Seat availability</span>
              <SeatIndicator total={trip.totalSeats} left={trip.availableSeats} />
            </div>
          )}
        </div>

        {/* Right col */}
        <div className="flex flex-col items-end gap-2 flex-shrink-0 ml-1">
          <div className="text-right">
            <div className="font-bold text-[22px] text-blue-400 leading-none" style={{ fontFamily: "'Syne', sans-serif" }}>
              ₦{trip.pricePerSeat.toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">per person</div>
          </div>

          <div className={`text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${
            isAlmostFull
              ? "bg-red-500/15 text-red-400 border border-red-500/20"
              : isFull
              ? "bg-white/5 text-slate-500 border border-white/5"
              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          }`}>
            {isAlmostFull ? "⚡ 1 left" : isFull ? "Full" : `${trip.availableSeats} seats left`}
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); onContact(); }}
            disabled={isFull}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-semibold transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed ${
              selected
                ? "bg-blue-600 text-white hover:bg-blue-500 shadow-md shadow-blue-600/25 hover:-translate-y-0.5"
                : "bg-blue-600/20 text-blue-400 border border-blue-500/20 hover:bg-blue-600/30 hover:border-blue-500/30"
            }`}
          >
            <FiPhone size={12} />
            {isFull ? "Full" : "Contact"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ContactPanel ─────────────────────────────────────────────────────────────

function ContactPanel({ trip, passengers, onConfirm }: {
  trip: Trip;
  passengers: number;
  onConfirm: () => void;
}) {
  const [shared, setShared] = useState(false);
  const riderUser = useAppSelector(selectRiderUser);
  const total = trip.pricePerSeat * passengers;
  const refNum = `BR-${trip._id.slice(-6).toUpperCase()}`;
  const vehicleLabel = getVehicleLabel(trip.vehicle);
  const plate = getVehiclePlate(trip.vehicle);
  const avatarBg = getAvatarGradient(trip._id);
  const initials = getDriverInitials(trip.driver);
  const depTime = formatDepTime(trip.departureTime);
  const depDate = formatDepDate(trip.departureTime);

  return (
    <div className="flex flex-col gap-4">
      {/* Driver contact */}
      <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/10 to-blue-600/5 p-5">
        <div className="flex items-center gap-1.5 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse inline-block" />
          <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-widest">Driver Details</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-shrink-0">
            <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${avatarBg} flex items-center justify-center font-bold text-sm text-blue-300 border-2 border-blue-500/30`}>
              {initials}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border-2 border-[#0f172a]">
              <FiCheckCircle size={8} className="text-white" strokeWidth={3} />
            </div>
          </div>
          <div>
            <div className="font-semibold text-[14px] text-white">
              Driver · {trip.driver.slice(-6).toUpperCase()}
            </div>
            <div className="text-[12px] text-slate-500">
              {vehicleLabel}{plate ? ` · ${plate}` : ""}
            </div>
          </div>
        </div>
        <div className="font-bold text-[22px] tracking-wide text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
          +234 803 XXX XXXX
        </div>
        <div className="font-mono text-[11px] text-slate-500 bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg inline-block tracking-wider">
          REF: {refNum}
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button className="flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold text-[13px] py-2.5 rounded-xl hover:bg-blue-500 transition-all hover:-translate-y-0.5 shadow-md shadow-blue-600/20">
            <BsPhoneFill size={13} />Call Driver
          </button>
          <button className="flex items-center justify-center gap-2 bg-white/5 text-slate-300 font-medium text-[13px] py-2.5 rounded-xl border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all">
            <FiBookmark size={13} />Save Contact
          </button>
        </div>
      </div>

      {/* Booking summary */}
      <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-4">
        <p className="text-[12px] font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2" style={{ fontFamily: "'Syne', sans-serif" }}>
          <TbRoute size={14} className="text-blue-400" />Booking Summary
        </p>
        <div className="flex flex-col gap-2">
          {[
            ["Route", `${trip.origin.city} → ${trip.destination.city}`],
            ["Pickup", trip.origin.address],
            ["Date & Time", `${depDate} · ${depTime}`],
            ["Passengers", `${passengers} person${passengers > 1 ? "s" : ""}`],
            ["Vehicle", `${vehicleLabel}${plate ? ` · ${plate}` : ""}`],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between items-start text-[13px] gap-3">
              <span className="text-slate-500 flex-shrink-0">{label}</span>
              <span className="text-slate-300 font-medium text-right capitalize truncate max-w-[180px]">{value}</span>
            </div>
          ))}
          <div className="border-t border-white/5 mt-1 pt-2 flex justify-between items-center">
            <span className="text-[13px] text-slate-500">Total (cash)</span>
            <span className="font-bold text-[18px] text-blue-400" style={{ fontFamily: "'Syne', sans-serif" }}>
              ₦{total.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Share trip */}
      <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-4">
        <p className="text-[12px] font-semibold text-white uppercase tracking-wider mb-1 flex items-center gap-2" style={{ fontFamily: "'Syne', sans-serif" }}>
          <RiShieldCheckLine size={14} className="text-emerald-400" />Share Trip Details
        </p>
        <p className="text-[12px] text-slate-500 mb-3">
          {riderUser?.emergencyContact
            ? `Auto-share to ${riderUser.emergencyContact.name} (${riderUser.emergencyContact.relationship})`
            : "Share with your emergency contact"}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: <BsWhatsapp size={15} />, label: "WhatsApp" },
            { icon: <FiMessageCircle size={15} />, label: "SMS" },
            { icon: <FiMail size={15} />, label: "Email" },
          ].map(({ icon, label }) => (
            <button
              key={label}
              onClick={() => setShared(true)}
              className={`flex flex-col items-center gap-1.5 py-2.5 rounded-xl border text-[11px] font-medium transition-all ${
                shared
                  ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                  : "border-white/5 bg-white/5 text-slate-400 hover:border-blue-500/30 hover:bg-blue-600/10 hover:text-blue-400"
              }`}
            >
              {icon}{label}
            </button>
          ))}
        </div>
        {shared && (
          <div className="mt-2 flex items-center justify-center gap-1.5 text-[11px] text-emerald-400">
            <FiCheckCircle size={11} />Trip details shared
          </div>
        )}
      </div>

      {/* Confirm */}
      <button
        onClick={onConfirm}
        className="w-full bg-blue-600 text-white font-bold text-[14px] py-3.5 rounded-2xl hover:bg-blue-500 transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        <FiCheckCircle size={16} />Confirm Booking
      </button>
    </div>
  );
}

// ─── ConfirmedState ───────────────────────────────────────────────────────────

function ConfirmedState({ trip, onReset }: { trip: Trip; onReset: () => void }) {
  const depDate = formatDepDate(trip.departureTime);
  const depTime = formatDepTime(trip.departureTime);
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-5">
      <div className="w-16 h-16 rounded-full bg-blue-600/20 border border-blue-500/20 flex items-center justify-center mb-5 animate-bounce">
        <FiCheckCircle size={32} className="text-blue-400" />
      </div>
      <p className="font-bold text-[20px] text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
        Booking Confirmed!
      </p>
      <p className="text-slate-400 text-[13px] mb-1">
        <span className="text-white font-semibold capitalize">{trip.origin.city}</span>
        {" → "}
        <span className="text-white font-semibold capitalize">{trip.destination.city}</span>
      </p>
      <p className="text-slate-500 text-[12px] mb-1">{depDate} · {depTime}</p>
      <p className="text-slate-500 text-[12px] mb-6">
        Visit <span className="text-blue-400 font-semibold">My Bookings</span> for full details.
      </p>
      <button
        onClick={onReset}
        className="px-5 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/10 hover:border-white/10 transition-all"
      >
        Book Another Trip
      </button>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function FindRide() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

  // Redux state
  const trips = useAppSelector(selectSearchResults);
  const isLoading = useAppSelector(selectSearchLoading);
  const searchError = useAppSelector(selectSearchError);
  const selectedTrip = useAppSelector(selectSelectedTrip);
  const contactedTrip = useAppSelector(selectContactedTrip);

  // Local UI state
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [searched, setSearched] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const sameCities =
    from.trim().length > 0 &&
    to.trim().length > 0 &&
    from.trim().toLowerCase() === to.trim().toLowerCase();

  const bothFilled = from.trim().length > 0 && to.trim().length > 0;

  // ── Load all trips on mount ───────────────────────────────
  useEffect(() => {
    if (!token) return;
    const loadAll = async () => {
      dispatch(setSearchLoading(true));
      dispatch(setSearchError(null));
      try {
        const result = await getAvailableTrips(token);
        dispatch(setSearchResults(result.data.trips));
        setSearched(true);
      } catch (_) {
        // silently fail — user can still manually search
      } finally {
        dispatch(setSearchLoading(false));
      }
    };
    loadAll();
  }, [token, dispatch]);

  const filters: { key: Filter; icon: React.ReactNode; label: string }[] = [
    { key: "all", icon: <TbRoute size={12} />, label: "All Trips" },
    { key: "price", icon: <span className="text-[10px] font-bold leading-none">₦</span>, label: "Lowest Fare" },
    { key: "earliest", icon: <FiClock size={12} />, label: "Earliest" },
    { key: "seats", icon: <FiUsers size={12} />, label: "Most Seats" },
  ];

  // Client-side sort
  const filteredTrips = [...trips].sort((a, b) => {
    if (activeFilter === "price") return a.pricePerSeat - b.pricePerSeat;
    if (activeFilter === "earliest")
      return new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime();
    if (activeFilter === "seats") return b.availableSeats - a.availableSeats;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // ── Search handler ────────────────────────────────────────
  async function handleSearch() {
    if (sameCities || !bothFilled) return;

    if (!token) {
      dispatch(setSearchError("You must be logged in to search trips."));
      setSearched(true);
      return;
    }

    dispatch(setSearchLoading(true));
    dispatch(setSearchError(null));
    dispatch(clearSearchResults());
    setSearched(false);

    try {
      const result = await searchTrips(
        {
          origin: from.trim(),
          destination: to.trim(),
          departureDate: date || new Date().toISOString().split("T")[0],
          passengers,
        },
        token
      );
      dispatch(setSearchResults(result.data.trips));
      dispatch(setLastSearch({ origin: from, destination: to, departureDate: date, passengers }));
      dispatch(resetBookingFlow());
      setConfirmed(false);
      setSearched(true);
    } catch (err: any) {
      dispatch(setSearchError(err?.message || "Search failed. Please try again."));
      setSearched(true);
    } finally {
      dispatch(setSearchLoading(false));
    }
  }

  function handleReset() {
    setSearched(false);
    setConfirmed(false);
    dispatch(resetBookingFlow());
    if (token) {
      dispatch(setSearchLoading(true));
      getAvailableTrips(token)
        .then((result) => {
          dispatch(setSearchResults(result.data.trips));
          setSearched(true);
        })
        .catch(() => {})
        .finally(() => dispatch(setSearchLoading(false)));
    }
  }

  const showPanel = !!(contactedTrip || confirmed);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600&display=swap');
        .fr-root * { box-sizing: border-box; }
        .fr-root { font-family: 'DM Sans', sans-serif; background: #0f172a; color: #cbd5e1; min-height: 100vh; }
        .fr-root select option { background: #1e293b; }
        .fr-root ::-webkit-scrollbar { width: 4px; }
        .fr-root ::-webkit-scrollbar-track { background: transparent; }
        .fr-root ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        .card-enter { animation: cardIn 0.25s ease-out both; }
        @keyframes cardIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .panel-enter { animation: panelIn 0.3s ease-out both; }
        @keyframes panelIn { from { opacity: 0; transform: translateX(14px); } to { opacity: 1; transform: translateX(0); } }
        .loading-btn { background: linear-gradient(90deg, #2563eb 0%, #60a5fa 50%, #2563eb 100%); background-size: 200% 100%; animation: shimmer 1.4s linear infinite; }
        @keyframes shimmer { from { background-position: 200% center; } to { background-position: -200% center; } }
      `}</style>

      <div className="fr-root">
        <div className="max-w-[1100px] mx-auto px-6 py-8">

          {/* ── Header ── */}
          <div className="mb-7">
            <h1 className="text-[26px] font-bold text-white leading-tight tracking-tight flex items-center gap-2.5" style={{ fontFamily: "'Syne', sans-serif" }}>
              <FiSearch className="text-blue-400" size={24} />Find a Ride
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Search verified drivers on your route and connect directly
            </p>
          </div>

          {/* ── Search card ── */}
          <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-5 mb-6">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-4 flex items-center gap-1.5">
              <FiMapPin size={12} className="text-blue-400" />Search Trips
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">

              {/* ── From — free text input ── */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                  From
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none flex">
                    <FiMapPin size={13} />
                  </span>
                  <input
                    type="text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="e.g. Ikeja City Mall, Lagos"
                    className="w-full bg-slate-800/80 border border-white/5 rounded-xl pl-9 pr-3 py-2.5 text-[13px] text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/40 transition-colors"
                  />
                </div>
              </div>

              {/* ── To — free text input ── */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                  To
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none flex">
                    <FiMapPin size={13} />
                  </span>
                  <input
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="e.g. Jabi Lake Mall, Abuja"
                    className="w-full bg-slate-800/80 border border-white/5 rounded-xl pl-9 pr-3 py-2.5 text-[13px] text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/40 transition-colors"
                  />
                </div>
              </div>

              {/* ── Date ── */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
                  Departure Date
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none flex">
                    <FiCalendar size={13} />
                  </span>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-800/80 border border-white/5 rounded-xl pl-9 pr-3 py-2.5 text-[13px] text-white focus:outline-none focus:border-blue-500/40 transition-colors [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* ── Passengers — still a select ── */}
              <SelectField
                label="Passengers"
                value={passengers}
                onChange={(v) => setPassengers(Number(v))}
                icon={<FiUsers size={13} />}
              >
                {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                  <option key={n} value={n}>{n} passenger{n > 1 ? "s" : ""}</option>
                ))}
              </SelectField>
            </div>

            {/* Validation hints */}
            {sameCities && (
              <div className="flex items-center gap-2 text-[12px] text-amber-400 mb-3 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2">
                <FiAlertCircle size={13} />
                Departure and destination cannot be the same
              </div>
            )}
            {!sameCities && (from.trim() || to.trim()) && (!from.trim() || !to.trim()) && (
              <div className="flex items-center gap-2 text-[12px] text-slate-500 mb-3 bg-white/5 border border-white/5 rounded-xl px-3 py-2">
                <FiMapPin size={13} className="text-slate-600" />
                Enter both departure and destination to search
              </div>
            )}

            <button
              onClick={handleSearch}
              disabled={isLoading || sameCities || !bothFilled}
              className={`w-full py-3 rounded-xl font-semibold text-white text-[14px] transition-all flex items-center justify-center gap-2 ${
                isLoading ? "loading-btn cursor-not-allowed"
                : sameCities || !bothFilled ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-500 hover:-translate-y-0.5 shadow-lg shadow-blue-600/20"
              }`}
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <FiSearch size={15} className={isLoading ? "animate-spin" : ""} />
              {isLoading ? "Searching..." : "Search Trips"}
            </button>
          </div>

          {/* ── Error banner ── */}
          {searchError && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl px-5 py-3 mb-5">
              <FiAlertCircle size={15} className="text-red-400 flex-shrink-0" />
              <p className="text-[13px] text-red-400 font-medium">{searchError}</p>
            </div>
          )}

          {/* ── Loading state ── */}
          {isLoading && (
            <div className="flex items-center justify-center py-20 gap-3 text-slate-400">
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <span className="text-[14px] font-medium">Loading trips...</span>
            </div>
          )}

          {/* ── Results ── */}
          {searched && !isLoading && !searchError && (
            <div className="flex gap-5 items-start">

              {/* Left: list */}
              <div className={`min-w-0 ${showPanel ? "flex-1" : "w-full"}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-[13px] text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse inline-block" />
                    <span>
                      <span className="text-white font-semibold">
                        {filteredTrips.length} trip{filteredTrips.length !== 1 ? "s" : ""}
                      </span>{" "}available
                    </span>
                  </div>
                  <button
                    onClick={handleReset}
                    className="text-[12px] text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24">
                      <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                    Refresh
                  </button>
                </div>

                {/* Filter pills */}
                <div className="flex gap-2 flex-wrap mb-4">
                  {filters.map(({ key, icon, label }) => (
                    <button
                      key={key}
                      onClick={() => setActiveFilter(key)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-medium border transition-all ${
                        activeFilter === key
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-transparent text-slate-500 border-white/5 hover:border-blue-500/30 hover:text-slate-300"
                      }`}
                    >
                      {icon}{label}
                    </button>
                  ))}
                </div>

                {/* Empty state */}
                {filteredTrips.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-12 h-12 rounded-xl border border-white/5 bg-slate-900/60 flex items-center justify-center mb-4 opacity-50">
                      <FiSearch size={22} className="text-slate-600" />
                    </div>
                    <p className="text-[14px] font-semibold text-slate-500 mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                      No trips found
                    </p>
                    <p className="text-[13px] text-slate-600 max-w-xs">
                      Try searching a different route or date.
                    </p>
                  </div>
                )}

                {/* Trip cards */}
                <div className="flex flex-col gap-3">
                  {filteredTrips.map((trip, i) => (
                    <div key={trip._id} className="card-enter" style={{ animationDelay: `${i * 60}ms` }}>
                      <TripCard
                        trip={trip}
                        selected={selectedTrip?._id === trip._id}
                        onSelect={() => {
                          dispatch(setSelectedTrip(selectedTrip?._id === trip._id ? null : trip));
                          dispatch(setContactedTrip(null));
                          setConfirmed(false);
                        }}
                        onContact={() => {
                          dispatch(setSelectedTrip(trip));
                          dispatch(setContactedTrip(trip));
                          setConfirmed(false);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: contact/confirm panel */}
              {showPanel && (
                <div className="w-[320px] flex-shrink-0 sticky top-6 panel-enter">
                  <div className="rounded-2xl border border-white/5 bg-slate-900/60 overflow-hidden">
                    {confirmed && contactedTrip ? (
                      <ConfirmedState trip={contactedTrip} onReset={handleReset} />
                    ) : contactedTrip ? (
                      <div className="p-5 overflow-y-auto max-h-[calc(100vh-120px)]">
                        <ContactPanel
                          trip={contactedTrip}
                          passengers={passengers}
                          onConfirm={() => {
                            dispatch(setConfirmedTrip(contactedTrip));
                            setConfirmed(true);
                          }}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Pre-load state ── */}
          {!searched && !isLoading && !searchError && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-14 h-14 rounded-xl border border-white/5 bg-slate-900/60 flex items-center justify-center mb-4 opacity-50">
                <FiMapPin size={26} className="text-slate-600" />
              </div>
              <p className="text-[15px] font-semibold text-slate-600 mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                Finding available trips...
              </p>
              <p className="text-[13px] text-slate-700 max-w-xs">
                Or type a route above to filter by destination and date
              </p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
