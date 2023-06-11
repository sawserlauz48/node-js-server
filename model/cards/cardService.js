const Card = require("./card");

const createCard = async (cardToSave) => {
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
    return Card.findOne({ bizNumber }, { bizNumber: 1, _id: 0 });
}
const updateCard = async (id, cardToUpdate) => {
    return Card.findByIdAndUpdate(id, cardToUpdate, { new: true })
}
const likeCard = (id) => {

}
const deleteCard = async (id) => {
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
    getCardByBizNumber

}