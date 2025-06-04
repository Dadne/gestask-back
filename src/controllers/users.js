const { User } = require("../models");
const { handleHttpError } = require("../utils/handleError");

/**
 * @param {*} request
 * @param {*} response
 */
const getAll = async (request, response) => {
  try {
    const users = await User.find({}, { _id: 1, name: 1, email: 1 });
    response.status(200).send({ data: users });
  } catch (error) {
    handleHttpError(response, error?.message, error?.status);
  }
};

module.exports = {
  getAll,
};
