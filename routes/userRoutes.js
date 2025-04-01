const router = require("express").Router();
const passport = require("passport");


// user login
router.get("/login", (req, res) => {
  res.send("<h1>Login Page</h1>");
});

// user logout
router.get("/logout", (req, res) => {
    res.send("<h2>Logout Page</h2>");
});

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
router.get("/google/callback", 
    // take code from google and get profile information
    passport.authenticate("google"),
    (req, res)=> {
       res.send(req.user); 
    // res.send("<h2>You've reached the callback URI</h2>")
})

module.exports = router;
