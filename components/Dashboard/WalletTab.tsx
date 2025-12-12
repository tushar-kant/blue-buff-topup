"use client";

import { useState } from "react";
import WalletPayUI from "./WalletPayUI";

interface WalletTabProps {
  walletBalance: number;
  setWalletBalance: (balance: number) => void;
}

export default function WalletTab({ walletBalance, setWalletBalance }: WalletTabProps) {
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState("");

  const [method, setMethod] = useState("");
  const [showQR, setShowQR] = useState(false);

  const upiString = `upi://pay?pa=yourupi@bank&pn=YourName&am=${amount}`;
  const usdtAddress = "TVjs2x89kLdjDQ8asdy8asd98asd9asd"; // replace yours

  // ---- handlers ----
  const handlePayment = () => {
    const newBalance = walletBalance + Number(amount);
    setWalletBalance(newBalance);
    localStorage.setItem("walletBalance", String(newBalance));

    setPaymentSuccess(
      method === "upi"
        ? `₹${amount} added via UPI!`
        : `USDT payment confirmed! Amount: ₹${amount}`
    );

    setShowQR(false);
    setMethod("");
    setAmount("");
  };

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Wallet Balance</h2>

      {paymentSuccess && (
        <p className="text-green-500 mb-4 font-medium">{paymentSuccess}</p>
      )}

      <div className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-sm mb-6">
        <p className="text-lg font-bold">Current Balance: ₹{walletBalance}</p>
      </div>

      {/* MAIN CARD */}
      <div className="p-6 rounded-2xl bg-[var(--background)] border border-[var(--border)] shadow-lg">

        {/* AMOUNT + METHOD TOGETHER */}
        <div className="space-y-4">

          {/* Amount Input */}
          <div>
            <label className="font-semibold text-sm">Enter Amount</label>
            <input
              type="number"
              value={amount}
              placeholder="Minimum ₹100"
              onChange={(e) => {
                setAmount(e.target.value);
                setAmountError("");
              }}
              className="w-full p-3 mt-1 rounded-xl border bg-[var(--card)] border-[var(--border)]"
            />
            {amountError && <p className="text-red-500 text-sm">{amountError}</p>}
          </div>

          {/* Payment Method Buttons */}
          <div>
            <label className="font-semibold text-sm">Select Payment Method</label>
            <div className="grid grid-cols-2 gap-3 mt-2">

              <button
                onClick={() => setMethod("upi")}
                className={`p-3 rounded-xl border text-center transition ${
                  method === "upi"
                    ? "border-[var(--accent)] bg-[var(--accent)]/10"
                    : "border-[var(--border)] hover:bg-[var(--card)]"
                }`}
              >
                UPI
              </button>

              <button
                onClick={() => setMethod("usdt")}
                className={`p-3 rounded-xl border text-center transition ${
                  method === "usdt"
                    ? "border-[var(--accent)] bg-[var(--accent)]/10"
                    : "border-[var(--border)] hover:bg-[var(--card)]"
                }`}
              >
                USDT (TRC20)
              </button>

            </div>
          </div>

          {/* Proceed Button */}
          <button
            onClick={() => {
              if (!amount || Number(amount) < 100) {
                setAmountError("Minimum amount is ₹100");
                return;
              }
              if (!method) return alert("Please select a payment method");
              setShowQR(true);
            }}
            className="w-full p-3 mt-2 bg-[var(--accent)] text-white rounded-xl"
          >
            Proceed to Pay
          </button>

        </div>

        {/* QR SECTION */}
        {showQR && (
          <div className="mt-6 p-4 rounded-xl border bg-[var(--card)] shadow">

            <WalletPayUI
              title={method === "upi" ? "Scan UPI QR" : "Scan USDT Wallet"}
              qrText={method === "upi" ? upiString : usdtAddress}
              onConfirm={handlePayment}
            />
          </div>
        )}

      </div>
    </>
  );
}
