const userData = require("./users.json");
const cardsData = require("./cards.json");
const userService = require("../model/usersService/usersService");
const cardService = require("../model/cardsService/cardsService");
const hashService = require("../utils/hash/hashService");
const normlizeUser = require("../model/usersService/helpers/normalizationUserService");
const normlizeCard = require("../model/cardsService/helpers/normalizationCardService");

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
            user.password = await hashService.generateHash(user.password);
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