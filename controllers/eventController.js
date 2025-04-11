const Event = require("../models/eventModel");
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');

const getAll = async (req, res, next)=>{
    //#swagger.tags=['Events']
    try {
        const result = await Event.find();
     
        if(!result){
            throw createError(404,"There aren't events");
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getSingle = async (req, res, next)=>{
    //#swagger.tags=['Events']
    try {
        const eventId = ObjectId.createFromHexString(req.params.id);
        const result = await Event.findOne({ _id: eventId });

        if(result.length === 0){
            throw createError(404,"Event doesn't exist");
        }

       // res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (error) {
        console.log("ERROR:", error);
        next(error);
    }
};

const createEvent = async(req, res, next)=>{
    //#swagger.tags=['Events']

    const event = {
        eventName: req.body.eventName,
        eventDescription: req.body.eventDescription,
        date: req.body.date,
        location: req.body.location,
        eventStart: req.body.eventStart,
        eventEnd: req.body.eventEnd,
        organizerId: req.body.organizerId,
        vendorId: req.body.vendorId
    };
    try {
        const response = await Event.insertOne(event);
       
        if(response){
            res.status(204).json(response);
        }else{
            throw createError(404,'Some error occurred while creating the event');
        }
    } catch (error) {
        next(error);
    }
};

const updateEvent = async(req, res, next)=>{
    //#swagger.tags=['Events']
    const event = {
        eventName: req.body.eventName,
        eventDescription: req.body.eventDescription,
        date: req.body.date,
        location: req.body.location,
        eventStart: req.body.eventStart,
        eventEnd: req.body.eventEnd,
        organizerId: req.body.organizerId,
        vendorId: req.body.vendorId
    };

    try {
        const eventId = ObjectId.createFromHexString(req.params.id);
        const response = await Event.replaceOne({ _id: eventId }, event);
       
        if(response.modifiedCount > 0){
            res.status(204).send();
        }else{
            throw createError(404,'Some error occurred while updating the event');
        }
    } catch (error) {
        next(error);
    }
};

const deleteEvent = async(req, res, next)=>{
    //#swagger.tags=['Events']
    try {
        const eventId = ObjectId.createFromHexString(req.params.id);
        const response = await Event.deleteOne({ _id: eventId });
       
        if(response.deletedCount > 0){
            res.status(204).send();
        }else{
            throw createError(404,"Some error occurred while deleting the event");
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAll,
    getSingle,
    createEvent,
    updateEvent,
    deleteEvent
};