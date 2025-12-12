export async function GET() {
  const data = {
    statusCode: 200,
    success: true,
    message: "Game banners loaded",
    data: {
      banners: [
        {
          bannerId: 1,
          title: "Mobile Legends Event",
          image:
            "",
          slug: "mobile-legends",
        },
        {
          bannerId: 2,
          title: "Genshin Impact Update",
          image:
            "",
          slug: "genshin-impact",
        },
        {
          bannerId: 3,
          title: "PUBG Mobile Royale Pass",
          image:
            "",
          slug: "pubg-mobile",
        }
      ]
    }
  };

  return Response.json(data);
}
