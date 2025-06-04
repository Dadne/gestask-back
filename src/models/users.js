const mongoose = require('mongoose');
const bcrypt = require('../utils/bcrypt');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: {
    type: String,
    enum: ['admin', 'user'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    this.password = await bcrypt.encripPassword(this.password);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('users', userSchema);

module.exports = User;
