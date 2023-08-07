const express = require("express");
const {
  createHotel,
  updateHotel,
  getHotel,
  deleteHotel,
  getAllHotel,
  countByCity,
  countByType,
} = require("../controller/hotels.controller");
const { verifyAdmin } = require("../middleware/checkAuthenticate.middleware");
const hotelsRouter = express.Router();

// CREATE
hotelsRouter.post("/", verifyAdmin, createHotel);

// UPDATE
hotelsRouter.put("/find/:id", verifyAdmin, updateHotel);

// DELETE
hotelsRouter.delete("/find/:id", verifyAdmin, deleteHotel);

// GET
hotelsRouter.get("/find/:id", getHotel);

// GETALL
hotelsRouter.get("/", getAllHotel);
hotelsRouter.get("/countByCity", countByCity);
hotelsRouter.get("/countByType", countByType);

module.exports = { hotelsRouter };

