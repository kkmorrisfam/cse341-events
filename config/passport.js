const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../models/userModel");

require("dotenv").config();

const isProd = process.env.NODE_ENV === "production";

passport.serializeUser((user, done) => {
  //user is from our database
  console.log("serializeUser: ", user.id);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log("deserializeUser: looking for", id);
  User.findById(id).then((user) => {
    console.log("deserializeUser: found", user ? user.id : "none");
    done(null, user);
  }).catch(err => {
    console.error("deserializeUser error: ", err);
    done(err);
  });
});

passport.use(
    new GoogleStrategy(
      {
        clientID: isProd
          ? process.env.GOOGLE_CLIENT_ID_PROD
          : process.env.GOOGLE_CLIENT_ID_DEV,
        clientSecret: isProd
          ? process.env.GOOGLE_CLIENT_SECRET_PROD
          : process.env.GOOGLE_CLIENT_SECRET_DEV,
        callbackURL: isProd
          ? process.env.CALLBACK_URL_PROD
          : process.env.CALLBACK_URL_DEV,
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
              firstname: profile.given_name,
              lastname: profile.family_name,
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

//sets up the local strategy with passport-local-mongoose
passport.use(User.createStrategy());

//I do not need an export statement here.  By requiring file at beginning of app.js file, the file
//is read/run to set things up, and then used in passport when passport is called.
