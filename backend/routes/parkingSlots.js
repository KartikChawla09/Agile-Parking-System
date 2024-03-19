const express = require("express");
const router = express.Router();
const ParkingSlot = require("../models/ParkingSlot");

// Get Free Slots
router.get("/freeSlots", async (req, res) => {
  try {
    // Query database for free parking slots
    const freeParkingSlots = await ParkingSlot.find({ availability: true });
    // Return free parking slots as JSON response
    res.status(200).json(freeParkingSlots);
  } catch (error) {
    console.error(error);
    // Handle errors and return error response
    res.status(500).json({ message: "Server Error" });
  }
});

// Book Parking Slot
router.post("/book", async (req, res) => {
  try {
    // Extract input data from request body
    const { slotId, userId, startTime, endTime } = req.body;

    // Validate input data
    if (!slotId || !userId || !startTime || !endTime) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Check if the selected parking slot is available for booking
    const selectedSlot = await ParkingSlot.findById(slotId);
    if (!selectedSlot || !selectedSlot.availability) {
      return res
        .status(404)
        .json({ message: "Parking slot not found or already booked" });
    }

    // Update slot availability to false and store booking details
    selectedSlot.availability = false;
    selectedSlot.bookedBy = userId;
    selectedSlot.startTime = new Date(startTime);
    selectedSlot.endTime = new Date(endTime);
    await selectedSlot.save();

    // Return success response with booking details
    res.status(200).json({
      message: "Parking slot booked successfully",
      bookedSlot: selectedSlot,
    });
  } catch (error) {
    console.error(error);
    // Handle errors and return error response
    res.status(500).json({ message: "Server Error" });
  }
});

// Cancel Booking
router.delete("/cancelBooking", async (req, res) => {
  try {
    // Extract input data from request body
    const { slotId, userId } = req.body;

    // Validate input data
    if (!slotId || !userId) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Check if the booking exists and belongs to the user
    const selectedSlot = await ParkingSlot.findById(slotId);
    if (
      !selectedSlot ||
      selectedSlot.availability ||
      selectedSlot.bookedBy !== userId
    ) {
      return res
        .status(404)
        .json({ message: "Booking not found or does not belong to the user" });
    }

    // Free the associated slot by updating its availability status
    selectedSlot.availability = true;
    selectedSlot.bookedBy = null;
    selectedSlot.startTime = null;
    selectedSlot.endTime = null;
    await selectedSlot.save();

    // Return success response
    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (error) {
    console.error(error);
    // Handle errors and return error response
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
