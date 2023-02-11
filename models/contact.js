const {Schema, model} = require("mongoose");
const Joi = require("joi");
  
const contactSchema = new Schema ({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
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
}, {versionKey: false, timestamps: true});

const joiSchemaAdd = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
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
  favorite: Joi.bool().required(),
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