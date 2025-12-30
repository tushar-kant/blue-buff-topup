"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiFilter, FiX } from "react-icons/fi";
import logo from "@/public/logo.png";
import GamesFilterModal from "@/components/Games/GamesFilterModal";

export default function GamesPage() {
  const [category, setCategory] = useState<any[]>([]);
  const [games, setGames] = useState<any[]>([]);
    const [otts, setOtts] = useState<any>(null);


  /* ================= FILTER STATE ================= */
  const [showFilter, setShowFilter] = useState(false);
  const [sort, setSort] = useState<"az" | "za">("az");
  const [hideOOS, setHideOOS] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  /* ================= CONFIG ================= */
  const SPECIAL_MLBB_GAME = "MLBB SMALL";

  const outOfStockGames = [
    "Genshin Impact",
    "Honor Of Kings",
    "TEST 1",
      "Wuthering of Waves",
    "Where Winds Meet"
  ];

  const isOutOfStock = (name: string) =>
    outOfStockGames.includes(name);

  /* ================= FETCH ================= */
  useEffect(() => {
    fetch("/api/games")
      .then((res) => res.json())
      .then((data) => {
              const fetchedOtts = data?.data?.otts || null;
                    setOtts(fetchedOtts);
                          setOtts(data?.data?.otts || null);

        setCategory(data?.data?.category || []);
        setGames(
          (data?.data?.games || []).map((g: any) =>
            g.gameName === "PUBG Mobile"
              ? { ...g, gameName: "BGMI" }
              : g
          )
        );
      });
  }, []);

  /* ================= ACTIVE FILTER COUNT ================= */
  const activeFilterCount =
    (sort !== "az" ? 1 : 0) +
    (hideOOS ? 1 : 0) +
    (searchQuery ? 1 : 0);

  /* ================= FILTER + SORT + SEARCH ================= */
  const processGames = (list: any[]) => {
    let filtered = [...list];

    if (hideOOS) {
      filtered = filtered.filter(
        (g) => !isOutOfStock(g.gameName)
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (g) =>
          g.gameName.toLowerCase().includes(q) ||
          g.gameFrom?.toLowerCase().includes(q)
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
      (g) => g.gameName === SPECIAL_MLBB_GAME
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
        {/* IMAGE */}
        <div className="relative w-full aspect-[4/5] bg-black/10 overflow-hidden">
          <Image
            src={game.gameImageId?.image || logo}
            alt={game.gameName}
            fill
            className={`object-cover transition-transform duration-500
            ${disabled ? "grayscale blur-[1px]" : "group-hover:scale-110"}`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

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

          {disabled && (
            <span className="absolute top-3 right-3 text-[10px] px-2 py-1 rounded-full bg-red-600/90 text-white">
              Out of Stock
            </span>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-3 space-y-1">
          <h3 className="text-sm font-semibold truncate">
            {game.gameName}
          </h3>
          <p className="text-xs text-[var(--muted)] truncate">
            {game.gameFrom}
          </p>
        </div>

        {!disabled && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none ring-1 ring-[var(--accent)]/30 rounded-2xl" />
        )}
      </Link>
    );
  };

  return (
    <section className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* ================= FILTER BAR ================= */}
      <div className="sticky top-[64px] z-40 bg-[var(--background)]/80 backdrop-blur border-b border-[var(--border)]">
<div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          
          {/* SEARCH */}
    <div className="relative flex-1 min-w-0">
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search games..."
    className="w-full rounded-xl border bg-[var(--card)] px-4 py-2 text-sm
               outline-none transition focus:border-[var(--accent)]
               placeholder:text-[var(--muted)]"
  />

  {searchQuery && (
    <button
      onClick={() => setSearchQuery("")}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-red-500"
    >
      <FiX />
    </button>
  )}
</div>


          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            {activeFilterCount > 0 && (
              <button
                onClick={() => {
                  setSort("az");
                  setHideOOS(false);
                  setSearchQuery("");
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
      </div>

      {/* ================= CONTENT ================= */}
      <div className="px-4 py-10 space-y-14">
        {category.map((cat: any, i: number) => {
          const merged = injectSpecialGame(cat);
          const filtered = processGames(merged);
          if (!filtered.length) return null;

          return (
            <div key={i} className="max-w-7xl mx-auto">
              <h2 className="text-xl font-bold mb-4 px-1">
                {cat.categoryTitle}
                <span className="ml-2 text-xs text-[var(--muted)]">
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
            {processGames(games).map((game: any, i: number) => (
              <GameCard key={i} game={game} />
            ))}
          </div>
        </div>
      </div>

{otts?.items?.length > 0 && (
  <div className="max-w-7xl mx-auto mb-14">
    <div className="flex items-center gap-3 mb-6">
      <h2 className="text-2xl font-bold text-[var(--foreground)]">
        {otts.title}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-r from-[var(--border)] to-transparent" />
      <span className="text-sm text-[var(--muted)]">
        {otts.total} services
      </span>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {otts.items.map((ott:any) => (
        <Link
          key={ott.slug}
          href={`/games/ott/${ott.slug}`}
          className="group rounded-2xl bg-[var(--card)]
                     border border-[var(--border)]
                     hover:border-[var(--accent)]
                     transition-all duration-300
                     p-5 flex flex-col items-center text-center"
        >
          <div className="relative w-20 h-20 mb-4">
            <Image
              src={ott.image}
              alt={ott.name}
              fill
              className="object-contain"
            />
          </div>

          <h3 className="font-semibold text-[var(--foreground)]">
            {ott.name}
          </h3>

          <span className="mt-1 text-xs text-[var(--muted)]">
            {ott.category}
          </span>
        </Link>
      ))}
    </div>
  </div>
)}
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
