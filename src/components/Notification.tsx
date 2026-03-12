"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, AlertTriangle, X } from "lucide-react";

export type NotificationType = "success" | "error";

interface NotificationProps {
  message: string;
  type: NotificationType;
  onClose: () => void;
}

const iconMap = {
  success: <CheckCircle2 size={20} />,
  error: <AlertTriangle size={20} />,
};

const colorMap = {
  success: "bg-green-500/95 border-green-600",
  error: "bg-red-500/95 border-red-600",
};

export default function Notification({
  message,
  type,
  onClose,
}: NotificationProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Animate in
    setVisible(true);

    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setVisible(false);
    // Allow time for animation before calling parent onClose
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed top-5 right-5 z-[200] flex items-start gap-4 max-w-sm w-full p-4 rounded-2xl text-white shadow-2xl border transition-all duration-300 ease-in-out ${
        colorMap[type]
      } ${visible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"}`}
    >
      <div className="shrink-0 mt-0.5">{iconMap[type]}</div>
      <p className="flex-1 text-sm font-bold leading-snug">{message}</p>
      <button
        onClick={handleClose}
        className="p-1 -m-1 rounded-full hover:bg-white/20 transition-colors"
      >
        <X size={16} />
      </button>
    </div>
  );
}
