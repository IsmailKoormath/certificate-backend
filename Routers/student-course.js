const asynMiddleware = require("../middleware/async")
const express = require('express')
const auth = require('../middleware/auth')
const { StudentCourse,validate } = require('../models/student-course')
const router =express.Router()

router.get('/:id',asynMiddleware( async(req,res)=>{
const studentCourse = await StudentCourse.findById(req.params.id).populate('student','full_name')
.populate('courses','course_name')
if(!studentCourse) return res.status(404).send("the student with the given id not found")
res.send(studentCourse)
}))

router.post("/",asynMiddleware( async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    let studentCourse = new StudentCourse({
        student:req.body.student,
        course:req.body.course,
        progress:req.body.progress

    });
    studentCourse = await studentCourse.save();
    res.send(studentCourse);
  }))
  
  router.put("/:id",asynMiddleware( async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    const studentCourse = await StudentCourse.findByIdAndUpdate(
      req.params.id,
      {
        student:req.body.student,
        course:req.body.course,
        progress:req.body.progress
      },
      {
        new: true,
      }
    );
    if (!studentCourse)
      return res.status(404).send("The student with the given ID was not found");
    res.send(studentCourse);
  }))
  
  router.delete("/:id",asynMiddleware( async(req,res)=>{
      const studentCourse=await StudentCourse.findByIdAndDelete(req.params.id)
      if(!studentCourse) return res.status(404).send("The student with the given id is not found")
      res.send(studentCourse)
  }))
  
  module.exports=router