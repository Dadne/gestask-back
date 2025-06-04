const express = require('express');
const { getAll } = require('../controllers/users');
const { validateToken } = require('../validators/handleValidator')

const router = express.Router();

/**
 * get list users
 */
/**
 * Get all users
 * @swagger
 * /users:
 *    get:
 *      tags:
 *        - Users
 *      summary: "List all users"
 *      description: List all users with details
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Obtains all users
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/users"
 */
router.get('/', validateToken, getAll);

module.exports = router;
