const { Types: { ObjectId } } = require('mongoose');
const Task = require("../models/taskModel");
const { getOneTask, getAllTasks } = require('../controllers/taskController');
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
            completed: false
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

    test('Get all tasks  ', async () => {
        const _tasks = [
            {
                _id: new ObjectId('67f661d3e667e568f8b9446d'),
                taskName: "Decorations",
                taskDescription: "Red Carpet, curtains, tables, flowers and balloons",
                eventId: "wedding76",
                organizerId: "566",
                dueDate: "2025-06-15",
                completed: false
            },
            {
                _id: new ObjectId('67f661d3e667e568f8b9445c'),
                taskName: "Food",
                taskDescription: "5 meats, 3 vegetables, 3 mixed and, 3 dessert",
                eventId: "wedding76",
                organizerId: "566",
                dueDate: "2025-06-21",
                completed: false
            },
            {
                _id: new ObjectId('67f661d3e667e568f8b9447e'),
                taskName: "Catering",
                taskDescription: "Filipino and Mexican meals",
                eventId: "wedding76",
                organizerId: "566",
                dueDate: "2025-06-26",
                completed: false
            }
        ];
        mockingoose(Task).toReturn(_tasks, 'find');

        const req = {};
        const res = new TestResponse();
        const next = jest.fn();

        await getAllTasks(req, res, next);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
        expect(res.data.length).toBe(3);
        expect(res.data[0].toJSON()).toEqual(_tasks[0]);
        expect(res.data[1].toJSON()).toEqual(_tasks[1]);
        expect(res.data[2].toJSON()).toEqual(_tasks[2]);
    });
});