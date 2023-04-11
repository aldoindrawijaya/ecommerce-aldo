const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "aldoindrawijaya11@gmail.com",
    pass: "iwqtkvbyeakmdbsy",
  },
});

module.exports = transporter;
