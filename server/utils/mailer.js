const nodeMailer = require("nodemailer");
const adminEmail = process.env.EMAIL_ADDRESS;
const adminPassword = process.env.EMAIL_PASSWORD;
const mailHost = "smtp.gmail.com";
const mailPort = 587;

const sendMail = (to, subject, text) => {
  const transporter = nodeMailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: false,
    auth: {
      user: adminEmail,
      pass: adminPassword,
    },
  });
  const options = {
    from: adminEmail,
    to: to,
    subject: subject,
    text: text,
  };
  return transporter.sendMail(options);
};
module.exports = {
  sendMail,
};
