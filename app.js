const express = require("express");
const bodyParser = require('body-parser');
const connectDB = require("./db/connect");
const app = express();
require("dotenv").config();

const passport = require("passport");
const passportSetup = require("./config/passport");
const session = require("express-session");
const cors = require("cors");

const port = process.env.PORT || 3000;
const host = process.env.HOST;

app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS' );
    next();
  });
app.use(cors({methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}));
app.use(cors({origin: '*'}));
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


app.use(bodyParser.json());

app.use("/", require("./routes"));
app.use((err, req, res, next)=>{
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message
      }
    });
  });
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