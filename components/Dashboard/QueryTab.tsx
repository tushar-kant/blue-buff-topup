"use client";

import { JSX, useState } from "react";
import {
  FaPhoneAlt,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

/* ===================== ENV ===================== */

const SUPPORT_CONFIG = {
  header: {
    title:
      process.env.NEXT_PUBLIC_SUPPORT_TITLE || "Support Center",
    subtitle:
      process.env.NEXT_PUBLIC_SUPPORT_SUBTITLE ||
      "Contact support for help.",
  },

  contacts: {
    title: "Contact Us Directly",
    items: [
      {
        id: "phone",
        title: "Call Support",
        value: process.env.NEXT_PUBLIC_SUPPORT_PHONE,
        href: process.env.NEXT_PUBLIC_SUPPORT_PHONE_TEL,
        icon: "phone",
        external: false,
      },
      {
        id: "instagram",
        title: "Instagram",
        value: process.env.NEXT_PUBLIC_SUPPORT_INSTAGRAM_LABEL,
        href: process.env.NEXT_PUBLIC_SUPPORT_INSTAGRAM_URL,
        icon: "instagram",
        external: true,
      },
      {
        id: "youtube",
        title: "YouTube",
        value: process.env.NEXT_PUBLIC_SUPPORT_YOUTUBE_LABEL,
        href: process.env.NEXT_PUBLIC_SUPPORT_YOUTUBE_URL,
        icon: "youtube",
        external: true,
      },
      {
        id: "whatsapp",
        title: "WhatsApp Group",
        value: process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP_LABEL,
        href: process.env.NEXT_PUBLIC_SUPPORT_WHATSAPP_URL,
        icon: "whatsapp",
        external: true,
      },
    ].filter(
      (item) => item.value && item.href
    ), // safety
  },

  queryTypes: [
    "Order Issue",
    "Payment Issue",
    "Wallet Issue",
    "General Inquiry",
  ],
};

/* ===================== ICON MAP ===================== */

const ICON_MAP: Record<string, JSX.Element> = {
  phone: <FaPhoneAlt />,
  instagram: <FaInstagram />,
  youtube: <FaYoutube />,
  whatsapp: <FaWhatsapp />,
};

/* ===================== COMPONENT ===================== */

export default function QueryTab() {
  const [queryType, setQueryType] = useState("");
  const [queryMessage, setQueryMessage] = useState("");
  const [querySuccess, setQuerySuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!queryType) return;

    setIsSubmitting(true);

    const storedEmail = localStorage.getItem("email");
    const storedPhone = localStorage.getItem("phone");

    try {
      const res = await fetch("/api/support/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: storedEmail || null,
          phone: storedPhone || null,
          type: queryType,
          message: queryMessage,
        }),
      });

      const data = await res.json();

      setQuerySuccess(
        data.success
          ? "Your query has been submitted successfully."
          : data.message || "Something went wrong."
      );

      setQueryType("");
      setQueryMessage("");
    } catch {
      setQuerySuccess("Failed to submit query. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">
          {SUPPORT_CONFIG.header.title}
        </h2>
        <p className="text-sm text-[var(--muted)] max-w-lg">
          {SUPPORT_CONFIG.header.subtitle}
        </p>
      </div>

      {/* Contacts */}
      <div className="rounded-2xl border bg-[var(--card)] p-6">
        <h3 className="text-lg font-semibold mb-4">
          {SUPPORT_CONFIG.contacts.title}
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          {SUPPORT_CONFIG.contacts.items.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              className="flex gap-4 rounded-xl border p-4 hover:border-[var(--accent)] transition"
            >
              <div className="p-3 rounded-xl bg-[var(--accent)]/10 text-[var(--accent)] text-lg">
                {ICON_MAP[item.icon]}
              </div>

              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-[var(--muted)]">
                  {item.value}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Query Form */}
      <div className="rounded-2xl border bg-[var(--card)] p-6">
        <h3 className="text-lg font-semibold mb-5">
          Submit a Query
        </h3>

        {querySuccess && (
          <div className="mb-4 rounded-xl bg-green-500/10 text-green-500 px-4 py-2 text-sm">
            {querySuccess}
          </div>
        )}

        <select
          value={queryType}
          onChange={(e) => setQueryType(e.target.value)}
          className="w-full mb-4 p-3 rounded-xl border bg-[var(--background)]"
        >
          <option value="">Select Query Type</option>
          {SUPPORT_CONFIG.queryTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>

        <textarea
          value={queryMessage}
          onChange={(e) => setQueryMessage(e.target.value)}
          placeholder="Describe your issue in detail..."
          className="w-full h-32 mb-4 p-3 rounded-xl border bg-[var(--background)] resize-none"
        />

        <button
          disabled={!queryType || isSubmitting}
          onClick={handleSubmit}
          className={`w-full py-3 rounded-xl font-medium ${
            !queryType || isSubmitting
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-[var(--accent)] hover:opacity-90"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Query"}
        </button>
      </div>
    </div>
  );
}
