export type Trip = {
  id: number;
  from: string;
  to: string;
  date: string;
  departure: string;
  totalSeats: number;
  booked: number;
  price: number;
  vehicle: string;
  vehicleColor: string;
  status: "published" | "draft";
  passengers: { initials: string; color: string }[];
};

export type Doc = {
  icon: string;
  name: string;
  expiry: string;
  status: "valid" | "warn" | "expired";
};
