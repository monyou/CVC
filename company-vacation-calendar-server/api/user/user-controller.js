const express = require("express");
const router = express.Router();
const authorize = require("../../helpers/authorize");
const roles = require("../../helpers/roles");
const userService = require("./user-service");

router.get("/user/getById", authorize(), (req, res, next) => {
  userService
    .getUserById(req.query)
    .then((user) =>
      user
        ? res.json(user)
        : res.status(400).json({
            message: "Unable to get user by id!",
          })
    )
    .catch((err) => next(err));
});

router.get(
  "/user/getAllByCompanyId",
  authorize([roles.SuperAdmin, roles.Admin]),
  (req, res, next) => {
    userService
      .getUsersByCompanyId(req.query)
      .then((users) =>
        users
          ? res.json(users)
          : res.status(400).json({
              message: "Unable to get users by company id!",
            })
      )
      .catch((err) => next(err));
  }
);

router.get("/user/getAll", authorize([roles.SuperAdmin]), (req, res, next) => {
  userService
    .getAllUsers()
    .then((users) =>
      users
        ? res.json(users)
        : res.status(400).json({
            message: "Unable to get all users!",
          })
    )
    .catch((err) => next(err));
});

router.post(
  "/user/create",
  authorize([roles.Admin, roles.SuperAdmin]),
  (req, res, next) => {
    userService
      .createUser(req.body)
      .then((id) =>
        id
          ? res.json(id)
          : res.status(400).json({
              message: "Unable to create user!",
            })
      )
      .catch((err) => next(err));
  }
);

router.post(
  "/user/delete",
  authorize([roles.Admin, roles.SuperAdmin]),
  (req, res, next) => {
    userService
      .deleteUser(req.body)
      .then((response) =>
        response
          ? res.json(response)
          : res.status(400).json({
              message: "Unable to create user!",
            })
      )
      .catch((err) => next(err));
  }
);

router.put("/user/activate", (req, res, next) => {
  userService
    .activateUser(req.body)
    .then((result) =>
      result
        ? res.json(result)
        : res.status(400).json({
            message: "Unable to activate user!",
          })
    )
    .catch((err) => next(err));
});

module.exports = router;
