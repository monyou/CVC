const jwt = require("jsonwebtoken");
const config = require("../../config.json");
const { firestore } = require("../../helpers/firebase");
const { decrypt } = require("../../helpers/crypto");
const { mailer } = require("../../helpers/mailer");

async function authenticate({ email, password }) {
  try {
    const userQuery = await firestore
      .collection("users")
      .where("email", "==", email)
      .get();
    const user = userQuery.docs[0].data();

    if (user !== null) {
      let decryptedUserPassword = decrypt(user.password);
      if (decryptedUserPassword == password) {
        const token = jwt.sign(
          {
            sub: user.id,
            role: user.role,
            company: user.company,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
          },
          config.secret
        );
        return {
          token,
        };
      }
    }
  } catch (error) {
    console.log(error);
  }

  return null;
}

async function subscribe({
  bulstat,
  name,
  firstName,
  lastName,
  email,
  yearVacationLimit,
}) {
  try {
    const companyExistsQuery = await firestore
      .collection("companies")
      .where("bulstat", "==", bulstat)
      .get();

    if (!companyExistsQuery.empty) {
      return false;
    }

    const userExistsQuery = await firestore
      .collection("users")
      .where("email", "==", email)
      .get();

    if (!userExistsQuery.empty) {
      return false;
    }

    const mailOptions = {
      from: process.env.EMAIL_SERVICE_AUTH_EMAIL,
      to: process.env.SUPER_ADMIN_EMAILS.split(","),
      subject: "CVC Platform | Subscription Request",
      html: `Hello, dear SuperAdmin!<br/><br/>This company '${name}' want to use our platform.<br/>Please be kind and login with your SuperAdmin credentials and create a login following this details:<br/><ul><li>Company Name: ${name}</li><li>Company Bulstat: ${bulstat}</li><li>Company Vacations Limit: ${yearVacationLimit}</li><li>Company Manager First Name: ${firstName}</li><li>Company Manager Last Name: ${lastName}</li><li>Company Manager Email: ${email}</li></ul><br/>Best wishes,<br/>CVC Platform`,
    };

    mailer.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    return true;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  authenticate,
  subscribe,
};
