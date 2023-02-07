const Joi = require("joi");

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const joiSchemaUpdate = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

const joiSchemaParams = Joi.object({
  id: Joi.string().empty(),
});

module.exports = {
  joiSchema,
  joiSchemaUpdate,
  joiSchemaParams,
};
