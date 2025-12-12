export async function GET() {
  const data = {
    statusCode: 200,
    data: {
      category: [
        {
          categoryTitle: "Mobile Legends",
          categorySlug: "mobile-legends389",
          gameId: [
            {
              gameName: "Mobile Legends",
              gameImageId: {
                image:
                  "",
              },
              gameSlug: "mobile-legends988",
              gameFrom: "Moonton",
              tagId: {
                tagName: "Indian",
                tagSlug: "indian130",
                tagColor: "#ffffff",
                tagBackground: "#669c35",
              },
              gameAvailablity: true,
            },
            {
              gameName: "MLBB Double",
              gameImageId: {
                image:
                  "",
              },
              gameSlug: "mlbb-double332",
              gameFrom: "Moneyton",
              tagId: {
                tagName: "Indian",
                tagSlug: "indian130",
                tagColor: "#ffffff",
                tagBackground: "#669c35",
              },
              gameAvailablity: true,
            },
            {
              gameName: "SG/MY Mlbb",
              gameImageId: {
                image:
                  "",
              },
              gameSlug: "sgmy-mlbb893",
              gameFrom: "Moontoon",
              gameAvailablity: true,
              tagId: {
                tagName: "All Region",
                tagSlug: "all-region548",
                tagColor: "#831100",
                tagBackground: "#ebebeb",
              },
            },
          ],
        },
      ],
      games: [
        // {
        //   gameName: "PUBG Mobile",
        //   gameImageId: {
        //     image:
        //       "",
        //   },
        //   gameSlug: "pubg-mobile138",
        //   gameFrom: "Krafton",
        //   gameAvailablity: true,
        // },

        // {
        //   gameName: "Genshin Impact",
        //   gameImageId: {
        //     image:
        //       "",
        //   },
        //   gameSlug: "genshin-impact742",
        //   gameFrom: "Hoyoverse",
        //   gameAvailablity: true,
        // },

        {
          gameName: "MLBB Double",
          gameImageId: {
            image:
              "",
          },
          gameSlug: "mlbb-double332",
          gameFrom: "Moneyton",
          tagId: {
            tagName: "Indian",
            tagSlug: "indian130",
            tagColor: "#ffffff",
            tagBackground: "#669c35",
          },
          gameAvailablity: true,
        },

        {
          gameName: "Mobile Legends",
          gameImageId: {
            image:
              "",
          },
          gameSlug: "mobile-legends988",
          gameFrom: "Moonton",
          tagId: {
            tagName: "Indian",
            tagSlug: "indian130",
            tagColor: "#ffffff",
            tagBackground: "#669c35",
          },
          gameAvailablity: true,
        },

        {
          gameName: "SG/MY Mlbb",
          gameImageId: {
            image:
              "",
          },
          gameSlug: "sgmy-mlbb893",
          gameFrom: "Moontoon",
          gameAvailablity: true,
          tagId: {
            tagName: "All Region",
            tagSlug: "all-region548",
            tagColor: "#831100",
            tagBackground: "#ebebeb",
          },
        },
      ],
      totalGames: 11,
    },
    message: "All games",
    success: true,
  };

  return Response.json(data);
}
