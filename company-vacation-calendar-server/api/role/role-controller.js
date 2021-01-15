const express = require("express");
const router = express.Router();
const roleService = require("./role-service");
const authorize = require('../../helpers/authorize');

router.get("/role/getAll", authorize(), (req, res, next) => {
    roleService
        .getAllRoles()
        .then((roles) => roles ? res.json(roles) : res.status(400).json({
            message: "Unable to get all roles!"
        }))
        .catch((err) => next(err));
});

module.exports = router;