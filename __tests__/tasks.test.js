const { Types: { ObjectId } } = require('mongoose');
const Task = require("../models/taskModel");
const { getOneTask } = require('../controllers/taskController');
const mockingoose = require('mockingoose');
const TestResponse = require('../utils/test-response');

jest.setTimeout(60000);

describe("Testing task controllers", () => {
    test("Get one task", async () => {
        const _task = {
            _id: new ObjectId('67f661d3e667e568f8b9445c'),
            taskName: "Food",
            taskDescription: "5 meats, 3 vegetables, 3 mixed and, 3 dessert",
            eventId: "wedding76",
            organizerId: "566",
            dueDate: "2025-06-15",
            completed: false,
            __v: 0
        }
        mockingoose(Task).toReturn(_task, 'findOne');

        const req = {
            params: { id: '67f661d3e667e568f8b9445c' }
        };

        const res = new TestResponse();
        const next = jest.fn();

        await getOneTask(req, res, next);
        expect(res.statusCode).toBe(200);
        console.log("Data:" + res.data);
        console.log("Task:", JSON.stringify(_task, null, 2));

        expect(res.data.toJSON()).toEqual(_task);
    });
});