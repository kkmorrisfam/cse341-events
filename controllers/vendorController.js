const Vendor = require("../models/vendorModel");
const ObjectId = require("mongodb").ObjectId;

const getAllVendors = async (req, res) => {
  //#swagger.tags=['Vendor']
  try{
  const response = await Vendor.find();
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(response);
}
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to get vendors: An error occurred while fetching the vendors." });
    }
};

const getOneVendor = async (req, res) => {
  //#swagger.tags=['Vendor']'
  try {
    const vendorId = new ObjectId(req.params.id);
    const response = await Vendor.find({ _id: vendorId });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to get vendor: An error occurred while getting the vendor." });
  }
};

const createVendor = async (req, res) => {
  //#swagger.tags=['Vendor']
try {
  const vendor = {
    vendorName: req.body.vendorName,
    vendorCategory: req.body.vendorCategory,
    contactName: req.body.contactName,
    contactEmail: req.body.contactEmail,
    contactPhone: req.body.contactPhone,
    website: req.body.website,
    rating: req.body.rating,
  };

  const response = await Vendor.insertOne(vendor);
  if(response) {
  res.status(201).json(response);
  } else {
    res.status(500).json(response.error || "Failed to create vendor: An error occurred while creating the vendor.");
  }
} catch (error) {
  res.status(500).json({ error: error.message || "Failed to create vendor: An error occurred while creating the vendor." });
}
};

const updateVendor = async (req, res) => {
  //#swagger.tags=['Vendor']
  const vendor = {
    vendorName: req.body.vendorName,
    vendorCategory: req.body.vendorCategory,
    contactName: req.body.contactName,
    contactEmail: req.body.contactEmail,
    contactPhone: req.body.contactPhone,
    website: req.body.website,
    rating: req.body.rating,
  };

  const response = await Vendor.replaceOne({ _id: vendorId }, vendor);
  try{
  if (response) {
    res.status(204).json(response);
  } else {
    res
      .status(500)
      .json(response.error || "Failed to update vendor: An error occurred while updating the vendor.");
  }
} catch (error) {
  res.status(500).json({ error: error.message || "Failed to update vendor: An error occurred while updating the vendor." });
}
};

const deleteVendor = async (req, res) => {
  //#swagger.tags=['Vendor']
try {
  const vendorId = new ObjectId(req.params.id);
  response = await Vendor.deleteOne({ _id: vendorId });
  if (response.deletedCount > 0) {
    res.status(200).send("Vendor deleted");
  } else {
    res
      .status(500)
      .json({ error: response.error || "Failed to delete vendor" });
  }
} catch (error) {
    res.status(500).json({ error: error.message || "Failed to delete vendor: An error occurred while deleting the vendor." });
    }
};

module.exports = {
  getAllVendors,
  getOneVendor,
  createVendor,
  updateVendor,
  deleteVendor,
};
