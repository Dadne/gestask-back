const { check, validationResult } = require("express-validator");
const {validateResults} = require("./handleValidator");

const validatorCreateTask = [
  check("title").exists().notEmpty(),
  check("description").exists().notEmpty(),
  check("assignedTo").exists().notEmpty(),
  check("expirationDate").exists(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];



module.exports = { validatorCreateTask };
