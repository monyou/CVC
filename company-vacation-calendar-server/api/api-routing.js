const express = require("express");
const router = express.Router();
const authController = require("./auth/auth-controller");
const userController = require("./user/user-controller");

router.use("/", authController);
router.use("/", userController);

module.exports = router;
