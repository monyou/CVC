const nodemailer = require("nodemailer");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE_PROVIDER,
  auth: {
    user: process.env.EMAIL_SERVICE_AUTH_EMAIL,
    pass: process.env.EMAIL_SERVICE_AUTH_PASS,
  },
});

module.exports = {
  mailer: transporter,
};
