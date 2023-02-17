const { HttpError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const getById = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  console.log("id", _id)
  const result = await Contact.find({_id:id, owner: _id });  
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = getById;
