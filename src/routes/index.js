const express = require("express");
// expres netamente orientada para manejar rutas
const fs = require("fs");
const router = express.Router();

const PATH_ROUTES = __dirname; 

const removeExtension = (fileName) => {
  return fileName.split(".").shift();
};

const a = fs.readdirSync(PATH_ROUTES);
a.filter((file) => {
  const name = removeExtension(file); 
  if (name !== "index") {
    console.log(`loading route ${name}`);
    router.use(`/${name}`, require(`./${file}`)); 
  }
});

module.exports = router;
