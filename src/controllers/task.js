const { Task, User } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const HttpException = require("../utils/httpException");
const { sendEmail } = require("../utils/mailer");

/**
 * @param {*} request
 * @param {*} response
 */
const createTask = async (request, response) => {
  try {
    const { title, description, expirationDate, assignedTo } = request.body;
    const { id } = request.user;

    const newTask = new Task({
      title,
      description,
      expirationDate,
      createdBy: id,
      assignedTo,
    });
    await newTask.save();

    response.status(201).send({ data: newTask });
  } catch (e) {
    handleHttpError(response, "Error Register task");
  }
};

/**
 * @param {*} request
 * @param {*} response
 */
const getByUser = async (request, response) => {
  try {
    const { id } = request.user;

    const tasks = await Task.find({ assignedTo: id })
      .populate({
        path: "assignedTo",
        select: "name -_id",
      })
      .exec();

    response.status(200).send({ data: tasks });
  } catch (e) {
    handleHttpError(response, "Error Get task");
  }
};

/**
 * @param {*} request
 * @param {*} response
 */
const completeTask = async (request, response) => {
  try {
    const { id } = request.params;

    const task = await searchTask(id);

    if (task.status === "COMPLETED") {
      throw new HttpException("Task already completed", 400);
    }

    const emails = new Set([task.assignedTo.email, task.createdBy.email]);

    await updatedTask(id, { status: "COMPLETED" });

    await sendEmail(
      [...emails],
      `Tarea "${task._id}" completada`,
      `La tarea ha sido completada exitosamente.
      <p> Título: ${task.title} </p> 
      <p> Descripción: ${task.description} </p>`
    );
    response.status(200).send("Task completed successfully");
  } catch (e) {
    handleHttpError(response, e?.message, e?.status);
  }
};

/**
 * @param {*} request
 * @param {*} response
 */
const assignTask = async (request, response) => {
  try {
    const { id } = request.params;
    const { assignedTo } = request.body;

    await searchTask(id);
    await updatedTask(id, { assignedTo });
    const tasks = await searchTask(id);
    
    if (tasks.assignedTo.email) {
      await sendEmail(
        [tasks.assignedTo.email],
        `La tarea "${tasks._id}" se te ha asignado`,
        `La tarea ha sido asignada exitosamente.
        <p> Título: ${tasks.title} </p> 
        <p> Descripción: ${tasks.description} </p>`
      );
    }

    response.status(200).send("Task assigned successfully");
  } catch (e) {
    handleHttpError(response, e.message, e?.status);
  }
};

const searchTask = async (id) => {
  const task = await Task.findOne({ _id: id }).populate({
    path: "assignedTo createdBy",
    select: "name email -_id",
  });
  if (!task) throw new HttpException("Task not found", 404);
  return task;
};

const updatedTask = async (id, data) => {
  try {
    const updatedTask = await Task.updateOne(
      { _id: id },
      { $set: { ...data } },
      {
        runValidators: true,
        context: "query",
      }
    );

    if (updatedTask?.modifiedCount == 0)
      throw new HttpException("Task not updated", 400);
  } catch (error) {
    throw new HttpException("Error updating task", 500);
  }

  return true;
};

module.exports = {
  createTask,
  getByUser,
  completeTask,
  assignTask,
};
