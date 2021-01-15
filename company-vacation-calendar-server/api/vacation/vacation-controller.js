const express = require("express");
const router = express.Router();
const vacationService = require('../vacation/vacation-service');
const authorize = require("../../helpers/authorize");
const roles = require("../../helpers/roles");

router.post("/vacation/create", authorize(), (req, res, next) => {
    vacationService
        .createVacation(req.body)
        .then((result) => result ? res.json(result) : res.status(400).json({
            message: "Unable to create vacation!"
        }))
        .catch((err) => next(err));
});

router.get("/vacation/getAll", authorize([roles.SuperAdmin]), (req, res, next) => {
    vacationService
        .getAllVacations()
        .then((vacations) => vacations ? res.json(vacations) : res.status(400).json({
            message: "Unable to get all vacations!"
        }))
        .catch((err) => next(err));
});

router.get("/vacation/getVacationsByUserId", authorize(), (req, res, next) => {
    vacationService
        .getVacationsByUserId(req.query)
        .then((vacations) => vacations ? res.json(vacations) : res.status(400).json({
            message: "Unable to get vacations by user id!"
        }))
        .catch((err) => next(err));
});

router.get("/vacation/getVacationsByCompanyId", authorize(), (req, res, next) => {
    vacationService
        .getVacationsByCompanyId(req.query)
        .then((vacations) => vacations ? res.json(vacations) : res.status(400).json({
            message: "Unable to get vacations by company id!"
        }))
        .catch((err) => next(err));
});

router.get("/vacation/getById", authorize(), (req, res, next) => {
    vacationService
        .getVacationById(req.query)
        .then((vacation) => vacation ? res.json(vacation) : res.status(400).json({
            message: "Unable to get vacation by id!"
        }))
        .catch((err) => next(err));
});

router.put("/vacation/update", authorize(), (req, res, next) => {
    vacationService
        .updateVacation(req.body)
        .then((vacation) => vacation ? res.json(vacation) : res.status(400).json({
            message: "Unable to update vacation!"
        }))
        .catch((err) => next(err));
});

module.exports = router;