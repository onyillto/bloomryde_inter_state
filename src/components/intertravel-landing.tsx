"use client";
import React, { useState } from "react";
import {
  Globe,
  MapPin,
  Search,
  Clock,
  Users,
  Wifi,
  Heart,
  Star,
  Shield,
  Bus,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
const popularRoutes = [
  {
    id: 1,
    from: "Lagos",
    to: "Abuja",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop",
    rating: 4.9,
    description:
      "Travel in a sleek Lexus RX with a professional driver. Chilled AC, phone chargers, and snacks included.",
    wifi: true,
    duration: "10-12 hrs",
    seats: 3,
    type: "SUV / Private",
    price: 35000, // Naira equivalent/styling
  },
  {
    id: 2,
    from: "Port Harcourt",
    to: "Lagos",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop",
    rating: 4.8,
    description:
      "Toyota Sienna executive ride. Extra legroom and ample space for luggage. Safe and verified driver.",
    wifi: false,
    duration: "9 hrs",
    seats: 5,
    type: "Minivan",
    price: 28000,
  },
  {
    id: 3,
    from: "Abuja",
    to: "Kaduna",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop",
    rating: 5.0,
    description:
      "Quick business trip in a clean Honda Accord. Perfect for solo travelers or small groups.",
    wifi: true,
    duration: "2.5 hrs",
    seats: 2,
    type: "Sedan",
    price: 12500,
  },
];

const partners = ["Greyhound", "Megabus", "FlixBus", "BoltBus", "CoachUSA"];

export default function InterTravelLanding() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen font-sans relative overflow-x-hidden">
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="px-8 lg:px-16 pt-20 pb-16">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Explore the world
            </div>
            <h1 className="text-5xl md:text-7xl text-white font-bold leading-[1.1] mb-8">
              Your Journey{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 font-serif italic">
                Perfected
              </span>
              .
            </h1>
            <p className="text-blue-100/70 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10">
              Experience seamless travel with our premium fleet. Reliable,
              comfortable, and designed for the modern explorer.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <button className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold shadow-xl shadow-blue-900/40 transition-all hover:-translate-y-1">
                <Search className="w-5 h-5" />
                Book a Trip
              </button>
              <button className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-white rounded-2xl font-bold transition-all hover:-translate-y-1">
                View Routes
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Popular Routes Section */}
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-white text-3xl font-bold mb-2">
                  Popular Routes
                </h2>
                <p className="text-blue-300/60 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Discover our most traveled
                  paths
                </p>
              </div>
              <button className="text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors">
                View all destinations
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularRoutes.map((route) => (
                <div
                  key={route.id}
                  className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={route.image}
                      alt={`${route.from} to ${route.to}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f]/80 to-transparent" />

                    <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-bold text-white">
                        {route.rating}
                      </span>
                    </div>

                    <button
                      onClick={() => toggleFavorite(route.id)}
                      className="absolute top-4 right-4 p-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-all"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          favorites.includes(route.id)
                            ? "fill-red-500 text-red-500"
                            : "text-white"
                        }`}
                      />
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-white text-xl font-bold">
                        {route.from}{" "}
                        <span className="text-blue-400 mx-1">→</span> {route.to}
                      </h3>
                    </div>

                    <p className="text-blue-100/50 text-sm leading-relaxed mb-6 line-clamp-2">
                      {route.description}
                    </p>

                    <div className="grid grid-cols-2 gap-y-3 mb-6">
                      <div className="flex items-center gap-2 text-white/70 text-xs">
                        <Wifi className="w-3.5 h-3.5 text-blue-400" /> WiFi
                        Included
                      </div>
                      <div className="flex items-center gap-2 text-white/70 text-xs">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />{" "}
                        {route.duration}
                      </div>
                      <div className="flex items-center gap-2 text-white/70 text-xs">
                        <Users className="w-3.5 h-3.5 text-blue-400" />{" "}
                        {route.seats} Seats left
                      </div>
                      <div className="flex items-center gap-2 text-white/70 text-xs">
                        <Bus className="w-3.5 h-3.5 text-blue-400" />{" "}
                        {route.type}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="text-white">
                        <span className="text-2xl font-black">
                          ${route.price}
                        </span>
                        <span className="text-white/40 text-xs ml-1">
                          /seat
                        </span>
                      </div>
                      <button className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500 text-blue-400 hover:text-white rounded-xl text-sm font-bold transition-all">
                        Select Seat
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partners */}
          {/* <div className="mt-24 text-center">
            <p className="text-white/30 text-xs font-bold uppercase tracking-[0.2em] mb-8">
              Trusted by Global Partners
            </p>
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all">
              {partners.map((partner) => (
                <span
                  key={partner}
                  className="text-white text-lg md:text-2xl font-bold hover:text-blue-400 cursor-default"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
