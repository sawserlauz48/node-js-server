const CustomError = require("../utils/CustomError");
const cardService = require("../model/cards/cardService");
const cardsValidationService = require("../validation/cardsValidationService");
const chalk = require("chalk");

const CheckIfBizOwner = async (idUser, idCard, res, next) => {
    try {
        await cardsValidationService.createCardIdValidation(idCard);
        const cardData = await cardService.getCardsById(idCard);
        if (!cardData) {
            console.log(chalk.redBright("Card not found"));
            return res.status(400).json({ msg: "card not found" });
        }
        if (cardData.user_id == idUser) {
            console.log(chalk.greenBright("The card has been updated"));
            next()
        } else {
            console.log(chalk.redBright("User must be the business owner"));
            res.status(401).json({ msg: "You must be the business owner" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }

}

const permissionsMiddleware = (isBusiness, isAdmin, isBizOwner) => {
    return (req, res, next) => {
        if (!req.userData) {
            console.log(chalk.redBright("userData was not provided"));
            throw new CustomError("Must provide userData");
        }
        if (isBusiness === req.userData.isBusiness && isBusiness === true) {
            return next()
        }
        if (isAdmin === req.userData.isAdmin && isAdmin === true) {
            return next()
        }
        if (isBizOwner === req.userData.isBusiness && isBizOwner === true) {
            return CheckIfBizOwner(req.userData._id, req.params.id, res, next);
        }
        console.log(chalk.redBright("The user is not allowed to edit the card"));
        res.status(401).json({ msg: "You are not allowed to edit/create this card" });
    };


}

module.exports = permissionsMiddleware;
