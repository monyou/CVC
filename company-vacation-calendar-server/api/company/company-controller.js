const express = require("express");
const router = express.Router();
const companyService = require("./company-service");
const roles = require('../../helpers/roles');

router.get("/company/getAll", authorize([roles.SuperAdmin]), (req, res, next) => {
    companyService
        .getAllCompanies()
        .then((companies) => companies ? res.json(companies) : res.status(400).json({
            message: "Unable to get all companies!"
        }))
        .catch((err) => next(err));
});

module.exports = router;