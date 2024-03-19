const mongoose = require("mongoose");
const parkingSlotSchema = new mongoose.Schema({
  location: { type: String, required: true },
  availability: { type: Boolean, default: true }, // Default to true initially
  bookedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User model
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

module.exports = mongoose.model("ParkingSlot", parkingSlotSchema);
