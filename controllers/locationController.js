const db = require("../db/connect");
const passport = require("passport");
const location = require("../models/locationModel");

const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  try {
    const database = db.getDatabase();
    const location = await database.collection("location").find().toArray(); // Just use `collection`

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(location);
  } catch (error) {
    console.error("❌ Error fetching all location:", error);
    res.status(500).json({ error: "Failed to fetch location" });
};
};



// Get a single location by ID
const getSingle = async (req, res) => {
  try {
    const locationId = new ObjectId(req.params.id);
    const database = db.getDatabase();
    const result = await database.collection("location").findOne({ _id: locationId });

    if (!result) {
      return res.status(404).json({ error: "location not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    console.error("❌ Error fetching single location:", error);
    res.status(500).json({ error: "Failed to fetch location" });
  }
};

// ✅ Create a new location
const createLocation = async (req, res) => {
  try {
    const location = {
      locationName: req.body.locationName,
      locationDescription: req.body.locationDescription,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
    };
    

    // 📌 Get the database instance
    const database = db.getDatabase();
const response = await database.collection("location").insertOne(location);

    // 📌 Check if insertion was successful
    if (response.acknowledged) {
      res.status(201).json({ message: "location created successfully", locationId: response.insertedId });
    } else {
      res.status(500).json({ error: "Failed to create location" });
    }
  } catch (error) {
    console.error("❌ Error creating location:", error);
    res.status(500).json({ error: "An error occurred while creating the location." });
  }
};


// Update an existing location
const updateLocation = async (req, res) => {
  try {
    const locationId = new ObjectId(req.params.id);
    const updatedLocation = {
      $set: {
          locationName: req.body.locationName,
          locationDescription: req.body.locationDescription,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          address: req.body.address,
          city: req.body.city,
          country: req.body.country,
        
      },
    };

    const response = await db.getDatabase().collection("location").updateOne({ _id: locationId }, updatedLocation);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: "location updated successfully" });
    } else {
      res.status(404).json({ error: "location not found or no changes made" });
    }
  } catch (error) {
    console.error("❌ Error updating location:", error);
    res.status(500).json({ error: "Failed to update location" });
  }
};

// Delete a location
const deleteLocation = async (req, res) => {
  try {
    const locationId = new ObjectId(req.params.id);
    const response = await db.getDatabase().collection("location").deleteOne({ _id: locationId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "location not found" });
    }
  } catch (error) {
    console.error("❌ Error deleting location:", error);
    res.status(500).json({ error: "Failed to delete location" });
  }
};

module.exports = {
  getAll,
  getSingle,
  createLocation,
  updateLocation,
  deleteLocation,
};