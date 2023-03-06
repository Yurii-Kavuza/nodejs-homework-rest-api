const { BadRequest, NotFound } = require("http-errors");
const { sendEmail } = require("../../helpers");
const { User } = require("../../models/user");


const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new NotFound("User not Found");
    }
    if (user.verify) {
      throw new BadRequest("Verification has already been passed");
    }
    const msg = {
      to: email,
      subject: "Approving registration on the website",
      html: `<a href="http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank">Please click this link to approve your registration</a>`,
    };
    await sendEmail(msg);
    res.json({
      message: "Verification email sent",
    });
};

module.exports = resendVerifyEmail;
