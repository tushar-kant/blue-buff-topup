import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://1gamestopup.com/api/v1/game",
      {
        method: "GET",
        headers: {
          "x-api-key": process.env.API_SECRET_KEY,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("GAME API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch game list",
      },
      { status: 500 }
    );
  }
}
