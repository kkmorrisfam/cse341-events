const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const locationSchema = new Schema({
    locationName: String,
    locationDescription: String,
    latitude: Number,
    longitude:  Number,
    address: String,
    city: String,
    country: String,
});

const Location = mongoose.model("location", locationSchema);

module.exports = Location;