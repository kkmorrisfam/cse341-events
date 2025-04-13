const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*const locationModel = async () => {
    return await connectDB(process.env.MONGO_URI).collection('location');
};*/

const locationSchema = new Schema({
    locationName: String,
    locationDescription: String,
    lattitude: number,
    longitude: number,
    address: String,
    city: String,
    country: String,
});

const Location = mongoose.model("location", locationSchema);

module.exports = Location;