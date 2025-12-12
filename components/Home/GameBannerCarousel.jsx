"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

export default function GameBannerCarousel() {
  const [banners, setBanners] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch("/api/game-banners")
      .then((res) => res.json())
      .then((data) => setBanners(data.data.banners));
  }, []);

  // Auto slide + random change
  useEffect(() => {
    if (!banners.length) return;

    const interval = setInterval(() => {
      // 40% chance go to next slide
      // 60% chance jump to a random slide
      const randomChance = Math.random();

      if (randomChance < 0.4) {
        setCurrent((prev) => (prev + 1) % banners.length);
      } else {
        const randomIndex = Math.floor(Math.random() * banners.length);
        setCurrent(randomIndex);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [banners]);

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const goPrev = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  if (!banners.length) return null;

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-6 select-none">

      {/* Slider Area */}
      <div className="overflow-hidden rounded-2xl shadow-lg h-[180px] md:h-[260px] relative">

        {banners.map((banner, i) => (
          <Link
            key={banner.bannerId}
            href={`/games/${banner.slug}`}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={banner.image || logo}
              alt={banner.title}
              fill
              className="object-cover"
            />
          </Link>
        ))}

        {/* LEFT ARROW */}
        <button
          onClick={goPrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-md transition"
        >
          ◀
        </button>

        {/* RIGHT ARROW */}
        <button
          onClick={goNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-md transition"
        >
          ▶
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-3">
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 w-2 rounded-full transition-all ${
              current === i
                ? "bg-[var(--accent)] w-5"
                : "bg-[var(--muted)]"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
