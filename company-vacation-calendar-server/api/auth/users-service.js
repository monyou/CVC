const jwt = require("jsonwebtoken");
const config = require("../../config.json");
const Role = require("../../helpers/roles");

// users hardcoded for simplicity, store in a db for production applications
const users = [
  {
    id: 1,
    username: "admin",
    password: "admin",
    firstName: "Simeon",
    lastName: "Mechkov",
    role: Role.Admin,
  },
  {
    id: 2,
    username: "user",
    password: "user",
    firstName: "Normal",
    lastName: "User",
    role: Role.User,
  },
];

async function authenticate({ username, password }) {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
    const { password, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      token,
    };
  }
}

module.exports = { authenticate };
