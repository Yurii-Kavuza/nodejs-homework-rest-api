const { Unauthorized } = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const wrongCredentials = "Email or password is wrong";

  const user = await User.findOne({ email });
  const isPassValid = bcrypt.compareSync(password, user.password);
  if (!user || !isPassValid) {
    throw new Unauthorized(wrongCredentials);
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  const { subscription } = await User.findOne({ email });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
          email,
          subscription
      },
    },
  });
};

module.exports = login;
