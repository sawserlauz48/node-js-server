const config = require("config");
const cardsServiceMongo = require("../mongodb/cards/cardService");
const dbOption = config.get("dbOption");

const createCard = (cardToSave) => {
    if (dbOption === "mongo") {
        return cardsServiceMongo.createCard(cardToSave)
    }
}

const getAllCards = () => {
    if (dbOption === "mongo") {
        return cardsServiceMongo.getAllCards();
    }
}
const getMyCards = (user_id) => {
    if (dbOption === "mongo") {
        return cardsServiceMongo.getMyCards(user_id);
    }
}
const getCardsById = (id) => {
    if (dbOption === "mongo") {
        return cardsServiceMongo.getCardsById(id);
    }
}
const getCardByBizNumber = (bizNumber) => {
    if (dbOption === "mongo") {
        return cardsServiceMongo.getCardByBizNumber(bizNumber);
    }
}
const updateCard = async (id, cardToUpdate) => {
    if (dbOption === "mongo") {
        return cardsServiceMongo.updateCard(id, cardToUpdate);
    }
}
const likeCard = async (cardToSave) => {
    if (dbOption === "mongo") {
        return cardsServiceMongo.likeCard(cardToSave);
    }
}
const deleteCard = async (id) => {
    if (dbOption === "mongo") {
        return cardsServiceMongo.deleteCard(id);
    }
}


module.exports = {
    createCard,
    getAllCards,
    getMyCards,
    getCardsById,
    updateCard,
    likeCard,
    deleteCard,
    getCardByBizNumber,

}