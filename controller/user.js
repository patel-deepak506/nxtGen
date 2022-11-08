const express = require('express')
const router = express.Router()
const JWT = require('jsonwebtoken')
const userSchema = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
require('dotenv').config()



var storage = multer.diskStorage({

    //Setting up destination and filename for uploads
    destination: function (req, file, cb) {  
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {  
        cb(null, Date.now() + file.originalname);
    }

});

var upload = multer({
    storage: storage,
    limits:{
        fieldSize: 1024*1024*3,
    }
});


router.post('/signup' ,upload.single("imageUrl"), async(req, res)=>{
    try {
        let path = ''
        if(req.file){
            path = req.file?.path
            req.body.imageUrl = path
        }
        
        const findUser = await userSchema.findOne({email: req.body.email})

        if(findUser){
            return res.send({message: 'user already exists with this email . please try with another email'}).statusCode(400)
        }
 

        const insertUser = new userSchema(req.body)
        await insertUser.save()

       return res.send({message:"user added successfully.."})
        
    } catch (error) {
        console.log(error)
        res.send({message:"getting error" ,  error: error})  
    }
})

router.post('/login' , async(req, res)=>{
    try {
        const body = req.body
        const findUser = await userSchema.findOne({email: body.email, userType:body.userType})

        if(!findUser){
            return res.send({message: 'user not exists with this email . please signup first..'}).statusCode(400)
        }

        const token = JWT.sign({email:body.email , password:body.password , userType:body.userType} , process.env.SECRET_KEY)
       return res.send({message:"user login  successfully....." , token:token}).statusCode(200)

        
    } catch (error) {
        console.log(error)
        res.send({message:"getting error" ,  error: error})  
    }
})



router.get('/users' ,auth.adminAuth , async (req, res) => {

    try {

        const users = await userSchema.find({userType:2 , status:"ACTIVE"})// it will return only active users not inactive or blocked users
        res.send({message:"success" , users:users})
        
    } catch (error) {
        console.log(error)
        res.send({message:"internal server error" , error:error})        
    }
})

module.exports = router