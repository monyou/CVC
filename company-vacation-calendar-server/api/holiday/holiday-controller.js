const express = require("express");
const router = express.Router();
const holidayService = require("./holiday-service");
const authorize = require('../../helpers/authorize');

router.get("/holiday/getAll", authorize(), (req, res, next) => {
  holidayService
    .getAllHolidays()
    .then((holidays) => holidays ? res.json(holidays) : res.status(400).json({
      message: "Unable to get all holidays!"
    }))
    .catch((err) => next(err));
});

module.exports = router;