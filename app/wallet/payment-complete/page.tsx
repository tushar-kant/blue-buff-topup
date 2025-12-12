"use client";

import { useEffect, useState } from "react";

export default function PaymentComplete() {
  const [status, setStatus] = useState("Checking Payment...");

  useEffect(() => {
    const orderId = localStorage.getItem("pending_order");
    const userId = localStorage.getItem("userId");


    if (!orderId) {
      setStatus("Order not found");
      return;
    }

    async function checkPayment() {
      const res = await fetch("/api/wallet/check-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
body: JSON.stringify({ orderId, userId }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("Payment Successful!");
        // Add money to wallet here
        const oldBal = Number(localStorage.getItem("walletBalance") || "0");
        const newBal = oldBal + Number(data.amount);
        localStorage.setItem("walletBalance", String(newBal));
      } else {
        setStatus("Payment Failed or Pending");
      }
    }

    checkPayment();
  }, []);

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold">{status}</h1>
      <p>You can now close this page.</p>
    </div>
  );
}
