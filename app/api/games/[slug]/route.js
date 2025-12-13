import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

/* ================= PRICE RULES ================= */
const getMarkupPercent = (userType) => {
  if (userType === "admin") return 1;
  if (userType === "owner") return 0;
  return 2; // user OR no JWT
};

export async function GET(req, context) {
  const { slug } = await context.params;

  try {
    /* ================= OPTIONAL JWT ================= */
    let userType = "user"; // 👈 default if no JWT

    const authHeader = req.headers.get("authorization");
    console.log("Auth Header:", authHeader);

    if (authHeader?.startsWith("Bearer ")) {
      try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded?.userType) {
          userType = decoded.userType;
        }

        console.log("JWT received:", {
          userId: decoded.userId,
          userType,
        });
      } catch (err) {
        // Invalid token → fallback to normal user pricing
        console.log("Invalid JWT received, using user pricing");
      }
    }

    const markupPercent = getMarkupPercent(userType);
    console.log(`💰 Pricing for ${userType}: +${markupPercent}%`);

    /* ================= FETCH GAME ================= */
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/game/${slug}`,
      {
        method: "GET",
        headers: {
          "x-api-key": process.env.API_SECRET_KEY,
        },
      }
    );

    const data = await response.json();

    if (!data?.data?.itemId) {
      return NextResponse.json(data);
    }

    /* ================= APPLY PRICE MARKUP ================= */
    data.data.itemId = data.data.itemId.map((item) => {
      const basePrice = Number(item.sellingPrice);

      const finalPrice =
        markupPercent === 0
          ? basePrice
          : Math.ceil(basePrice * (1 + markupPercent / 100));

      return {
        ...item,
        sellingPrice: finalPrice,
      };
    });

    return NextResponse.json(data);

  } catch (error) {
    console.error("Game Fetch Error:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 }
    );
  }
}
