const Card = require("./card");

const createCard = (cardToSave) => {
    let card = new Card(cardToSave)
    return card.save()

}
module.exports = {
    createCard
}