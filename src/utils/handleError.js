const handleHttpError = (
  res,
  message = "Error occurred",
  code = 500
) => {
  res.status(code);
  res.send({ error: message });
};

module.exports = { handleHttpError };
