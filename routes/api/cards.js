const express = require("express");
const router = express.Router();
const cardServiceModel = require("../../model/cards/cardService")
const cardsValidationService = require("../../validation/cardsValidationService");

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
            await cardsValidationService.createCardValidation(req.body)
            const dateFromMongoose = await cardServiceModel.createCard(req.body)
            res.status(200).json(dateFromMongoose);
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err)
        }
    });


router.get("/:id", async (req, res) => {
    try {
        //joi validation
        const cardById = await cardServiceModel.getCardsById(req.params.id);
        res.json(cardById);
    } catch (err) {
        res.status(400).json(err);
    }
}).put(("/:id"), async (req, res) => {
    try {

    } catch (err) {
        res.status(400).json(err);
    }

}).patch("/:id", (req, res) => {
    try {

    } catch (err) {
        res.status(400).json(err);
    }

}).delete("/:id", async (req, res) => {
    try {
        const deletCard = await cardServiceModel.deleteCard(req.params.id)
        res.json({ msg: "card has been deleted" })
    } catch (err) {
        res.status(400).json(err);
    }

});

router.get("/my-cards", async (req, res) => {

})

module.exports = router;