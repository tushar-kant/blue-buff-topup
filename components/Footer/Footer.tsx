"use client";

import Link from "next/link";
import {
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaHeart,
} from "react-icons/fa6";

/* ===================== ENV ===================== */

const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME || "MewJi";
const BRAND_DESCRIPTION =
  process.env.NEXT_PUBLIC_BRAND_DESCRIPTION ||
  "Fast, secure MLBB top-ups with instant delivery.";

const INSTAGRAM_URL = process.env.NEXT_PUBLIC_INSTAGRAM_URL!;
const WHATSAPP_URL = process.env.NEXT_PUBLIC_WHATSAPP_URL!;
const YOUTUBE_URL = process.env.NEXT_PUBLIC_YOUTUBE_URL!;

const MADE_BY_NAME = process.env.NEXT_PUBLIC_MADE_BY_NAME || "Blue Buff";
const MADE_BY_URL = process.env.NEXT_PUBLIC_MADE_BY_URL || "#";
const COPYRIGHT_NAME =
  process.env.NEXT_PUBLIC_COPYRIGHT_NAME || MADE_BY_NAME;

/* ===================== DERIVED ===================== */

const BRAND = {
  primary: BRAND_NAME.slice(0, 4),
  secondary: BRAND_NAME.slice(4),
  description: BRAND_DESCRIPTION,
};

const FOOTER_LINKS = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Region", href: "/region" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "About", href: "/about" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: INSTAGRAM_URL,
    icon: FaInstagram,
  },
  {
    label: "WhatsApp",
    href: WHATSAPP_URL,
    icon: FaWhatsapp,
  },
  {
    label: "YouTube",
    href: YOUTUBE_URL,
    icon: FaYoutube,
  },
];

/* ===================== COMPONENT ===================== */

export default function Footer() {
  return (
    <footer className="mt-16 bg-[var(--card)] text-[var(--muted)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-[var(--accent)] to-purple-500 bg-clip-text text-transparent">
            {BRAND.primary}
            <span className="text-[var(--foreground)]">
              {BRAND.secondary}
            </span>
          </h2>
          <p className="text-xs mt-2 max-w-[220px]">
            {BRAND.description}
          </p>
        </div>

        {/* Links */}
        {FOOTER_LINKS.map((section) => (
          <div key={section.title} className="flex flex-col gap-2">
            <h3 className="text-[var(--accent)] text-sm font-semibold">
              {section.title}
            </h3>
            {section.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs hover:text-[var(--accent)] transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}

        {/* Socials */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[var(--accent)] text-sm font-semibold">
            Connect With Us
          </h3>
          <div className="flex gap-4">
            {SOCIALS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="hover:text-[var(--accent)] hover:scale-110 transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[var(--border)] py-4 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            Made with{" "}
            <FaHeart className="inline w-3 h-3 text-[var(--accent)] animate-pulse mx-1" />
            by{" "}
            <a
              href={MADE_BY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              {MADE_BY_NAME}
            </a>
          </p>

          <p>
            © {new Date().getFullYear()} {COPYRIGHT_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
