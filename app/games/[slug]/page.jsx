"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import logo from "@/public/logo.png";

export default function GameDetailPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [game, setGame] = useState(null);

useEffect(() => {
  fetch(`/api/games/${slug}`)
    .then((res) => res.json())
    .then((data) => {
      const gameData = data.data;

      // Extract items
      let items = [...gameData.itemId];

      // Find specific items
      const weeklyPass = items.find(i => i.itemSlug === "weekly-pass816");
      const twilightPass = items.find(i => i.itemSlug === "twilight-pass663");

      // Remove them from original list
      items = items.filter(
        i => i.itemSlug !== "weekly-pass816" && i.itemSlug !== "twilight-pass663"
      );

      // Final sorted list
      const sortedItems = [
        weeklyPass,
        twilightPass,
        ...items
      ].filter(Boolean); // remove null if item missing

      setGame({
        ...gameData,
        itemId: sortedItems
      });
    });
}, [slug]);


  if (!game) return <div className="p-6">Loading...</div>;

  return (
    <section className="px-6 py-10 bg-[var(--background)] text-[var(--foreground)] min-h-screen">

      {/* ================= HEADER CARD ================= */}
      <div className="max-w-4xl mx-auto mb-8 bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-lg flex items-center gap-6">

        {/* Game Image */}
        <div className="w-[120px] h-[120px] relative flex-shrink-0 rounded-xl overflow-hidden shadow-md">
          <Image
            src={game.gameImageId?.image || logo}
            alt={game.gameName}
            fill
            className="object-cover"
          />
        </div>

        {/* Game Info */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-extrabold tracking-tight">
            {game.gameName}
          </h1>

          <p className="text-[var(--muted)] text-sm mt-1">
            {game.gameFrom}
          </p>

          {game.tagId && (
            <span
              className="text-xs px-3 py-1 rounded-full mt-3 w-fit font-semibold shadow-md"
              style={{
                background: game.tagId.tagBackground,
                color: game.tagId.tagColor,
              }}
            >
              {game.tagId.tagName}
            </span>
          )}
        </div>
      </div>

      {/* ================= PACK SECTION ================= */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4 tracking-tight">Choose Amount</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

          {game.itemId.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                const query = new URLSearchParams({
                  name: item.itemName,
                  price: item.sellingPrice.toString(),
                  dummy: item.dummyPrice.toString(),
                  image: item.itemImageId?.image || "",
                });

                router.push(`/games/${slug}/buy/${item.itemSlug}?${query.toString()}`);
              }}
              className="group bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 cursor-pointer 
              hover:border-[var(--accent)] hover:shadow-[0_0_15px_var(--accent)] hover:-translate-y-1 
              transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="w-full h-25 relative mb-3 rounded-lg overflow-hidden shadow-sm">
                <Image
                  src={item.itemImageId?.image || logo}
                  alt={item.itemName}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Item Name */}
              <h3 className="font-semibold text-[15px] leading-tight">
                {item.itemName}
              </h3>

              {/* Price */}
             <div className="mt-2 flex items-center justify-between">
  <p className="text-[var(--accent)] font-bold text-[16px]">
    ₹{item.sellingPrice}
  </p>
  <p className="text-xs line-through text-[var(--muted)]">
    ₹{item.dummyPrice}
  </p>
</div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
