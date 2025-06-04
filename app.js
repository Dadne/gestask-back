require("dotenv").config();
const path = require('path');
const logger = require('morgan');
const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const swaggerUI = require("swagger-ui-express");
const basicAuth = require("express-basic-auth");
const {dataBaseConnection} = require("./src/configuration/dataBase");
const openApiConfigration = require("./src/docs/swagger");
const cors = require('cors'); 

const app = express();
const port = process.env.APP_PORT || 3000;
const options = {
  swaggerOptions: {
    url: "/api-doc/swagger.json",
  },
};

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const swaggerAuth = basicAuth({
  users: { [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD },
  challenge: true,
  unauthorizedResponse: "Unauthorized access",
});

// Routes
app.use("/api", require("./src/routes")); 

app.get("/api-doc/swagger.json", (req, res) => res.json(openApiConfigration));
app.use(
  "/api-doc",
  swaggerAuth,
  swaggerUI.serveFiles(null, options),
  swaggerUI.setup(null, options)
);

// Connect to the database
dataBaseConnection()

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.listen(port, () => {
  console.log(port);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
