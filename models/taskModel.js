const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*const taskModel = async () => {
    return await connectDB(process.env.MONGO_URI).collection('tasks');
};*/

const taskSchema = new Schema({
    taskName: String,
    taskDescription: String,
    eventId: String,
    organizerId: String,
    dueDate: String,
    completed: String
});

const Task = mongoose.model("task", taskSchema);

module.exports = Task;