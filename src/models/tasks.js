const mongoose = require("mongoose");

const TaskStatus = {
  CREATED: 'CREATED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED'
};

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: [TaskStatus.CREATED, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED],
    default: TaskStatus.CREATED,
  },
  createdBy:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    validate: {
      validator: async function (userId) {
      const user = await mongoose.model("users").findOne({ _id: userId });
        return !!user; 
      },
      message: "Assigned user does not exist",
    },
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    validate: {
      validator: async function (userId) {
      const user = await mongoose.model("users").findOne({ _id: userId });
        return !!user; 
      },
      message: "Assigned user does not exist",
    },
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deletedAt: {
    type: Date,
  }
});

taskSchema.pre('updateOne', async function (next) {
  this.set({ updatedAt: new Date() });
  next();
});
const Task = mongoose.model("tasks", taskSchema);

module.exports = Task;