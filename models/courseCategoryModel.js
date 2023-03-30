
const mongoose = require('mongoose')
const Joi = require('joi')


const categorySchema = new mongoose.Schema({
    course_category_name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255
    },
    designation:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
    }
})

const Category = mongoose.model('Category',categorySchema)

function categoryValidation(category) {
    const schema = Joi.object({
        course_category_name:Joi.string().min(5).max(255).required(),
        designation:Joi.string().min(5).max(255).required()
    })
    return schema.validate(category)
}

exports.Category = Category
exports.categoryValidate=categoryValidation
