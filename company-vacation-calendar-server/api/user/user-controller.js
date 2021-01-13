const express = require("express");
const router = express.Router();
const authorize = require("../../helpers/authorize");
const userService = require("./user-service");

router.get("/user/getById", (req, res, next) => {
    userService
        .getUserById(req.query)
        .then((user) => res.json(user))
        .catch((err) => next(err));
});

router.get("/user/getAll", (req, res, next) => {
    userService
        .getAllUsers(req.body)
        .then((users) => res.json(users))
        .catch((err) => next(err));
});

router.post("/user/create", (req, res, next) => {
    userService
        .createUser(req.body)
        .then((id) => res.json(id))
        .catch((err) => next(err));
});

module.exports = router;