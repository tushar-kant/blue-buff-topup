"use client";

import { useState, useEffect } from "react";
import AuthGuard from "../../components/AuthGuard";

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
  const [queryType, setQueryType] = useState("");
  const [queryMessage, setQueryMessage] = useState("");
  const [querySuccess, setQuerySuccess] = useState("");

  const [showAddBalance, setShowAddBalance] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState("");

  const [amount, setAmount] = useState("");
const [amountError, setAmountError] = useState("");


  const [newPass, setNewPass] = useState("");
  const [passSuccess, setPassSuccess] = useState("");
  const [passError, setPassError] = useState("");
  const [loadingPass, setLoadingPass] = useState(false);

  const [totalOrders, setTotalOrders] = useState(0);
  const [walletBalance, setWalletBalance] = useState(350);
  const [userDetails, setUserDetails] = useState({
    name: "Demo User",
    email: "demo@example.com",
    phone: "9999999999",
  });

  // ================= LOAD USER + WALLET + ORDERS =================
// ================= LOAD USER + WALLET + ORDERS =================
useEffect(() => {
  const storedEmail = localStorage.getItem("email");
  const storedPhone = localStorage.getItem("phone");

  if (!storedEmail && !storedPhone) return;

  const identifier = storedEmail || storedPhone;

  // ---- FIRST: Fetch user data from DB ----
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

  // ---- SECOND: Fetch user orders ----
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
      }
    });

}, []);

  // ===================================================================
  return (
    <AuthGuard>
      <section className="px-6 py-10 min-h-screen bg-[var(--background)] text-[var(--foreground)]">

        {/* --------------------- TOP CARDS --------------------- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto mb-10">

          {[
            { key: "orders", label: "Total Orders", value: totalOrders },
            { key: "wallet", label: "Wallet Balance", value: `₹${walletBalance}` },
            { key: "account", label: "Account", value: "Manage" },
            { key: "query", label: "Queries", value: "Support" },
          ].map((tab) => (
            <div
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`p-5 rounded-2xl cursor-pointer border transition-all duration-300 shadow-sm hover:shadow-lg 
              ${activeTab === tab.key
                  ? "border-[var(--accent)] bg-[var(--card)]"
                  : "border-[var(--border)] bg-[var(--card)]/60 hover:bg-[var(--card)]"
              }`}
            >
              <p className="text-sm text-[var(--muted)]">{tab.label}</p>
              <h2 className="text-2xl font-bold mt-1">{tab.value}</h2>
            </div>
          ))}
        </div>

        {/* --------------------- CONTENT WRAPPER --------------------- */}
        <div className="max-w-4xl mx-auto bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-lg">

          {/* =============== ORDERS TAB =============== */}
          {activeTab === "orders" && (
            <>
              <h2 className="text-2xl font-semibold mb-6 tracking-tight">Your Orders</h2>

              {orders.length === 0 ? (
                <p className="text-[var(--muted)]">No orders found.</p>
              ) : (
                <div className="space-y-5">
                  {orders.map((o, i) => (
                    <div
                      key={i}
                      className="p-5 bg-[var(--background)] border border-[var(--border)] rounded-2xl shadow transition hover:shadow-md"
                    >
                      <div className="flex justify-between items-center mb-2">
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

                      <div className="flex justify-between text-sm">
                        <p><strong>Player ID:</strong> {o.playerId}</p>
                        <p><strong>Zone ID:</strong> {o.zoneId}</p>
                      </div>

                      <div className="flex justify-between mt-2 text-sm">
                        <p><strong>Payment:</strong> {o.paymentMethod}</p>
                        <p><strong>Price:</strong> ₹{o.price}</p>
                      </div>

                      <p className="mt-3 text-sm text-[var(--muted)]">
                        {o.gameSlug} — {o.itemSlug} — {o.itemName}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* =============== WALLET TAB =============== */}
         {activeTab === "wallet" && (
  <>
    <h2 className="text-2xl font-semibold mb-6">Wallet Balance</h2>

    {paymentSuccess && (
      <p className="text-green-500 font-medium mb-4">{paymentSuccess}</p>
    )}

    <p className="text-lg font-bold mb-4">Current Balance: ₹{walletBalance}</p>

    <button
      onClick={() => {
        setShowAddBalance(true);
        setSelectedMethod("");
        setAmount("");
        setAmountError("");
      }}
      className="bg-[var(--accent)] text-white font-semibold px-5 py-3 rounded-xl hover:opacity-90 transition"
    >
      Add Money
    </button>

    {/* POPUP */}
    {showAddBalance && (
      <div className="mt-6 p-6 border border-[var(--border)] bg-[var(--background)] rounded-2xl shadow-lg">

        {/* ---- ENTER AMOUNT FIRST ---- */}
        {!selectedMethod && (
          <>
            <h3 className="text-lg font-semibold mb-4">Enter Amount</h3>

            <input
              type="number"
              placeholder="Minimum ₹100"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setAmountError("");
              }}
              className="w-full p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] mb-2"
            />

            {amountError && (
              <p className="text-red-500 text-sm mb-3">{amountError}</p>
            )}

            <button
              onClick={() => {
                if (!amount || Number(amount) < 100) {
                  setAmountError("Minimum amount is ₹100");
                  return;
                }
                setSelectedMethod("choose");
              }}
              className="w-full p-3 rounded-xl bg-[var(--accent)] text-white font-semibold hover:opacity-90 transition"
            >
              Continue
            </button>
          </>
        )}

        {/* ---- CHOOSE PAYMENT METHOD ---- */}
        {selectedMethod === "choose" && (
          <>
            <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>

            <div className="space-y-3">
              <button
                onClick={() => setSelectedMethod("upi")}
                className="w-full p-3 rounded-xl border border-[var(--accent)] text-[var(--accent)] font-semibold hover:bg-[var(--card)]/40 transition"
              >
                Pay with UPI
              </button>

              <button
                onClick={() => setSelectedMethod("usdt")}
                className="w-full p-3 rounded-xl border border-[var(--accent)] text-[var(--accent)] font-semibold hover:bg-[var(--card)]/40 transition"
              >
                Pay with USDT (TRC20)
              </button>
            </div>
          </>
        )}

        {/* ---- UPI PAYMENT ---- */}
        {selectedMethod === "upi" && (
          <WalletPayUI
            title="Scan UPI QR"
            qr="/sample-qr.png"
            onConfirm={() => {
              const newBalance = walletBalance + Number(amount);
              setWalletBalance(newBalance);

              // update local storage temporarily
              localStorage.setItem("walletBalance", String(newBalance));

              setPaymentSuccess(`₹${amount} added successfully!`);
              setShowAddBalance(false);
            }}
          />
        )}

        {/* ---- USDT PAYMENT ---- */}
        {selectedMethod === "usdt" && (
          <WalletPayUI
            title="Scan USDT Wallet"
            qr="/sample-usdt-qr.png"
            onConfirm={() => {
              const newBalance = walletBalance + Number(amount);
              setWalletBalance(newBalance);

              localStorage.setItem("walletBalance", String(newBalance));

              setPaymentSuccess(`USDT payment confirmed! Amount: ₹${amount}`);
              setShowAddBalance(false);
            }}
          />
        )}
      </div>
    )}
  </>
)}


          {/* =============== ACCOUNT TAB =============== */}
          {activeTab === "account" && (
            <>
              <h2 className="text-2xl font-semibold mb-6">Account Details</h2>

              <div className="space-y-2 text-lg">
                <p><strong>Name:</strong> {userDetails.name}</p>
                <p><strong>Email:</strong> {userDetails.email}</p>
                <p><strong>Phone:</strong> {userDetails.phone}</p>
              </div>

              {/* Change Password */}
              <div className="mt-8">
                <h3 className="font-semibold text-lg mb-3">Change Password</h3>

                {passSuccess && <p className="text-green-500 text-sm mb-2">{passSuccess}</p>}
                {passError && <p className="text-red-500 text-sm mb-2">{passError}</p>}

                <input
                  type="password"
                  placeholder="New Password"
                  value={newPass}
                  onChange={(e) => {
                    setNewPass(e.target.value);
                    setPassError("");
                  }}
                  className="w-full p-3 bg-[var(--background)] border border-[var(--border)] rounded-xl mb-4"
                />

                <button
                  disabled={loadingPass}
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

                    if (!data.success) return setPassError(data.message);

                    setNewPass("");
                    setPassSuccess("Password updated!");
                    setTimeout(() => setPassSuccess(""), 2000);
                  }}
                  className="bg-[var(--accent)] text-white px-5 py-3 rounded-xl font-semibold transition hover:opacity-90"
                >
                  {loadingPass ? "Updating..." : "Update Password"}
                </button>
              </div>
            </>
          )}

          {/* =============== QUERY TAB =============== */}
          {activeTab === "query" && (
            <>
              <h2 className="text-2xl font-semibold mb-6">Submit a Query</h2>

              {querySuccess && <p className="text-green-500 mb-3">{querySuccess}</p>}

              <select
                value={queryType}
                onChange={(e) => setQueryType(e.target.value)}
                className="w-full p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] mb-4"
              >
                <option value="">Select Query Type</option>
                <option value="Order Issue">Order Issue</option>
                <option value="Payment Issue">Payment Issue</option>
                <option value="Wallet Issue">Wallet Issue</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>

              <textarea
                className="w-full p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] h-32"
                placeholder="Write your message..."
                value={queryMessage}
                onChange={(e) => setQueryMessage(e.target.value)}
              />

              <button
                disabled={!queryType}
                onClick={() => {
                  setQuerySuccess("Your query has been submitted.");
                  setQueryType("");
                  setQueryMessage("");
                }}
                className={`mt-4 px-5 py-3 rounded-xl text-white font-semibold transition
                  ${!queryType ? "bg-gray-600 cursor-not-allowed" : "bg-[var(--accent)] hover:opacity-90"}
                `}
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

function WalletPayUI({
  title,
  qr,
  onConfirm,
}: {
  title: string;
  qr: string;
  onConfirm: () => void;
}) {
  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      <div className="bg-white w-52 h-52 mx-auto p-4 rounded-xl shadow">
        <img src={qr} alt="QR Code" />
      </div>

      <button
        onClick={onConfirm}
        className="mt-5 w-full p-3 rounded-xl bg-[var(--accent)] text-black font-semibold hover:opacity-90 transition"
      >
        I Have Paid
      </button>
    </div>
  );
}
