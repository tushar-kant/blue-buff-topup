"use client";

import { useState, useEffect } from "react";
import AuthGuard from "../../components/AuthGuard";
type OrderType = {
  gameSlug: string;
  itemSlug: string;
  itemName:string;
  playerId: string;
  zoneId: string;
  paymentMethod: string;
  price: number;
  status: string;
  createdAt: string;
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("orders");

  // Orders
const [orders, setOrders] = useState<OrderType[]>([]);


  // Query system
  const [queryType, setQueryType] = useState("");
  const [queryMessage, setQueryMessage] = useState("");
  const [querySuccess, setQuerySuccess] = useState("");

  // Wallet Recharge
  const [showAddBalance, setShowAddBalance] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState("");

  // Password change states
  const [newPass, setNewPass] = useState("");
  const [passSuccess, setPassSuccess] = useState("");
  const [passError, setPassError] = useState("");
  const [loadingPass, setLoadingPass] = useState(false);

  // User + Wallet
  const [totalOrders, setTotalOrders] = useState(0);
  const [walletBalance, setWalletBalance] = useState(350);
  const [userDetails, setUserDetails] = useState({
    name: "Demo User",
    email: "demo@example.com",
    phone: "9999999999",
  });

  // ================= LOAD USER + WALLET + ORDERS =================
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("email");
    const storedPhone = localStorage.getItem("phone");
    const storedWallet = localStorage.getItem("walletBalance");
     const order = localStorage.getItem("order");

    setUserDetails({
      name: storedName || "Demo User",
      email: storedEmail || "",
      phone: storedPhone || "",
    });

    if (storedWallet) setWalletBalance(Number(storedWallet));
        if (order) setTotalOrders(Number(order ) );


    // Fetch user's orders
    if (storedEmail || storedPhone) {
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
          if (data.success) {
            setOrders(data.orders);
            // setTotalOrders(data.orders.length);
          }
        });
    }
  }, []);

  return (
    <AuthGuard>
      <section className="px-6 py-10 min-h-screen bg-[var(--background)] text-[var(--foreground)]">

        {/* ------------------ TOP CARDS ------------------ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">

          {/* Orders */}
          <div
            onClick={() => setActiveTab("orders")}
            className={`p-5 rounded-xl cursor-pointer shadow border 
            ${activeTab === "orders" ? "border-[var(--accent)] bg-[var(--card)]" : "border-[var(--border)] bg-[var(--card)]/60"}`}
          >
            <p className="text-sm text-[var(--muted)]">Total Orders</p>
            <h2 className="text-2xl font-bold mt-1">{totalOrders}</h2>
          </div>

          {/* Wallet */}
          <div
            onClick={() => setActiveTab("wallet")}
            className={`p-5 rounded-xl cursor-pointer shadow border
            ${activeTab === "wallet" ? "border-[var(--accent)] bg-[var(--card)]" : "border-[var(--border)] bg-[var(--card)]/60"}`}
          >
            <p className="text-sm text-[var(--muted)]">Wallet Balance</p>
            <h2 className="text-2xl font-bold mt-1">₹{walletBalance}</h2>
          </div>

          {/* Account */}
          <div
            onClick={() => setActiveTab("account")}
            className={`p-5 rounded-xl cursor-pointer shadow border
            ${activeTab === "account" ? "border-[var(--accent)] bg-[var(--card)]" : "border-[var(--border)] bg-[var(--card)]/60"}`}
          >
            <p className="text-sm text-[var(--muted)]">Account</p>
            <h2 className="text-xl font-bold mt-1">Manage</h2>
          </div>

          {/* Query */}
          <div
            onClick={() => setActiveTab("query")}
            className={`p-5 rounded-xl cursor-pointer shadow border
            ${activeTab === "query" ? "border-[var(--accent)] bg-[var(--card)]" : "border-[var(--border)] bg-[var(--card)]/60"}`}
          >
            <p className="text-sm text-[var(--muted)]">Queries</p>
            <h2 className="text-xl font-bold mt-1">Support</h2>
          </div>

        </div>

        {/* ------------------ CONTENT ------------------ */}
        <div className="mt-10 max-w-4xl mx-auto bg-[var(--card)] border border-[var(--border)] rounded-xl p-6 shadow">

          {/* ------------------ ORDERS TAB ------------------ */}
          {activeTab === "orders" && (
            <>
              <h2 className="text-xl font-semibold mb-4">Your Orders</h2>

              {orders.length === 0 ? (
                <p className="text-[var(--muted)]">No orders found.</p>
              ) : (
                <div className="space-y-4">
             {orders.map((o, i) => (
  <div
    key={i}
    className="p-4 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow space-y-3"
  >
    {/* ---------- ROW 1 ---------- */}
    <div className="flex justify-between items-center">
      <p className="text-xs text-[var(--muted)]">
        {new Date(o.createdAt).toLocaleString()}
      </p>

      <span
        className={`font-semibold ${
          o.status === "success"
            ? "text-green-500"
            : o.status === "failed"
            ? "text-red-500"
            : "text-yellow-500"
        }`}
      >
        {o.status.toUpperCase()}
      </span>
    </div>

    {/* ---------- ROW 2 ---------- */}
    <div className="flex justify-between">
      <p>
        <strong>Player ID:</strong> {o.playerId}
      </p>
      <p>
        <strong>Zone ID:</strong> {o.zoneId}
      </p>
    </div>

    {/* ---------- ROW 3 ---------- */}
    <div className="flex justify-between">
      <p>
        <strong>Payment:</strong> {o.paymentMethod}
      </p>
      <p>
        <strong>Price:</strong> ₹{o.price}
      </p>
    </div>

    {/* ---------- GAME & ITEM (Optional) ---------- */}
    <div className="mt-2 text-sm text-[var(--muted)]">
      {o.gameSlug} — {o.itemSlug} -{o?.itemName}
    </div>
  </div>
))}

                </div>
              )}
            </>
          )}

          {/* ------------------ WALLET TAB ------------------ */}
          {activeTab === "wallet" && (
            <>
              <h2 className="text-xl font-semibold mb-4">Wallet Balance</h2>

              {paymentSuccess && (
                <p className="text-green-500 font-medium mb-4">{paymentSuccess}</p>
              )}

              <p className="text-lg font-bold mb-3">Current Balance: ₹{walletBalance}</p>

              <button
                onClick={() => {
                  setShowAddBalance(true);
                  setSelectedMethod("");
                  setPaymentSuccess("");
                }}
                className="bg-[var(--accent)] text-white px-4 py-2 rounded-lg hover:opacity-90"
              >
                Add Money
              </button>

              {/* WALLET POPUP */}
              {showAddBalance && (
                <div className="mt-6 p-5 border border-[var(--border)] bg-[var(--background)] rounded-xl shadow">

                  {!selectedMethod && (
                    <>
                      <h3 className="text-lg font-semibold mb-3">Choose Payment Method</h3>

                      <button
                        onClick={() => setSelectedMethod("upi")}
                        className="w-full mb-3 p-3 rounded-lg border border-[var(--accent)] text-[var(--accent)] font-semibold"
                      >
                        Pay with UPI
                      </button>

                      <button
                        onClick={() => setSelectedMethod("usdt")}
                        className="w-full p-3 rounded-lg border border-[var(--accent)] text-[var(--accent)] font-semibold"
                      >
                        Pay with USDT (TRC20)
                      </button>
                    </>
                  )}

                  {/* UPI METHOD */}
                  {selectedMethod === "upi" && (
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-3">Scan UPI QR</h3>

                      <div className="bg-white w-48 h-48 mx-auto p-3 rounded-lg shadow">
                        <img src="/sample-qr.png" alt="UPI QR" />
                      </div>

                      <button
                        onClick={() => {
                          const newBalance = walletBalance + 100;
                          setWalletBalance(newBalance);
                          localStorage.setItem("walletBalance", newBalance.toString());
                          setPaymentSuccess("₹100 added successfully!");
                          setShowAddBalance(false);
                        }}
                        className="mt-4 w-full p-3 rounded-lg bg-[var(--accent)] text-black font-semibold"
                      >
                        I Have Paid
                      </button>
                    </div>
                  )}

                  {/* USDT METHOD */}
                  {selectedMethod === "usdt" && (
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-3">Scan USDT</h3>

                      <div className="bg-white w-48 h-48 mx-auto p-3 rounded-lg shadow">
                        <img src="/sample-usdt-qr.png" alt="USDT QR" />
                      </div>

                      <button
                        onClick={() => {
                          const newBalance = walletBalance + 100;
                          setWalletBalance(newBalance);
                          localStorage.setItem("walletBalance", newBalance.toString());
                          setPaymentSuccess("USDT payment confirmed!");
                          setShowAddBalance(false);
                        }}
                        className="mt-4 w-full p-3 rounded-lg bg-[var(--accent)] text-black font-semibold"
                      >
                        I Have Paid
                      </button>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* ------------------ ACCOUNT TAB ------------------ */}
          {activeTab === "account" && (
            <>
              <h2 className="text-xl font-semibold mb-4">Account Details</h2>

              <div className="space-y-3">
                <p><strong>Name:</strong> {userDetails.name}</p>
                <p><strong>Email:</strong> {userDetails.email || "Not Provided"}</p>
                <p><strong>Phone:</strong> {userDetails.phone || "Not Provided"}</p>
              </div>

              {/* Change Password */}
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Change Password</h3>

                {passSuccess && (
                  <p className="text-green-500 text-sm mb-3">{passSuccess}</p>
                )}

                {passError && (
                  <p className="text-red-500 text-sm mb-3">{passError}</p>
                )}

                <input
                  type="password"
                  placeholder="New Password"
                  value={newPass}
                  onChange={(e) => {
                    setNewPass(e.target.value);
                    setPassError("");
                    setPassSuccess("");
                  }}
                  className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] mb-3"
                />

                <button
                  onClick={async () => {
                    if (newPass.length < 6) {
                      setPassError("Minimum 6 characters required");
                      return;
                    }

                    setLoadingPass(true);

                    const res = await fetch("/api/auth/update-password", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        identifier: userDetails.email || userDetails.phone,
                        newPassword: newPass,
                      }),
                    });

                    const data = await res.json();
                    setLoadingPass(false);

                    if (!data.success) {
                      setPassError(data.message);
                      return;
                    }

                    setNewPass("");
                    setPassSuccess("Password updated successfully!");
                    setTimeout(() => setPassSuccess(""), 2000);
                  }}
                  className="bg-[var(--accent)] text-white px-4 py-2 rounded-lg"
                  disabled={loadingPass}
                >
                  {loadingPass ? "Updating..." : "Update Password"}
                </button>
              </div>
            </>
          )}

          {/* ------------------ QUERY TAB ------------------ */}
          {activeTab === "query" && (
            <>
              <h2 className="text-xl font-semibold mb-4">Submit a Query</h2>

              {querySuccess && (
                <p className="text-green-500 font-medium mb-4">{querySuccess}</p>
              )}

              <select
                className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] mb-4"
                value={queryType}
                onChange={(e) => {
                  setQueryType(e.target.value);
                  setQuerySuccess("");
                }}
              >
                <option value="">Select Query Type</option>
                <option value="Order Issue">Order Issue</option>
                <option value="Payment Issue">Payment Issue</option>
                <option value="Wallet Issue">Wallet Issue</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>

              <textarea
                className="w-full p-3 rounded-lg bg-[var(--background)] border border-[var(--border)] h-32"
                placeholder="Write your message..."
                value={queryMessage}
                onChange={(e) => {
                  setQueryMessage(e.target.value);
                  setQuerySuccess("");
                }}
              />

              <button
                disabled={!queryType}
                onClick={() => {
                  setQuerySuccess("Your query has been submitted.");
                  setQueryType("");
                  setQueryMessage("");
                }}
                className={`mt-4 px-4 py-2 rounded-lg text-white font-semibold ${
                  !queryType
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-[var(--accent)] hover:opacity-90"
                }`}
              >
                Submit Query
              </button>
            </>
          )}

        </div>

      </section>
    </AuthGuard>
  );
}
