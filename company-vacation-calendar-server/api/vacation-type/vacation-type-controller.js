const express = require("express");
const router = express.Router();
const vacationTypeService = require("./vacation-type-service");
const authorize = require("../../helpers/authorize");

router.get("/vacation-type/getAll", authorize(), (req, res, next) => {
    vacationTypeService
        .getAllVacationTypes()
        .then((vacationTypes) => vacationTypes ? res.json(vacationTypes) : res.status(400).json({
            message: "Unable to get all vacation types!"
        }))
        .catch((err) => next(err));
});

module.exports = router;