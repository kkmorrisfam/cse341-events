const {Types: {ObjectId}} = require('mongoose');
const Event = require("../models/eventModel");
const {getSingle} = require('../controllers/eventController');
const mockingoose = require('mockingoose');
const TestResponse= require('../utils/test-response');

jest.setTimeout(60000);

describe("Test Get Event", () => {
    test("Get One Event",async()=>{
        const _event = {
            _id: new ObjectId('67f650618aeb24ff8dbb3338'),
            eventName: "testing object",
            eventDescription: "Casual event",
            date: "2026, April, 10",
            location:"Fashion mall",
            eventStart: "6:00 PM",
            eventEnd: "10:00 PM",
            organizerId: "12434",
            vendorId: "54321"
        }
        mockingoose(Event).toReturn(_event, 'findOne');

        const req = {
            params: { id: '67f650618aeb24ff8dbb3337'}
        };

        const res = new TestResponse();
        const next = jest.fn(); 
        
        await getSingle(req, res, next);
        expect(res.statusCode).toBe(200);
         console.log("Data:" + res.data);
         console.log("Event:", JSON.stringify(_event, null, 2));
       
        expect(res.data.toJSON()).toEqual(_event);
    });
  });