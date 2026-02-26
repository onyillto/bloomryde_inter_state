import type { Trip, Doc } from "./DriverTypes";

export const TRIPS: Trip[] = [
  {
    id: 1,
    from: "Lagos",
    to: "Abuja",
    date: "28 Feb 2026",
    departure: "6:00 AM",
    totalSeats: 8,
    booked: 5,
    price: 5000,
    vehicle: "Toyota Hiace",
    vehicleColor: "BLACK",
    status: "published",
    passengers: [
      { initials: "AK", color: "bg-blue-500" },
      { initials: "TB", color: "bg-violet-500" },
      { initials: "NW", color: "bg-rose-500" },
      { initials: "JI", color: "bg-amber-500" },
      { initials: "OA", color: "bg-teal-500" },
    ],
  },
  {
    id: 2,
    from: "Abuja",
    to: "Enugu",
    date: "5 Mar 2026",
    departure: "7:00 AM",
    totalSeats: 8,
    booked: 2,
    price: 3500,
    vehicle: "Toyota Hiace",
    vehicleColor: "BLACK",
    status: "published",
    passengers: [
      { initials: "JA", color: "bg-blue-500" },
      { initials: "KI", color: "bg-emerald-500" },
    ],
  },
  {
    id: 3,
    from: "Lagos",
    to: "Port Harcourt",
    date: "10 Mar 2026",
    departure: "5:30 AM",
    totalSeats: 8,
    booked: 0,
    price: 6000,
    vehicle: "Toyota Hiace",
    vehicleColor: "BLACK",
    status: "draft",
    passengers: [],
  },
];

export const DOCS: Doc[] = [
  { icon: "🪪", name: "Driver's License", expiry: "Jun 2028", status: "valid" },
  {
    icon: "🛡️",
    name: "Insurance Certificate",
    expiry: "Dec 2026",
    status: "valid",
  },
  { icon: "🔧", name: "Road Worthiness", expiry: "Apr 2026", status: "warn" },
  {
    icon: "📋",
    name: "Vehicle Registration",
    expiry: "Jan 2027",
    status: "valid",
  },
];
