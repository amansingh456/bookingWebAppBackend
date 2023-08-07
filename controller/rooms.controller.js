const { HotelModel } = require("../model/hotels.model")
const { RoomModel } = require("../model/rooms.model")

const createRoom = async(req,res,next)=>{
    const hotelId = req.params.hotelid
    const newRoom = new RoomModel(req.body) 
    try {
        const savedRoom = await newRoom.save()
        try {
            await HotelModel.findByIdAndUpdate(hotelId, {$push: {rooms:savedRoom._id}})
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }
}


const updateRoom = async(req,res,next)=>{
    const getID = req.params.id
    const updateRoomDetails = req.body
    try {
        const updatedRoom = await RoomModel.findByIdAndUpdate(getID, {$set:updateRoomDetails},{new:true})
        console.log("Room Updated SucsessFully..!")
        res.status(200).json(updatedRoom)  
    } catch (error) {
            // res.status(500).json({"error":error}) 
            next(error)
    }
}

const deleteRoom = async(req,res,next)=>{
    const hotelId = req.params.hotelid
    const getID = req.params.id
    console.log(getID)
    try {
        await RoomModel.findByIdAndDelete(getID)
        try {
            await HotelModel.findByIdAndUpdate(hotelId, {$pull: {rooms:getID}})
        } catch (error) {
            next(error)
        }
        res.status(200).json("Room has been Deleted..!!")   
    } catch (error) {
            // res.status(500).json({"error":error}) 
            next(error)
    }
}


const getRoom = async(req,res,next)=>{
    const getID = req.params.id
    try {
       const getedRoom =  await RoomModel.findById(getID)
        console.log("Here is the Room....")
        res.status(200).json(getedRoom)   
    } catch (error) {
            // res.status(500).json({"error":error}) 
            next(error)
    }
}

const getAllRoom = async(req,res,next)=>{
    try {
        const getedAllRoom =  await RoomModel.find()
         console.log("Here is the All Rooms....")
         res.status(200).json(getedAllRoom)   
     } catch (error) {
         next(error)
             // res.status(500).json({"error":error}) 
     }
}

module.exports={createRoom, deleteRoom, getAllRoom, getRoom, updateRoom}