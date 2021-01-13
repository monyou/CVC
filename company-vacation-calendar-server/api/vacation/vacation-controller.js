const express = require("express");
const router = express.Router();
const vacationService = require('../vacation/vacation-service');

router.post("/vacation/create", (req, res, next) => {
    vacationService
        .createVacation(req.body)
        .then((result) => res.json(result))
        .catch((err) => next(err));
});

router.get("/vacation/getAll", (req, res, next) => {
    vacationService
        .getAllVacations()
        .then((vacations) => res.json(vacations))
        .catch((err) => next(err));
});

router.get("/vacation/getVacationsByUserId", (req, res, next) => {
    vacationService
        .getVacationsByUserId(req.query)
        .then((vacations) => res.json(vacations))
        .catch((err) => next(err));
});

router.get("/vacation/getVacationsByCompanyId", (req, res, next) => {
    vacationService
        .getVacationsByCompanyId(req.query)
        .then((vacations) => res.json(vacations))
        .catch((err) => next(err));
});

module.exports = router;