// const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const Joi = require("joi");


const userSchema=new mongoose.Schema({
  username: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    unique:true
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 1024,
  },
})
const User = mongoose.model("users",userSchema)

// userSchema.methods.generateAuthToken = function() { 
//   const token = jwt.sign({ _id: this._id },process.env.TOKEN_KEY);
//   return token;
// }

const uservalidate = function(user) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(255).required(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(user);
};

exports.User = User;
exports.uservalidate = uservalidate;
