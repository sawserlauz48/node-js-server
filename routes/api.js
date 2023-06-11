const express = require("express");
const router = express.Router();
const cardRouter = require("./api/cards");
const userRouter = require("./api/users");

router.use("/cards", cardRouter);

router.use("/users", userRouter);

module.exports = router