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
    completed: Boolean    /*taskName: {
        type: String,
        required: [true, "taskName is required."],
        minLength: [4, "taskName must be at least 4 characters."]
    },
    taskDescription: {
        type: String
    },
    eventId: {
        type: String,
        required: [true, "eventId is required."]
    },
    organizerId: {
        type: String,
        required: [true, "organizerId is required."]
    },
    dueDate: {
        type: String,
        required: [true, "specifying the due date is required."]
    },
    completed: {
        type: Boolean,
        required: [true, "true or false completed is required."],
    },*/
});

const Task = mongoose.model("task", taskSchema);

module.exports = Task;