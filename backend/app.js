const express = require("express");
const app = express();
const mongoose = require("mongoose");
const usersRoutes = require("./routes/users");
const parkingSlot = require("./routes/parkingSlots");
const cors = require("cors");
app.use(cors());
// Middleware for parsing JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://username:4yULAq4Ms4XFSOOV@cluster0.svkrjsf.mongodb.net/parkingsystem?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/slots", parkingSlot);
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
