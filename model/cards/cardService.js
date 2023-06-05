const Card = require("./card");

const createCard = (cardToSave) => {
    let card = new Card(cardToSave)
    return card.save()
}

const getAllCards = () => {
    return Card.find()
}
const getMyCards = () => {
}
const getCardsById = (id) => {
    return Card.findById(id)
}
const getCardByBizNumber = (bizNumber) => {
    return Card.findOne({ bizNumber: bizNumber })
}
const updateCard = (id, cardToUpdate) => {
    return Card.findByIdAndUpdate
}
const likeCard = () => {
}
const deleteCard = (id) => {
    return Card.findByIdAndDelete(id)
}

module.exports = {
    createCard,
    getAllCards,
    getMyCards,
    getCardsById,
    updateCard,
    likeCard,
    deleteCard,

}