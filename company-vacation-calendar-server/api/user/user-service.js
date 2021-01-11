const {
  firestore
} = require("../../helpers/firebase");
const {
  v4: uuidv4
} = require("uuid");

const { encrypt } = require('../../crypto');

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
    const usersQuery = await firestore.collection("users").get();
    const users = usersQuery.docs.map(d => {
      let user = d.data();
      const {
        password,
        ...userWithoutPassword
      } = user;

      return userWithoutPassword;
    })

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
    password = encrypt(password);
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
  createUser,
  getAllUsers,
  getUserById
};