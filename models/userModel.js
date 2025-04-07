const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");


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

// This adds username, hash, salt, and can use additional methods like .register()
// passportLocalMongoose will add it username, salt and hash to the database
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("user", userSchema);

module.exports = User;