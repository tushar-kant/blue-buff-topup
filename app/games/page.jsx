"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

export default function GamesPage() {
  const [category, setCategory] = useState([]);
  const [games, setGames] = useState([]);

  const outOfStockGames = ["PUBG Mobile", "Genshin Impact", "Honor Of Kings", "TEST 1"];
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
    <section className="min-h-screen px-4 py-8 bg-[var(--background)] text-[var(--foreground)]">

      {/* ================= CATEGORY LIST ================= */}
      {category.map((cat, i) => (
        <div key={i} className="max-w-6xl mx-auto mb-10">

          <h2 className="text-xl font-bold mb-3 px-1">{cat.categoryTitle}</h2>

          {/* Mobile-first grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {cat.gameId.map((game, index) => {
              const disabled = isOutOfStock(game.gameName);

              return (
                <Link
                  key={index}
                  href={disabled ? "#" : `/games/${game.gameSlug}`}
                  className={`relative rounded-xl bg-[var(--card)] border border-[var(--border)] overflow-hidden shadow-sm
                    transition-all duration-200 p-3 flex flex-col 
                    ${disabled ? "opacity-40 pointer-events-none" : "hover:-translate-y-1 hover:shadow-md"}`}
                >
                  {/* IMAGE */}
                  <div className="w-full h-28 relative rounded-lg overflow-hidden mb-2">
                    <Image
                      src={game.gameImageId?.image || logo}
                      alt={game.gameName}
                      fill
                      className={`object-cover ${disabled ? "grayscale" : ""}`}
                    />
                  </div>

                  {/* NAME + REGION */}
                  <h3 className="font-semibold text-sm leading-tight">{game.gameName}</h3>
                  <p className="text-xs text-[var(--muted)]">{game.gameFrom}</p>

                  {/* Out of Stock Badge */}
                  {disabled && (
                    <span className="absolute top-2 right-2 text-[9px] px-2 py-1 rounded-full bg-red-600 text-white shadow">
                      Out of Stock
                    </span>
                  )}

                  {/* Tag Badge */}
                  {!disabled && game.tagId && (
                    <span
                      className="text-[9px] px-2 py-1 mt-2 inline-block rounded-full w-fit"
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

      {/* ================= ALL GAMES ================= */}
      <div className="max-w-6xl mx-auto mb-10">
        <h2 className="text-xl font-bold mb-3 px-1">All Games</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {games.map((game, i) => {
            const disabled = isOutOfStock(game.gameName);

            return (
              <Link
                key={i}
                href={disabled ? "#" : `/games/${game.gameSlug}`}
                className={`relative rounded-xl bg-[var(--card)] border border-[var(--border)] overflow-hidden shadow-sm
                  transition-all duration-200 p-3 flex flex-col
                  ${disabled ? "opacity-40 pointer-events-none" : "hover:-translate-y-1 hover:shadow-md"}`}
              >
                {/* IMAGE */}
                <div className="w-full h-28 relative rounded-lg overflow-hidden mb-2">
                  <Image
                    src={game.gameImageId?.image || logo}
                    alt={game.gameName}
                    fill
                    className={`object-cover ${disabled ? "grayscale" : ""}`}
                  />
                </div>

                {/* NAME */}
                <h3 className="font-semibold text-sm">{game.gameName}</h3>
                <p className="text-xs text-[var(--muted)]">{game.gameFrom}</p>

                {/* Out of Stock Badge */}
                {disabled && (
                  <span className="absolute top-2 right-2 text-[9px] px-2 py-1 rounded-full bg-red-600 text-white shadow">
                    Out of Stock
                  </span>
                )}

                {/* Tag Badge */}
                {!disabled && game.tagId && (
                  <span
                    className="text-[9px] px-2 py-1 mt-2 inline-block rounded-full w-fit"
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
