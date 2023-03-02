const mailer = require("../utils/mailer");

const renewPasswordMailer = async (to, password) => {
  const subject = "Yêu cầu đổi mật khẩu - Medcare Support";
  const text = `Mật khẩu mới của bạn là: ${password}`;
  try {
    await mailer.sendMail(to, subject, text);
    console.log("mail sended");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  renewPasswordMailer,
};
