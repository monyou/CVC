const express = require("express");
const router = express.Router();
const companyService = require("./company-service");

router.get("/company/getAll", (req, res, next) => {
    companyService
        .getAllCompanies()
        .then((companies) => res.json(companies))
        .catch((err) => next(err));
});

module.exports = router;