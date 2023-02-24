const express = require("express");

const controller = require("../../controllers/users");
const { ctrlWrapper } = require("../../helpers");
const { auth, upload, validateBody } = require("../../middlewares");
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

router.patch(
    "/avatars",
    auth,
    upload.single("avatar"),
    ctrlWrapper(controller.updateAvatar)
);

module.exports = router;
