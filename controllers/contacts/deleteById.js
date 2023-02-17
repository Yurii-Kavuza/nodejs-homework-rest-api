const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;
  const result = await Contact.findOneAndRemove({_id: id, owner:_id});
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

module.exports = deleteById;
