const express = require("express");
const router = express.Router();
const companyService = require("./company-service");
const authorize = require("../../helpers/authorize");
const roles = require("../../helpers/roles");

router.get(
  "/company/getAll",
  authorize([roles.SuperAdmin]),
  (req, res, next) => {
    companyService
      .getAllCompanies()
      .then((companies) =>
        companies
          ? res.json(companies)
          : res.status(400).json({
              message: "Unable to get all companies!",
            })
      )
      .catch((err) => next(err));
  }
);
router.post(
  "/company/create",
  authorize([roles.SuperAdmin]),
  (req, res, next) => {
    companyService
      .createCompany(req.body)
      .then((id) =>
        id
          ? res.json(id)
          : res.status(400).json({
              message: "Unable to create company!",
            })
      )
      .catch((err) => next(err));
  }
);

router.post(
  "/company/delete",
  authorize([roles.SuperAdmin]),
  (req, res, next) => {
    companyService
      .deleteCompany(req.body)
      .then((response) =>
        response
          ? res.json(response)
          : res.status(400).json({
              message: "Unable to delete company!",
            })
      )
      .catch((err) => next(err));
  }
);

module.exports = router;
