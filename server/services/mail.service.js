const mailer = require("../utils/mailer");

const renewPasswordMailer = async (to, password) => {
  const subject = "Yêu cầu đổi mật khẩu - Medcare Support";
  const text = `Mật khẩu mới của bạn là: ${password}`;
  try {
    await mailer.sendMailText(to, subject, text);
    console.log("mail sended");
  } catch (error) {
    console.log(error);
  }
};

const updateRecordMailer = async (
  to,
  status,
  date,
  time,
  doctorNote,
  diagnose
) => {
  const subject = "Thay đổi thông tin buổi hẹn khám - Medcare Support";
  const text = `
  Thông tin mới nhất của buổi hẹn khám như sau: \n
  Trạng thái: ${status}
  Ngày hẹn: ${date}
  Giờ hẹn: ${time}
  Lời nhắn của bác sĩ: ${doctorNote}
  Chẩn đoán: ${diagnose}
  `;
  try {
    await mailer.sendMailText(to, subject, text);
    console.log("mail sended");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  renewPasswordMailer,
  updateRecordMailer,
};
