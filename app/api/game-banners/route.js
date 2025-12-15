// export async function GET() {
//   try {
//     const response = await fetch("https://1gamestopup.com/api/v1/banner", {
//       method: "GET",
//       headers: {
//         "x-api-key": process.env.GAME_API_KEY || 
//                       "busan_7dff88eac1aa6f7f0b1bb8ef47124f15397919baf563fa3c4db5b580064e842c",
//       },
//       cache: "no-store",
//     });

//     const data = await response.json();

//     return Response.json(data);
//   } catch (error) {
//     return Response.json(
//       {
//         success: false,
//         message: "Failed to load banners",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }




export async function GET() {
  try {
    const data = {
      statusCode: 200,
      success: true,
      message: "All banners retrieved",
    data: [
  {
    bannerImage:
      "https://res.cloudinary.com/dk0sslz1q/image/upload/v1765779743/Black_and_white_Geometric_Gamming_Channel_Youtube_Banner_20251105_145858_0000_1_ovbjb7.png",
    bannerFrom: "Blue Buff",
    bannerLink: "https://bluebuff.com",
    bannerTitle: "Blue Buff – MLBB Diamond Top-Up",
    bannerSlug: "blue-buff-mlbb-diamond-topup",
    gameId: ["mlbb"],
    bannerDate: "2025-04-30T00:00:00.000Z",
    bannerSummary:
      "Your one-stop MLBB top-up destination. Get affordable Diamonds 💎 with instant delivery and trusted service.",
    isShow: true,
    __v: 0,
  },
  {
    bannerImage:
      "https://res.cloudinary.com/dk0sslz1q/image/upload/v1765781407/Untitled349_2025102715224_vebykq.jpg",
    bannerFrom: "Blue Buff",
    bannerLink: "https://bluebuff.com",
    bannerTitle: "Instant Game Top-Ups",
    bannerSlug: "blue-buff-instant-game-topups",
    gameId: [],
    bannerDate: "2025-04-29T00:00:00.000Z",
    bannerSummary:
      "Top up your favorite games instantly with secure payments and fast processing.",
    isShow: true,
    __v: 0,
  },
  {
    bannerImage:
      "https://res.cloudinary.com/dk0sslz1q/image/upload/v1765781582/Untitled349_2025102715450_xsoicx.jpg",
    bannerFrom: "Blue Buff",
    bannerLink: "https://bluebuff.com",
    bannerTitle: "Cheapest MLBB Diamonds",
    bannerSlug: "blue-buff-cheapest-mlbb-diamonds",
    gameId: ["mlbb"],
    bannerDate: "2025-04-29T00:00:00.000Z",
    bannerSummary:
      "Lowest prices on MLBB Diamonds with 24/7 automatic instant support.",
    isShow: true,
    __v: 0,
  },
]

    };

    return Response.json(data);
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to load banners",
      },
      { status: 500 }
    );
  }
}
