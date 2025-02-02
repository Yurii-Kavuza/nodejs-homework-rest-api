const { HttpError } = require("../helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const body = req.body;
    const bodyLength = Object.keys(body).length;
    const { error } = schema.validate(req.body);

    if (bodyLength === 0) {
      next(HttpError(400, "Missing fields"));
    }
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
