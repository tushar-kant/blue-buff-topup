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
      .then((data) => setGame(data.data));
  }, [slug]);

  if (!game) return <div className="p-6">Loading...</div>;

  return (
    <section className="px-6 py-10 bg-[var(--background)] text-[var(--foreground)] min-h-screen">

      {/* =============== Updated Game Header =============== */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center gap-6">

        {/* Game Image (Left side) */}
        <div className="w-[120px] h-[120px] relative flex-shrink-0">
          <Image
            src={game.gameImageId?.image || logo}
            alt={game.gameName}
            fill
            className="rounded-xl object-cover shadow-lg"
          />
        </div>

        {/* Game Details Right Side */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight">
            {game.gameName}
          </h1>

          <p className="text-[var(--muted)] text-sm mt-1">
            {game.gameFrom}
          </p>

          {game.tagId && (
            <span
              className="text-xs px-3 py-1 rounded-full mt-2 inline-block"
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

      {/* PACKS ONLY */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 tracking-tight">
          Choose Amount
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

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

              className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-3 cursor-pointer hover:scale-105 transition-all shadow"
            >
              <div className="w-full h-24 relative mb-3 rounded-lg overflow-hidden">
                <Image
                  src={item.itemImageId?.image || logo}
                  alt={item.itemName}
                  fill
                  className="object-cover"
                />
              </div>

              <h3 className="font-semibold text-sm leading-tight">
                {item.itemName}
              </h3>

              <p className="text-sm text-[var(--accent)] font-bold mt-1">
                ₹{item.sellingPrice}
              </p>

              <p className="text-xs line-through text-[var(--muted)]">
                ₹{item.dummyPrice}
              </p>
            </div>
          ))}

        </div>
      </div>

    </section>
  );
}
