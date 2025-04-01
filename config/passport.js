const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/userModel");

require("dotenv").config();

passport.serializeUser((user, done) => {
  //user is from our database
  done(null, user.id);
});

passport.deserializeUser((id, done) => {    
    User.findById(id).then((user)=> {
        done(null, user);
    });
  });
  

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID_DEV,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_DEV,
      callbackURL: process.env.CALLBACK_URL_DEV,
      passReqToCallback: true,
    },
    (req, accessToken, refreshToken, profile, done) => {
      // function when returning from Google
      console.log("passport callback function fired");
      // console.log(profile);
      //check to see if user exists
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          console.log("current user is: ", currentUser);
          done(null, currentUser);
        } else {
          new User({
            username: profile.displayName,
            googleId: profile.id,
            firstName: profile.given_name,
            lastName: profile.last_name,
            email: profile.email,
          })
            .save()
            .then((newUser) => {
              console.log("new user created " + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
