import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;
// MongoDB connection string (replace with your actual URI)
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// Middleware
app.use(cors());
app.use(express.json());

// Define a Mongoose schema and model
const profileSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: String,
  photo: String,
  description: String,
  address: String,
});
const Profile = mongoose.model("Profiles", profileSchema);

// Routes
//route for fetching all the profiles
app.get("/api/profiles", async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//route for adding a new profile
app.post("/api/profile", async (req, res) => {
  try {
    const { id, name, description, address, photo } = req.body;

    const newProfile = new Profile({
      id,
      name,
      photo,
      description,
      address,
    });

    await newProfile.save();

    res
      .status(201)
      .json({ message: "Profile added successfully", profile: newProfile });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding profile", error: error.message });
  }
});

//route for deleting a profile
app.delete("/api/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the profile by ID
    const deletedProfile = await Profile.findOneAndDelete({ id });

    if (!deletedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({
      message: "Profile deleted successfully",
      profile: deletedProfile,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//route for updating
app.put("/api/profile/:id", async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the URL parameter
    const { name, photo, description, address } = req.body; // Get the updated data from the request body

    // Find the profile by ID and update it with the new data
    const updatedProfile = await Profile.findOneAndUpdate(
      { id },
      { name, photo, description, address },
      { new: true } // `new: true` ensures that the updated profile is returned
    );
    console.log(updatedProfile);

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//search for profiles 
// Search endpoint for searching profiles by id or name
app.get("/api/profiles/search", async (req, res) => {
    const { query } = req.query; // `query` will contain the search term
    console.log(query)
  
    try {
      // Search by id (if numeric) or name (if string)
      const profiles = await Profile.find({
        $or: [
          { id: query }, // Search by ID (assuming ID is a number)
          { name: new RegExp(query, 'i') } // Search by name (case insensitive)
        ]
      });
      console.log(profiles)
  
      res.status(200).json(profiles);
    } catch (error) {
      res.status(500).json({ message: "Error searching profiles", error: error.message });
    }
  });
  

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
