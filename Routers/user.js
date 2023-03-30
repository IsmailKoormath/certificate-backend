const Jwt = require('jsonwebtoken');
// const config = require('config');
const bcrypt = require('bcrypt')
const {User, uservalidate} = require("../models/user")
const _=require('lodash')
const express = require('express')
const auth = require('../middleware/auth')
const router= express.Router()

router.post('/',async(req,res)=>{
    const {error} = uservalidate(req.body)
    if(error) return res.status(400).send(error.details[0].message) 

    let user =await User.findOne({username:req.body.username})
    if(user) return res.status(400).send('user already registered')

    user=new User(_.pick(req.body,['username','password'])) 
    const salt =await bcrypt.genSalt(10)
    user.password= await bcrypt.hash(user.password,salt)
    
await user.save()
    // const token = Jwt.sign({ _id: user._id },process.env.TOKEN_KEY);
    // res.header('x-auth-token', token).send(_.pick(user, 'username'));
  res.send(user.username)

})

    module.exports=router