const express = require("express");

const controller = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const { validateParams, validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(controller.getAll));

router.get("/:id", validateParams(schemas.joiSchemaParams), ctrlWrapper(controller.getById));

router.post("/", validateBody(schemas.joiSchema), ctrlWrapper(controller.add));

router.delete("/:id", validateParams(schemas.joiSchemaParams), ctrlWrapper(controller.deleteById));

router.put(
  "/:id",
  validateParams(schemas.joiSchemaParams),
  validateBody(schemas.joiSchemaUpdate),
  validateBody(schemas.addSchema),
  ctrlWrapper(controller.updateById)
);

module.exports = router;
