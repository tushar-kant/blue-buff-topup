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

  const [walletBalance, setWalletBalance] = useState(0);

  // LOAD USER DATA
  useEffect(() => {
    setUserEmail(localStorage.getItem("email") || "");
    setUserPhone(localStorage.getItem("phone") || "");
    setWalletBalance(Number(localStorage.getItem("walletBalance") || 0));
  }, []);

  // ITEM DATA
  const itemName = params.get("name");
  const price = Number(params.get("price"));
  const discount = Number(params.get("discount"));
  const totalPrice = price - discount;
  const itemImage = params.get("image") || logo;

  // VALIDATION (STEP 1)
  const handleValidate = async () => {
    if (!playerId || !zoneId) {
      alert("Please enter Player ID and Zone ID");
      return;
    }

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
  };

  // GENERATE UPI QR
  const handleUPI = async () => {
    setPaymentMethod("upi");

    const upiId = "yourupi@bank";
    const upiString = `upi://pay?pa=${upiId}&pn=YourStore&am=${totalPrice}&cu=INR`;

    const qr = await QRCode.toDataURL(upiString);
    setUpiQR(qr);
  };

  // CREATE ORDER
  const createOrder = async () => {
    const payload = {
      gameSlug: slug,
      itemSlug,
      itemName,
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

  // PAYMENT COMPLETE
const handlePayment = async () => {
  // NO API CALL HERE anymore
  setTimeout(() => setShowSuccess(true), 500);
};


  return (
    <AuthGuard>
      <section className="px-6 py-8 max-w-3xl mx-auto">
        
        {/* ================= STEP INDICATOR ================= */}
        <div className="relative flex items-center justify-between mb-10">
          <div className="absolute top-[38%] left-[10%] w-[80%] h-[3px] bg-gray-700 -z-0 rounded-full">
            <div
              className="h-full bg-[var(--accent)] transition-all duration-500 rounded-full"
              style={{
                width:
                  step === 1 ? "0%" :
                  step === 2 ? "50%" :
                  step === 3 ? "100%" : "0%",
              }}
            ></div>
          </div>

          {[1, 2, 3].map((num) => (
            <div key={num} className="relative z-10 flex flex-col items-center w-1/3">
              <div
                className={`
                  w-10 h-10 flex items-center justify-center rounded-full border-2 font-semibold text-sm
                  transition-all duration-300
                  ${step >= num
                    ? "border-[var(--accent)] bg-[var(--accent)] text-black shadow-md"
                    : "border-gray-600 bg-[var(--card)] text-gray-400"}
                `}
              >
                {num}
              </div>

              <p
                className={`text-sm mt-2 ${
                  step >= num ? "text-[var(--accent)]" : "text-gray-500"
                }`}
              >
                {num === 1 ? "Validate" : num === 2 ? "Review" : "Payment"}
              </p>
            </div>
          ))}
        </div>

        {/* ================= SUCCESS MESSAGE ================= */}
        {showSuccess && (
          <div className="bg-green-600/20 border border-green-600 text-green-500 p-6 rounded-xl text-center shadow-lg">
            <h2 className="text-xl font-bold">Payment Successful! ✔</h2>
            <p className="text-sm mt-2 opacity-80">Your order has been placed.</p>
          </div>
        )}

        {!showSuccess && (
          <>
            {/* ================= STEP 1 ================= */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-bold mb-2">Player Verification</h2>

                <input
                  value={playerId}
                  onChange={(e) => setPlayerId(e.target.value)}
                  placeholder="Enter Player ID"
                  className="p-3 rounded-lg bg-black/20 border border-gray-700 w-full"
                />

                <input
                  value={zoneId}
                  onChange={(e) => setZoneId(e.target.value)}
                  placeholder="Enter Zone ID"
                  className="p-3 rounded-lg bg-black/20 border border-gray-700 w-full"
                />

                <button
                  onClick={handleValidate}
                  className="bg-[var(--accent)] text-black py-3 rounded-lg w-full font-semibold hover:opacity-90"
                >
                  Validate
                </button>
              </div>
            )}

            {/* ================= STEP 2 ================= */}
            {step === 2 && reviewData && (
              <div className="space-y-6">

                {/* ITEM CARD */}
                <div className="flex items-center gap-4 bg-black/20 p-4 rounded-xl border border-gray-700">
                  <Image src={itemImage} alt="Item" width={65} height={65} className="rounded-xl" />
                  <div>
                    <h3 className="text-lg font-bold">{itemName}</h3>
                    <p className="text-sm opacity-50">Selected item</p>
                  </div>
                </div>

               {/* USER CONTACT */}
<div className="bg-black/20 p-4 rounded-xl border border-gray-700 shadow-sm">
  <h3 className="font-semibold text-lg mb-3">Your Details</h3>

  <div className="grid grid-cols-2 gap-3 text-sm">

    <div className="flex flex-col bg-black/30 p-3 rounded-lg border border-gray-700">
      <span className="text-gray-400 text-xs">Email</span>
      <span className="font-medium">{userEmail || "Not Provided"}</span>
    </div>

    <div className="flex flex-col bg-black/30 p-3 rounded-lg border border-gray-700">
      <span className="text-gray-400 text-xs">Phone</span>
      <span className="font-medium">{userPhone || "Not Provided"}</span>
    </div>

  </div>
</div>


{/* GAME DETAILS */}
<div className="bg-black/20 p-4 rounded-xl border border-gray-700 shadow-sm mt-4">
  <h3 className="font-semibold text-lg mb-3">Game Details</h3>

  <div className="grid grid-cols-2 gap-3 text-sm">

    <div className="flex flex-col bg-black/30 p-3 rounded-lg border border-gray-700">
      <span className="text-gray-400 text-xs">Username</span>
      <span className="font-medium">{reviewData.userName}</span>
    </div>

    <div className="flex flex-col bg-black/30 p-3 rounded-lg border border-gray-700">
      <span className="text-gray-400 text-xs">User ID</span>
      <span className="font-medium">{reviewData.playerId}</span>
    </div>

    <div className="flex flex-col bg-black/30 p-3 rounded-lg border border-gray-700">
      <span className="text-gray-400 text-xs">Zone ID</span>
      <span className="font-medium">{reviewData.zoneId}</span>
    </div>

  </div>
</div>


                {/* PAYMENT METHOD */}
                <div className="bg-black/20 p-4 rounded-xl border border-gray-700">
                  <h3 className="font-semibold mb-3">Select Payment Method</h3>

                  {/* WALLET BUTTON */}
                  <button
                    onClick={() => {
                      if (walletBalance < totalPrice) return;
                      setPaymentMethod("wallet");
                    }}
                    className={`w-full p-3 rounded-lg border text-left ${
                      paymentMethod === "wallet"
                        ? "border-[var(--accent)] bg-[var(--accent)]/20"
                        : "border-gray-700"
                    } ${walletBalance < totalPrice ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Wallet (₹{walletBalance})
                  </button>

                  {/* WARNING MESSAGE */}
                  {walletBalance < totalPrice && (
                    <p className="text-red-400 text-xs mt-1">
                      Not enough balance. You need ₹{totalPrice}.
                    </p>
                  )}

                  {/* UPI BUTTON */}
                  <button
                    onClick={handleUPI}
                    className={`w-full mt-3 p-3 rounded-lg border text-left ${
                      paymentMethod === "upi"
                        ? "border-[var(--accent)] bg-[var(--accent)]/20"
                        : "border-gray-700"
                    }`}
                  >
                    UPI Payment
                  </button>
                </div>

                {/* PRICE SUMMARY */}
                <div className="bg-black/20 p-4 rounded-xl border border-gray-700">
                  <h3 className="font-semibold mb-2">Price Summary</h3>
                 <div className="flex items-center justify-between">
    <p>Price: ₹{price}</p>
    <p>Discount: -₹{discount}</p>
  </div>

                  <p className="text-lg font-bold mt-2">Total: ₹{totalPrice}</p>
<button
  onClick={async () => {
    // Call create order immediately when proceeding to payment
    const result = await createOrder();

    if (!result.success) {
      alert("Order failed: " + result.message);
      return;
    }

    setStep(3); // Go to payment screen
  }}
  disabled={
    !paymentMethod ||
    (paymentMethod === "wallet" && walletBalance < totalPrice)
  }
  className="bg-[var(--accent)] text-black p-3 rounded-lg w-full mt-4 font-semibold disabled:opacity-50"
>
  Proceed to Pay
</button>

                </div>
              </div>
            )}

            {/* ================= STEP 3 ================= */}
            {step === 3 && (
              <div className="space-y-6">

                {/* UPI PAYMENT */}
                {paymentMethod === "upi" && (
                  <div className="bg-black/20 p-6 rounded-xl border border-gray-700 text-center">
                    <p className="font-semibold mb-3">Scan to Pay</p>

                    <div className="w-48 h-48 mx-auto bg-white p-3 rounded-xl">
                      {upiQR ? (
                        <Image src={upiQR} alt="QR" width={200} height={200} />
                      ) : (
                        <p>Generating QR...</p>
                      )}
                    </div>

                    <button
                      onClick={handlePayment}
                      className="bg-[var(--accent)] text-black mt-4 w-full py-3 rounded-lg font-semibold"
                    >
                      I Have Paid
                    </button>
                  </div>
                )}

                {/* WALLET PAYMENT */}
                {paymentMethod === "wallet" && (
                  <div className="bg-black/20 p-6 rounded-xl border border-gray-700 text-center">
                    <p className="mb-2">Wallet Balance: ₹{walletBalance}</p>

                    {walletBalance < totalPrice && (
                      <p className="text-red-400 text-xs mb-3">
                        Not enough balance to complete this purchase.
                      </p>
                    )}

                    <button
                      onClick={handlePayment}
                      disabled={walletBalance < totalPrice}
                      className="bg-[var(--accent)] text-black w-full py-3 rounded-lg font-semibold disabled:opacity-50"
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
