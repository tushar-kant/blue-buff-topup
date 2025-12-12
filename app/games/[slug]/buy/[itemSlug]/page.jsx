"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import logo from "@/public/logo.png";

export default function BuyFlowPage() {
  const { slug, itemSlug } = useParams();

  const [step, setStep] = useState(1);

  // Inputs for step 1
  const [playerId, setPlayerId] = useState("");
  const [zoneId, setZoneId] = useState("");

  // Data objects
  const [validateData, setValidateData] = useState(null);
  const [reviewData, setReviewData] = useState(null);

  // Payment mode
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // User mock
  const userEmail = "tusharkantanayak713@gmail.com";
  const userPhone = "6372305866";

  // Mock payment info
  const itemName = "Weekly Pass";
  const price = 150;
  const discount = 20;
  const totalPrice = price - discount;

  // ---------------- STEP 1: VALIDATE ----------------
  const handleValidate = () => {
    const mock = {
      statusCode: 201,
      data: {
        _id: "693ba5c190f7a80f7cfa7d70",
        userName: "Yeagorrrr",
        playerId,
        zoneId,
      },
    };

    setValidateData(mock.data);

    const reviewMock = {
      data: {
        userName: "Yeagorrrr",
        playerId,
        zoneId,
      },
    };

    setReviewData(reviewMock.data);

    setStep(2);
  };

  // ---------------- STEP 3: PAY ----------------
  const handlePayment = () => {
    setTimeout(() => {
      setShowSuccess(true);
    }, 800);
  };

  return (
    <section className="px-6 py-10 max-w-3xl mx-auto">

      {/* ---------------- TOP STEP BAR ---------------- */}
      <div className="flex justify-between mb-8 font-semibold">
        <span className={step >= 1 ? "text-[var(--accent)]" : ""}>1. Validate</span>
        <span className={step >= 2 ? "text-[var(--accent)]" : ""}>2. Review</span>
        <span className={step >= 3 ? "text-[var(--accent)]" : ""}>3. Payment</span>
      </div>

      {/* ========================= SUCCESS MESSAGE ========================= */}
      {showSuccess && (
        <div className="bg-green-600 text-white p-6 rounded-xl text-center text-lg font-semibold shadow-lg">
          ✅ Payment Successful!  
          <p className="text-sm mt-2 opacity-80">Your order has been placed.</p>
        </div>
      )}

      {!showSuccess && (
        <>
          {/* ========================= STEP 1 ========================= */}
          {step === 1 && (
            <div className="space-y-4">

              <h2 className="text-xl font-bold">Enter Details to Validate</h2>

              <input
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                placeholder="Player ID"
                className="p-3 rounded-lg bg-[var(--card)] border border-[var(--border)] w-full"
              />

              <input
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value)}
                placeholder="Zone ID"
                className="p-3 rounded-lg bg-[var(--card)] border border-[var(--border)] w-full"
              />

              <button
                onClick={handleValidate}
                className="bg-[var(--accent)] text-black p-3 rounded-lg w-full font-semibold"
              >
                Validate
              </button>
            </div>
          )}

          {/* ========================= STEP 2 ========================= */}
          {step === 2 && reviewData && (
            <div className="space-y-6">

              {/* GAME ICON + NAME */}
              <div className="text-center">
                <Image
                  src={logo}
                  alt="Game"
                  width={120}
                  height={120}
                  className="rounded-xl mx-auto"
                />
                <h2 className="text-2xl font-bold mt-2">Mobile Legends</h2>
              </div>

              {/* USER DETAILS */}
              <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
                <h3 className="font-semibold mb-2">User Details</h3>
                <p>Email: {userEmail}</p>
                <p>Phone: {userPhone}</p>
              </div>

              {/* GAME DETAILS */}
              <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
                <h3 className="font-semibold mb-2">Game Details</h3>
                <p>Player Name: {reviewData.userName}</p>
                <p>User ID: {reviewData.playerId}</p>
                <p>Zone ID: {reviewData.zoneId}</p>
              </div>

              {/* PAYMENT MODE SELECTION */}
              <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)] space-y-3">
                <h3 className="font-semibold mb-2">Select Payment Method</h3>

                <button
                  onClick={() => setPaymentMethod("wallet")}
                  className={`w-full p-3 rounded-lg border ${
                    paymentMethod === "wallet"
                      ? "border-[var(--accent)] bg-[var(--accent)]/20"
                      : "border-[var(--border)]"
                  }`}
                >
                  Wallet (₹0)
                </button>

                <button
                  onClick={() => setPaymentMethod("upi")}
                  className={`w-full p-3 rounded-lg border ${
                    paymentMethod === "upi"
                      ? "border-[var(--accent)] bg-[var(--accent)]/20"
                      : "border-[var(--border)]"
                  }`}
                >
                  UPI
                </button>
              </div>

              {/* PRICE SUMMARY */}
              <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
                <h3 className="font-semibold mb-2">Price Details</h3>

                <p>Item: {itemName}</p>
                <p>Price: ₹{price}.00</p>
                <p>Discount: - ₹{discount}.00</p>
                <p className="opacity-50">Coupon Discount: - ₹0.00 (disabled)</p>

                <p className="font-bold mt-2 text-lg">
                  Total Price: ₹{totalPrice}.00
                </p>

                <button
                  onClick={() => setStep(3)}
                  disabled={!paymentMethod}
                  className="bg-[var(--accent)] text-black p-3 rounded-lg w-full font-semibold mt-4 disabled:opacity-50"
                >
                  Proceed to Pay
                </button>
              </div>
            </div>
          )}

          {/* ========================= STEP 3 ========================= */}
          {step === 3 && (
            <div className="space-y-6">

              <h2 className="text-xl font-bold">Payment</h2>

              {/* If UPI → Show QR code */}
              {paymentMethod === "upi" && (
                <div className="bg-[var(--card)] p-6 rounded-lg border border-[var(--border)] text-center">
                  <p className="mb-3 font-semibold">Scan to Pay</p>

                  <div className="w-40 h-40 bg-white mx-auto p-3 rounded-lg">
                    <Image
                      src=""
                      alt="UPI QR"
                      width={200}
                      height={200}
                    />
                  </div>

                  <button
                    onClick={handlePayment}
                    className="bg-[var(--accent)] text-black p-3 rounded-lg w-full font-semibold mt-4"
                  >
                    I Have Paid
                  </button>
                </div>
              )}

              {/* If Wallet → Show Balance + Pay */}
              {paymentMethod === "wallet" && (
                <div className="bg-[var(--card)] p-6 rounded-lg border border-[var(--border)] text-center">
                  <p>Wallet Balance: ₹0</p>

                  <button
                    onClick={handlePayment}
                    className="bg-[var(--accent)] text-black p-3 rounded-lg w-full font-semibold mt-4"
                  >
                    Pay ₹{totalPrice}
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
}
