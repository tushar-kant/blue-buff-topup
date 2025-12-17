"use client";

import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const STORAGE_KEY = "hide_whatsapp_banner";
const WHATSAPP_CHANNEL_URL =
  "https://whatsapp.com/channel/0029Vb6hFflB4hdQnstejY05";

export default function TopNoticeBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hidden = sessionStorage.getItem(STORAGE_KEY);
    if (!hidden) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div
      onClick={() =>
        window.open(WHATSAPP_CHANNEL_URL, "_blank", "noopener,noreferrer")
      }
      className="
        w-full cursor-pointer
        bg-gradient-to-r
        from-[var(--accent)]
        via-[var(--accent-secondary)]
        to-[var(--accent)]
        text-[var(--foreground)]
        shadow-md
        border-b border-[var(--border)]
      "
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="rounded-full p-2 bg-green-500/90 text-white shadow">
            <FaWhatsapp size={18} />
          </div>

          <div className="leading-tight">
            <p className="font-semibold text-sm md:text-base">
              Join our WhatsApp Channel
            </p>
            <p className="text-xs md:text-sm text-[var(--muted)]">
              Get instant offers, updates & announcements
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <span
            className="
              hidden sm:inline-flex items-center
              bg-white/90 text-black
              px-4 py-1.5 rounded-full
              text-sm font-semibold
              shadow-sm
            "
          >
            Join Channel
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              sessionStorage.setItem(STORAGE_KEY, "true");
              setVisible(false);
            }}
            className="rounded-full p-1 hover:bg-black/10 transition"
            aria-label="Close"
          >
            <FiX size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
