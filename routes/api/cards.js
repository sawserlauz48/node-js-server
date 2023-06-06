const express = require("express");
const router = express.Router();
const cardServiceModel = require("../../model/cards/cardService")
const cardsValidationService = require("../../validation/cardsValidationService");
const normalizeCard = require("../../model/cards/helpers/normalizationCard")

router.get("/", async (req, res) => {
    try {
        const allCards = await cardServiceModel.getAllCards();
        res.json(allCards);
    } catch (err) {
        res.status(400).json(err);
    }
})
    .post("/", async (req, res) => {
        try {
            await cardsValidationService.createCardValidation(req.body);
            let normalCard = await normalizeCard(req.body);
            const dateFromMongoose = await cardServiceModel.createCard(normalCard);
            res.status(201).json(dateFromMongoose);
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err)
        }
    });


router.get("/:id", async (req, res) => {
    try {
        await cardsValidationService.createCardIdValidation(req.params.id);
        const cardById = await cardServiceModel.getCardsById(req.params.id);
        res.json(cardById);
    } catch (err) {
        res.status(400).json("invaled id couldnt find the card");
    }
}).put(("/:id"), async (req, res) => {
    try {
        await cardsValidationService.createCardIdValidation(req.params.id);
        let cardAfterValidation = await cardsValidationService.createCardValidation(req.body)
        let cardAfterNormalize = await normalizeCard(cardAfterValidation);
        const cardFromDB = await cardServiceModel.updateCard(req.params.id, cardAfterNormalize);
        res.json(cardFromDB)
    } catch (err) {
        res.status(400).json(err);
    }

}).patch("/:id", async (req, res) => {
    try {
        await cardsValidationService.createCardIdValidation(req.params.id);

    } catch (err) {
        res.status(400).json(err);
    }

}).delete("/:id", async (req, res) => {
    try {
        await cardsValidationService.createCardIdValidation(req.params.id);
        const deletCard = await cardServiceModel.deleteCard(req.params.id)
        res.json({ msg: "card has been deleted", deletCard })
    } catch (err) {
        res.status(400).json(err);
    }

});

router.get("/my-cards", async (req, res) => {

})

module.exports = router;