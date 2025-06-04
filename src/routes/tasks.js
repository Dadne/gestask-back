const express = require('express');
const { validatorCreateTask } = require('../validators/task')
const { validateToken } = require('../validators/handleValidator')
const { createTask, getByUser, completeTask, assignTask} = require('../controllers/task')

const router = express.Router();

/**
 * task
 */
/**
 * 
 * @swagger
 * /tasks:
 *    post:
 *      tags:
 *        - Task
 *      summary: "task"
 *      description: Generate Task
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Return task generate
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/task"
 */
router.post('/', validateToken, validatorCreateTask, createTask);


/**
 * get list tasks
 */
/**
 * Get all tasks
 * @swagger
 * /tasks:
 *    get:
 *      tags:
 *        - Task
 *      summary: "List all tasks"
 *      description: List all tasks with details
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Obtains all tasks
 *          content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/task"
 */
router.get('/', validateToken,getByUser);


/**
 * complete Task
 */
/**
 * Complete tasks
 * @swagger
 * /tasks/{id}/complete:
 *    put:
 *      tags:
 *        - Task
 *      summary: "Complete task"
 *      description: Complete the task
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        -  name: id
 *           in: path
 *           description: "id then task"
 *           required: true
 *           schema:
 *              type: string
 *      responses:
 *        '200':
 *          description: Returns the object inserted in the collection. 
 *        '422':
 *          description: Validation error.
 */
router.put("/:id/complete",  completeTask);

/**
 * Assign Task
 */
/**
 * Assign tasks
 * @swagger
 * /tasks/{id}/assign:
 *    put:
 *      tags:
 *        - Task
 *      summary: "Assign task"
 *      description: Assign the task
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        -  name: id
 *           in: path
 *           description: "id then task"
 *           required: true
 *           schema:
 *              type: string
 *      responses:
 *        '200':
 *          description: Returns the object inserted in the collection.
 *        '422':
 *          description: Validation error.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/assignTask"
 */
router.put("/:id/assign",  assignTask);

module.exports = router;
