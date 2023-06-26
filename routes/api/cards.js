const express = require("express");
const router = express.Router();
const cardServiceModel = require("../../model/cardsService/cardsService");
const cardsValidationService = require("../../validation/cardsValidationService");
const normalizeCard = require("../../model/cardsService/helpers/normalizationCardService");
const authMw = require("../../middleware/authMiddleware");
const permissionsMiddleware = require("../../middleware/permissionsMiddleware");
const chalk = require("chalk");
const { stubFalse } = require("lodash");

router.get("/", async (req, res) => {
    try {
        const allCards = await cardServiceModel.getAllCards();
        res.json({ allCards });
        console.log(chalk.greenBright("The cards has been found"))

    } catch (error) {
        res.status(400).json(err);
        console.log(chalk.redBright("Could'nt find the cards", error))

    }
})
    .post("/", authMw, permissionsMiddleware(true, false, false), async (req, res) => {
        try {
            await cardsValidationService.createCardValidation(req.body);
            let normalCard = await normalizeCard(req.body, req.userData._id);
            const dateFromMongoose = await cardServiceModel.createCard(normalCard);
            res.status(201).json(dateFromMongoose);
            console.log(chalk.greenBright("The cards has been created"))
        }
        catch (error) {
            res.status(400).json({ error })
            console.log(chalk.redBright("Could'nt create the cards", error))

        }
    });

router.get("/my-cards", authMw, async (req, res) => {
    try {
        let allMyCards = await cardServiceModel.getMyCards(req.userData._id);
        if (allMyCards.length === 0) {
            console.log(chalk.greenBright("The user don't have cards yet!"));
            return res.json({ msg: "The user don't have cards yet!" });
        } else {
            console.log(chalk.greenBright("Fetched the users cards"));
            return res.json({ msg: "The user's cards:", allMyCards });
        }
    } catch (error) {
        res.status(400).json({ error });
        console.log(chalk.redBright("Could'nt find the cards", error))

    }
})

router.get("/:id", async (req, res) => {
    try {
        await cardsValidationService.createCardIdValidation(req.params.id);
        const cardById = await cardServiceModel.getCardsById(req.params.id);
        res.json(cardById);
        console.log(chalk.greenBright("The card has been found"))

    } catch (err) {
        res.status(400).json("invaled id couldnt find the card");
        console.log(chalk.redBright("Could'nt find the card", err))


    }
}).put(("/:id"), authMw, permissionsMiddleware(false, false, true), async (req, res) => {
    try {
        await cardsValidationService.createCardIdValidation(req.params.id);
        let cardAfterValidation = await cardsValidationService.createCardValidation(req.body)
        let cardAfterNormalize = await normalizeCard(cardAfterValidation);
        const cardFromDB = await cardServiceModel.updateCard(req.params.id, cardAfterNormalize);
        res.json({ msg: "The card has been edited", cardFromDB })
        console.log(chalk.greenBright("The card has been edited"))
    } catch (err) {
        res.status(400).json(err);
        console.log(chalk.redBright("Could'nt edit the card", err))

    }

}).patch("/:id", authMw, async (req, res) => {
    try {
        await cardsValidationService.createCardIdValidation(req.params.id);
        const cardToLike = await cardServiceModel.getCardsById(req.params.id);
        const cardLikes = cardToLike.likes.find((id) => id === req.userData._id)
        if (!cardLikes) {
            cardToLike.likes.push(req.userData._id);
            await cardServiceModel.likeCard(cardToLike);
            console.log(chalk.greenBright("The card has been liked"));
            return res.json({ msg: "The card has been liked", cardToLike });
        }
        const cardFilterd = cardToLike.likes.filter((id) => id !== req.userData._id);
        cardToLike.likes = cardFilterd;
        await cardServiceModel.likeCard(cardToLike);
        console.log(chalk.greenBright("The card has been unliked"));
        return res.json({ msg: "The card has been unliked", cardToLike });
    } catch (err) {
        console.log(chalk.redBright("Could not edit like:", err.message));
        return res.status(500).send(err.message);
    }

}).patch("/:id/:biznumber", authMw, permissionsMiddleware(false, true, false), async (req, res) => {
    try {
        await cardsValidationService.createCardIdValidation(req.params.id);
        const cardToChange = await cardServiceModel.getCardsById(req.params.id);
        const cardId = { _id: (req.params.id) };

        if (user.isBusiness === true) {
            const setIsBusiness = { $set: { isBusiness: false } };
            await usersServiceModel.bizUserChange(userId, setIsBusiness);
            console.log(chalk.greenBright("The user changed to normal account"));
            return res.status(200).json({ msg: "The user changed to normal account", user });
        } if (user.isBusiness === false) {
            const setIsBusiness = { $set: { isBusiness: true } };
            await usersServiceModel.bizUserChange(userId, setIsBusiness);
            console.log(chalk.greenBright("The user changed to business account"));
            return res.status(200).json({ msg: "The user changed to business account", user });
        }
    } catch (error) {
        console.log(chalk.redBright("Could'nt edit the user", error));
        res.status(400).json({ msg: "Could'nt edit the user", error })
    }
})
    .delete("/:id", authMw, permissionsMiddleware(false, false, true), async (req, res) => {
        try {
            await cardsValidationService.createCardIdValidation(req.params.id);
            const deletCard = await cardServiceModel.deleteCard(req.params.id)
            if (deletCard) {
                res.json({ msg: "card has been deleted", deletCard })
                console.log(chalk.greenBright("The card has been deleted"))
            } else {
                res.json({ msg: "Could not find the card" })
                console.log(chalk.redBright("Could not find the card"))
            }
        } catch (err) {
            res.status(400).json(err);
        }

    });


module.exports = router;