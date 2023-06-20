const express = require("express");
const router = express.Router();
const cardServiceModel = require("../../model/cards/cardService");
const cardsValidationService = require("../../validation/cardsValidationService");
const normalizeCard = require("../../model/cards/helpers/normalizationCard");
const authMw = require("../../middleware/authMiddleware");
const permissionsMiddleware = require("../../middleware/permissionsMiddleware");
const chalk = require("chalk");

router.get("/", async (req, res) => {
    try {
        const allCards = await cardServiceModel.getAllCards();
        res.json(allCards);
    } catch (err) {
        res.status(400).json(err);
    }
})
    .post("/", authMw, permissionsMiddleware(true, false, false), async (req, res) => {
        try {
            await cardsValidationService.createCardValidation(req.body);
            let normalCard = await normalizeCard(req.body, req.userData._id);
            const dateFromMongoose = await cardServiceModel.createCard(normalCard);
            res.status(201).json(dateFromMongoose);
        }
        catch (err) {
            res.status(400).json(err)
        }
    });

router.get("/my-cards", authMw, async (req, res) => {
    let allMyCards = await cardServiceModel.getAllCards(req.userData._id);
    res.json(allMyCards)
})

router.get("/:id", async (req, res) => {
    try {
        await cardsValidationService.createCardIdValidation(req.params.id);
        const cardById = await cardServiceModel.getCardsById(req.params.id);
        res.json(cardById);
    } catch (err) {
        res.status(400).json("invaled id couldnt find the card");
    }
}).put(("/:id"), authMw, permissionsMiddleware(false, false, true), async (req, res) => {
    try {
        await cardsValidationService.createCardIdValidation(req.params.id);
        let cardAfterValidation = await cardsValidationService.createCardValidation(req.body)
        let cardAfterNormalize = await normalizeCard(cardAfterValidation);
        const cardFromDB = await cardServiceModel.updateCard(req.params.id, cardAfterNormalize);
        res.json(cardFromDB)
    } catch (err) {
        res.status(400).json(err);
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
            return res.json({ msg: "The card has been liked" });
        }
        const cardFilterd = cardToLike.likes.filter((id) => id !== req.userData._id);
        cardToLike.likes = cardFilterd;
        await cardServiceModel.likeCard(cardToLike);
        console.log(chalk.greenBright("The card has been unliked"));
        return res.json({ msg: "The card has been unliked" });
    } catch (err) {
        console.log(chalk.redBright("Could not edit like:", err.message));
        return res.status(500).send(err.message);
    }

}).delete("/:id", authMw, permissionsMiddleware(false, false, true), async (req, res) => {
    try {
        await cardsValidationService.createCardIdValidation(req.params.id);
        const deletCard = await cardServiceModel.deleteCard(req.params.id)
        if (deletCard) {
            res.json({ msg: "card has been deleted" })
        } else {
            res.json({ msg: "could not find the card" })
        }
    } catch (err) {
        res.status(400).json(err);
    }

});


module.exports = router;