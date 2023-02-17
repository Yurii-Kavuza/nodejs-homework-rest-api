const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const add = async (req, res) => {
  const { _id } = req.user;
  const result = await Contact.create({ ...req.body, owner: _id });
  if (!result) {
    throw HttpError(400, "Missing required name field");
  }
  res.status(201).json(result);
};

module.exports = add;
