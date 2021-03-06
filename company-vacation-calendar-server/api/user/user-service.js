const { firestore, admin } = require("../../helpers/firebase");
const { v4: uuidv4 } = require("uuid");
const { encrypt } = require("../../helpers/crypto");
const { mailer } = require("../../helpers/mailer");
const statuses = require("../../helpers/vacation-status");
const roles = require("../../helpers/roles");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

async function getUserById({ id }) {
  try {
    const userQuery = await firestore.collection("users").doc(id).get();
    const user = userQuery.data();
    const { password, ...userWithoutPassword } = user;

    return {
      ...userWithoutPassword,
    };
  } catch (error) {
    console.log(error);
  }
}

async function getUsersByCompanyId({ companyId }) {
  try {
    const userQuery = await firestore
      .collection("users")
      .where("company.id", "==", companyId)
      .get();
    const users = userQuery.docs.map((d) => {
      let user = d.data();
      const { password, ...userWithoutPassword } = user;

      return userWithoutPassword;
    });

    return {
      users,
    };
  } catch (error) {
    console.log(error);
  }
}

async function getAllUsers() {
  try {
    const usersQuery = await firestore.collection("users").get();
    const users = usersQuery.docs.map((d) => {
      let user = d.data();
      const { password, ...userWithoutPassword } = user;

      return userWithoutPassword;
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
  firstName,
  lastName,
  roleName,
  companyName,
}) {
  try {
    const id = uuidv4();
    const securityKey = uuidv4();
    let encryptedPassword = encrypt(id);

    const userExistsQuery = await firestore
      .collection("users")
      .where("email", "==", email)
      .get();

    if (!userExistsQuery.empty) {
      return null;
    }

    const roleQuery = await firestore
      .collection("roles")
      .where("name", "==", roleName)
      .get();
    const role = roleQuery.docs[0].data();

    const companyQuery = await firestore
      .collection("companies")
      .where("name", "==", companyName)
      .get();
    const company = companyQuery.docs[0].data();

    await firestore.collection("users").doc(id).set({
      id,
      email,
      password: encryptedPassword,
      firstName,
      lastName,
      role,
      company,
      isActive: true,
      isEmailConfirmed: false,
      securityKey,
      vacationLimit: company.yearVacationLimit,
      vacations: [],
    });

    const emailContentForAdmin = `Welcome, dear ${firstName} ${lastName}!<br/><br/>We from 'Company Vacation Calendar' platform created a profile for you.<br/><br/>You only have to click this <a href="${process.env.CREATE_NEW_ACC_LINK}/${email}/${id}/${securityKey}" target="_blank">LINK</a> and type your password to enjoy the easy process of managing employees applications for leave!<br/><br/>Best wishes,<br/>CVC Team`;
    const emailContentForUser = `Welcome, dear ${firstName} ${lastName}!<br/><br/>Your manager created a profile in 'Company Vacation Calendar' platform for you.<br/><br/>You only have to click this <a href="${process.env.CREATE_NEW_ACC_LINK}/${email}/${id}/${securityKey}" target="_blank">LINK</a> and type your password to enjoy the easy process of applying for leave from work!<br/><br/>Best wishes,<br/>CVC Team`;

    const mailOptions = {
      from: process.env.EMAIL_SERVICE_AUTH_EMAIL,
      to: email,
      subject: "CVC Platform | Account Created",
      html:
        role.name === roles.User ? emailContentForUser : emailContentForAdmin,
    };

    mailer.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    return {
      id,
    };
  } catch (error) {
    console.log(error);
  }
}

async function deleteUser({ userId }) {
  try {
    await firestore.collection("users").doc(userId).delete();

    return true;
  } catch (error) {
    console.log(error);
  }

  return false;
}

async function activateUser({ id, password, securityKey }) {
  try {
    const userQuery = await firestore.collection("users").doc(id).get();
    const user = userQuery.data();

    if (user.securityKey == securityKey && !user.isEmailConfirmed) {
      const encryptedPassword = encrypt(password);

      await firestore.collection("users").doc(id).update({
        password: encryptedPassword,
        isEmailConfirmed: true,
      });

      return true;
    }
  } catch (error) {
    console.log(error);
  }

  return false;
}

async function addUserVacation({ userId, vacation }) {
  try {
    const userQuery = await firestore.collection("users").doc(userId).get();
    const user = userQuery.data();

    if (user) {
      await firestore
        .collection("users")
        .doc(userId)
        .update({
          vacations: admin.FieldValue.arrayUnion(vacation),
        });

      return true;
    }
  } catch (error) {
    console.log(error);
  }

  return false;
}

async function updateUserVacation({ vacation }) {
  try {
    const userQuery = await firestore
      .collection("users")
      .doc(vacation.userId)
      .get();
    const user = userQuery.data();

    if (user) {
      let oldVacation = user.vacations.filter(
        (vac) => vac.id === vacation.id
      )[0];
      if (vacation.status === statuses.Accepted) {
        await firestore
          .collection("users")
          .doc(vacation.userId)
          .update({
            vacations: admin.FieldValue.arrayRemove(oldVacation),
          });

        await firestore
          .collection("users")
          .doc(vacation.userId)
          .update({
            vacationLimit: user.vacationLimit - vacation.days.length,
            vacations: admin.FieldValue.arrayUnion(vacation),
          });
      } else {
        await firestore
          .collection("users")
          .doc(vacation.userId)
          .update({
            vacations: admin.FieldValue.arrayRemove(oldVacation),
          });

        await firestore
          .collection("users")
          .doc(vacation.userId)
          .update({
            vacations: admin.FieldValue.arrayUnion(vacation),
          });
      }

      return true;
    }
  } catch (error) {
    console.log(error);
  }

  return false;
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  activateUser,
  addUserVacation,
  updateUserVacation,
  getUsersByCompanyId,
  deleteUser,
};
