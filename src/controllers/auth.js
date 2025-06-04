const { User } = require("../models");
const bcrypt = require("../utils/bcrypt");
const { signJwt } = require("../utils/jwt");
const { handleHttpError } = require("../utils/handleError");
const HttpException = require("../utils/httpException");

/**
 * @param {*} request
 * @param {*} response
 */
const registerUser = async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const newUser = new User({ name, email, password });
    await newUser.save();

    response.status(201).send({ data: newUser });
  } catch (e) {
    handleHttpError(response, e?.message, e?.status);
  }
};

/**
 * @param {*} request
 * @param {*} response
 */
const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });

    if (!user) throw new HttpException("Invalid User", 404);

    const isValid = await bcrypt.verifPassword(password,user.password);

    if (!isValid) throw new HttpException("Invalid Credential", 401);

    const token = signJwt({ id: user._id, role: user.role });

    response.status(200).send({ token });
  } catch (e) {
    handleHttpError(response, e?.message, e?.status);
  }
};

module.exports = {
  registerUser,
  login,
};
