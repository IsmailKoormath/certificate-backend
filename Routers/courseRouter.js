const asynMiddleware =require('../middleware/async')
const {Course,validate} =require('../models/courseModel')
const express = require("express")
const auth = require('../middleware/auth')
const router = express.Router()

router.get('/',asynMiddleware( async(req,res)=>{
    const course =await Course.find().populate('course_category','course_category_name -_id ')
    res.send(course)
}))

router.post('/',asynMiddleware( async(req,res)=>{
    const {error}=validate(req.body)
    if(error) return res.status(404).send(error.details[0].message)

    let course = new Course({
        course_name:req.body.course_name,
        duration:req.body.duration,
        course_category:req.body.course_category
    })
    course = await course.save()
    res.send(course)
}))

router.put('/:id',asynMiddleware( async(req,res)=>{
    // const {error} =validate(req.body)
    // if(error) return res.status(404).send(error.details[0].message)

    const course =await Course.findByIdAndUpdate(req.params.id,{

        course_name:req.body.course_name,
        duration:req.body.duration,
        course_category:req.body.course_category

    },{
        new:true
    })
    if(!course) return res.status(404).send("The course with the given Id was not found")
    res.send(course)
}))

router.delete('/:id',asynMiddleware( async(req,res)=>{
    const course =await Course.findByIdAndDelete(req.params.id)
    if(!course) return res.status(404).send("The course with the give id was not found")
    res.send(course)
}))
router.get('/:id',asynMiddleware( async(req,res)=>{
    const course =await Course.findById(req.params.id).populate('course_category','course_category_name ')
    if(!course) return res.status(404).send('the course with the given id was not found')
    res.send(course)
}))


module.exports =router

