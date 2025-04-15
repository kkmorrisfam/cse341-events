const Location = require("../models/locationModel");
const ObjectId = require("mongodb").ObjectId;
const createError = require('http-errors');
 


const getAll = async (req, res) => {
  //#swagger.tags=['location']
  try{
  const response = await Location.find();
  if (!response) {
    throw createError(404, "No locations found");
  }
   res.data = response;
  res.status(200).json(response);
}
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to get location: An error occurred while fetching the locations." });
    }
};

const getSingle = async (req, res) => {
  //#swagger.tags=['location']'
  try {
    const locationId = new ObjectId(req.params.id);
    const response = await Location.findOne({ _id: locationId });
    if (response){
    res.status(200).json(response);
  }else {
    res.status(500).json({ error: error.message || "Failed to get vendor: An error occurred while getting the location." });
  } 
} catch (error){
    console.log(error);
  };
};

const createLocation = async (req, res) => {
  //#swagger.tags=['location']
  const location = {
    locationName: req.body.locationName,
          locationDescription: req.body.locationDescription,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          address: req.body.address,
          city: req.body.city,
          country: req.body.country,
  };
try {
  

  const response = await Location.insertOne(location);
  if(response) {
    res.status(201).json(response);
  } else {
    const errorMsg = response?.error || "Failed to create location: An error occurred while creating the location.";
    res.status(500).json({ error: errorMsg });
  }
} catch (error) {
  res.status(500).json({ error: error.message || "Failed to create location: An error occurred while creating the location." });
}
};

const updateLocation = async (req, res) => {
  //#swagger.tags=['location']
  const location = {
    locationName: req.body.locationName,
          locationDescription: req.body.locationDescription,
          latitude: req.body.latitude,
          longitude: req.body.longitude,
          address: req.body.address,
          city: req.body.city,
          country: req.body.country,
  };
  try {
    const locationId = new ObjectId(req.params.id);

    const response = await Location.replaceOne({ _id: locationId }, location);

    if (response.modifiedCount > 0) {
      res.status(204).json(response);
    } else {
      res.status(400).json(response.error)
    }
  } catch (error) {
    console.error("Update location caught error:", error);
    res.status(500).json({error: error.message || "Failed to update location: An error occurred while updating the location." })
  }
};

const deleteLocation = async (req, res) => {
  //#swagger.tags=['location']
try {
  const locationId = new ObjectId(req.params.id);
  const response = await Location.deleteOne({ _id: locationId });
  if (response.deletedCount > 0) {
    res.data = "location deleted";
    res.status(200).json("location deleted");
  } else {
    console.error("Delete location failed response:", response);
    const errorMsg = response?.error || "Failed to delete location";
    res.status(500).json({ error: errorMsg });
  }
} catch (error) {
    console.error("Delete location caught error:", error);
    res.status(500).json({ error: error.message || "Failed to delete location: An error occurred while deleting the location." });
    }
};

module.exports = {
  getAll,
  getSingle,
  createLocation,
  updateLocation,
  deleteLocation,
};
