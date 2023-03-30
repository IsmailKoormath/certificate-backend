// const config =require('config')
const error = require('./middleware/error')
const cors = require('cors')
const Joi = require("joi");
Joi.myobjectId =require("joi-objectid")(Joi)
const dotenv =require('dotenv')
const student = require('./Routers/studentRouter')
const course = require ('./Routers/courseRouter')
const category = require('./Routers/courseCategoryRouter')
const studentCourse =require('./Routers/student-course')
const auth = require('./Routers/auth')
const Users  = require('./Routers/user')
const mongoose = require('mongoose')
const express = require ('express')
const app = express()

app.use(error)

mongoose.set('strictQuery',false)
mongoose.connect('mongodb://127.0.0.1/certificate')
.then(()=>console.log('connected to mongodb'))
.catch(()=>console.log("could not connected to mongodb"))

dotenv.config()

app.use(cors({ origin:true, credentials:true}))

app.use(express.json())
app.use("/api/students",student)
app.use("/api/courses",course)
app.use ("/api/category",category)
app.use ('/api/studentcourse',studentCourse)
app.use('/api/user',Users)
app.use('/api/auth',auth)

app.use(error)

const port= process.env.PORT || 4000
app.listen(port,()=>console.log(`Listening on port ${port}...`))