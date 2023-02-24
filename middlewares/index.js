const validateParams = require("./validateParams");
const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const auth = require("./auth");
const upload = require("./upload");

module.exports = {
  auth,
  validateParams,
  validateBody,
  isValidId,
  upload,
};
