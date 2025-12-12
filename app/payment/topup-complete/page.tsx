"use client";

import { useEffect, useState } from "react";

export default function TopupComplete() {
  const [status, setStatus] = useState("Verifying payment...");

  useEffect(() => {
    const orderId = localStorage.getItem("pending_topup_order");

    if (!orderId) {
      setStatus("Order not found");
      return;
    }

    async function verify() {
      const res = await fetch("/api/order/verify-topup-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("Payment successful — item will be delivered shortly!");
      } else {
        setStatus("Payment failed or pending");
      }
    }

    verify();
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold">{status}</h1>
    </div>
  );
}
