const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiSchemaAdd = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `Missing required name field`,
  }),
  email: Joi.string().email().required().messages({
    "any.required": `Missing required email field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `Missing required phone field`,
  }),
  favorite: Joi.bool(),
});

const joiSchemaUpdate = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.bool(),
});

const joiSchemaParams = Joi.object({
  id: Joi.string().empty(),
});

const joiUpdateFavoriteSchema = Joi.object({
  favorite: Joi.bool().required().messages({
    "any.required": `Missing field favorite`,
  }),
});

const schemas = {
  joiSchemaAdd,
  joiSchemaUpdate,
  joiSchemaParams,
  joiUpdateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
