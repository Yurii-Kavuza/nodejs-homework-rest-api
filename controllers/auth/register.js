const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models/user");

const register = async (req, res) => {
  const { password, email, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use`);
  }
  const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  await User.create({ password: hashPass, email, subscription, avatarURL });
  const {subscription: subscriptionReg } = await User.findOne({ email });
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
