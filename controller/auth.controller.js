const { UserModel } = require("../model/users.model")
const bcrypt = require("bcrypt")
const jwt  = require("jsonwebtoken")
require("dotenv").config()
const { createError } = require("../utils/customError")

const registerUser = async(req,res,next)=>{
    // const {userName,email,password} = req.body
    try {
        const salt =  bcrypt.genSaltSync(4)
        const hash =  bcrypt.hashSync(req.body.password,salt)
        const newUser = new UserModel({userName:req.body.userName,email:req.body.email,password:hash})
        await newUser.save()
        const {isAdmin,password, ...otherDetails} = newUser._doc
        res.status(200).json({otherDetails})
    } catch (error) {
        next(error)
    }
}

const loginUser = async(req,res,next)=>{
    // const {userName,password} = req.body
    try {
        const user = await UserModel.findOne({userName:req.body.userName})
        if(!user) return next(createError(404,"User not found"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) return next(createError(400,"Wrong Password"))

        // console.log(user._id,user.isAdmin)
        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.JWT_KEY)

        const {password, isAdmin, ...otherDetails} = user._doc
        // console.log(user)
        res.cookie("access_token",token,{
            httpOnly:true
        }).status(200).json({otherDetails})
    } catch (error) {
        next(error)
    }
}

module.exports={registerUser, loginUser}