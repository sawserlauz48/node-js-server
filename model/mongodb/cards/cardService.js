const Card = require("./card");
const { ObjectId } = require("mongoose").Types;

const createCard = (cardToSave) => {
    let card = new Card(cardToSave)
    return card.save()
}

const getAllCards = () => {
    return Card.find()
}
const getMyCards = (user_id) => {
    return Card.find({ user_id: new ObjectId(user_id) });
};
const getCardsById = (id) => {
    return Card.findById(id)
}
const getCardByBizNumber = (bizNumber) => {
    return Card.findOne({ bizNumber }, { bizNumber: 1, _id: 0 });
}
const updateCard = async (id, cardToUpdate) => {
    return Card.findByIdAndUpdate(id, cardToUpdate, { new: true })
}
const likeCard = async (cardToSave) => {
    let card = Card(cardToSave)
    return card.save()
}
const deleteCard = async (id) => {
    return Card.findByIdAndDelete(id)
}
const editCardBizNumber = async (filter, update) => {
    return Card.updateOne(filter, update)
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