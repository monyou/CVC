const express = require("express");
const router = express.Router();
const authService = require("./auth-service");

router.post("/auth/token", (req, res, next) => {
  authService
    .authenticate(req.body)
    .then((user) =>
      user ?
      res.json(user) :
      res.status(400).json({
        message: "Wrong credentials!"
      })
    )
    .catch((err) => next(err));
});

module.exports = router;