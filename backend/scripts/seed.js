// seed.js

const mongoose = require("mongoose");
const ParkingSlot = require("../models/ParkingSlot");

// List of available locations
const locations = ["Dwarka", "Janakpuri", "Rajiv Chowk", "Subhash Nagar"];

// Function to select a random location
function getRandomLocation() {
  const randomIndex = Math.floor(Math.random() * locations.length);
  return locations[randomIndex];
}

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://username:4yULAq4Ms4XFSOOV@cluster0.svkrjsf.mongodb.net/parkingsystem?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(async () => {
    console.log("Connected to MongoDB");

    // Check if database is already populated
    const existingSlotsCount = await ParkingSlot.countDocuments();
    if (existingSlotsCount > 0) {
      console.log("Database is already populated. Exiting...");
      mongoose.disconnect(); // Close database connection
      return;
    }

    // Generate parking slots for one week
    const startDate = new Date(); // Set start date (current date)
    const endDate = new Date(); // Set end date (7 days from start date)
    endDate.setDate(endDate.getDate() + 7);

    // Loop through each day and create parking slots
    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      // Create parking slots for each hour of the day
      for (let hour = 0; hour < 24; hour++) {
        const startTime = new Date(date);
        startTime.setHours(hour, 0, 0, 0);
        const endTime = new Date(startTime);
        endTime.setHours(hour + 1);

        // Select a random location
        const location = getRandomLocation();

        // Create parking slot
        const newParkingSlot = new ParkingSlot({
          location: location,
          availability: true,
          startTime: startTime,
          endTime: endTime,
        });

        // Save parking slot to database
        try {
          await newParkingSlot.save();
          console.log("Parking slot saved:", newParkingSlot);
        } catch (error) {
          console.error("Error saving parking slot:", error);
        }
      }
    }

    mongoose.disconnect(); // Close database connection
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));
