const jwt = require("jsonwebtoken");
const config = require("../../config.json");
const Role = require("../../helpers/roles");
const {
  firestore
} = require("../../helpers/firebase");
const {
  v4: uuidv4
} = require("uuid");

async function authenticate({
  email,
  password
}) {
  const userQuery = await firestore.collection("users").where('email', '==', email).get();

  let user = null;
  userQuery.forEach(function (currentUser) {
    user = currentUser.data();
  });

  if (user !== null) {
    if (user.password == password) {
      const token = jwt.sign({
          sub: user.id,
          role: user.role,
        },
        config.secret
      );
      const {
        password,
        ...userWithoutPassword
      } = user;
      return {
        ...userWithoutPassword,
        token,
      };
    }
  }

  return null;
}

// Users

async function getUserByEmail({
  email
}) {
  try {
    const userQuery = await firestore.collection("users").where(u => u.email == email).get();
    const user = userQuery.data();

    if (user.password === password) {
      const {
        password,
        ...userWithoutPassword
      } = user;

      return {
        ...userWithoutPassword,
      };
    }

    return null;
  } catch (error) {
    console.log(error);
  }
}

async function getUserById({
  id
}) {
  try {
    const userQuery = await firestore.collection("users").doc(id).get();
    const user = userQuery.data();
    const {
      password,
      ...userWithoutPassword
    } = user;

    return {
      ...userWithoutPassword,
    };
  } catch (error) {
    console.log(error);
  }
}

async function getAllUsers() {
  try {
    const users = [];
    const usersQuery = await firestore.collection("users").get();

    usersQuery.forEach(function (user) {
      const currentUser = user.data();
      const {
        password,
        ...userWithoutPassword
      } = currentUser;
      users.push(userWithoutPassword);
    });

    return {
      users,
    };
  } catch (error) {
    console.log(error);
  }
}

async function createUser({
  email,
  password,
  firstName,
  lastName,
  role
}) {
  try {
    let id = uuidv4();
    await firestore.collection("users").doc(id).set({
      id,
      email,
      password,
      firstName,
      lastName,
      role,
    });

    return {
      id,
    };
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  authenticate,
  createUser,
  getAllUsers,
  getUserById
};