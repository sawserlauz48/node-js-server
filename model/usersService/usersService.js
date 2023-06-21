const config = require("config");
const usersServiceMongo = require("../mongodb/users/userService");
const dbOption = config.get("dbOption");


const registerUser = (userData) => {
    if (dbOption === "mongo") {
        return usersServiceMongo.registerUser(userData)
    }
}

const loginUser = () => {
    if (dbOption === "mongo") {
        return usersServiceMongo.loginUser()
    }
}
const getAllUsers = () => {
    if (dbOption === "mongo") {
        return usersServiceMongo.getAllUsers()
    }
}
const getUserById = (id) => {
    if (dbOption === "mongo") {
        return usersServiceMongo.getUserById(id)
    }
}
const editUser = (id, UserToUpdate) => {
    if (dbOption === "mongo") {
        return usersServiceMongo.editUser(id, UserToUpdate)
    }
}
const deleteUser = (id) => {
    if (dbOption === "mongo") {
        return usersServiceMongo.deleteUser(id)
    }
}

const getUserByEmail = (email) => {
    if (dbOption === "mongo") {
        return usersServiceMongo.getUserByEmail(email)
    }
}
const bizUserChange = async (filter, update) => {
    if (dbOption === "mongo") {
        return usersServiceMongo.bizUserChange(filter, update)
    }
}

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    editUser,
    deleteUser,
    getUserByEmail,
    bizUserChange
}