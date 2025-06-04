const mongoose = require("mongoose");
const DATABASE = process.env.DATABASE_URL;

const dataBaseConnection = () => {
    if(!DATABASE) throw new Error("DATABASE_URL is not defined");
  mongoose
    .connect(DATABASE, {
    })
    .then(() => console.log("Connect DB"))
    .catch(() => console.log("Error Conect DB"));
};

module.exports = { dataBaseConnection };
