const { HotelModel } = require("../model/hotels.model")

const createHotel = async(req,res,next)=>{
    const newHotelDetails = req.body
    try {
        const savedHotel = new HotelModel(newHotelDetails)
        await savedHotel.save()
        console.log("Hotel Registered SucsessFully..!")
        res.status(200).json(savedHotel)
    } catch (error) {
        // res.status(500).json({"error":error})
        next(error)
    }
}

const updateHotel = async(req,res,next)=>{
    const getID = req.params.id
    const updateHotelDetails = req.body
    try {
        const updatedHotel = await HotelModel.findByIdAndUpdate(getID, {$set:updateHotelDetails},{new:true})
        console.log("Hotel Updated SucsessFully..!")
        res.status(200).json(updatedHotel)  
    } catch (error) {
            // res.status(500).json({"error":error}) 
            next(error)
    }
}

const deleteHotel = async(req,res,next)=>{
    const getID = req.params.id
    try {
        await HotelModel.findByIdAndUpdate(getID)
        res.status(200).json("Hotel has been Deleted..!!")   
    } catch (error) {
            // res.status(500).json({"error":error}) 
            next(error)
    }
}


const getHotel = async(req,res,next)=>{
    const getID = req.params.id
    try {
       const getHotel =  await HotelModel.findById(getID)
        console.log("Here is the Hotle....")
        res.status(200).json(getHotel)   
    } catch (error) {
            // res.status(500).json({"error":error}) 
            next(error)
    }
}

const getAllHotel = async(req,res,next)=>{
    const {min,max, ...others} = req.query
    console.log('others: ', others);
    console.log('max: ', max);
    console.log('min: ', min);
    
    try {
        const getAllHotel =  await HotelModel.find({...others, price:{$gt:min | 1, $lt:max | 300000}})
         console.log("Here is the All Hotles....")
         res.status(200).json(getAllHotel) 
     } catch (error) {
         next(error)
             // res.status(500).json({"error":error}) 
     }
}

const countByCity = async(req,res,next)=>{
    const cities = req.query.cities.split(",")
    try {
        const list =  await Promise.all(cities.map(city=>{
            return HotelModel.countDocuments({city:city})
        }))
         console.log("Here is the All List....")
         res.status(200).json(list)   
     } catch (error) {
         next(error)
             // res.status(500).json({"error":error}) 
     }
} 
const countByType = async(req,res,next)=>{
    try {
        const  hotelCount  = await HotelModel.countDocuments({type:"hotel"})
        const  appartmentCount  = await HotelModel.countDocuments({type:"appartment"})
        const  villaCount  = await HotelModel.countDocuments({type:"villa"})
        const  resortCount  = await HotelModel.countDocuments({type:"resort"})
        const  cabinCount  = await HotelModel.countDocuments({type:"cabin"})
         console.log("Here is the All Types related Hotels....")
         res.status(200).json([
            {type:"hotel", count:hotelCount},
            {type:"appartment", count:appartmentCount},
            {type:"villa", count:villaCount},
            {type:"resort", count:resortCount},
            {type:"cabin", count:cabinCount}
         ])   
     } catch (error) {
         next(error)
             // res.status(500).json({"error":error}) 
     }
}

module.exports={createHotel, updateHotel, deleteHotel, getHotel, getAllHotel, countByCity, countByType}





// hero hu me hero...😂