const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
    vendorName: { type: String, required: true },
    vendorCategory: String,
    contactName: String,
    contactEmail: String,
    contactPhone: String,
    website: String,
    rating: Number,
    createdAt: { type: Date, default: Date.now },
  });

const vendor = mongoose.model("vendor", vendorSchema);

module.exports = vendor;