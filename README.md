"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ShieldCheck, 
  Star, 
  Users, 
  ChevronRight, 
  MapPin, 
  ArrowRightCircle 
} from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-[#030712] overflow-hidden pt-20">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="relative z-10">
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Premium Interstate Travel Now Active
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Travel Beyond <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Boundaries.
              </span>
            </h1>

            <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-xl mb-10">
              Experience the pinnacle of long-distance transit. We connect you with 
              executive drivers and premium vehicles for a journey that's as 
              remarkable as the destination.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/book-ride"
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
              >
                Book Your Journey
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/become-driver"
                className="flex items-center justify-center px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300"
              >
                Join as Partner
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/5">
              {[
                { label: "Happy Travelers", value: "10k+", icon: Users },
                { label: "Verified Drivers", value: "500+", icon: ShieldCheck },
                { label: "Routes Active", value: "50+", icon: MapPin },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2 text-blue-400 mb-1">
                    <stat.icon className="w-4 h-4" />
                    <span className="text-2xl font-bold text-white">{stat.value}</span>
                  </div>
                  <p className="text-slate-500 text-xs sm:text-sm uppercase tracking-wider font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Section */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            {/* Image Container with Floating Effect */}
            <div className="relative w-full aspect-square lg:aspect-auto lg:h-full rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent z-10" />
              <img
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1000"
                alt="Premium interstate driving experience"
                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
              />
              
              {/* Floating Review Card */}
              <div className="absolute bottom-8 left-8 right-8 z-20 p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#030712] bg-slate-800" />
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-white font-bold text-sm">4.9/5</span>
                  </div>
                </div>
                <p className="text-slate-300 text-sm italic">
                  "The most comfortable interstate trip I've ever had. Truly executive service."
                </p>
              </div>
            </div>

            {/* Decorative Orbitals */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;


/////////////////
I've thoroughly reviewed the BloomRydes Interstate web application documentation. This is a comprehensive interstate travel matching platform connecting passengers with verified drivers. Let me summarize the key aspects I understand:

## Core Concept
- **Matching platform** (not a ride-hailing service like Uber)
- Passengers search for trips, find drivers going their route
- Direct phone communication between parties
- Cash payment handled in person (no payment processing)
- Heavy emphasis on safety through driver verification

## Key User Flows

**Passengers (3-5 min registration):**
1. Phone OTP authentication
2. Quick profile setup (name, email, photo, emergency contact)
3. Search trips (from/to, date, passenger count)
4. View available drivers with full details
5. Contact driver directly via phone
6. Share trip details with emergency contacts

**Drivers (10-15 min registration, 24-48hr verification):**
1. Phone OTP authentication
2. Comprehensive 4-step registration:
   - Personal info
   - Verification documents (license, NIN, selfie with ID)
   - Emergency contact & guarantor details
   - Vehicle info (including **critical passenger seat capacity**)
3. Admin verification process
4. Create trips with route, date/time, available seats, pricing
5. Manage bookings and communicate with passengers

## Critical Data Points

**Vehicle Capacity:** Total passenger seats (excluding driver) - ranges from 4 (sedan) to 14 (mini-bus)

**Safety Features:**
- Driver verification badge
- Trip sharing functionality
- Emergency contacts on both sides
- Guarantor system for drivers
- Vehicle documentation requirements

**Notable Design Decisions:**
- No in-app payment processing
- Phone-based final communication
- Platform acts as trusted intermediary
- Focus on simplicity and speed

This is well-structured for a Flutter/React implementation. What specific aspect would you like me to help you build or clarify?