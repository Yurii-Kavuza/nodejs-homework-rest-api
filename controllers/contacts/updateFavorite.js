const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const updateFavorite = async (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;
  const result = await Contact.findOneAndUpdate({_id: id, owner:_id}, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateFavorite;
