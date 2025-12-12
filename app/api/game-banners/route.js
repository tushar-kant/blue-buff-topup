export async function GET() {
  try {
    const response = await fetch("https://1gamestopup.com/api/v1/banner", {
      method: "GET",
      headers: {
        "x-api-key": process.env.GAME_API_KEY || 
                      "busan_7dff88eac1aa6f7f0b1bb8ef47124f15397919baf563fa3c4db5b580064e842c",
      },
      cache: "no-store",
    });

    const data = await response.json();

    return Response.json(data);
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Failed to load banners",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
