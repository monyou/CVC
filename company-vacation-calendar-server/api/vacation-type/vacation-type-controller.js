const express = require("express");
const router = express.Router();
const vacationTypeService = require("./vacation-type-service");

router.get("/vacation-type/getAll", (req, res, next) => {
    vacationTypeService
        .getAllVacationTypes(req.body)
        .then((vacationTypes) => res.json(vacationTypes))
        .catch((err) => next(err));
});

module.exports = router;