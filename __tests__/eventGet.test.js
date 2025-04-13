const {Types: {ObjectId}} = require('mongoose');
const Event = require("../models/eventModel");
const {getSingle, getAll} = require('../controllers/eventController');

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
        //  console.log("Data:" + res.data);
        //  console.log("Event:", JSON.stringify(_event, null, 2));
       
        expect(res.data.toJSON()).toEqual(_event);
    });

    test('GET all events ', async () => {
        const _events = [
            {
                _id: new ObjectId('67f650618aeb24ff8dbb3338'),
                eventName: "testing object #1",
                eventDescription: "Casual event",
                date: "2026, April, 10",
                location:"Fashion mall",
                eventStart: "6:00 PM",
                eventEnd: "10:00 PM",
                organizerId: "12434",
                vendorId: "54321"
            },
            {
                _id: new ObjectId('67f661d3e667e568f8b9445c'),
                eventName: "testing object #2",
                eventDescription: "formal event",
                date: "2025, April, 10",
                location:"Flamingo Salon",
                eventStart: "8:00 PM",
                eventEnd: "11:00 PM",
                organizerId: "4567",
                vendorId: "9876"
            }
        ];
        mockingoose(Event).toReturn(_events, 'find');

        const req= {};
        const res = new TestResponse();
        const next = jest.fn();

        await getAll(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
        expect(res.data.length).toBe(2);
        expect(res.data[0]._id.toString()).toBe("67f650618aeb24ff8dbb3338");
        expect(res.data[1]._id.toString()).toBe("67f661d3e667e568f8b9445c");
    });
  });