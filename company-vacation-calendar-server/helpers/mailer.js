const nodemailer = require("nodemailer");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVICE_HOST,
  port: process.env.EMAIL_SERVICE_PORT,
  ignoreTLS: process.env.EMAIL_SERVICE_IGNORE_TLS,
  secure: process.env.EMAIL_SERVICE_SECURE,
  auth: {
    user: process.env.EMAIL_SERVICE_AUTH_EMAIL,
    pass: process.env.EMAIL_SERVICE_AUTH_PASS,
  },
});

module.exports = {
  mailer: transporter,
};
