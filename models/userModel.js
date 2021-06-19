const mongoose = require('mongoose');
const Joi = require('Joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  accountType: { type: String, default: 'basic' },
  feedBack: { type: String },
  rating: { type: Number, default: 0 },
  approval: { type: Boolean, default: true },
});

const User = mongoose.model('User', userSchema);
const generateToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      accountType: user.accountType,
      isAdmin: user.isAdmin,
    },
    config.get('jwtKey')
  );
  return token;
};

const validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().max(70).min(5).required(),
    email: Joi.string().email().min(6).max(150).required(),
    password: Joi.string().max(255).min(8).required(),
    accountType: Joi.string(),
    approval: Joi.boolean(),
  });
  return schema.validate(user);
};
const matchPassword = async function (user, enteredPassword) {
  return await bcrypt.compare(enteredPassword, user.password);
};

exports.User = User;
exports.validateUser = validateUser;
exports.generateToken = generateToken;
exports.matchPassword = matchPassword;
