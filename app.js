const express = require("express");
const app = express();
const connectDB = require("./db/connect")
require("dotenv").config();

const port = process.env.PORT || 3000;
const host = process.env.HOST;



app.use("/", require("./routes"));

const start = async () => {
    try {
        //connect DB
        await connectDB(process.env.MONGO_URI)
        console.log("Connection to MongoDB successfull...")
        app.listen(port, console.log(`Server is listening on ${host} port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()