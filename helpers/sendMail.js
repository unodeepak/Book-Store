const nodemailer = require("nodemailer");

const sendMail = (data) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: process.env.PORT,
      auth: {
         user: process.env.EMAIL,
        pass: process.env.PASS,
      },    
    });

    const mailObj = {
      from: "no-reply <noReply@gmail.com>",
      to: data?.to,
      subject: data?.subject,
      text: data?.body,
    };

    transporter.sendMail(mailObj, (err, info) => {
      if (err) {
        return false;
      } else {
        return true;
      }
    });
  } catch (err) {
    console.log("Error in sendMail", err);
    return false;
  }
};

module.exports = sendMail;
