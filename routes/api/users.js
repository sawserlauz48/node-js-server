const express = require("express");
const router = express.Router();
const hashService = require("../../utils/hash/hashService");
const userValidationService = require("../../validation/userValidationService");
const normalizeUser = require("../../model/usersService/helpers/normalizationUserService");
const usersServiceModel = require("../../model/usersService/usersService");
const tokenService = require("../../utils/token/tokenService");
const CustomError = require("../../utils/CustomError");
const authMw = require("../../middleware/authMiddleware");
const permissionsMiddleware = require("../../middleware/permissionsMiddleware");
const chalk = require("chalk");





router.post("/", async (req, res) => {
    try {
        await userValidationService.registerUserValidation(req.body);
        req.body.password = await hashService.generateHash(req.body.password);
        req.body = normalizeUser(req.body);
        let newUser = await usersServiceModel.registerUser(req.body);
        res.status(201).json({ msg: "The user has been registerd", newUser });
        console.log(chalk.greenBright("The user has been registerd"))

    } catch (error) {
        res.status(400).json(error);
        console.log(chalk.redBright("Could'nt regester the user", error))

    }
}).get("/", authMw, permissionsMiddleware(false, true, false), async (req, res) => {
    try {
        const allUsers = await usersServiceModel.getAllUsers();
        res.status(200).json({ allUsers });
        console.log(chalk.greenBright("Successfully acquired all the users"));
    } catch (error) {
        res.status(400).json({ error });
        console.log(chalk.redBright("Could'nt acquired the users", error));

    }
})

router.get("/:id", authMw, permissionsMiddleware(true, true, true), async (req, res) => {
    try {
        await userValidationService.createUserIdValidation(req.params.id);
        const userById = await usersServiceModel.getUserById(req.params.id);
        res.status(200).json({ msg: "Successfully acquired the users", userById });
        console.log(chalk.greenBright("Successfully acquired the users"));

    } catch (error) {
        res.status(400).json({ msg: "invaled id couldnt find the user" });
        console.log(chalk.redBright("Could'nt acquired the users", error));
    }
})
    .put("/:id", authMw, permissionsMiddleware(false, false, true), async (req, res) => {
        try {
            await userValidationService.createUserIdValidation(req.params.id);
            let userAfterValidation = await usersServiceModel.registerUserValidation(req.body);
            let userAfterNormlize = await normalizeUser(userAfterValidation);
            const userFromDb = await usersServiceModel.editUser(req.params.id, userAfterNormlize);
            res.status(200).json({ msg: "Successfully edited the user", userFromDb });
            console.log(chalk.greenBright("Successfully edited the user"));

        } catch (error) {
            res.status(400).json(error);
            console.log(chalk.redBright("Could'nt edit the user", error));

        }
    })
    .patch("/:id", authMw, permissionsMiddleware(false, false, true), async (req, res) => {
        try {
            await userValidationService.createUserIdValidation(req.params.id);
            const user = await usersServiceModel.getUserById(req.params.id)
            const userId = { _id: (req.params.id) };
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
    .delete("/:id", authMw, permissionsMiddleware(false, true, true), async (req, res) => {
        try {
            await userValidationService.createUserIdValidation(req.params.id);
            const deletUser = await usersServiceModel.deleteUser(req.params.id)
            if (deletUser) {
                res.json({ msg: "user has been deleted", deletUser })
                console.log(chalk.greenBright("user has been deleted"));
            } else {
                res.json({ msg: "Could not delete the user" })
                console.log(chalk.redBright("Could not delete the user"));
            }
        } catch (error) {
            res.status(400).json(error);
            console.log(chalk.redBright("Could not delete the user", error));

        }

    });

router.post("/login", async (req, res) => {
    try {
        await userValidationService.LoginUserValidation(req.body);
        const userData = await usersServiceModel.getUserByEmail
            (req.body.email);
        if (!userData) throw new CustomError("invaled email or password");
        const isPasswordMatch = await hashService.compereHash(req.body.password, userData.password);
        if (!isPasswordMatch) throw new CustomError("invaled email or password");
        const token = await tokenService.generateToken({
            _id: userData._id,
            isAdmin: userData.isAdmin,
            isBusiness: userData.isBusiness,
        })
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json(error);
    }
})

module.exports = router;