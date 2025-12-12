"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { FiPlus } from "react-icons/fi";
import { FaUser } from "react-icons/fa";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [userName, setUserName] = useState("");

  // Load login data
  useEffect(() => {
    const logged = localStorage.getItem("isLoggedIn") === "true";
    const balance = localStorage.getItem("walletBalance");
    const name = localStorage.getItem("userName");

    setIsLoggedIn(logged);
    if (balance) setWalletBalance(Number(balance));
    if (name) setUserName(name);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setWalletBalance(0);
    setUserName("");
    window.location.href = "/";
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md shadow-md bg-[var(--card)]/80 border-b border-[var(--border)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

          {/* ---------------- LOGO ---------------- */}
          <Link href="/" className="text-2xl font-bold flex items-center gap-1">
            <span className="text-[var(--accent)]">Blue</span>
            <span className="animated-underline" style={{ color: "var(--foreground)" }}>
              Buff
            </span>
          </Link>

          {/* ---------------- DESKTOP NAV ---------------- */}
          <nav className="hidden md:flex items-center space-x-6 text-[var(--muted)]">
            <Link href="/" className="hover:text-[var(--foreground)]">Home</Link>
            <Link href="/region" className="hover:text-[var(--foreground)]">Region</Link>
            <Link href="/services" className="hover:text-[var(--foreground)]">Services</Link>
          </nav>

          {/* ---------------- RIGHT SIDE (THEME + USER) ---------------- */}
          <div className="flex items-center gap-4 relative">

            <ThemeToggle />

            {/* User Menu Toggle */}
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-10 h-10 rounded-full bg-[var(--accent)] text-white flex items-center justify-center font-bold"
            >
              {isLoggedIn ? userName?.charAt(0)?.toUpperCase() : <FaUser />}
            </button>

            {/* ---------------- USER DROPDOWN ---------------- */}
            {userMenuOpen && (
              <div className="absolute right-0 top-14 w-60 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-lg p-4 z-50">

                {!isLoggedIn ? (
                  <>
                    <Link
                      href="/login"
                      className="block py-2 hover:text-[var(--accent)]"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Login / Register
                    </Link>
                  </>
                ) : (
                  <>
                    {/* Wallet */}
                    <div className="flex items-center justify-between bg-[var(--background)] px-3 py-2 rounded-lg border border-[var(--border)] mb-3">
                      <span className="text-[var(--accent)] font-semibold">
                        ₹{walletBalance}
                      </span>
                      <button
                        onClick={() => alert("Add wallet coming soon")}
                        className="text-[var(--accent)]"
                      >
                        <FiPlus size={18} />
                      </button>
                    </div>

                    {/* Dashboard */}
                    <Link
                      href="/dashboard"
                      className="block py-2 hover:text-[var(--accent)]"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Dashboard
                    </Link>

                    {/* Logout */}
                    <button
                      onClick={handleLogout}
                      className="block text-left w-full py-2 text-red-500 hover:text-red-400"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Mobile Menu Icon */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-[var(--foreground)] text-3xl"
            >
              {menuOpen ? "✕" : "☰"}
            </button>

          </div>
        </div>

        {/* ---------------- MOBILE NAV ---------------- */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            menuOpen ? "max-h-[300px]" : "max-h-0"
          } bg-[var(--card)] border-t border-[var(--border)]`}
        >
          <nav className="flex flex-col px-6 py-4 space-y-4 text-[var(--muted)]">
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/region" onClick={() => setMenuOpen(false)}>Region</Link>
            <Link href="/services" onClick={() => setMenuOpen(false)}>Services</Link>
          </nav>
        </div>
      </header>
    </>
  );
}
