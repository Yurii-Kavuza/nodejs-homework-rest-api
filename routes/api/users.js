const express = require("express");

const controller = require("../../controllers/users");
const { ctrlWrapper } = require("../../helpers");
const { auth, validateBody } = require("../../middlewares");
const { schemas } = require("../../models/user");

const router = express.Router();

router.get(
    "/current",
    auth,
    ctrlWrapper(controller.getCurrent)
);

router.patch(
    "/",
    auth,
    validateBody(schemas.joiUpdateSubscription),
    ctrlWrapper(controller.updateSubscription)
);

module.exports = router;
