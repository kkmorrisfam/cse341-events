const router = require("express").Router();
const passport = require("passport");
const userController = require("../controllers/userController");
const isAuthenticated = require("../utils/isAuthenticated");
const validate = require("../utils/userValidations");

// user login - get the user login page
// router.get("/login", (req, res) => {
//   res.send("<h1>Login Page</h1>");
// });

// user OAuth with Google
router.get(
  "/google",
  //go to google authenticate page, get code from google
  passport.authenticate(
    "google",
    //what do we want from google?
    { scope: ["profile"] }
  )
);

// Callback route from google
router.get(
  "/google/callback",
  // take code from google and get profile information
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  userController.googleCallBack
);

// user register - get the user register page
// router.get("/register", (req, res) => {
//   res.send("<h1>Register New User Page</h1>");
// });

// get update user page
// router.get("/update/:id", (req, res) => {
//   res.send("<h1>Update User Page by Id</h1>");
// })

// user logout route
router.get("/logout", userController.userLogout);

//route to login locally - uses passport to authenticate
router.post("/login", passport.authenticate("local"), userController.loginUser);

//route to register new user locally - also logs in user after registration
router.post(
  "/register-user",
  validate.addLocalUserRules(),
  validate.checkValidationErrors,
  userController.registerUser
);

// route to post updates to account information and password
router.put(
  "/update-info/:id",
  validate.addLocalUserRules(),
  validate.checkValidationErrors,
  isAuthenticated,
  userController.updateUserInfo
);

// route to delete a user, checks if user to delete is logged in first
router.delete("/delete-user/:id", isAuthenticated, userController.deleteUser);

module.exports = router;
