const User = require("./user");

const createCard = (cardToSave) => {
    let card = new Card(cardToSave)
    return card.save()
}

const registerUser = () => {
    return Card.find()
}
const loginUser = () => {
    return Card.find()
}
const getAllUsers = () => {
    return Card.find()
}
const getUserById = () => {
    return Card.find()
}
const editUser = () => {
    return Card.find()
}
const deleteUser = () => {
    return Card.find()
}

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    editUser,
    deleteUser,
}