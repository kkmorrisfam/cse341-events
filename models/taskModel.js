const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskName: String,
    taskDescription: String,
    eventId: String,
    organizerId: String,
    dueDate: String,
    completed: Boolean
});

const Task = mongoose.model("task", taskSchema);

module.exports = Task;