const express = require("express");
const router = express.Router();
const Role = require("../helpers/roles");
const authorize = require("../helpers/authorize");
const userService = require("./auth/users-service");

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

module.exports = router;
