"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiFilter, FiX } from "react-icons/fi";
import logo from "@/public/logo.png";
import GamesFilterModal from "@/components/Games/GamesFilterModal";

export default function GamesPage() {
  const [category, setCategory] = useState([]);
  const [games, setGames] = useState([]);

  /* ================= FILTER STATE ================= */
  const [showFilter, setShowFilter] = useState(false);
  const [sort, setSort] = useState("az"); // az | za
  const [hideOOS, setHideOOS] = useState(false);

  /* ================= CONFIG ================= */
  const SPECIAL_MLBB_GAME = "MLBB SMALL";

  const outOfStockGames = [
    "PUBG Mobile",
    "Genshin Impact",
    "Honor Of Kings",
    "TEST 1",
  ];

  const isOutOfStock = (name: string) =>
    outOfStockGames.includes(name);

  /* ================= FETCH ================= */
  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => {
        setCategory(data?.data?.category || []);
        setGames(data?.data?.games || []);
      });
  }, []);

  /* ================= ACTIVE FILTER COUNT ================= */
  const activeFilterCount =
    (sort !== "az" ? 1 : 0) + (hideOOS ? 1 : 0);

  /* ================= FILTER + SORT ================= */
  const processGames = (list: any[]) => {
    let filtered = [...list];

    if (hideOOS) {
      filtered = filtered.filter(
        (g) => !isOutOfStock(g.gameName)
      );
    }

    filtered.sort((a, b) =>
      sort === "az"
        ? a.gameName.localeCompare(b.gameName)
        : b.gameName.localeCompare(a.gameName)
    );

    return filtered;
  };

  /* ================= PIN MLBB GAME ================= */
  const injectSpecialGame = (cat: any) => {
    if (
      !cat.categoryTitle
        ?.toLowerCase()
        .includes("mobile legends")
    ) {
      return cat.gameId;
    }

    const specialGame = games.find(
      (g: any) => g.gameName === SPECIAL_MLBB_GAME
    );

    if (!specialGame) return cat.gameId;

    const withoutDuplicate = cat.gameId.filter(
      (g: any) => g.gameName !== SPECIAL_MLBB_GAME
    );

    return [specialGame, ...withoutDuplicate];
  };

  /* ================= GAME CARD ================= */
  const GameCard = ({ game }: any) => {
    const disabled = isOutOfStock(game.gameName);

    return (
      <Link
        href={disabled ? "#" : `/games/${game.gameSlug}`}
        className={`group relative rounded-2xl overflow-hidden
        border bg-[var(--card)] transition-all duration-300
        ${
          disabled
            ? "opacity-50 pointer-events-none"
            : "hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)] hover:border-[var(--accent)]"
        }`}
      >
        {/* Image */}
        <div className="relative w-full aspect-[4/5] bg-black/10 overflow-hidden">
          <Image
            src={game.gameImageId?.image || logo}
            alt={game.gameName}
            fill
            className={`object-cover transition-transform duration-500
            ${disabled ? "grayscale blur-[1px]" : "group-hover:scale-110"}`}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Tag */}
          {!disabled && game.tagId && (
            <span
              className="absolute top-3 left-3 text-[10px] px-2 py-1 rounded-full font-medium backdrop-blur"
              style={{
                background: game.tagId.tagBackground,
                color: game.tagId.tagColor,
              }}
            >
              {game.tagId.tagName}
            </span>
          )}

          {/* OOS */}
          {disabled && (
            <span className="absolute top-3 right-3 text-[10px] px-2 py-1 rounded-full bg-red-600/90 text-white backdrop-blur">
              Out of Stock
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-3 space-y-1">
          <h3 className="text-sm font-semibold truncate">
            {game.gameName}
          </h3>
          <p className="text-xs text-[var(--muted)] truncate">
            {game.gameFrom}
          </p>
        </div>

        {/* Hover Glow */}
        {!disabled && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none ring-1 ring-[var(--accent)]/30 rounded-2xl" />
        )}
      </Link>
    );
  };

  return (
    <section className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* ================= STICKY FILTER BAR ================= */}
      <div className="sticky top-[64px] z-40 bg-[var(--background)]/80 backdrop-blur border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-end gap-3">
          {activeFilterCount > 0 && (
            <button
              onClick={() => {
                setSort("az");
                setHideOOS(false);
              }}
              className="flex items-center gap-1 px-3 py-2 rounded-xl border bg-[var(--card)] text-sm hover:border-red-500 hover:text-red-500"
            >
              <FiX />
              Clear
            </button>
          )}

          <button
            onClick={() => setShowFilter(true)}
            className="relative flex items-center gap-2 px-4 py-2 rounded-xl border bg-[var(--card)] hover:border-[var(--accent)]"
          >
            <FiFilter />
            Filter
            {activeFilterCount > 0 && (
              <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] rounded-full bg-[var(--accent)] text-black font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="px-4 py-10 space-y-14">
        {/* CATEGORY SECTIONS */}
        {category.map((cat: any, i: number) => {
          const merged = injectSpecialGame(cat);
          const filtered = processGames(merged);
          if (!filtered.length) return null;

          return (
            <div key={i} className="max-w-7xl mx-auto">
              <h2 className="text-xl font-bold mb-4 px-1 flex items-center gap-2">
                {cat.categoryTitle}
                <span className="text-xs text-[var(--muted)] font-medium">
                  ({filtered.length})
                </span>
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {filtered.map((game: any, index: number) => (
                  <GameCard key={index} game={game} />
                ))}
              </div>
            </div>
          );
        })}

        {/* ALL GAMES */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl font-bold mb-4 px-1">
            All Games
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {processGames(games).map(
              (game: any, i: number) => (
                <GameCard key={i} game={game} />
              )
            )}
          </div>
        </div>
      </div>

      {/* ================= FILTER MODAL ================= */}
      {showFilter && (
        <GamesFilterModal
          open={showFilter}
          onClose={() => setShowFilter(false)}
          sort={sort}
          setSort={setSort}
          hideOOS={hideOOS}
          setHideOOS={setHideOOS}
        />
      )}
    </section>
  );
}
