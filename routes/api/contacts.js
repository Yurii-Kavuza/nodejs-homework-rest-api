const express = require("express");

const controller = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const {
  auth,
  isValidId,
  validateParams,
  validateBody,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", auth, ctrlWrapper(controller.getAll));

router.get(
  "/:id",
  isValidId,
  validateParams(schemas.joiSchemaParams),
  ctrlWrapper(controller.getById)
);

router.post(
  "/",
  auth,
  validateBody(schemas.joiSchemaAdd),
  ctrlWrapper(controller.add)
);

router.delete(
  "/:id",
  isValidId,
  validateParams(schemas.joiSchemaParams),
  ctrlWrapper(controller.deleteById)
);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.joiSchemaUpdate),
  ctrlWrapper(controller.updateById)
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.joiUpdateFavoriteSchema),
  ctrlWrapper(controller.updateFavorite)
);

module.exports = router;
