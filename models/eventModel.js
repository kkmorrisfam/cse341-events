const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//, displayName, firstName, lastName, userId, role, email, phone, googleId
const eventSchema = new Schema({
    eventName: String,
    eventDescription: String,
    date: String,
    location: String,
    eventStart: String,
    eventEnd: String,
    organizerId: String,
    vendorId: String
});

const event = mongoose.model("events", eventSchema);

module.exports = event;