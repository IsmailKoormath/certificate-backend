const bcrypt =require('bcrypt')
const Joi = require('joi')
const Jwt = require('jsonwebtoken')
// const config = require('config')
const { User } = require('../models/user')
const express = require('express')
const router = express.Router()

router.post('/',async(req,res)=>{
    const {error} =validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({username:req.body.username})
    if(!user) return res.status(400).send('Invalid username or password')

    const validpassword = await bcrypt.compare(req.body.password,user.password)
    if(!validpassword) return res.status(400).send('Invalid username or password')

    const token = Jwt.sign({ _id: user._id },process.env.TOKEN_KEY);
    res.header("x-auth-token",token).send({token})


})
router.post("/logout", (req, res) => {
    res.clearCookie("x-auth-token");
    return res.status(200).send("Successfully logged out");
  });


function validate(req){
    const schema = Joi.object({
        username:Joi.string().min(5).max(255).required(),
        password:Joi.string().min(6).max(255).required()
    })
    return schema.validate(req)
}

    module.exports=router