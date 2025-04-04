const Task = require("../models/taskModel");
const ObjectId = require('mongodb').ObjectId;

const getAllTasks = async (req, res) => {
    //#swagger.tags=['Task']
    const response = await Task.find();
    //response.toArray().then((task) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);
    //});
}

const getOneTask = async (req, res) => {
    //#swagger.tags=['Task']
    const taskId = new ObjectId(req.params.id);
    const response = await Task.find({ _id: taskId });
    //response.toArray().then((task) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(response);
    //});
}

const createTask = async (req, res) => {
    //#swagger.tags=['Task']
    const task = {
        taskName: req.body.taskName,
        taskDescription: req.body.taskDescription,
        eventId: req.body.eventId,
        organizerId: req.body.organizerId,
        dueDate: req.body.duaDate,
        completed: req.body.completed
    };
    const response = await Task.insertOne(task);
    if (response) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the task.')
    }
};

const updateTask = async (req, res) => {
    //#swagger.tags=['Task']
    const taskId = new ObjectId(req.params.id);
    const task = {
        taskName: req.body.taskName,
        taskDescription: req.body.taskDescription,
        eventId: req.body.eventId,
        organizerId: req.body.organizerId,
        dueDate: req.body.duaDate,
        completed: req.body.completed
    };
    const response = await Task.replaceOne({ _id: taskId }, task);
    if (response.modifiedCount > 0) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the task.')
    }
};

const deleteTask = async (req, res) => {
    //#swagger.tags=['Task']
    const taskId = new ObjectId(req.params.id);
    const response = await Task.deleteOne({ _id: taskId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the task.')
    }
};

module.exports = {
    getAllTasks,
    getOneTask,
    createTask,
    updateTask,
    deleteTask
};