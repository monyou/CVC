const nodemailer = require("nodemailer");

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
