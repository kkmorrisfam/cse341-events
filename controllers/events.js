const mongodb = require('../db/database');
const ObjectId = require('mongodb').ObjectId;
const createError = require('http-errors');

const getAll = async (req, res, next)=>{
    //#swagger.tags=['Events']
    try {
        const result = await mongodb.getDatabase().db().collection('events').find();
        if(!result){
            throw createError(404,"There aren't events");
        }
        result.toArray().then((events)=>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(events);
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getSingle = async (req, res, next)=>{
    //#swagger.tags=['Events']
    try {
        const eventId = ObjectId.createFromHexString(req.params.id);
        const result = await mongodb.getDatabase().db().collection('events').find({_id: eventId});
        console.log(result)
        if(!result){
            throw createError(404,"Event doesn't exist");
        }
        result.toArray().then((events)=>{
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(events[0]);
        });
    } catch (error) {
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
        const response = await mongodb.getDatabase().db().collection('events').insertOne(event);
        console.log(response);
        if(response.acknowledged > 0){
            res.status(204).send();
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
        const response = await mongodb.getDatabase().db().collection('events').replaceOne({_id: eventId}, event);
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
        const response = await mongodb.getDatabase().db().collection('events').deleteOne({_id: eventId});
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