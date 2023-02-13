const { Contact } = require("../../models/contact");

const updateById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  // console.log(req.body);
  // const { email, phone, name, favorite } = req.body;
  // const isBodyEmpty =
  //   name === undefined ||
  //   email === undefined ||
  //   phone === undefined ||
  //   favorite === undefined;
  // console.log(isBodyEmpty);
  // if (isBodyEmpty) {
  //   throw HttpError(400, "Missing fields");
  // }
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateById;
