const asynMiddleware=require('../middleware/async')
const express = require('express')
const auth = require('../middleware/auth')
const { Category, categoryValidate } = require('../models/courseCategoryModel')
const router = express.Router()


router.get('/',asynMiddleware( async(req,res)=>{
    const category = await Category.find()
    res.send(category)
}))

router.post('/',asynMiddleware( async(req,res)=>{
    const {error} = categoryValidate(req.body)
    if(error) return res.status(404).send(error.details[0].message)

    let category =new Category({
        course_category_name:req.body.course_category_name,
        designation:req.body.designation
    })
    category= await category.save()
    res.send(category)
}))

router.put('/:id',asynMiddleware( async(req,res)=>{
    // const {error}= categoryValidate(req.body)
    // if(error) return res.status(400).send(error.details[0].message)

    const category =await Category.findByIdAndUpdate(req.params.id ,{
        course_category_name:req.body.course_category_name,
        designation:req.body.designation
    },{
        new:true
    })
   if(!category) return res.status(404).send("The category with the given id was not found")
   res.send(category)
}))

router.delete('/:id',asynMiddleware( async(req,res)=>{
 const category = await Category.findByIdAndDelete(req.params.id)
 if(!category) return res.status(404).send("The category with the given id was not found")
 res.send(category)
}))

router.get('/:id',asynMiddleware( async(req,res)=>{
    const category =await Category.findById(req.params.id)
    if(!category) return res.status(404).send("The category with the given id was not found")
    res.send(category)

}))

module.exports = router