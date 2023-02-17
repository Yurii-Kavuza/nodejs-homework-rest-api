const express = require("express");

const controller = require("../../controllers/users");
const { ctrlWrapper } = require("../../helpers");
const { auth } = require("../../middlewares");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(controller.getCurrent));

module.exports = router;
