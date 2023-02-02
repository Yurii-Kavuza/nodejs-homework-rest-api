const express = require("express");

const controller = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

const router = express.Router();

router.get("/", ctrlWrapper(controller.getAll));

router.get("/:id", ctrlWrapper(controller.getById));

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(controller.add));

router.delete("/:id", ctrlWrapper(controller.deleteById));

router.put(
  "/:id",
  validateBody(schemas.addSchema),
  ctrlWrapper(controller.updateById)
);

module.exports = router;
