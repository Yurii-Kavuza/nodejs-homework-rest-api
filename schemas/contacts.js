const Joi = require("joi");

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().integer().required(),
});

const joiSchemaUpdate = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.number().integer(),
});

const joiSchemaParams = Joi.object({
  contactId: Joi.string().empty(),
});

module.exports = {
  joiSchema,
  joiSchemaUpdate,
  joiSchemaParams,
};