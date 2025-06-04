const bcrypt = require("bcrypt");

async function encripPassword(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

async function verifPassword(password, hashPass) {
  const isValid = await bcrypt.compare(password, hashPass);
  return isValid;
}

module.exports = { encripPassword, verifPassword };
