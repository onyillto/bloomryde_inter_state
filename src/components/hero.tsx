"use client";

import { useState } from "react";
import Image from "next/image";

export default function TravelBookingLanding() {
  const [bookingMode, setBookingMode] = useState("rider");
  const [fromLocation, setFromLocation] = useState("Tokyo, Japan");
  const [toLocation, setToLocation] = useState("Berlin, Germany");
  const [departDate, setDepartDate] = useState("Oct 11, 2023");
  const [passengers, setPassengers] = useState("1 Passenger");

  const deals = [
    {
      id: 1,
      category: "PREMIUM RIDES",
      title: "INTERSTATE COMFORT",
      description:
        "Travel between states in comfort and style with verified drivers.",
      image:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=400&fit=crop",
      type: "ride",
    },
    {
      id: 2,
      category: "DRIVER BENEFITS",
      title: "Earn While You Drive",
      description: "Turn your empty seats into earnings on your next trip",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=400&fit=crop",
      type: "driver",
    },
    {
      id: 3,
      category: "EXPRESS DELIVERY",
      title: "Package Delivery",
      description: "Send parcels across states securely and quickly",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=400&fit=crop",
      type: "delivery",
    },
  ];

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">BloomRyde.</div>
          <div className="nav-links">
            <a href="#rides" className="nav-link active">
              Rides
            </a>
            <a href="#drive" className="nav-link">
              Drive
            </a>
            <a href="#delivery" className="nav-link">
              Delivery
            </a>
          </div>
          <button className="sign-in-btn">Sign In</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-subtitle">BLOOMRYDE INTERSTATE</p>
          <h1 className="hero-title">
            SEAMLESS INTERSTATE
            <br />
            RIDE BOOKING
          </h1>
        </div>

        {/* Booking Form */}
        {/* <div className="booking-form-card">
          <div className="trip-type-tabs">
            <button
              className={`trip-tab ${bookingMode === "rider" ? "active" : ""}`}
              onClick={() => setBookingMode("rider")}
            >
              Book a Ride
            </button>
            <button
              className={`trip-tab ${bookingMode === "driver" ? "active" : ""}`}
              onClick={() => setBookingMode("driver")}
            >
              Offer a Ride
            </button>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label className="field-label">From</label>
              <input
                type="text"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}
                className="field-input"
                placeholder="City or State"
              />
            </div>

            <div className="form-field">
              <label className="field-label">To</label>
              <input
                type="text"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}
                className="field-input"
                placeholder="City or State"
              />
            </div>

            <div className="form-field">
              <label className="field-label">Date</label>
              <input
                type="text"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                className="field-input"
              />
            </div>

            <div className="form-field">
              <label className="field-label">
                {bookingMode === "rider" ? "Passengers" : "Seats Available"}
              </label>
              <input
                type="text"
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                className="field-input"
              />
            </div>
          </div>

          <button className="search-btn">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </div> */}
      </section>

      {/* Top Flight Deals */}
      {/* <section className="deals-section">
        <div className="section-header">
          <h2 className="section-title">POPULAR ROUTES</h2>
          <p className="section-subtitle">
            Discover popular interstate routes for comfortable travel
            experiences at great prices.
          </p>
        </div>

        <div className="deals-grid">
          {deals.map((deal, index) => (
            <div
              key={deal.id}
              className={`deal-card ${index === 0 ? "deal-card-wide" : ""}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="deal-image-container">
                <img src={deal.image} alt={deal.title} className="deal-image" />
              </div>
              <div className="deal-content">
                <span className="deal-category">{deal.category}</span>
                <h3 className="deal-title">{deal.title}</h3>
                {index === 0 && (
                  <p className="deal-description">{deal.description}</p>
                )}
                <button className="deal-btn">
                  Learn More
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* Hotels Section */}

      <style jsx>{`
        .landing-page {
          min-height: 100vh;
          background: linear-gradient(
            135deg,
            #e8f4f8 0%,
            #f0f8fb 50%,
            #e0f2f7 100%
          );
          font-family: "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
            sans-serif;
        }

        /* Navigation */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgb(37, 99, 235);
          backdrop-filter: blur(10px);
          z-index: 1000;
          padding: 20px 0;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          font-size: 22px;
          font-weight: 700;
          color: white;
          letter-spacing: -0.5px;
        }

        .nav-links {
          display: flex;
          gap: 40px;
        }

        .nav-link {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
          position: relative;
        }

        .nav-link.active {
          color: white;
        }

        .nav-link.active::after {
          content: "";
          position: absolute;
          bottom: -8px;
          left: 0;
          right: 0;
          height: 2px;
          background: white;
        }

        .nav-link:hover {
          color: white;
        }

        .sign-in-btn {
          padding: 12px 32px;
          background: white;
          color: rgb(37, 99, 235);
          border: none;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .sign-in-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        /* Hero Section */
        .hero-section {
          padding: 140px 40px 80px;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
        }

        .hero-content {
          text-align: center;
          margin-bottom: 60px;
          position: relative;
        }

        .hero-subtitle {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 3px;
          color: #666;
          margin-bottom: 20px;
          animation: fadeInDown 0.8s ease;
        }

        .hero-title {
          font-size: clamp(36px, 6vw, 72px);
          font-weight: 900;
          color: #1a1a1a;
          line-height: 1.1;
          letter-spacing: -2px;
          margin-bottom: 40px;
          animation: fadeInUp 0.8s ease 0.2s backwards;
        }

        /* Booking Form */
        .booking-form-card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          animation: fadeInUp 1s ease 0.6s backwards;
        }

        .trip-type-tabs {
          display: flex;
          gap: 12px;
          margin-bottom: 30px;
          border-bottom: 1px solid #f0f0f0;
          padding-bottom: 16px;
        }

        .trip-tab {
          padding: 10px 24px;
          background: transparent;
          border: none;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
          color: #666;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .trip-tab.active {
          background: #64b4dc;
          color: white;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .field-label {
          font-size: 12px;
          font-weight: 600;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .field-input {
          padding: 14px 16px;
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #1a1a1a;
          transition: all 0.3s ease;
        }

        .field-input:focus {
          outline: none;
          border-color: #64b4dc;
          box-shadow: 0 0 0 3px rgba(100, 180, 220, 0.1);
        }

        .search-btn {
          position: absolute;
          right: 40px;
          bottom: 30px;
          width: 60px;
          height: 60px;
          background: #64b4dc;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 20px rgba(100, 180, 220, 0.3);
        }

        .search-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 30px rgba(100, 180, 220, 0.4);
        }

        .search-btn svg {
          width: 24px;
          height: 24px;
          color: white;
        }

        /* Section Styling */
        .deals-section,
        .airlines-section,
        .hotels-section {
          max-width: 1400px;
          margin: 0 auto;
          padding: 80px 40px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-title {
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 900;
          color: #1a1a1a;
          letter-spacing: -1px;
          margin-bottom: 16px;
        }

        .section-subtitle {
          font-size: 16px;
          color: #666;
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Deals Grid */
        .deals-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 24px;
        }

        .deal-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          transition: all 0.4s ease;
          animation: fadeInUp 0.6s ease backwards;
        }

        .deal-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
        }

        .deal-card-wide {
          grid-row: span 1;
        }

        .deal-image-container {
          width: 100%;
          height: 240px;
          overflow: hidden;
          position: relative;
        }

        .deal-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .deal-card:hover .deal-image {
          transform: scale(1.1);
        }

        .deal-content {
          padding: 24px;
        }

        .deal-category {
          font-size: 11px;
          font-weight: 700;
          color: #64b4dc;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .deal-title {
          font-size: 20px;
          font-weight: 800;
          color: #1a1a1a;
          margin: 12px 0;
          line-height: 1.3;
        }

        .deal-description {
          font-size: 14px;
          color: #666;
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .deal-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: #64b4dc;
          color: white;
          border: none;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .deal-btn:hover {
          background: #5aa5cc;
          transform: translateX(4px);
        }

        .deal-btn svg {
          width: 16px;
          height: 16px;
        }

        /* Airlines Carousel */
        .airlines-carousel {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .airline-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          transition: all 0.4s ease;
          animation: fadeInUp 0.6s ease backwards;
        }

        .airline-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
        }

        .airline-image-container {
          width: 100%;
          height: 220px;
          overflow: hidden;
        }

        .airline-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .airline-card:hover .airline-image {
          transform: scale(1.1);
        }

        .airline-name-badge {
          position: absolute;
          bottom: 60px;
          left: 20px;
          right: 20px;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          padding: 12px 16px;
          border-radius: 10px;
          color: white;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .airline-arrow-btn {
          position: absolute;
          bottom: 20px;
          right: 20px;
          width: 44px;
          height: 44px;
          background: #64b4dc;
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .airline-arrow-btn:hover {
          transform: scale(1.1);
          background: #5aa5cc;
        }

        .airline-arrow-btn svg {
          width: 20px;
          height: 20px;
          color: white;
        }

        /* Hotels Grid */
        .hotels-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .hotel-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          transition: all 0.4s ease;
          animation: fadeInUp 0.6s ease backwards;
        }

        .hotel-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
        }

        .hotel-image-container {
          width: 100%;
          height: 280px;
          overflow: hidden;
          position: relative;
        }

        .hotel-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .hotel-card:hover .hotel-image {
          transform: scale(1.1);
        }

        .favorite-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: none;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .favorite-btn:hover {
          transform: scale(1.1);
          background: white;
        }

        .favorite-btn svg {
          width: 20px;
          height: 20px;
          color: #ff4757;
        }

        .hotel-info {
          padding: 24px;
        }

        .hotel-name {
          font-size: 18px;
          font-weight: 800;
          color: #1a1a1a;
          margin-bottom: 8px;
        }

        .hotel-location {
          font-size: 14px;
          color: #666;
          margin-bottom: 20px;
        }

        .book-now-btn {
          width: 100%;
          padding: 14px;
          background: #1a1a1a;
          color: white;
          border: none;
          border-radius: 30px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .book-now-btn:hover {
          background: #2a2a2a;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        /* Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .deals-grid,
          .airlines-carousel,
          .hotels-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .form-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .nav-links {
            display: none;
          }

          .deals-grid,
          .airlines-carousel,
          .hotels-grid,
          .form-grid {
            grid-template-columns: 1fr;
          }

          .booking-form-card {
            padding: 24px;
          }

          .search-btn {
            position: static;
            width: 100%;
            border-radius: 30px;
            margin-top: 20px;
          }
        }
      `}</style>
    </div>
  );
}
