const asynMiddleware=require('../middleware/async')
const { Student, Validate } = require("../models/studentModel");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/",asynMiddleware( async (req, res) => {
  const students = await Student.find().sort("full_name");
  res.send(students);
}));

router.post("/",asynMiddleware( async (req, res) => {
  const { error } = Validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let student = new Student({
    full_name: req.body.full_name,
    phone: req.body.phone,
    address: req.body.address,
    email: req.body.email,
    dob: req.body.dob,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    designation: req.body.designation,
  });
  student = await student.save();
  res.send(student);
}));

router.put("/:id",asynMiddleware( async (req, res) => {
  // console.log('req.body: ',req.body);
  // const { error } = Validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const student = await Student.findByIdAndUpdate(
    req.params.id,
    {
      full_name: req.body.full_name,
      phone: req.body.phone,
      address: req.body.address,
      email: req.body.email,
      dob: req.body.dob,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      designation: req.body.designation,
    },
    {
      new: true,
    }
  );
  if (!student)
    return res.status(404).send("The student with the given ID was not found");
  res.send(student);
}));

router.delete("/:id",asynMiddleware( async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student)
    return res.status(404).send("The student with the given id is not found");
  res.send(student);
}));

router.get("/:id",asynMiddleware( async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student)
    return res.status(404).send("the student with the given id not found");
  res.send(student);
}));

module.exports = router;
