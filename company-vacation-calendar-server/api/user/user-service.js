const {
  firestore
} = require("../../helpers/firebase");
const {
  v4: uuidv4
} = require("uuid");

const {
  encrypt
} = require('../../crypto');


const {
  mailer
} = require('../../helpers/mailer');

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
  roleName,
  companyName
}) {
  try {
    const id = uuidv4();
    password = encrypt(password);

    const roleQuery = await firestore.collection("roles").where("name", "==", roleName).get();
    const role = roleQuery.docs[0].data();

    const companyQuery = await firestore.collection("companies").where("name", "==", companyName).get();
    const company = companyQuery.docs[0].data();

    await firestore.collection("users").doc(id).set({
      id,
      email,
      password,
      firstName,
      lastName,
      role,
      company,
      isActive: true,
      isEmailConfirmed: false,
      vacations: []
    });

    var mailOptions = {
      from: 'srednogortsi@gmail.com',
      to: email,
      subject: 'Account Created Successfully',
      text: 'Congrats!'
    };

    mailer.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
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