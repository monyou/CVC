const express = require("express");
const router = express.Router();
const holidayService = require("./holiday-service");

router.get("/holiday/getAll", (req, res, next) => {
    holidayService
        .getAllHolidays(req.body)
        .then((holidays) => res.json(holidays))
        .catch((err) => next(err));
});

module.exports = router;