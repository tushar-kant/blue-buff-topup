"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

export default function GamesPage() {
  const [category, setCategory] = useState([]);
  const [games, setGames] = useState([]);

  // Define out-of-stock game names
  const outOfStockGames = [
    "PUBG Mobile",
    "Genshin Impact",
    "Honor Of Kings",
    "TEST 1",
  ];

  const isOutOfStock = (name) => outOfStockGames.includes(name);

  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => {
        setCategory(data.data.category);
        setGames(data.data.games);
      });
  }, []);

  return (
    <section className="min-h-screen px-6 py-10 bg-[var(--background)] text-[var(--foreground)]">

      {/* ================= CATEGORY SECTION ================= */}
      {category.map((cat, i) => (
        <div key={i} className="max-w-6xl mx-auto mb-12">

          {/* Category Title */}
          <h2 className="text-2xl font-bold mb-4">{cat.categoryTitle}</h2>

          {/* Category Games (always 3 in one row) */}
          <div className="grid grid-cols-3 gap-4">

            {cat.gameId.map((game, index) => {
              const disabled = isOutOfStock(game.gameName);

              return (
                <Link
                  key={index}
                  href={disabled ? "#" : `/games/${game.gameSlug}`}
                  className={`bg-[var(--card)] border border-[var(--border)] rounded-xl p-3 shadow transition-all duration-300 
                    ${disabled ? "opacity-40 pointer-events-none" : "hover:scale-105"}`}
                >
                  <div className="w-full h-28 relative mb-3 rounded-lg overflow-hidden">
                    <Image
                      src={game.gameImageId.image || logo}
                      fill
                      alt={game.gameName}
                      className={`object-cover ${
                        disabled ? "grayscale" : ""
                      }`}
                    />
                  </div>

                  <h3 className="font-semibold text-sm">{game.gameName}</h3>
                  <p className="text-xs text-[var(--muted)]">{game.gameFrom}</p>

                  {/* Out of Stock Badge */}
                  {disabled && (
                    <span className="text-[10px] px-2 py-1 mt-2 inline-block rounded-full bg-red-600 text-white">
                      Out of Stock
                    </span>
                  )}

                  {/* Tag (Only if available & not disabled) */}
                  {!disabled && game.tagId && (
                    <span
                      className="text-[10px] px-2 py-1 mt-2 inline-block rounded-full"
                      style={{
                        background: game.tagId.tagBackground,
                        color: game.tagId.tagColor,
                      }}
                    >
                      {game.tagId.tagName}
                    </span>
                  )}
                </Link>
              );
            })}

          </div>
        </div>
      ))}

      {/* ================= ALL GAMES SECTION ================= */}
      <div className="max-w-6xl mx-auto">

        <h2 className="text-2xl font-bold mb-4">All Games</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">

          {games.map((game, i) => {
            const disabled = isOutOfStock(game.gameName);

            return (
              <Link
                key={i}
                href={disabled ? "#" : `/games/${game.gameSlug}`}
                className={`bg-[var(--card)] border border-[var(--border)] rounded-xl p-3 shadow transition-all duration-300 
                  ${disabled ? "opacity-40 pointer-events-none" : "hover:scale-105"}`}
              >
                <div className="w-full h-28 relative mb-3 rounded-lg overflow-hidden">
                  <Image
                    src={game.gameImageId.image || logo}
                    fill
                    alt={game.gameName}
                    className={`object-cover ${
                      disabled ? "grayscale" : ""
                    }`}
                  />
                </div>

                <h3 className="font-semibold text-sm">{game.gameName}</h3>
                <p className="text-xs text-[var(--muted)]">{game.gameFrom}</p>

                {/* Out of Stock Label */}
                {disabled && (
                  <span className="text-[10px] px-2 py-1 mt-2 inline-block rounded-full bg-red-600 text-white">
                    Out of Stock
                  </span>
                )}

                {/* Only show tag if available & not disabled */}
                {!disabled && game.tagId && (
                  <span
                    className="text-[10px] px-2 py-1 mt-2 inline-block rounded-full"
                    style={{
                      background: game.tagId.tagBackground,
                      color: game.tagId.tagColor,
                    }}
                  >
                    {game.tagId.tagName}
                  </span>
                )}
              </Link>
            );
          })}

        </div>
      </div>

    </section>
  );
}
