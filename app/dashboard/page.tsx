"use client";

import { useState, useEffect } from "react";
import AuthGuard from "../../components/AuthGuard";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import OrderItem from "../../components/Dashboard/OrderItem";
import WalletTab from "../../components/Dashboard/WalletTab";
import AccountTab from "../../components/Dashboard/AccountTab"; // Add this import
import QueryTab from "../../components/Dashboard/QueryTab"; // Add this import

type OrderType = {
  gameSlug: string;
  itemSlug: string;
  itemName: string;
  playerId: string;
  zoneId: string;
  paymentMethod: string;
  price: number;
  status: string;
  createdAt: string;
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("orders");

  const [orders, setOrders] = useState<OrderType[]>([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [userDetails, setUserDetails] = useState({
    name: "Demo User",
    email: "",
    phone: "",
  });

  // ================= LOAD USER + WALLET + ORDERS =================
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPhone = localStorage.getItem("phone");

    if (!storedEmail && !storedPhone) return;

    const identifier = storedEmail || storedPhone;

    // Fetch user data
    fetch("/api/auth/get-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUserDetails({
            name: data.user.name,
            email: data.user.email,
            phone: data.user.phone,
          });

          setWalletBalance(data.user.wallet || 0);
          setTotalOrders(data.user.order || 0);
        }
      });

    // Fetch orders
    fetch("/api/order/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: storedEmail || null,
        phone: storedPhone || null,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setOrders(data.orders);
      });
  }, []);

  const tabCards = [
    { key: "orders", label: "Total Orders", value: totalOrders },
    { key: "wallet", label: "Wallet Balance", value: `₹${walletBalance}` },
    { key: "account", label: "Account", value: "Manage" },
    { key: "query", label: "Queries", value: "Support" },
  ];

  // ===================================================================
  return (
    <AuthGuard>
      <section className="px-6 py-10 min-h-screen bg-[var(--background)] text-[var(--foreground)]">

        {/* TOP CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto mb-10">
          {tabCards.map((tab) => (
            <DashboardCard
              key={tab.key}
              tab={tab}
              activeTab={activeTab}
              onClick={() => setActiveTab(tab.key)}
            />
          ))}
        </div>

        {/* CONTENT WRAPPER */}
        <div className="max-w-4xl mx-auto bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-lg">

          {/* =============== ORDERS TAB =============== */}
          {activeTab === "orders" && (
            <>
              <h2 className="text-2xl font-semibold mb-6">Your Orders</h2>

              {orders.length === 0 ? (
                <p className="text-[var(--muted)]">No orders found.</p>
              ) : (
                <div className="space-y-5">
                  {orders.map((order, index) => (
                    <OrderItem key={index} order={order} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* =============== WALLET TAB =============== */}
          {activeTab === "wallet" && (
            <WalletTab 
              walletBalance={walletBalance}
              setWalletBalance={setWalletBalance}
            />
          )}

          {/* =============== ACCOUNT TAB =============== */}
          {activeTab === "account" && (
            <AccountTab userDetails={userDetails} />
          )}

          {/* =============== QUERY TAB =============== */}
          {activeTab === "query" && (
            <QueryTab />
          )}
        </div>
      </section>
    </AuthGuard>
  );
}