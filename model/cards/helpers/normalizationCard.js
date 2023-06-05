const normalizeCard = (card, userId) => {
    if (!card.image) {
        card.image = {

        }
        card.image = {
            url: card.image.url || "https://kubalubra.is/wp-content/uploads/2017/11/default-thumbnail-300x225.jpg",
            alt: card.image.alt || "card defult picture",
        }
        return {
            ...card,
            address: {
                ...card.address,
                state: card.address.state || ""
            },
            bizNumber: card.bizNumber || ""
        }
    }
}