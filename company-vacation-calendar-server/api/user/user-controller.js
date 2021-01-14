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
        .getAllUsers()
        .then((users) => res.json(users))
        .catch((err) => next(err));
});

router.post("/user/create", (req, res, next) => {
    userService
        .createUser(req.body)
        .then((id) => res.json(id))
        .catch((err) => next(err));
});

router.put("/user/activate", (req, res, next) => {
    userService
        .activateUser(req.body)
        .then((result) => res.json(result))
        .catch((err) => next(err));
});

module.exports = router;