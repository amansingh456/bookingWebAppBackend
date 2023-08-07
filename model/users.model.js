const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userName:{type:String,required:true,unique:true},
    email:{type:String,required:true, unique:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,default:false}
},
{
    timestamps:true
}
)


const UserModel =  mongoose.model("user",userSchema)

module.exports={UserModel}