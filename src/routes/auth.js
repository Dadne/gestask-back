const express = require('express');
const { registerUser, login} = require('../controllers/auth');
const { validatorCreateUser, validatorLogin } = require('../validators/user');

const router = express.Router();

/**
 * Created new user
 */
/**
 * Register new user
 * @swagger
 * /auth/register:
 *    post:
 *      tags:
 *        - Auth
 *      summary: "user"
 *      description: user
 *      responses:
 *        '200':
 *          description: Returns the menssage user
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/newUser"
 */
router.post('/register', validatorCreateUser, registerUser);

/**
 * Login
 */
/**
 * 
 * @swagger
 * /auth/login:
 *    post:
 *      tags:
 *        - Auth
 *      summary: "login"
 *      description: get token
 *      responses:
 *        '200':
 *          description: Return jwt token
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/login"
 */
router.post('/login', validatorLogin, login);

module.exports = router;
