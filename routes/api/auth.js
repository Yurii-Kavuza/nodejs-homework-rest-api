const express = require("express");

const controller = require("../../controllers/auth");
const { ctrlWrapper } = require("../../helpers");
const { joiRegisterSchema, joiLoginSchema } = require("../../models/user");

const { auth, validateBody } = require("../../middlewares");

const router = express.Router();

router.post(
  "/register",
  validateBody(joiRegisterSchema),
  ctrlWrapper(controller.register)
);
// It is possible router.post("/signup")

router.post(
  "/login",
  validateBody(joiLoginSchema),
  ctrlWrapper(controller.login)
);
// It is possible router.post("/signin")


router.post(
  "/logout",
  auth,
  ctrlWrapper(controller.logout)
);
// It is possible router.post("/signout")

module.exports = router;
