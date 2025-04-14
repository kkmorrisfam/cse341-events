const Vendor = require("../models/vendorModel");
const ObjectId = require("mongodb").ObjectId;

const getAllVendors = async (req, res) => {
  //#swagger.tags=['Vendors']
  try{
  const response = await Vendor.find();
  res.data = response;
  res.status(200).json(response);
}
    catch (error) {
        res.status(500).json({ error: error.message || "Failed to get vendors: An error occurred while fetching the vendors." });
    }
};

const getOneVendor = async (req, res) => {
  //#swagger.tags=['Vendors']'
  try {
    const vendorId = new ObjectId(req.params.id);
    const response = await Vendor.findOne({ _id: vendorId });
    res.data = response;
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to get vendor: An error occurred while getting the vendor." });
  }
};

const createVendor = async (req, res) => {
  //#swagger.tags=['Vendors']
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
    const errorMsg = response?.error || "Failed to create vendor: An error occurred while creating the vendor.";
    res.status(500).json({ error: errorMsg });
  }
} catch (error) {
  res.status(500).json({ error: error.message || "Failed to create vendor: An error occurred while creating the vendor." });
}
};

const updateVendor = async (req, res) => {
  //#swagger.tags=['Vendors']
  try {
    const vendorId = new ObjectId(req.params.id);
    const vendor = req.body;
    console.log("Updating vendor with:", vendor);

    const response = await Vendor.replaceOne({ _id: vendorId }, vendor);

    if (response && response.modifiedCount > 0) {
      res.statusCode = 204;
      res.data = "Vendor updated";
    } else {
      console.warn("No vendor updated:", response);
      res.statusCode = 204;
      res.data = "No changes made";
    }
  } catch (error) {
    console.error("Update vendor caught error:", error);
    res.statusCode = 500;
    res.data = { error: error.message || "Failed to update vendor: An error occurred while updating the vendor." };
  }
};

const deleteVendor = async (req, res) => {
  //#swagger.tags=['Vendors']
try {
  const vendorId = new ObjectId(req.params.id);
  const response = await Vendor.deleteOne({ _id: vendorId });
  if (response.deletedCount > 0) {
    res.data = "Vendor deleted";
    res.status(200).json("Vendor deleted");
  } else {
    console.error("Delete vendor failed response:", response);
    const errorMsg = response?.error || "Failed to delete vendor";
    res.status(500).json({ error: errorMsg });
  }
} catch (error) {
    console.error("Delete vendor caught error:", error);
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
