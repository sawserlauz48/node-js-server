const express = require("express");
const router = express.Router();
const bcrypt = require("../../config/bcrypt");
const userValidationService = require("../../validation/userValidationService");
const normalizeUser = require("../../model/users/helpers/normalizationUser");
const usersServiceModel = require("../../model/users/userService");
const jwt = require("../../config/jwt");
const CustomError = require("../../utils/CustomError")



router.post("/", async (req, res) => {
    try {
        await userValidationService.registerUserValidation(req.body);
        req.body.password = await bcrypt.generateHash(req.body.password);
        req.body = normalizeUser(req.body);
        await usersServiceModel.registerUser(req.body);
        res.json({ msg: "user has been registerd" });
    } catch (error) {
        res.status(400).json(error);
    }
}).get("/", async (req, res) => {
    try {
        const allUsers = await usersServiceModel.getAllUsers();
        res.json(allUsers);
    } catch (error) {
        res.status(400).json(err);
    }
})

router.get("/:id", async (req, res) => {
    try {
        await userValidationService.createUserIdValidation(req.params.id);
        const userById = await usersServiceModel.getUserById(req.params.id);
        res.json(userById);

    } catch (error) {
        res.status(400).json("invaled id couldnt find the user")
    }
})
    .put("/:id", async (req, res) => {
        try {
            await userValidationService.createUserIdValidation(req.params.id);
            let userAfterValidation = await usersServiceModel.registerUserValidation(req.body);
            let userAfterNormlize = await normalizeUser(userAfterValidation);
            const userFromDb = await usersServiceModel.editUser(req.params.id, userAfterNormlize);
            res.json(userFromDb)
        } catch (error) {
            res.status(400).json(err);
        }
    })
    .patch("/:id", async (req, res) => {
        try {

        } catch (error) {

        }
    })
    .delete("/:id", async (req, res) => {
        try {
            await userValidationService.createUserIdValidation(req.params.id);
            const deletUser = await usersServiceModel.deleteUser(req.params.id)
            if (deletUser) {
                res.json({ msg: "user has been deleted" })
            } else {
                res.json({ msg: "could not find the user" })
            }
        } catch (err) {
            res.status(400).json(err);
        }

    });

router.post("/login", async (req, res) => {
    try {
        await userValidationService.LoginUserValidation(req.body);
        const userData = await usersServiceModel.getUserByEmail
            (req.body.email);
        if (!userData) throw new CustomError("invaled email or password");
        const isPasswordMatch = await bcrypt.compereHash(req.body.password, userData.password);
        if (!isPasswordMatch) throw new CustomError("invaled email or password");
        const token = await jwt.generateToken({
            _id: userData._id,
            isAdmin: userData.isAdmin,
            isBusiness: userData.isBiz,
        })
        res.json({ token });
    } catch (error) {
        res.status(400).json(error);

    }
})

module.exports = router;