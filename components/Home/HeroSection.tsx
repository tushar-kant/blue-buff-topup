"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import GamesPage from "@/app/games/page";
import GameBannerCarousel from "./GameBannerCarousel";

export default function HeroSection() {
  const [search, setSearch] = useState("");
  const pathname = usePathname();

  const isLive = pathname.startsWith("/anime-live");

  return (
    <>
       <GameBannerCarousel/>
    <GamesPage/>
 
    </>

  );
}
