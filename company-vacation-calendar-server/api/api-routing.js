const express = require("express");
const router = express.Router();
const authController = require("./auth/auth-controller");
const userController = require("./user/user-controller");
const roleController = require("./role/role-controller");
const holidayController = require("./holiday/holiday-controller");
const companyController = require("./company/company-controller");
const vacationTypeController = require("./vacation-type/vacation-type-controller");

router.use("/", authController);
router.use("/", userController);
router.use("/", roleController);
router.use("/", holidayController);
router.use("/", companyController);
router.use("/", vacationTypeController);

module.exports = router;
