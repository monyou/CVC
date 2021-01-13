const express = require("express");
const router = express.Router();
const roleService = require("./role-service");

router.get("/role/getAll", (req, res, next) => {
    roleService
        .getAllRoles(req.body)
        .then((roles) => res.json(roles))
        .catch((err) => next(err));
});

module.exports = router;