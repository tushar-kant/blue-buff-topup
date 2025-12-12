"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import QRCode from "qrcode";
import logo from "@/public/logo.png";
import AuthGuard from "../../../../../components/AuthGuard";

export default function BuyFlowPage() {
  const { slug, itemSlug } = useParams();
  const params = useSearchParams();

  const [step, setStep] = useState(1);

  const [playerId, setPlayerId] = useState("");
  const [zoneId, setZoneId] = useState("");

  const [reviewData, setReviewData] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const [upiQR, setUpiQR] = useState("");

  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  useEffect(() => {
    setUserEmail(localStorage.getItem("email") || "");
    setUserPhone(localStorage.getItem("phone") || "");
  }, []);

  // ITEM DATA FROM URL
  const itemName = params.get("name");
  const price = Number(params.get("price"));
  const discount = Number(params.get("discount"));
  const totalPrice = price - discount;
  const itemImage = params.get("image") || logo;

  // ========== STEP 1 VALIDATE ==========
  const handleValidate = async () => {
    if (!playerId || !zoneId) {
      alert("Please enter Player ID and Zone ID");
      return;
    }

    try {
      const res = await fetch("/api/check-region", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: playerId, zone: zoneId }),
      });

      const data = await res.json();

      if (data?.success !== 200) {
        alert("Invalid Player ID / Zone ID");
        return;
      }

      setReviewData({
        userName: data.data.username,
        region: data.data.region,
        playerId,
        zoneId,
      });

      setStep(2);
    } catch (error) {
      alert("Something went wrong. Try again.");
    }
  };

  // ========== GENERATE UPI QR ==========
  const handleUPI = async () => {
    setPaymentMethod("upi");

    const upiId = "yourupi@bank";
    const amount = totalPrice;
    const upiString = `upi://pay?pa=${upiId}&pn=YourStore&am=${amount}&cu=INR`;

    const qr = await QRCode.toDataURL(upiString);
    setUpiQR(qr);
  };

  // ========== CREATE ORDER API CALL ==========
  const createOrder = async () => {
    const payload = {
      gameSlug: slug,
      itemSlug: itemSlug,
      itemName:itemName,
      playerId: reviewData.playerId,
      zoneId: reviewData.zoneId,
      paymentMethod,
      price: totalPrice,
      email: userEmail || null,
      phone: userPhone || null,
    };

    const res = await fetch("/api/order/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    return res.json();
  };

  // ========== PAYMENT COMPLETE ==========
  const handlePayment = async () => {
    const result = await createOrder();

    if (!result.success) {
      alert("Order failed: " + result.message);
      return;
    }

    setTimeout(() => {
      setShowSuccess(true);
    }, 600);
  };

  return (
    <AuthGuard>
      <section className="px-6 py-10 max-w-3xl mx-auto">

        {/* STEP BAR */}
        <div className="flex justify-between mb-8 font-semibold">
          <span className={step >= 1 ? "text-[var(--accent)]" : ""}>1. Validate</span>
          <span className={step >= 2 ? "text-[var(--accent)]" : ""}>2. Review</span>
          <span className={step >= 3 ? "text-[var(--accent)]" : ""}>3. Payment</span>
        </div>

        {/* SUCCESS SCREEN */}
        {showSuccess && (
          <div className="bg-green-600 text-white p-6 rounded-xl text-center text-lg font-semibold shadow-lg">
            ✅ Payment Successful!
            <p className="text-sm mt-2 opacity-80">Your order has been placed.</p>
          </div>
        )}

        {!showSuccess && (
          <>
            {/* STEP 1 */}
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

            {/* STEP 2 */}
            {step === 2 && reviewData && (
              <div className="space-y-6">

                {/* GAME + ITEM */}
                <div className="flex items-center gap-3 p-2 rounded-lg">
                  <Image src={itemImage} alt="Item" width={55} height={55} className="rounded-xl" />
                  <div className="flex flex-col leading-tight">
                    <h2 className="text-lg font-bold">{itemName}</h2>
                    <p className="text-sm text-gray-400">Selected Item</p>
                  </div>
                </div>

                {/* USER CONTACT */}
                <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
                  <h3 className="font-semibold mb-2">Your Details</h3>
                  <p>Email: {userEmail || "Not Found"}</p>
                  <p>Phone: {userPhone || "Not Found"}</p>
                </div>

                {/* GAME DETAILS */}
                <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
                  <h3 className="font-semibold mb-2">Game Details</h3>
                  <p>Player Name: {reviewData.userName}</p>
                  <p>User ID: {reviewData.playerId}</p>
                  <p>Zone ID: {reviewData.zoneId}</p>
                </div>

                {/* PAYMENT METHOD */}
                <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)] space-y-3">
                  <h3 className="font-semibold mb-2">Select Payment Method</h3>

                  <button
                    onClick={() => setPaymentMethod("wallet")}
                    className="w-full p-3 rounded-lg border border-[var(--border)]"
                  >
                    Wallet (₹0)
                  </button>

                  <button onClick={handleUPI} className="w-full p-3 rounded-lg border border-[var(--border)]">
                    UPI
                  </button>
                </div>

                {/* PRICE */}
                <div className="bg-[var(--card)] p-4 rounded-lg border border-[var(--border)]">
                  <h3 className="font-semibold mb-2">Price Details</h3>

                  <p>Item: {itemName}</p>
                  <p>Price: ₹{price}</p>
                  <p>Discount: -₹{discount}</p>

                  <p className="font-bold text-lg mt-2">Total: ₹{totalPrice}</p>

                  <button
                    onClick={() => setStep(3)}
                    disabled={!paymentMethod}
                    className="bg-[var(--accent)] text-black p-3 rounded-lg w-full mt-4 disabled:opacity-50"
                  >
                    Proceed to Pay
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Payment</h2>

                {/* UPI */}
                {paymentMethod === "upi" && (
                  <div className="bg-[var(--card)] p-6 rounded-lg border border-[var(--border)] text-center">
                    <p className="mb-3 font-semibold">Scan to Pay</p>

                    <div className="w-44 h-44 mx-auto bg-white p-3 rounded-lg">
                      {upiQR ? (
                        <Image src={upiQR} alt="UPI QR" width={200} height={200} />
                      ) : (
                        <p>Generating QR...</p>
                      )}
                    </div>

                    <button
                      onClick={handlePayment}
                      className="bg-[var(--accent)] text-black p-3 rounded-lg w-full font-semibold mt-4"
                    >
                      I Have Paid
                    </button>
                  </div>
                )}

                {/* WALLET */}
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
    </AuthGuard>
  );
}
