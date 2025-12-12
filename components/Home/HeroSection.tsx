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
  const checkBalance = async () => {
  const res = await fetch("/api/game/balance");
  const data = await res.json();
  console.log("FINAL BALANCE:", data);
};

checkBalance();


  return (
    <>
       <GameBannerCarousel/>
    <GamesPage/>
 
    </>

  );
}
