const express = require("express");

const controller = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");
const { schemas } = require("../../models/user");

const { auth, validateBody } = require("../../middlewares");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.joiRegisterSchema),
  ctrlWrapper(controller.register)
);
// It is possible router.post("/signup")

router.get("/verify/:verificationToken", ctrlWrapper(controller.verifyEmail));

router.post(
  "/verify",
  validateBody(schemas.joiVerifyEmailSchema),
  ctrlWrapper(controller.resendVerifyEmail)
);

router.post(
  "/login",
  validateBody(schemas.joiLoginSchema),
  ctrlWrapper(controller.login)
);
// It is possible router.post("/signin")

router.post("/logout", auth, ctrlWrapper(controller.logout));
// It is possible router.post("/signout")

module.exports = router;
