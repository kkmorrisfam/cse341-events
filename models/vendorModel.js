const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
    vendorId: String
});

const vendor = mongoose.model("vendor", vendorSchema);

module.exports = vendor;