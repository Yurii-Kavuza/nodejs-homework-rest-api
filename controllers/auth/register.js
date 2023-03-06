const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models/user");
const { sendEmail } = require("../../helpers");
const { v4 } = require("uuid");

const register = async (req, res) => {
  const { password, email, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use`);
  }
  const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();

  await User.create({
    password: hashPass,
    email,
    subscription,
    avatarURL,
    verificationToken,
  });
  const msg = {
    to: email,
    subject: "Approving registration on the website",
    html: `<a href="http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Please click this link to approve your registration</a>`,
  };
  await sendEmail(msg);
  const { subscription: subscriptionReg } = await User.findOne({ email });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription: subscriptionReg,
        avatarURL,
      },
    },
  });
};

module.exports = register;
