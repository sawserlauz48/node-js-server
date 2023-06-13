const CustomError = require("../utils/CustomError");
const cardService = require("../model/cards/cardService");
const cardsValidationService = require("../validation/cardsValidationService");


const CheckIfBizOwner = async (idUser, idCard, res, next) => {
    try {
        await cardsValidationService.createCardIdValidation(idCard);
        const cardData = await cardService.getCardsById(idCard);
        if (!cardData) {
            return res.status(400).json({ msg: "card not found" });
        }
        if (cardData.user_id == idUser) {
            next()
        } else {
            res.status(401).json({ msg: "you must be the business owner" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }

}

const permissionsMiddleware = (isBiz, isAdmin, isBizOwner) => {
    return (req, res, next) => {
        if (!req.userData) {
            throw new CustomError("must provide userData");
        }
        if (isBiz === req.userData.isBusiness && isBiz === true) {
            return next()
        }
        if (isAdmin === req.userData.isAdmin && isAdmin === true) {
            return next()
        }
        if (isBizOwner === req.userData.isBusiness && isBizOwner === true) {
            return CheckIfBizOwner(req.userData._id, req.params.id, res, next);
        }
        res.status(401).json({ msg: "you are not allowed to edit this card" });
    };


}

module.exports = permissionsMiddleware;
