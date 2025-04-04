const router = require("express").Router();
const passport = require("passport");

// user login
router.get("/login", (req, res) => {
  res.send("<h1>Login Page</h1>");
});

// user logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie("connect.sid");
      res.send("<h2>Logout Page</h2>"); //visual success for now
      //res.redirect("/");
    });
  });
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
router.get(
  "/google/callback",
  // take code from google and get profile information
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    //console.log(req.user);
    // use a route to redirect user after login successful
    console.log("GitHub login successful:");
    req.session.user = req.user;
    res.redirect("/"); //return to home page
  }
);

//route

//route to register new user
router.post("/register-user");

// route to post updates to account information and password
router.put("/update-info");

router.delete("/delete-user");

module.exports = router;
