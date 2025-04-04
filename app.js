const express = require("express");
const bodyParser = require('body-parser');
const mongodb = require('./db/database');
const cors = require('cors');
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;
const host = process.env.HOST;
app.use(bodyParser.json());
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
  mongodb.initDb((err)=>{
    if(err){
      console.log("There is an error: "+ err);
    }else{
      app.listen(port, () => {
        console.log(`Server is listening on ${host} port ${port}...`);
      });
    }
  });