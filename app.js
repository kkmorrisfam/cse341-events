const express = require("express");
const app = express();
const connectDB = require("./db/connect");
require("dotenv").config();
const passport = require("passport");
const passportSetup = require("./config/passport");
const session = require("express-session");
const cors = require("cors");

const port = process.env.PORT || 3000;
const host = process.env.HOST;

const isProd = process.env.NODE_ENV === "production";

//this process happens after user is logged in
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: !isProd,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: isProd ? "lax" : "strict",
    }
  }));
  
app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("./routes"));

const start = async () => {
  try {
    //connect DB
    await connectDB(process.env.MONGO_URI);
    console.log("Connection to MongoDB successfull...");
    app.listen(
      port,
      console.log(`Server is listening on ${host} port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
