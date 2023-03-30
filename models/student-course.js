const mongoose = require ('mongoose')
const Joi = require('joi')

const studentCourseSchema= new mongoose.Schema({
    student:{
         type:mongoose.Schema.Types.ObjectId,
        ref:"Student",
        required:true,
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true,
    },
    progress:{
        type:String,
        minlength:1,
        maxlength:255
    }
    
})
const StudentCourse = mongoose.model("StudentCourse",studentCourseSchema)

const studentCourseValidate= function(studentCourse){
    const schema=Joi.object({
        student:Joi.myobjectId().required(),
        course:Joi.myobjectId().required(),
        progress:Joi.string().min(1).max(255).required()
    })
    return schema.validate(studentCourse)
}

exports.validate=studentCourseValidate
exports.StudentCourse=StudentCourse