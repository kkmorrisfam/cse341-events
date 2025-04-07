const passport = require("passport");
const User = require("../models/userModel");

const registerUser = async (req, res) => {
  const { username, password, email, firstName, lastName, phone } = req.body;
  try {
    const newUser = new User({ username, email, firstName, lastName, phone });
    //update the database with User.register()
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) return res.status(500).send("Login after registration failed.");
      res
        .status(200)
        .json({ message: "Registration successful", user: registeredUser });
    });
  } catch (err) {
    //passport-local-mongoose has default error messages
    res.status(400).json({ error: err.message });
  }
};

// Update user info and/or password
const updateUserInfo = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, currentPassword, newPassword } =
      req.body;

    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    // Update basic fields
    if (firstName) req.user.firstName = firstName;
    if (lastName) req.user.lastName = lastName;
    if (email) req.user.email = email;
    if (phone) req.user.phone = phone;

    // If changing password, verify current password first
    if (currentPassword && newPassword) {
      req.user.changePassword(currentPassword, newPassword, async (err) => {
        if (err) {
          return res
            .status(400)
            .json({ message: "Password change failed", error: err.message });
        }
        await req.user.save();
        return res
          .status(200)
          .json({ message: "Account and password updated" });
      });
    } else {
      // Save only basic info update
      await req.user.save();
      res.status(200).json({ message: "Account information updated" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating account", error: err.message });
  }
};

module.exports = {
  registerUser,
  updateUserInfo,
};
