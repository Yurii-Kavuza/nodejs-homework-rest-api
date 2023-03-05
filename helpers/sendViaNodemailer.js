const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // 25, 465, 2255
  secure: true,
  auth: {
    user: "yuriikavuza@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const msg = {
  to: "kavuzaiurii@gmail.com", // Change to your recipient
  from: "yuriikavuza@meta.ua", // Change to your verified sender
  subject: "Sending with Nodemailer is easy",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};

transporter
  .sendMail(msg)
  .then(() => console.log("Email send"))
  .catch((error) => console.log(error));

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "yuriikavuza@meta.ua" };
    await transporter.sendMail(email);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendEmail;
