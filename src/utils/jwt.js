const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const signJwt = (payload) => {
  try {
    const token = jwt.sign(payload, jwtSecret, {
      expiresIn: "30m",
    });
    return token;
  } catch (error) {
    throw new Error("Error signing JWT");
  }
};

// const verifyToken = (token) => {

//   try {
//     const payload = jwt.verify(token, jwtSecret);
    
//    return payload;
//   } catch (err) {
//     console.log(err)
//     throw new Error("Invalid Token");
    
//   }
// };


module.exports = {
  signJwt,
  // verifyToken,
};
