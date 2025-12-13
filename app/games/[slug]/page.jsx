"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import logo from "@/public/logo.png";
import MLBBPurchaseGuide from "../../../components/HelpImage/MLBBPurchaseGuide";

export default function GameDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const sliderRef = useRef(null);
  const buyPanelRef = useRef(null);

  const [game, setGame] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`/api/games/${slug}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    })
      .then(res => res.json())
      .then(data => {
        // 👉 ALL items together, sorted by price
        const allItems = [...data.data.itemId].sort(
          (a, b) => a.sellingPrice - b.sellingPrice
        );

        setGame({
          ...data.data,
          allItems,
        });

        setActiveItem(allItems[0]);
      });
  }, [slug]);

  if (!game || !activeItem) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[var(--muted)]">
        Loading…
      </div>
    );
  }

  /* ================= PRICE SLICES ================= */
  const prices = game.allItems.map(i => i.sellingPrice);
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  const slices = [
    min,
    Math.round(min + (max - min) * 0.25),
    Math.round(min + (max - min) * 0.5),
    Math.round(min + (max - min) * 0.75),
    `${max}+`,
  ];

  const goBuy = (item) => {
    const query = new URLSearchParams({
      name: item.itemName,
      price: item.sellingPrice.toString(),
      dummy: item.dummyPrice.toString(),
      image: item.itemImageId?.image || "",
    });

    router.push(
      `/games/${slug}/buy/${item.itemSlug}?${query.toString()}`
    );
  };

  const selectAndScroll = (item) => {
    setActiveItem(item);
    buyPanelRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <section className="min-h-screen bg-[var(--background)] text-[var(--foreground)] px-4 py-6">

      {/* ================= HEADER ================= */}
      <div className="max-w-6xl mx-auto mb-6 flex items-center gap-4">
        <div className="w-14 h-14 relative rounded-lg overflow-hidden">
          <Image
            src={game.gameImageId?.image || logo}
            alt={game.gameName}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold">{game.gameName}</h1>
          <p className="text-xs text-[var(--muted)]">{game.gameFrom}</p>
        </div>
      </div>

      {/* ================= SINGLE PRICE SLIDER ================= */}
      <div className="max-w-6xl mx-auto mb-4">
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 scrollbar-hide"
        >
          {game.allItems.map(item => (
            <div
              key={item.itemSlug}
              onClick={() => selectAndScroll(item)}
              className={`snap-center min-w-[150px] rounded-xl border p-3 cursor-pointer
              transition
              ${
                activeItem.itemSlug === item.itemSlug
                  ? "border-[var(--accent)] bg-[var(--card)]"
                  : "border-[var(--border)] opacity-70 hover:opacity-100"
              }`}
            >
              <p className="text-sm font-semibold truncate">
                {item.itemName}
              </p>

              <p className="mt-1 text-lg font-bold text-[var(--accent)]">
                ₹{item.sellingPrice}
              </p>

              {item.dummyPrice && (
                <p className="text-xs line-through text-[var(--muted)]">
                  ₹{item.dummyPrice}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* ================= CHECKPOINT DOTS ================= */}
        <div className="flex justify-between max-w-xs mx-auto mt-2">
          {slices.map((_, i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-[var(--border)]"
            />
          ))}
        </div>

        {/* ================= PRICE LABELS ================= */}
        <div className="flex justify-between max-w-xs mx-auto mt-1 text-[10px] text-[var(--muted)]">
          {slices.map((p, i) => (
            <span key={i}>₹{p}</span>
          ))}
        </div>
      </div>

      {/* ================= BUY PANEL ================= */}
      <div
        ref={buyPanelRef}
        className="max-w-6xl mx-auto bg-[var(--card)] border border-[var(--border)]
        rounded-xl p-3.5 flex flex-row gap-4 items-center"
      >
        <div className="relative w-[110px] h-[110px] rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={activeItem.itemImageId?.image || logo}
            alt={activeItem.itemName}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <h2 className="text-lg font-bold truncate">
            {activeItem.itemName}
          </h2>

          <div className="flex items-center gap-2 mt-1.5">
            <p className="text-2xl font-extrabold text-[var(--accent)]">
              ₹{activeItem.sellingPrice}
            </p>
            <p className="text-xs line-through text-[var(--muted)]">
              ₹{activeItem.dummyPrice}
            </p>
          </div>
        </div>

        <button
          onClick={() => goBuy(activeItem)}
          className="px-5 py-2.5 rounded-lg bg-[var(--accent)]
          text-black font-semibold text-sm whitespace-nowrap
          hover:opacity-90 transition"
        >
          Buy →
        </button>
      </div>
      <div className="max-w-6xl mx-auto mt-6">
   <MLBBPurchaseGuide />
   </div>
    </section>
  );
}
