const jwt = require("express-jwt");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

function authorize(roles = []) {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwt({ secret: process.env.AUTH_CONFIG_SECRET, algorithms: ["HS256"] }),

    // authorize based on user role
    (req, res, next) => {
      if (roles.length && !roles.includes(req.user.role.name)) {
        // user's role is not authorized
        return res.status(401).json({ message: "Unauthorized" });
      }

      // authentication and authorization successful
      next();
    },
  ];
}

module.exports = authorize;
