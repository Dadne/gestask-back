const { check, validationResult } = require("express-validator");
const {validateResults} = require("./handleValidator");

const validatorCreateUser = [
  check("name").exists().notEmpty(),
  check("email").exists().notEmpty(),
  check("password").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];


const validatorLogin = [
  check("email").exists().notEmpty(),
  check("password").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorCreateUser, validatorLogin };
