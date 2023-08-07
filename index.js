const express = require("express")
const { connection } = require("./configs/db")
const { authRouter } = require("./routes/auth.routes")
const { hotelsRouter } = require("./routes/hotels.routes")
const { roomsRouter } = require("./routes/rooms.routes")
const { usersRouter } = require("./routes/users.routes")
const { handleError } = require("./middleware/errorHandler.middleware")
const cookieParser = require("cookie-parser")
const cors = require("cors")
require("dotenv").config()


const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())



app.get("/",(req,res)=>{
    res.send("Game On...!")
})



app.use("/api/auth", authRouter)
app.use("/api/hotels", hotelsRouter)
app.use("/api/rooms", roomsRouter)
app.use("/api/users", usersRouter)

// MiddleWare
app.use(handleError)
    

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected To DB ❤️")
    } catch (error) {
        console.log('error: ', error);
    }
    console.log("Server is running ❤️")
})