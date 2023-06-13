const User = require("./user");

const registerUser = (userData) => {
    let user = new User(userData)
    return user.save()
}

const loginUser = () => {
}
const getAllUsers = () => {
    return User.find()
}
const getUserById = (id) => {
    return User.findById(id)

}
const editUser = (id, UserToUpdate) => {
    return User.findByIdAndUpdate(id, UserToUpdate, { new: true })

}
const deleteUser = (id) => {
    return User.findByIdAndDelete(id)
}

const getUserByEmail = (email) => {
    return User.findOne({ email });
}

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    editUser,
    deleteUser,
    getUserByEmail,
}