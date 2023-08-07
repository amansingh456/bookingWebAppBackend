const express = require("express");
const { createRoom, updateRoom, deleteRoom, getRoom, getAllRoom } = require("../controller/rooms.controller");
const { verifyAdmin } = require("../middleware/checkAuthenticate.middleware");
const roomsRouter = express.Router()

// CREATE
roomsRouter.post("/:hotelid", verifyAdmin, createRoom);

// UPDATE
roomsRouter.put("/:id", verifyAdmin, updateRoom);

// DELETE
roomsRouter.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

// GET
roomsRouter.get("/:id", getRoom);

// GETALL
roomsRouter.get("/", getAllRoom);

module.exports={roomsRouter}