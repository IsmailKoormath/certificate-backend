const mongoose = require("mongoose");
const Joi = require("joi");



const courseSchema= new mongoose.Schema({
    course_name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:50
    },
    duration:{
        type:String,
        minlength:1,
        maxlength:50

    },
    course_category :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true,

    }

});
const Course = mongoose.model("Course",courseSchema)

function courseValidate(course){
    const schema =Joi.object({
        course_name:Joi.string().required().min(2).max(50),
        duration:Joi.string().min(1).max(50),
        course_category:Joi.myobjectId().required()
    })
    return schema.validate(course)
}


exports.validate =courseValidate
exports.Course=Course