"use client";

import { useState, useEffect } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("orders");

  // Dummy data — replace with API later
  const [totalOrders, setTotalOrders] = useState(12);
  const [walletBalance, setWalletBalance] = useState(350);
  const [userDetails, setUserDetails] = useState({
    name: "Demo User",
    email: "demo@example.com",
    phone: "9999999999",
  });

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("email");
    const storedPhone = localStorage.getItem("phone");
    const storedWallet = localStorage.getItem("walletBalance");

    setUserDetails({
      name: storedName || "Demo User",
      email: storedEmail || "demo@example.com",
      phone: storedPhone || "9999999999",
    });

    if (storedWallet) setWalletBalance(Number(storedWallet));
  }, []);

  return (
    <section className="px-6 py-10 min-h-screen bg-[var(--background)] text-[var(--foreground)]">

      {/* ------------------ TOP TAB CARDS ------------------ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">

        {/* Orders */}
        <div
          onClick={() => setActiveTab("orders")}
          className={`p-5 rounded-xl cursor-pointer shadow border 
          ${activeTab === "orders" ? "border-[var(--accent)] bg-[var(--card)]" : "border-[var(--border)] bg-[var(--card)]/60"}
        `}
        >
          <p className="text-sm text-[var(--muted)]">Total Orders</p>
          <h2 className="text-2xl font-bold mt-1">{totalOrders}</h2>
        </div>

        {/* Wallet */}
        <div
          onClick={() => setActiveTab("wallet")}
          className={`p-5 rounded-xl cursor-pointer shadow border 
          ${activeTab === "wallet" ? "border-[var(--accent)] bg-[var(--card)]" : "border-[var(--border)] bg-[var(--card)]/60"}
        `}
        >
          <p className="text-sm text-[var(--muted)]">Wallet Balance</p>
          <h2 className="text-2xl font-bold mt-1">₹{walletBalance}</h2>
        </div>

        {/* Account Details */}
        <div
          onClick={() => setActiveTab("account")}
          className={`p-5 rounded-xl cursor-pointer shadow border 
          ${activeTab === "account" ? "border-[var(--accent)] bg-[var(--card)]" : "border-[var(--border)] bg-[var(--card)]/60"}
        `}
        >
          <p className="text-sm text-[var(--muted)]">Account</p>
          <h2 className="text-xl font-bold mt-1">Manage</h2>
        </div>

        {/* Query */}
        <div
          onClick={() => setActiveTab("query")}
          className={`p-5 rounded-xl cursor-pointer shadow border 
          ${activeTab === "query" ? "border-[var(--accent)] bg-[var(--card)]" : "border-[var(--border)] bg-[var(--card)]/60"}
        `}
        >
          <p className="text-sm text-[var(--muted)]">Queries</p>
          <h2 className="text-xl font-bold mt-1">Support</h2>
        </div>

      </div>

      {/* ------------------ CONTENT SECTION ------------------ */}
      <div className="mt-10 max-w-4xl mx-auto bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow">

        {/* ------------------ ORDERS ------------------ */}
        {activeTab === "orders" && (
          <>
            <h2 className="text-xl font-semibold mb-4">Your Orders</h2>

            <div className="text-[var(--muted)]">
              {/* Later replace with orders list from API */}
              <p>No orders found.</p>
            </div>
          </>
        )}

        {/* ------------------ WALLET ------------------ */}
        {activeTab === "wallet" && (
          <>
            <h2 className="text-xl font-semibold mb-4">Wallet Balance</h2>

            <p className="text-lg font-bold mb-3">Current Balance: ₹{walletBalance}</p>

            <button className="bg-[var(--accent)] text-white px-4 py-2 rounded-lg hover:opacity-90">
              Add Money
            </button>
          </>
        )}

        {/* ------------------ ACCOUNT DETAILS ------------------ */}
        {activeTab === "account" && (
          <>
            <h2 className="text-xl font-semibold mb-4">Account Details</h2>

            <div className="space-y-3">
              <p><strong>Name:</strong> {userDetails.name}</p>
              <p><strong>Email:</strong> {userDetails.email}</p>
              <p><strong>Phone:</strong> {userDetails.phone}</p>
            </div>

            {/* Change Password UI */}
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Change Password</h3>

              <input
                type="password"
                placeholder="New Password"
                className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] mb-3"
              />

              <button className="bg-[var(--accent)] text-white px-4 py-2 rounded-lg hover:opacity-90">
                Update Password
              </button>
            </div>
          </>
        )}

        {/* ------------------ QUERY SECTION ------------------ */}
        {activeTab === "query" && (
          <>
            <h2 className="text-xl font-semibold mb-4">Submit a Query</h2>

            <select
              className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] mb-4"
            >
              <option>Select Query Type</option>
              <option>Order Issue</option>
              <option>Payment Issue</option>
              <option>Wallet Issue</option>
              <option>General Inquiry</option>
            </select>

            <textarea
              className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] h-32"
              placeholder="Write your message..."
            ></textarea>

            <button className="mt-4 bg-[var(--accent)] text-white px-4 py-2 rounded-lg hover:opacity-90">
              Submit Query
            </button>
          </>
        )}

      </div>

    </section>
  );
}
