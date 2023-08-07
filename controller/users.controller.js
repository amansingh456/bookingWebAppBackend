const { UserModel } = require("../model/users.model")



const updateUser = async(req,res,next)=>{
    const getID = req.params.id
    const updateUserDetails = req.body
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(getID, {$set:updateUserDetails},{new:true})
        console.log("User Updated SucsessFully..!")
        res.status(200).json(updatedUser)  
    } catch (error) {
            // res.status(500).json({"error":error}) 
            next(error)
    }
}

const deleteUser = async(req,res,next)=>{
    const getID = req.params.id
    try {
        await UserModel.findByIdAndDelete(getID)
        res.status(200).json("User has been Deleted..!!")   
    } catch (error) {
            // res.status(500).json({"error":error}) 
            next(error)
    }
}


const getUser = async(req,res,next)=>{
    const getID = req.params.id
    try {
       const getUser =  await UserModel.findById(getID)
        console.log("Here is the Hotle....")
        res.status(200).json(getUser)   
    } catch (error) {
            // res.status(500).json({"error":error}) 
            next(error)
    }
}

const getAllUser = async(req,res,next)=>{
    try {
        const getAllUser =  await UserModel.find()
         console.log("Here is the All Users....")
         res.status(200).json(getAllUser)   
     } catch (error) {
         next(error)
             // res.status(500).json({"error":error}) 
     }
}

module.exports={updateUser, deleteUser, getUser, getAllUser}