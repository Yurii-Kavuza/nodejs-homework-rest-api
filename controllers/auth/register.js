const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");

const register = async (req, res) => {
  const { password, email, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`Email in use`);
  }
  const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({ password: hashPass, email, subscription });
  const {subscription: subscriptionReg } = await User.findOne({ email });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        subscription: subscriptionReg,
      },
    },
  });
};

module.exports = register;
