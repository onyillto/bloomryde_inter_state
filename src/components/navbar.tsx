"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const CarIcon = () => (
  <svg
    width="44"
    height="32"
    viewBox="0 0 44 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="10" width="40" height="16" rx="4" fill="#5BC0EB" />
    <path
      d="M10 10 L14 4 C14.8 2.9 16 2 17.2 2 L26.8 2 C28 2 29.2 2.9 30 4 L34 10"
      fill="#5BC0EB"
      stroke="#5BC0EB"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    <circle
      cx="11"
      cy="27"
      r="3.5"
      fill="#5BC0EB"
      stroke="white"
      strokeWidth="2"
    />
    <circle
      cx="33"
      cy="27"
      r="3.5"
      fill="#5BC0EB"
      stroke="white"
      strokeWidth="2"
    />
    {/* Windshield */}
    <path
      d="M14.5 9.5 L17.5 5 C17.9 4.4 18.6 4 19.3 4 L24.7 4 C25.4 4 26.1 4.4 26.5 5 L29.5 9.5"
      fill="white"
      fillOpacity="0.85"
    />
    {/* Passengers silhouettes */}
    <circle cx="19" cy="16" r="2" fill="white" fillOpacity="0.9" />
    <ellipse cx="19" cy="20.5" rx="2.8" ry="2" fill="white" fillOpacity="0.9" />
    <circle cx="25" cy="16" r="2" fill="white" fillOpacity="0.9" />
    <ellipse cx="25" cy="20.5" rx="2.8" ry="2" fill="white" fillOpacity="0.9" />
  </svg>
);

const navLinks = ["Home", "About", "Order now", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: isDarkMode
          ? scrolled
            ? "rgba(10, 10, 11, 0.95)"
            : "#0a0a0b"
          : scrolled
          ? "rgba(91, 192, 235, 0.95)"
          : "rgb(91, 192, 235)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.08)" : "none",
        transition: "all 0.3s ease",
        padding: "0 40px",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 76,
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
          }}
        >
          <CarIcon />
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: isDarkMode ? "#5BC0EB" : "white",
            }}
          >
            CARPOOLING
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 40,
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => setActiveLink(link)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Poppins', sans-serif",
                fontSize: 15,
                fontWeight: activeLink === link ? 600 : 400,
                color:
                  activeLink === link
                    ? isDarkMode
                      ? "#5BC0EB"
                      : "white"
                    : isDarkMode
                    ? "#ccc"
                    : "rgba(255,255,255,0.8)",
                position: "relative",
                padding: "6px 0",
                transition: "color 0.25s ease",
              }}
              onMouseEnter={(e) => {
                if (activeLink !== link)
                  (e.target as HTMLElement).style.color = isDarkMode
                    ? "#5BC0EB"
                    : "white";
              }}
              onMouseLeave={(e) => {
                if (activeLink !== link)
                  (e.target as HTMLElement).style.color = isDarkMode
                    ? "#ccc"
                    : "rgba(255,255,255,0.8)";
              }}
            >
              {link}
              {/* Active underline */}
              <span
                style={{
                  position: "absolute",
                  bottom: -2,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: activeLink === link ? "100%" : "0%",
                  height: 2.5,
                  borderRadius: 2,
                  background: isDarkMode ? "#5BC0EB" : "white",
                  transition: "width 0.3s ease",
                }}
              />
            </button>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: isDarkMode ? "#fff" : "white",
              padding: 8,
              marginRight: 8,
              display: "flex",
              alignItems: "center",
            }}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Download Button */}
          <button
            style={{
              background: "#5BC0EB",
              color: "white",
              border: "none",
              borderRadius: 28,
              padding: "11px 32px",
              fontFamily: "'Poppins', sans-serif",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.01em",
              boxShadow: "0 4px 16px rgba(91, 192, 235, 0.35)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              marginLeft: 8,
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.transform = "translateY(-2px)";
              (e.target as HTMLElement).style.boxShadow =
                "0 6px 24px rgba(91, 192, 235, 0.5)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.transform = "translateY(0)";
              (e.target as HTMLElement).style.boxShadow =
                "0 4px 16px rgba(91, 192, 235, 0.35)";
            }}
          >
            Download
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            flexDirection: "column",
            gap: 5,
            padding: 8,
          }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 24,
                height: 2.5,
                borderRadius: 2,
                background: isDarkMode ? "#5BC0EB" : "white",
                transition: "all 0.3s ease",
                transform:
                  menuOpen && i === 0
                    ? "rotate(45deg) translate(5px, 5px)"
                    : menuOpen && i === 2
                    ? "rotate(-45deg) translate(5px, -5px)"
                    : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Responsive styles injected */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

        @media (max-width: 768px) {
          nav {
            padding: 0 20px !important;
          }
          /* Hide desktop links, show hamburger */
          nav > div > div:nth-child(2) {
            display: none !important;
          }
          nav > div > button[aria-label="Toggle menu"] {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
