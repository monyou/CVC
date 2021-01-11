var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'srednogortsi@gmail.com',
        pass: 'ludaka1234'
    }
});

module.exports = {
    mailer: transporter
};