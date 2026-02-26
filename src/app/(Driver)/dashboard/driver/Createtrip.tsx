"use client";

import { useState, useEffect } from "react";

const CITIES = [
  "Lagos (Jibowu Motor Park)",
  "Lagos (Mile 2)",
  "Abuja (Utako Park)",
  "Abuja (Wuse Park)",
  "Port Harcourt (Waterlines)",
  "Enugu (Nike Lake Road)",
  "Ibadan (Challenge)",
  "Kano (Yankaba)",
  "Benin City",
  "Warri",
];

const ROUTE_PRICES: Record<string, string> = {
  "Lagos-Abuja": "₦4,500 – ₦6,000",
  "Lagos-Port Harcourt": "₦5,000 – ₦7,000",
  "Lagos-Enugu": "₦5,500 – ₦7,500",
  "Abuja-Enugu": "₦3,000 – ₦4,500",
  "Abuja-Kano": "₦2,500 – ₦4,000",
};

function getSuggestedPrice(from: string, to: string) {
  const fromCity = from.split("(")[0].trim();
  const toCity = to.split("(")[0].trim();
  const key1 = `${fromCity}-${toCity}`;
  const key2 = `${toCity}-${fromCity}`;
  return ROUTE_PRICES[key1] || ROUTE_PRICES[key2] || "₦3,000 – ₦8,000";
}

export default function CreateTrip() {
  const [from, setFrom] = useState("Lagos (Jibowu Motor Park)");
  const [to, setTo] = useState("Abuja (Utako Park)");
  const [pickupNote, setPickupNote] = useState("");
  const [date, setDate] = useState("2026-03-01");
  const [time, setTime] = useState("06:00");
  const [seats, setSeats] = useState(8);
  const [price, setPrice] = useState(5000);
  const [restStops, setRestStops] = useState("");
  const [notes, setNotes] = useState("");
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState(false);

  const maxEarnings = seats * price;
  const suggestedPrice = getSuggestedPrice(from, to);

  const fromCity = from.split("(")[0].trim();
  const toCity = to.split("(")[0].trim();

  const formattedDate = date
    ? new Date(date + "T00:00:00").toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      })
    : "—";

  function handlePublish() {
    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      setPublished(true);
    }, 1800);
  }

  if (published) {
    return (
      <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap'); .ct * { box-sizing:border-box; } .ct { font-family:'DM Sans',sans-serif; }`}</style>
        <div className="ct bg-slate-50 min-h-screen flex items-center justify-center p-8">
          <div className="text-center max-w-sm">
            <div className="w-20 h-20 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-4xl mx-auto mb-6 animate-bounce">
              🚀
            </div>
            <h2
              className="text-[24px] font-black text-slate-900 mb-2"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              Trip Published!
            </h2>
            <p className="text-slate-500 text-[14px] mb-6">
              Your trip from{" "}
              <strong className="text-slate-700">{fromCity}</strong> to{" "}
              <strong className="text-slate-700">{toCity}</strong> is now live.
              Passengers can book.
            </p>
            <button
              onClick={() => setPublished(false)}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-[14px] hover:bg-blue-700 transition-all"
            >
              Create Another Trip
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        .ct * { box-sizing: border-box; }
        .ct { font-family: 'DM Sans', sans-serif; }
        .ct select option { background: #fff; }
        .ct input[type="date"], .ct input[type="time"] { color-scheme: light; }
        .ct ::-webkit-scrollbar { width: 4px; }
        .ct ::-webkit-scrollbar-thumb { background: #dbeafe; border-radius: 4px; }
        .ct input:focus, .ct select:focus, .ct textarea:focus { outline: none; }
        .section-card {
          background: white;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          padding: 24px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04);
          margin-bottom: 16px;
          transition: box-shadow 0.2s, border-color 0.2s;
        }
        .section-card:focus-within {
          border-color: #bfdbfe;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.06), 0 1px 3px rgba(0,0,0,0.04);
        }
        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .field-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #94a3b8;
          margin-bottom: 8px;
        }
        .field-input {
          width: 100%;
          background: #f8fafc;
          border: 1.5px solid #e2e8f0;
          border-radius: 12px;
          padding: 11px 14px;
          font-size: 14px;
          color: #1e293b;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .field-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
          background: #fff;
          outline: none;
        }
        .field-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          padding-right: 36px !important;
          cursor: pointer;
        }
        .publish-btn {
          width: 100%;
          background: #2563eb;
          color: white;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 15px;
          padding: 15px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 16px rgba(37,99,235,0.3);
          transition: all 0.15s;
          margin-bottom: 10px;
        }
        .publish-btn:hover:not(:disabled) { background: #1d4ed8; transform: translateY(-1px); box-shadow: 0 6px 20px rgba(37,99,235,0.35); }
        .publish-btn:disabled { background: #93c5fd; cursor: not-allowed; transform: none; box-shadow: none; }
        .draft-btn {
          width: 100%;
          background: white;
          color: #475569;
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          padding: 13px;
          border-radius: 14px;
          border: 1.5px solid #e2e8f0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.15s;
        }
        .draft-btn:hover { background: #f8fafc; border-color: #cbd5e1; color: #1e293b; }
        .preview-card {
          background: white;
          border-radius: 16px;
          border: 1.5px solid #bfdbfe;
          padding: 20px;
          margin-bottom: 14px;
          box-shadow: 0 2px 8px rgba(37,99,235,0.08);
        }
        .preview-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #2563eb;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 14px;
        }
        .live-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #2563eb;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.4; transform:scale(0.75); }
        }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        .slide-in { animation: slideIn 0.4s ease-out both; }
        @keyframes slideIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      <div className="ct bg-slate-50 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6 py-8">
          {/* Page header */}
          <div className="mb-8">
            <h1
              className="text-[28px] font-black text-slate-900 tracking-tight"
              style={{ fontFamily: "'Syne',sans-serif" }}
            >
              Create a New Trip
            </h1>
            <p className="text-[14px] text-slate-500 mt-1">
              Fill in the details and publish to start accepting passengers
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 320px",
              gap: "24px",
              alignItems: "start",
            }}
          >
            {/* ── LEFT: Form ─────────────────────────────────── */}
            <div>
              {/* Route */}
              <div className="section-card">
                <div className="section-title">📍 Route Information</div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "14px",
                    marginBottom: "14px",
                  }}
                >
                  <div>
                    <label className="field-label">From (Departure City)</label>
                    <select
                      className="field-input field-select"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                    >
                      {CITIES.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="field-label">To (Destination)</label>
                    <select
                      className="field-input field-select"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    >
                      {CITIES.filter((c) => c !== from).map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="field-label">
                    Pickup Location Notes (Optional)
                  </label>
                  <input
                    className="field-input"
                    type="text"
                    placeholder="e.g. Meet at the Jibowu Under Bridge entrance"
                    value={pickupNote}
                    onChange={(e) => setPickupNote(e.target.value)}
                  />
                </div>
              </div>

              {/* Date & Time */}
              <div className="section-card">
                <div className="section-title">📅 Date & Time</div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "14px",
                  }}
                >
                  <div>
                    <label className="field-label">Departure Date</label>
                    <input
                      className="field-input"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="field-label">Departure Time</label>
                    <input
                      className="field-input"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Seats & Pricing */}
              <div className="section-card">
                <div className="section-title">💺 Seats & Pricing</div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "14px",
                  }}
                >
                  <div>
                    <label className="field-label">Available Seats</label>
                    <input
                      className="field-input"
                      type="number"
                      min={1}
                      max={14}
                      value={seats}
                      onChange={(e) => setSeats(Number(e.target.value))}
                    />
                    <p
                      style={{
                        fontSize: "11px",
                        color: "#94a3b8",
                        marginTop: "6px",
                      }}
                    >
                      Your Toyota Hiace can carry up to 8 passengers
                    </p>
                  </div>
                  <div>
                    <label className="field-label">Price Per Seat (₦)</label>
                    <div style={{ position: "relative" }}>
                      <input
                        className="field-input"
                        type="number"
                        value={price}
                        style={{ paddingRight: "36px" }}
                        onChange={(e) => setPrice(Number(e.target.value))}
                      />
                      <span
                        style={{
                          position: "absolute",
                          right: "13px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          fontSize: "13px",
                          color: "#94a3b8",
                          fontWeight: 600,
                        }}
                      >
                        ₦
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "11px",
                        color: "#2563eb",
                        marginTop: "6px",
                        fontWeight: 500,
                      }}
                    >
                      💡 Suggested: {suggestedPrice} for this route
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="section-card">
                <div className="section-title">
                  📝 Additional Info{" "}
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#94a3b8",
                    }}
                  >
                    (Optional)
                  </span>
                </div>
                <div style={{ marginBottom: "14px" }}>
                  <label className="field-label">Rest Stops</label>
                  <input
                    className="field-input"
                    type="text"
                    placeholder="e.g. 15-min break at Ore Junction"
                    value={restStops}
                    onChange={(e) => setRestStops(e.target.value)}
                  />
                </div>
                <div>
                  <label className="field-label">Special Notes</label>
                  <textarea
                    className="field-input"
                    rows={4}
                    maxLength={300}
                    style={{ resize: "none" }}
                    placeholder="e.g. AC working, luggage space available, non-smoking vehicle..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <p
                    style={{
                      fontSize: "11px",
                      color: "#94a3b8",
                      marginTop: "5px",
                      textAlign: "right",
                    }}
                  >
                    {notes.length}/300 characters
                  </p>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Preview + Actions ──────────────────── */}
            <div style={{ position: "sticky", top: "24px" }}>
              {/* Live Preview badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  background: "white",
                  border: "1.5px solid #bfdbfe",
                  borderRadius: "20px",
                  padding: "5px 14px",
                  marginBottom: "12px",
                  boxShadow: "0 1px 4px rgba(37,99,235,0.1)",
                }}
              >
                <div className="live-dot" />
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#2563eb",
                    fontFamily: "'Syne',sans-serif",
                  }}
                >
                  Live Preview
                </span>
              </div>

              {/* Trip Preview card */}
              <div className="preview-card slide-in">
                <div className="preview-label">
                  <div className="live-dot" />
                  Trip Preview
                </div>

                {/* Driver row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "14px",
                  }}
                >
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <div
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg,#1e40af,#2563eb)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: "14px",
                        color: "white",
                        border: "2px solid #bfdbfe",
                      }}
                    >
                      EO
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-2px",
                        right: "-2px",
                        width: "14px",
                        height: "14px",
                        background: "#2563eb",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid white",
                      }}
                    >
                      <svg width="7" height="7" fill="none" viewBox="0 0 12 12">
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="white"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#1e293b",
                      }}
                    >
                      Emeka Okonkwo ·{" "}
                      <span style={{ color: "#f59e0b" }}>★</span>4.9
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "13px",
                        marginTop: "2px",
                      }}
                    >
                      <span style={{ color: "#2563eb", fontWeight: 500 }}>
                        {fromCity}
                      </span>
                      <svg
                        width="14"
                        height="14"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          stroke="#2563eb"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span style={{ color: "#1e293b", fontWeight: 500 }}>
                        {toCity}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#94a3b8",
                        marginTop: "2px",
                      }}
                    >
                      {formattedDate} · {time || "—"} · {seats} seats
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    borderTop: "1px solid #f1f5f9",
                    paddingTop: "12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "13px", color: "#64748b" }}>
                      Price per seat
                    </span>
                    <span
                      style={{
                        fontFamily: "'Syne',sans-serif",
                        fontWeight: 800,
                        fontSize: "22px",
                        color: "#2563eb",
                      }}
                    >
                      ₦{price.toLocaleString()}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "13px", color: "#64748b" }}>
                      Max earnings ({seats} seats)
                    </span>
                    <span
                      style={{
                        fontFamily: "'Syne',sans-serif",
                        fontWeight: 700,
                        fontSize: "15px",
                        color: "#f59e0b",
                      }}
                    >
                      ₦{maxEarnings.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Vehicle card */}
              <div
                style={{
                  background: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "14px",
                  padding: "16px 18px",
                  marginBottom: "16px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#1e293b",
                    marginBottom: "8px",
                    fontFamily: "'Syne',sans-serif",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  🚗 Vehicle
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#1e293b",
                  }}
                >
                  Toyota Hiace · BLACK
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#94a3b8",
                    marginTop: "2px",
                  }}
                >
                  LSD-432-AE · 8 passenger seats
                </div>
              </div>

              {/* Notes preview — only show if filled */}
              {(restStops || notes) && (
                <div
                  style={{
                    background: "#f0f7ff",
                    border: "1px solid #bfdbfe",
                    borderRadius: "14px",
                    padding: "14px 16px",
                    marginBottom: "16px",
                  }}
                >
                  {restStops && (
                    <div
                      style={{
                        fontSize: "12px",
                        color: "#1e40af",
                        marginBottom: notes ? "6px" : 0,
                      }}
                    >
                      🛑 Rest stop: {restStops}
                    </div>
                  )}
                  {notes && (
                    <div style={{ fontSize: "12px", color: "#1e40af" }}>
                      📌 {notes}
                    </div>
                  )}
                </div>
              )}

              {/* Validation check */}
              <div
                style={{
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "12px 16px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#94a3b8",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    marginBottom: "10px",
                  }}
                >
                  Trip Checklist
                </div>
                {[
                  { label: `Route: ${fromCity} → ${toCity}`, ok: from !== to },
                  { label: `Date: ${formattedDate}`, ok: !!date },
                  { label: `Time: ${time}`, ok: !!time },
                  { label: `Seats: ${seats}`, ok: seats >= 1 },
                  {
                    label: `Price: ₦${price.toLocaleString()}`,
                    ok: price >= 500,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "6px",
                      fontSize: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        background: item.ok ? "#dbeafe" : "#fee2e2",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {item.ok ? (
                        <svg
                          width="8"
                          height="8"
                          fill="none"
                          viewBox="0 0 12 12"
                        >
                          <path
                            d="M2 6l3 3 5-5"
                            stroke="#2563eb"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="8"
                          height="8"
                          fill="none"
                          viewBox="0 0 12 12"
                        >
                          <path
                            d="M3 3l6 6M9 3L3 9"
                            stroke="#ef4444"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </div>
                    <span style={{ color: item.ok ? "#475569" : "#ef4444" }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <button
                className="publish-btn"
                onClick={handlePublish}
                disabled={publishing || from === to || price < 500}
              >
                {publishing ? (
                  <>
                    <svg
                      className="spin"
                      width="16"
                      height="16"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="white"
                        strokeWidth="3"
                        strokeOpacity="0.3"
                      />
                      <path
                        d="M12 2a10 10 0 0110 10"
                        stroke="white"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                    Publishing...
                  </>
                ) : (
                  <>
                    <span>🚀</span> Publish Trip
                  </>
                )}
              </button>
              <button className="draft-btn">💾 Save as Draft</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
