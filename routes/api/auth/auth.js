const express = require("express");
const router = express.Router();

router.get("/register", (req, res) => {
    res.json("register")
})
router.get("/login", (req, res) => {
    res.json("login")
})


module.exports = router
