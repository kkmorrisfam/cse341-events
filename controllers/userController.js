const passport = require("passport");
const User = require("../models/userModel");

const getUser = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const result = await User.findOne({ _id: req.params.id });
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching user: ", error);
    res.status(400).json({ message: "Server error getting user." });
  }
};

const getAllUsers = async (req, res) => {
  //#swagger.tags=['Users']
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching all users: ", error);
    res.status(400).json({ message: "Server error while fetching all users." });
  }
};

const registerUser = async (req, res) => {
  //#swagger.tags=['Users']
  const { username, password, email, firstname, lastname, phone } = req.body;
  try {
    const newUser = new User({ username, email, firstname, lastname, phone });
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
  //#swagger.tags=['Users']
  try {
    const {
      username,
      firstname,
      lastname,
      email,
      phone,
      currentPassword,
      newPassword,
    } = req.body;

    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) return res.status(401).json({ message: "User not found." });

    // Update basic fields
    if (username) user.username = username;
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    // If changing password, verify current password first
    if (currentPassword && newPassword) {
      user.changePassword(currentPassword, newPassword, async (err) => {
        if (err) {
          return res
            .status(400)
            .json({ message: "Password change failed", error: err.message });
        }
        await user.save();
        return res
          .status(200)
          .json({ message: "Account and password updated" });
      });
    } else {
      // Save only basic info update
      await user.save();
      res.status(200).json({ message: "Account information updated" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating account", error: err.message });
  }
};

// google callback function after google authenticates user
const googleCallBack = (req, res, next) => {
  try {
    req.login(req.user, (err) => {
      if (err) {
        console.error("Error logging in user: ", err);
        return next(err);
      }
      // req.session.user = req.user;
      console.log("Google login successful: ", req.user.id);
      // use a route to redirect user after login successful
      res.redirect("/"); //return to home page
    });
  } catch (err) {
    console.error("Error in Google callback:", err);
    next(err);
  }
};

// user logout
const userLogout = (req, res, next) => {
  //#swagger.tags=['Users']
  try {
    req.logout((err) => {
      if (err) return next(err);
      req.session.destroy((err) => {
        if (err) return next(err);
        res.clearCookie("connect.sid");
        res.status(200).json({ message: "Logged out successfully." });
      });
    });
  } catch (err) {
    console.error("Error during logout:", err);
    next(err);
  }
};

// Local login after passport authenticates user
const loginUser = (req, res, next) => {
  //#swagger.tags=['Users']
  try {
    res.status(200).json({
      message: "Login successful",
      user: req.user,
    });
  } catch (err) {
    console.error("Login error:", err);
    next(err);
  }
};

// Note: this is written expecting that only the user can delete themselves
//       It will logout the user once they are deleted.
//       Logic will need to be changed if logout is based on role.
const deleteUser = async (req, res, next) => {
  //#swagger.tags=['Users']
  try {
    //check to see if the current user is logged in as the user
    if (!req.user) {
      return res.status(401).json({ message: "Unathorized" });
    }

    //Delete user from the database
    await User.findByIdAndDelete(req.user._id);

    //Log user out and clear session
    req.logout((err) => {
      if (err) return next(err);
      req.session.destroy((err) => {
        if (err) return next(err);
        res.clearCookie("connect.sid");
        res.status(200).json({ message: "User deleted successfully" });
      });
    });
  } catch (err) {
    console.log("Error deleting user:", err);
    next(err); //returns to middleware in app.js
  }
};

module.exports = {
  getUser,
  getAllUsers,
  registerUser,
  updateUserInfo,
  userLogout,
  googleCallBack,
  loginUser,
  deleteUser,
};
