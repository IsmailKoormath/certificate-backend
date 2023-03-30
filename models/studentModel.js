const mongoose = require("mongoose");
const Joi = require("joi");
const { string } = require("joi");

const studentSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  phone: {
    type: String,
    required: true,
    min: 5,
    max: 255,
  },
  address: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  email: {
    type: String,
    minlength: 8,
    maxlength: 55,
  },
  dob:{
    type:Date
  },
  start_date: {
    type: Date,
  },
  end_date:{
    type:Date,
  },
  designation:{
    type:String,
    minlength:5,
    maxlength:55
  }
});

const Student = mongoose.model("Student", studentSchema);

function studentValidate(student){
    const schema= Joi.object({
      _id:Joi.string(),
        full_name:Joi.string().min(5).max(255).required(),
        phone:Joi.string().min(5).max(255).required(),
        address:Joi.string().min(5).max(255),
        email:Joi.string().email().min(8).max(55),
        dob:Joi.date(),
        start_date:Joi.date(),
        end_date:Joi.date(),
        designation:Joi.string().min(5).max(55)

    })
    return schema.validate(student)
}


exports.Student = Student
exports.Validate=studentValidate