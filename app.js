const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db/connect");
const app = express();
require("dotenv").config();

const passport = require("passport");
//runs passport.js file here and sets the configuration up for passport to use.
require("./config/passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT || 3000;
const host = process.env.HOST;
const isProd = process.env.NODE_ENV === "production";

//connect to the database
connectDB(process.env.MONGO_URI)
  .then(() => {
    console.log("Connection to MongoDB successfull...");

    //passport and sessions setup
    app.use(
      session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        // saveUninitialized: !isProd,
        saveUninitialized: false,
        store: MongoStore.create({
          // mongoUrl: process.env.MONGO_URI,
          // connectionName: "sessions"
          client: mongoose.connection.getClient(),
        }),
        cookie: {
          secure: isProd,
          httpOnly: true,
          // sameSite: isProd ? "lax" : "strict",
          sameSite: "none",
          maxAge: 1000 * 60 * 60 * 24, // expires 24 hours
        },
      })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    // other middleware setup

    app
      .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-type, Accept, Z-key, Authorization"
        );
        res.setHeader(
          "Access-Control-Allow-Methods",
          "POST, GET, PUT, PATCH, OPTIONS, DELETE"
        );
        next();
      })
      .use(
        cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] })
      )
      .use(cors({ origin: "*" }));

    app.use(bodyParser.json());

    // routes setup
    app.use("/", require("./routes"));

    // express built-in error handling middleware
    app.use((err, req, res, next) => {
      res.status(err.status || 500);
      res.send({
        error: {
          status: err.status || 500,
          message: err.message,
        },
      });
    });

    // start the server
    app.listen(port, () => {
      console.log(`Server is listening on ${host} port ${port}...`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB: ", err);
  });
