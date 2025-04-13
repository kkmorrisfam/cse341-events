const Task = require("../models/taskModel");
const ObjectId = require('mongodb').ObjectId;

const getAllTasks = async (req, res) => {
    //#swagger.tags=['Tasks']
    try {
        const response = await Task.find();
        if (response) {
            //res.setHeader('Content-Type', 'application/json');
            res.status(200).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while getting task data.')
        }
    } catch (err) {
        console.log(err);
    };
};

const getOneTask = async (req, res) => {
    //#swagger.tags=['Tasks']
    try {
        const taskId = new ObjectId(req.params.id);
        const response = await Task.findOne({ _id: taskId });
        if (response) {
            //res.setHeader('Content-Type', 'application/json');
            res.status(200).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while getting the task data.')
        }
    } catch (err) {
        console.log(err);
    };
};

const createTask = async (req, res) => {
    //#swagger.tags=['Tasks']
    try {
        const task = {
            taskName: req.body.taskName,
            taskDescription: req.body.taskDescription,
            eventId: req.body.eventId,
            organizerId: req.body.organizerId,
            dueDate: req.body.dueDate,
            completed: req.body.completed
        };
        const response = await Task.insertOne(task);
        if (response) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the task.')
        }
    } catch (err) {
        console.log(err);
    };
};

const updateTask = async (req, res) => {
    //#swagger.tags=['Tasks']
    try {
        const taskId = new ObjectId(req.params.id);
        const task = {
            taskName: req.body.taskName,
            taskDescription: req.body.taskDescription,
            eventId: req.body.eventId,
            organizerId: req.body.organizerId,
            dueDate: req.body.dueDate,
            completed: req.body.completed
        };
        const response = await Task.replaceOne({ _id: taskId }, task);
        if (response.modifiedCount > 0) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the task.')
        }
    } catch (err) {
        console.log(err);
    };
};

const deleteTask = async (req, res) => {
    //#swagger.tags=['Tasks']
    try {
        const taskId = new ObjectId(req.params.id);
        const response = await Task.deleteOne({ _id: taskId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the task.')
        }
    } catch (err) {
        console.log(err);
    };
};

const deleteManyTasks = async (req, res) => {
    //#swagger.tags=['Tasks']
    try {
        const name = req.params.name;
        const response = await Task.deleteMany({ taskName: name });
        if (response.deletedCount > 0) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the task.')
        }
    } catch (err) {
        console.log(err);
    };
};

module.exports = {
    getAllTasks,
    getOneTask,
    createTask,
    updateTask,
    deleteTask,
    deleteManyTasks
};