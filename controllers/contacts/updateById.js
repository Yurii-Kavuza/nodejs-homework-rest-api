const contacts = require("../../models/contacts");

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.updateContactsById(id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateById;