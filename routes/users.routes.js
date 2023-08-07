const express = require("express")
const { getAllUser, getUser, deleteUser, updateUser } = require("../controller/users.controller")
const { verifyToken, verifyAdmin, verifyUser } = require("../middleware/checkAuthenticate.middleware")
const usersRouter = express.Router()


//!  Authnticated and Authorised Middleware Working...//
// usersRouter.get("/checkauth", verifyToken, (req,res,next)=>{
//     res.send("hello user you are logged in")
// })


// usersRouter.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//     res.send("hello user you are logged in and you can delete your account")
// })

// usersRouter.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//     res.send("hello user you are logged in as admin and you can delete all account")
// })
//! 



// UPDATE
usersRouter.put("/:id",verifyUser,updateUser)


// DELETE
usersRouter.delete("/:id",verifyUser,deleteUser)

// GET
usersRouter.get("/:id",verifyUser,getUser)


// GETALL
usersRouter.get("/",verifyAdmin,getAllUser)

module.exports={usersRouter}