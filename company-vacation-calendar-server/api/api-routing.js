const express = require("express");
const router = express.Router();
const Role = require("../helpers/roles");
const authorize = require("../helpers/authorize");
const userService = require("./auth/users-service");

// Auth

router.post("/authenticate", (req, res, next) => {
  userService
    .authenticate(req.body)
    .then((user) =>
      user
        ? res.json(user)
        : res.status(400).json({ message: "Wrong credentials!" })
    )
    .catch((err) => next(err));
});

// Users

router.get("/users/getById", (req, res, next) => {
  userService
    .getUserById(req.query)
    .then((user) => res.json(user))
    .catch((err) => next(err));
});

router.get("/users/getAll", (req, res, next) => {
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
