"use client";

import { useState, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type UploadState = { name: string; size: string } | null;

type Step1Data = {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  dob: string;
  address: string;
  city: string;
};

type Step2Data = {
  licenseFront: UploadState;
  licenseBack: UploadState;
  licenseNumber: string;
  licenseExpiry: string;
  nin: string;
  ninDoc: UploadState;
  selfie: UploadState;
};

type Step3Data = {
  emergencyName: string;
  emergencyPhone: string;
  emergencyRel: string;
  guarantorName: string;
  guarantorPhone: string;
  guarantorAddress: string;
  guarantorRelOccupation: string;
};

type Step4Data = {
  make: string;
  model: string;
  year: string;
  color: string;
  plate: string;
  seats: number;
  vin: string;
  photos: { label: string; file: UploadState }[];
  regCert: UploadState;
  insurance: UploadState;
  roadWorthy: UploadState;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fakeUpload(name: string): UploadState {
  const kb = Math.floor(Math.random() * 2000 + 400);
  const size = kb > 1000 ? `${(kb / 1000).toFixed(1)}MB` : `${kb}KB`;
  return { name, size };
}

// ─── Shared field components ──────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <label
      style={{
        display: "block",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: "#94a3b8",
        marginBottom: "7px",
      }}
    >
      {children}
    </label>
  );
}

function Input({
  placeholder,
  value,
  onChange,
  type = "text",
  maxLength,
}: {
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  maxLength?: number;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      maxLength={maxLength}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        background: "#f8fafc",
        border: "1.5px solid #e2e8f0",
        borderRadius: "12px",
        padding: "11px 14px",
        fontSize: "14px",
        color: "#1e293b",
        fontFamily: "'DM Sans',sans-serif",
        outline: "none",
        transition: "border-color 0.15s, box-shadow 0.15s",
        boxSizing: "border-box",
      }}
      onFocus={(e) => {
        e.target.style.borderColor = "#2563eb";
        e.target.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.1)";
        e.target.style.background = "#fff";
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "#e2e8f0";
        e.target.style.boxShadow = "none";
        e.target.style.background = "#f8fafc";
      }}
    />
  );
}

function Select({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        background: "#f8fafc",
        border: "1.5px solid #e2e8f0",
        borderRadius: "12px",
        padding: "11px 14px",
        fontSize: "14px",
        color: value ? "#1e293b" : "#94a3b8",
        fontFamily: "'DM Sans',sans-serif",
        outline: "none",
        cursor: "pointer",
        appearance: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5' stroke-linecap='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 12px center",
        paddingRight: "36px",
      }}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function UploadZone({
  label,
  hint,
  uploaded,
  onUpload,
  icon = "📷",
}: {
  label: string;
  hint: string;
  uploaded: UploadState;
  onUpload: (f: UploadState) => void;
  icon?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div
      onClick={() => ref.current?.click()}
      style={{
        background: uploaded ? "#eff6ff" : "#f8fafc",
        border: `2px dashed ${uploaded ? "#93c5fd" : "#cbd5e1"}`,
        borderRadius: "14px",
        padding: "24px 16px",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.15s",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        if (!uploaded)
          (e.currentTarget as HTMLElement).style.borderColor = "#2563eb";
      }}
      onMouseLeave={(e) => {
        if (!uploaded)
          (e.currentTarget as HTMLElement).style.borderColor = "#cbd5e1";
      }}
    >
      <input
        ref={ref}
        type="file"
        style={{ display: "none" }}
        onChange={(e) => {
          if (e.target.files?.[0]) onUpload(fakeUpload(e.target.files[0].name));
        }}
      />
      {uploaded && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "#2563eb",
            color: "white",
            fontSize: "10px",
            fontWeight: 700,
            padding: "3px 9px",
            borderRadius: "20px",
          }}
        >
          ✓ Uploaded
        </div>
      )}
      <div style={{ fontSize: "28px", marginBottom: "8px" }}>
        {uploaded ? "🪪" : icon}
      </div>
      <div
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: uploaded ? "#1d4ed8" : "#475569",
          marginBottom: "3px",
        }}
      >
        {label}
      </div>
      <div
        style={{ fontSize: "11px", color: uploaded ? "#2563eb" : "#94a3b8" }}
      >
        {uploaded ? `${uploaded.name} · ${uploaded.size}` : hint}
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: "11px",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        color: "#94a3b8",
        marginBottom: "12px",
        marginTop: "20px",
      }}
    >
      {children}
    </div>
  );
}

// ─── Step components ──────────────────────────────────────────────────────────
function Step1({
  data,
  setData,
}: {
  data: Step1Data;
  setData: (d: Step1Data) => void;
}) {
  const set = (k: keyof Step1Data) => (v: string) =>
    setData({ ...data, [k]: v });
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "14px",
          marginBottom: "14px",
        }}
      >
        <div>
          <Label>First Name *</Label>
          <Input
            placeholder="e.g. Emeka"
            value={data.firstName}
            onChange={set("firstName")}
          />
        </div>
        <div>
          <Label>Last Name *</Label>
          <Input
            placeholder="e.g. Okonkwo"
            value={data.lastName}
            onChange={set("lastName")}
          />
        </div>
      </div>
      <div style={{ marginBottom: "14px" }}>
        <Label>Middle Name (Optional)</Label>
        <Input
          placeholder="e.g. Chukwuemeka"
          value={data.middleName}
          onChange={set("middleName")}
        />
      </div>
      <div style={{ marginBottom: "14px" }}>
        <Label>Email Address *</Label>
        <Input
          type="email"
          placeholder="emeka@example.com"
          value={data.email}
          onChange={set("email")}
        />
      </div>
      <div style={{ marginBottom: "14px" }}>
        <Label>Date of Birth * (Must be 21+)</Label>
        <Input type="date" value={data.dob} onChange={set("dob")} />
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}
      >
        <div>
          <Label>Street Address *</Label>
          <Input
            placeholder="e.g. 14 Adeola Odeku Street"
            value={data.address}
            onChange={set("address")}
          />
        </div>
        <div>
          <Label>City / State *</Label>
          <Input
            placeholder="e.g. Lagos, Lagos State"
            value={data.city}
            onChange={set("city")}
          />
        </div>
      </div>
    </div>
  );
}

function Step2({
  data,
  setData,
}: {
  data: Step2Data;
  setData: (d: Step2Data) => void;
}) {
  const set = (k: keyof Step2Data) => (v: any) => setData({ ...data, [k]: v });
  return (
    <div>
      <SectionLabel>Driver's License</SectionLabel>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          marginBottom: "14px",
        }}
      >
        <UploadZone
          label="Front Side"
          hint="JPG, PNG or PDF"
          uploaded={data.licenseFront}
          onUpload={set("licenseFront")}
          icon="📷"
        />
        <UploadZone
          label="Back Side"
          hint="JPG, PNG or PDF"
          uploaded={data.licenseBack}
          onUpload={set("licenseBack")}
          icon="📷"
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "14px",
          marginBottom: "20px",
        }}
      >
        <div>
          <Label>License Number</Label>
          <Input
            placeholder="e.g. FCT-20240001"
            value={data.licenseNumber}
            onChange={set("licenseNumber")}
          />
        </div>
        <div>
          <Label>Expiry Date</Label>
          <Input
            type="date"
            value={data.licenseExpiry}
            onChange={set("licenseExpiry")}
          />
        </div>
      </div>

      <SectionLabel>National ID (NIN)</SectionLabel>
      <div style={{ marginBottom: "14px" }}>
        <Label>NIN Number</Label>
        <Input
          placeholder="11-digit NIN e.g. 12345678901"
          value={data.nin}
          onChange={set("nin")}
          maxLength={11}
        />
      </div>

      <SectionLabel>Verification Selfie</SectionLabel>
      <div
        style={{
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          borderRadius: "12px",
          padding: "14px 16px",
          marginBottom: "12px",
          fontSize: "13px",
          color: "#1d4ed8",
        }}
      >
        📸 <strong>How to take your verification selfie:</strong> Hold your
        driver's license next to your face. Both your face and the license text
        must be clearly visible.
      </div>
      <UploadZone
        label="Upload Verification Selfie"
        hint="Face + ID card clearly visible · JPG/PNG · Max 5MB"
        uploaded={data.selfie}
        onUpload={set("selfie")}
        icon="🤳"
      />
    </div>
  );
}

function Step3({
  data,
  setData,
}: {
  data: Step3Data;
  setData: (d: Step3Data) => void;
}) {
  const set = (k: keyof Step3Data) => (v: string) =>
    setData({ ...data, [k]: v });
  return (
    <div>
      <SectionLabel>Emergency Contact</SectionLabel>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "14px",
          marginBottom: "14px",
        }}
      >
        <div>
          <Label>Full Name *</Label>
          <Input
            placeholder="e.g. Chioma Okonkwo"
            value={data.emergencyName}
            onChange={set("emergencyName")}
          />
        </div>
        <div>
          <Label>Phone Number *</Label>
          <Input
            type="tel"
            placeholder="+234 800 000 0000"
            value={data.emergencyPhone}
            onChange={set("emergencyPhone")}
          />
        </div>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Label>Relationship</Label>
        <Select
          value={data.emergencyRel}
          onChange={set("emergencyRel")}
          placeholder="Select relationship"
          options={["Spouse", "Parent", "Sibling", "Friend", "Other"]}
        />
      </div>

      <SectionLabel>Guarantor Information</SectionLabel>
      <div
        style={{
          background: "#eff6ff",
          border: "1px solid #bfdbfe",
          borderRadius: "12px",
          padding: "12px 16px",
          marginBottom: "14px",
          fontSize: "13px",
          color: "#1d4ed8",
        }}
      >
        👤 Your guarantor must be someone who can vouch for your character and
        will be contacted for verification.
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "14px",
          marginBottom: "14px",
        }}
      >
        <div>
          <Label>Guarantor Full Name *</Label>
          <Input
            placeholder="e.g. Adebayo Fashola"
            value={data.guarantorName}
            onChange={set("guarantorName")}
          />
        </div>
        <div>
          <Label>Guarantor Phone *</Label>
          <Input
            type="tel"
            placeholder="+234 800 000 0000"
            value={data.guarantorPhone}
            onChange={set("guarantorPhone")}
          />
        </div>
      </div>
      <div style={{ marginBottom: "14px" }}>
        <Label>Guarantor Residential Address *</Label>
        <Input
          placeholder="Full address including city and state"
          value={data.guarantorAddress}
          onChange={set("guarantorAddress")}
        />
      </div>
      <div>
        <Label>Relationship / Occupation</Label>
        <Input
          placeholder="e.g. Childhood friend, Civil Servant at NNPC"
          value={data.guarantorRelOccupation}
          onChange={set("guarantorRelOccupation")}
        />
      </div>
    </div>
  );
}

function Step4({
  data,
  setData,
}: {
  data: Step4Data;
  setData: (d: Step4Data) => void;
}) {
  const set = (k: keyof Step4Data) => (v: any) => setData({ ...data, [k]: v });
  const setPhoto = (i: number) => (f: UploadState) => {
    const photos = [...data.photos];
    photos[i] = { ...photos[i], file: f };
    setData({ ...data, photos });
  };
  return (
    <div>
      <SectionLabel>Vehicle Details</SectionLabel>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "14px",
          marginBottom: "14px",
        }}
      >
        <div>
          <Label>Vehicle Make *</Label>
          <Select
            value={data.make}
            onChange={set("make")}
            placeholder="Select make"
            options={[
              "Toyota",
              "Honda",
              "Mercedes",
              "Ford",
              "Hyundai",
              "Kia",
              "Mitsubishi",
              "Nissan",
              "Other",
            ]}
          />
        </div>
        <div>
          <Label>Vehicle Model *</Label>
          <Input
            placeholder="e.g. Hiace, Camry, Accord"
            value={data.model}
            onChange={set("model")}
          />
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "14px",
          marginBottom: "14px",
        }}
      >
        <div>
          <Label>Year *</Label>
          <Select
            value={data.year}
            onChange={set("year")}
            placeholder="Year"
            options={Array.from({ length: 26 }, (_, i) =>
              (2025 - i).toString()
            )}
          />
        </div>
        <div>
          <Label>Color *</Label>
          <Select
            value={data.color}
            onChange={set("color")}
            placeholder="Color"
            options={[
              "Black",
              "White",
              "Silver",
              "Grey",
              "Blue",
              "Red",
              "Green",
              "Gold",
              "Brown",
              "Other",
            ]}
          />
        </div>
        <div>
          <Label>Plate Number *</Label>
          <Input
            placeholder="e.g. LSD-432-AE"
            value={data.plate}
            onChange={set("plate")}
          />
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "14px",
          marginBottom: "14px",
        }}
      >
        <div>
          <Label>Passenger Seats *</Label>
          <input
            type="number"
            min={1}
            max={14}
            value={data.seats}
            onChange={(e) => set("seats")(Number(e.target.value) as any)}
            style={{
              width: "100%",
              background: "#f8fafc",
              border: "1.5px solid #e2e8f0",
              borderRadius: "12px",
              padding: "11px 14px",
              fontSize: "14px",
              color: "#1e293b",
              fontFamily: "'DM Sans',sans-serif",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          <p style={{ fontSize: "11px", color: "#94a3b8", marginTop: "5px" }}>
            Excludes driver's seat
          </p>
        </div>
        <div>
          <Label>VIN (17 characters)</Label>
          <Input
            placeholder="e.g. 1HGBH41JXMN109186"
            value={data.vin}
            onChange={set("vin")}
            maxLength={17}
          />
        </div>
      </div>

      <SectionLabel>Vehicle Photos (5 Required)</SectionLabel>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {data.photos.map((p, i) => (
          <UploadZone
            key={p.label}
            label={p.label}
            hint="JPG/PNG · Max 5MB"
            uploaded={p.file}
            onUpload={setPhoto(i)}
            icon="📸"
          />
        ))}
      </div>

      <SectionLabel>Vehicle Documents</SectionLabel>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "10px",
        }}
      >
        <UploadZone
          label="Registration Cert."
          hint="Current & valid"
          uploaded={data.regCert}
          onUpload={set("regCert")}
          icon="📋"
        />
        <UploadZone
          label="Insurance Cert."
          hint="Min 30 days valid"
          uploaded={data.insurance}
          onUpload={set("insurance")}
          icon="🛡️"
        />
        <UploadZone
          label="Road Worthiness"
          hint="Not expired"
          uploaded={data.roadWorthy}
          onUpload={set("roadWorthy")}
          icon="🔧"
        />
      </div>
    </div>
  );
}

// ─── Stepper ──────────────────────────────────────────────────────────────────
function Stepper({ current }: { current: number }) {
  const steps = ["Personal Info", "Documents", "Guarantor", "Vehicle"];
  return (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "28px" }}
    >
      {steps.map((label, i) => {
        const num = i + 1;
        const done = num < current;
        const active = num === current;
        return (
          <div
            key={label}
            style={{ display: "flex", flex: 1, alignItems: "center" }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: done ? "#2563eb" : active ? "#eff6ff" : "#f1f5f9",
                  border: `2px solid ${done || active ? "#2563eb" : "#cbd5e1"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: done ? "white" : active ? "#2563eb" : "#94a3b8",
                  transition: "all 0.2s",
                }}
              >
                {done ? (
                  <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                    <path
                      d="M2.5 7l3 3 6-6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  num
                )}
              </div>
              <span
                style={{
                  fontSize: "11px",
                  marginTop: "6px",
                  fontWeight: active ? 700 : 500,
                  color: active ? "#2563eb" : done ? "#64748b" : "#94a3b8",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: "2px",
                  background: done ? "#2563eb" : "#e2e8f0",
                  margin: "0 4px",
                  marginBottom: "18px",
                  transition: "background 0.3s",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DriverRegistration() {
  const [step, setStep] = useState(2);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const [step1, setStep1] = useState<Step1Data>({
    firstName: "",
    lastName: "",
    middleName: "",
    email: "",
    dob: "",
    address: "",
    city: "",
  });
  const [step2, setStep2] = useState<Step2Data>({
    licenseFront: null,
    licenseBack: fakeUpload("license_back.jpg"),
    licenseNumber: "",
    licenseExpiry: "",
    nin: "",
    ninDoc: null,
    selfie: null,
  });
  const [step3, setStep3] = useState<Step3Data>({
    emergencyName: "",
    emergencyPhone: "",
    emergencyRel: "",
    guarantorName: "",
    guarantorPhone: "",
    guarantorAddress: "",
    guarantorRelOccupation: "",
  });
  const [step4, setStep4] = useState<Step4Data>({
    make: "",
    model: "",
    year: "",
    color: "",
    plate: "",
    seats: 4,
    vin: "",
    photos: [
      { label: "Front View", file: null },
      { label: "Back View", file: null },
      { label: "Left Side", file: null },
      { label: "Right Side", file: null },
      { label: "Interior", file: null },
    ],
    regCert: null,
    insurance: null,
    roadWorthy: null,
  });

  const stepLabels = [
    "Personal Info",
    "Verification Documents",
    "Emergency & Guarantor",
    "Vehicle Info",
  ];
  const stepIcons = ["👤", "🪪", "🤝", "🚗"];

  function handleNext() {
    if (step < 4) {
      setLoading(true);
      setTimeout(() => {
        setStep((s) => s + 1);
        setLoading(false);
      }, 500);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setDone(true);
      }, 1800);
    }
  }

  if (done) {
    return (
      <>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap'); .dr * { box-sizing:border-box; } .dr { font-family:'DM Sans',sans-serif; }`}</style>
        <div
          className="dr"
          style={{
            background: "#f8fafc",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "400px" }}>
            <div
              style={{
                width: "80px",
                height: "80px",
                background: "#dbeafe",
                border: "1px solid #93c5fd",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "36px",
                margin: "0 auto 24px",
                animation: "bounce 1s infinite",
              }}
            >
              ✅
            </div>
            <h2
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: "24px",
                fontWeight: 800,
                color: "#1e293b",
                marginBottom: "8px",
              }}
            >
              Application Submitted!
            </h2>
            <p
              style={{
                color: "#64748b",
                fontSize: "14px",
                marginBottom: "8px",
              }}
            >
              Your driver application is under review. You'll hear from us
              within <strong style={{ color: "#2563eb" }}>24–48 hours</strong>.
            </p>
            <p
              style={{
                color: "#94a3b8",
                fontSize: "13px",
                marginBottom: "28px",
              }}
            >
              Reference:{" "}
              <span
                style={{
                  fontFamily: "monospace",
                  background: "#eff6ff",
                  padding: "2px 8px",
                  borderRadius: "6px",
                  color: "#1d4ed8",
                }}
              >
                BR-DRV-{Date.now().toString().slice(-6)}
              </span>
            </p>
            <button
              onClick={() => {
                setDone(false);
                setStep(1);
              }}
              style={{
                padding: "12px 28px",
                background: "#2563eb",
                color: "white",
                borderRadius: "12px",
                border: "none",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              Back to Start
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
        .dr * { box-sizing: border-box; }
        .dr { font-family: 'DM Sans', sans-serif; }
        .step-fade { animation: fadeUp 0.3s ease-out both; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
        @keyframes bounce { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
      `}</style>

      <div
        className="dr"
        style={{
          background: "#f8fafc",
          minHeight: "100vh",
          padding: "40px 24px",
        }}
      >
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          {/* Page heading */}
          <div style={{ marginBottom: "32px" }}>
            <h1
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: "28px",
                fontWeight: 800,
                color: "#1e293b",
                marginBottom: "4px",
              }}
            >
              Driver Registration
            </h1>
            <p style={{ fontSize: "14px", color: "#64748b" }}>
              Complete all 4 steps to get verified and start driving on
              BloomRydes.
            </p>
          </div>

          {/* Card */}
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              border: "1px solid #e2e8f0",
              padding: "32px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }}
          >
            {/* Step badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                borderRadius: "20px",
                padding: "5px 14px",
                marginBottom: "24px",
              }}
            >
              <span style={{ fontSize: "12px" }}>📌</span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#2563eb",
                  fontFamily: "'Syne',sans-serif",
                }}
              >
                Step {step} of 4 — {stepLabels[step - 1]}
              </span>
            </div>

            {/* Stepper */}
            <Stepper current={step} />

            {/* Step heading */}
            <div className="step-fade" key={`heading-${step}`}>
              <h2
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#1e293b",
                  marginBottom: "4px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span>{stepIcons[step - 1]}</span> {stepLabels[step - 1]}
              </h2>
              <p
                style={{
                  fontSize: "13px",
                  color: "#94a3b8",
                  marginBottom: "24px",
                }}
              >
                {step === 1 &&
                  "Provide your personal details exactly as they appear on your government-issued ID."}
                {step === 2 &&
                  "These are required to verify your identity before you can drive on BloomRydes."}
                {step === 3 &&
                  "We'll contact these people to verify your character and reliability."}
                {step === 4 &&
                  "Tell us about the vehicle you'll be using to transport passengers."}
              </p>
            </div>

            {/* Progress bar */}
            <div
              style={{
                height: "4px",
                background: "#f1f5f9",
                borderRadius: "4px",
                marginBottom: "28px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: "4px",
                  background: "linear-gradient(90deg,#2563eb,#60a5fa)",
                  width: `${(step / 4) * 100}%`,
                  transition: "width 0.4s ease",
                }}
              />
            </div>

            {/* Step content */}
            <div className="step-fade" key={`step-${step}`}>
              {step === 1 && <Step1 data={step1} setData={setStep1} />}
              {step === 2 && <Step2 data={step2} setData={setStep2} />}
              {step === 3 && <Step3 data={step3} setData={setStep3} />}
              {step === 4 && <Step4 data={step4} setData={setStep4} />}
            </div>

            {/* Navigation */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "32px",
                paddingTop: "24px",
                borderTop: "1px solid #f1f5f9",
              }}
            >
              <button
                onClick={() => step > 1 && setStep((s) => s - 1)}
                disabled={step === 1}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "11px 22px",
                  background: "white",
                  border: "1.5px solid #e2e8f0",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: step === 1 ? "#cbd5e1" : "#475569",
                  cursor: step === 1 ? "not-allowed" : "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  if (step > 1) {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "#94a3b8";
                    (e.currentTarget as HTMLElement).style.color = "#1e293b";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "#e2e8f0";
                  (e.currentTarget as HTMLElement).style.color =
                    step === 1 ? "#cbd5e1" : "#475569";
                }}
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path
                    d="M19 12H5M11 6l-6 6 6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
                Back
              </button>

              {/* Step dots */}
              <div style={{ display: "flex", gap: "6px" }}>
                {[1, 2, 3, 4].map((n) => (
                  <div
                    key={n}
                    style={{
                      width: n === step ? "20px" : "6px",
                      height: "6px",
                      borderRadius: "20px",
                      background:
                        n === step
                          ? "#2563eb"
                          : n < step
                          ? "#93c5fd"
                          : "#e2e8f0",
                      transition: "all 0.3s",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={loading}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "11px 26px",
                  background: loading ? "#93c5fd" : "#2563eb",
                  border: "none",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "white",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "'Syne',sans-serif",
                  boxShadow: "0 4px 14px rgba(37,99,235,0.3)",
                  transition: "all 0.15s",
                  transform: "translateY(0)",
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    (e.currentTarget as HTMLElement).style.background =
                      "#1d4ed8";
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = loading
                    ? "#93c5fd"
                    : "#2563eb";
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                }}
              >
                {loading ? (
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
                    {step === 4 ? "Submitting..." : "Saving..."}
                  </>
                ) : (
                  <>
                    {step === 4 ? "Submit Application" : "Save & Continue"}
                    {step < 4 && (
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          stroke="white"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Auto-save hint */}
          <p
            style={{
              textAlign: "center",
              fontSize: "12px",
              color: "#94a3b8",
              marginTop: "16px",
            }}
          >
            🔒 Progress auto-saved · You can exit and continue later
          </p>
        </div>
      </div>
    </>
  );
}
