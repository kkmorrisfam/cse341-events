const connectDB = require("../db/connect");
require("dotenv").config();

const taskModel = async () => {
    return await connectDB(process.env.MONGO_URI).collection('tasks');
};

module.exports = taskModel;