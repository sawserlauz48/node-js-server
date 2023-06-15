const userData = require("./users.json");
const cardsData = require("./cards.json");
const userService = require("../model/users/userService");
const cardService = require("../model/cards/cardService");
const bcrypt = require("../config/bcrypt");
const normlizeUser = require("../model/users/helpers/normalizationUser");
const normlizeCard = require("../model/cards/helpers/normalizationCard");

const initailData = async () => {
    try {
        let cards = await cardService.getAllCards();
        if (cards.length) {
            return
        }
        let users = await userService.getAllUsers();
        if (users.length) {
            return
        }
        let user_id = "";
        for (let user of userData) {
            user.password = await bcrypt.generateHash(user.password);
            user = normlizeUser(user);
            user_id = await userService.registerUser(user)
        }
        user_id = user_id._id + "";
        for (let card of cardsData) {
            card = await normlizeCard(card, user_id);
            await cardService.createCard(card);
        }
    } catch (error) {
        console.log("error from initial:", error)
    }


}


module.exports = initailData;