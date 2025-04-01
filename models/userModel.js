const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//, displayName, firstName, lastName, userId, role, email, phone, googleId
const userSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    role: String,
    email: String,
    phone: String,
    googleId: String
});

const User = mongoose.model("user", userSchema);

module.exports = User;