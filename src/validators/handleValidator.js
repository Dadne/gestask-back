const { validationResult } = require("express-validator");
const { verifyToken } = require("../utils/jwt");

const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (err) {
    res.status(403);
    res.send({ errors: err.array() });
  }
};

const validateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    const payload =  verifyToken(token);

    req.user = payload;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid Token' });
  }
};

module.exports = { validateResults, validateToken };
