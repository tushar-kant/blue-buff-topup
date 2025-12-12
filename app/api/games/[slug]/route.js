export async function GET(req, { params }) {
  const { slug } = params;

  // Simulating DB lookup — you will later connect MongoDB.
  const gameResponse = {
    statusCode: 200,
    data: {
      gameName: "Mobile Legends",
      gameImageId: {
        image: ""
      },
      gameSlug: slug,
      gameFrom: "Moonton",
      gameLink: "busanofficial.com",
      inputFieldOne: "User ID",
      inputFieldTwo: "Server ID",
      inputFieldTwoOption: [],
      isValidationRequired: true,
      tagId: {
        tagName: "Indian",
        tagSlug: "indian130",
        tagColor: "#ffffff",
        tagBackground: "#669c35"
      },
      itemId: [
        {
          itemName: "86",
          itemSlug: "86990",
          itemImageId: {
            image: ""
          },
          itemAvailablity: true,
          sellingPrice: 110,
          dummyPrice: 130,
          index: 3
        },
        {
          itemName: "172",
          itemSlug: "172216",
          itemImageId: {
            image: ""
          },
          itemAvailablity: true,
          sellingPrice: 220,
          dummyPrice: 260,
          index: 4
        },
        // ... all other item objects ...
      ],
      gameAvailablity: true
    },
    message: "Game",
    success: true
  };

  return Response.json(gameResponse);
}
