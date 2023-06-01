const express = require("express");
const router = express.Router();
const cardServiceModel = require("../../model/cards/cardService")
const cardsValidationService = require("../../validation/cardsValidationService");

router.post("/", async (req, res) => {
    try {
        await cardsValidationService.createCardValidation(req.body)
        const dateFromMongoose = await cardServiceModel.createCard(req.body)
        res.status(200).json(dateFromMongoose);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
})

module.exports = router;